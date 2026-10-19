"use server";

import nodemailer from "nodemailer";

export type EnquiryResult = { ok: true } | { ok: false; error: string };

const MAX = { name: 120, email: 200, phone: 40, interest: 60, message: 5000 };

// Escapes text for the HTML version of the email
const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const field = (data: FormData, key: keyof typeof MAX) =>
  String(data.get(key) ?? "")
    .trim()
    .slice(0, MAX[key]);

// Emails an enquiry from the contact form to the SolMerge inbox. Replying to
// the email goes straight to the person who sent it.
export async function sendEnquiry(data: FormData): Promise<EnquiryResult> {
  // Hidden field only bots fill in. Pretend it worked so they move on.
  if (String(data.get("company") ?? "")) return { ok: true };

  const name = field(data, "name");
  const email = field(data, "email");
  const phone = field(data, "phone");
  const interest = field(data, "interest");
  const message = field(data, "message");

  if (!name || !interest || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please fill in your name, a valid email and an area of interest." };
  }

  const { SMTP_USER, SMTP_PASS, ENQUIRY_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Enquiry not sent: SMTP_USER and SMTP_PASS are not set.");
    return { ok: false, error: "Sorry, your enquiry couldn't be sent. Please email or call us instead." };
  }

  // A phone that is only the pre-filled country code counts as blank
  const phoneShown = /\d{5,}/.test(phone.replace(/\D/g, "")) ? phone : "Not given";
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phoneShown],
    ["Area of interest", interest],
    ["Message", message || "(no message)"],
  ];

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: { name: "SolMerge Website", address: SMTP_USER },
      to: ENQUIRY_TO || SMTP_USER,
      replyTo: { name, address: email },
      subject: `New enquiry: ${interest} from ${name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n\n"),
      html: rows
        .map(
          ([k, v]) =>
            `<p><strong>${k}</strong><br>${escape(v).replace(/\n/g, "<br>")}</p>`,
        )
        .join(""),
    });
    return { ok: true };
  } catch (err) {
    console.error("Enquiry not sent:", err);
    return { ok: false, error: "Sorry, your enquiry couldn't be sent. Please email or call us instead." };
  }
}
