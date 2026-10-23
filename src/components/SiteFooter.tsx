import Image from "next/image";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaLocationDot,
  FaPhoneVolume,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import ContactForm from "@/components/ContactForm";
import { CONTACT, SITE } from "@/lib/site";

const CHANNELS = [
  {
    icon: FaWhatsapp,
    title: "Send us a message",
    label: CONTACT.phone,
    href: `https://wa.me/${CONTACT.phoneE164.slice(1)}`,
  },
  {
    icon: FaPhoneVolume,
    title: "Call us",
    label: CONTACT.phone,
    href: `tel:${CONTACT.phoneE164}`,
  },
  {
    icon: FaEnvelope,
    title: "Send an email",
    label: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: FaLocationDot,
    title: "Visit us",
    label: `${CONTACT.address.street}, ${CONTACT.address.locality}, ${CONTACT.address.city}`,
    href: CONTACT.mapsUrl,
  },
];

// Hidden until the real profiles exist. Set to true to show the block again.
const SHOW_SOCIALS = false;

// TODO: replace with the real profile URLs.
const SOCIALS = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaXTwitter, label: "X", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div id="contact" className="footer-main" data-reveal-group>
        <Image
          src="/assets/contact-2.jpg"
          alt=""
          fill
          sizes="100vw"
          className="cover footer-bg"
          data-reveal="clip-up"
        />
        <div className="footer-scrim" />
        <div className="container footer-content">
          <div className="footer-contact">
            {/* Starts while the background is still wiping in */}
            <h2 className="footer-title" data-reveal="mask" data-reveal-at="0.4">
              Get in Touch
            </h2>

            <div className="channels">
              {CHANNELS.map(({ icon: Icon, title, label, href }) => (
                <a
                  key={title}
                  href={href}
                  className="channel"
                  data-reveal="up"
                  // Web links only: tel: and mailto: would leave a blank tab
                  {...(href.startsWith("http") && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  <Icon className="channel-icon" aria-hidden="true" />
                  <h3 className="channel-title h6">{title}</h3>
                  <span className="channel-label">{label}</span>
                </a>
              ))}
            </div>

            {SHOW_SOCIALS && (
              <>
                <h3 className="socials-title h4" data-reveal="mask">
                  Find us on social media
                </h3>
                <div className="socials">
                  {SOCIALS.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="social"
                      aria-label={label}
                      data-reveal="up"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>

          <ContactForm />
        </div>
      </div>

      <div className="footnote">
        <div className="container footnote-inner">
          <span className="text-sm!">© 2026 {SITE.legalName}</span>
          <span className="text-sm!">Design &amp; Code by Brandon</span>
        </div>
      </div>
    </footer>
  );
}
