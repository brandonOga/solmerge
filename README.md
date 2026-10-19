# SolMerge Financial Advisory

Marketing site for SolMerge Financial Advisory — Finance, IT Solutions and Actuarial Services.

Built with [Next.js](https://nextjs.org) (App Router) and TypeScript.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/page.tsx` — the landing page
- `src/app/layout.tsx` — root layout and fonts (Newsreader, IBM Plex Sans, IBM Plex Mono)
- `src/app/globals.css` — all styles; colour and spacing tokens live in `:root`
- `src/components/` — interactive pieces (services tabs, enquiry form)
- `src/lib/content.ts` — services and industries copy
- `public/assets/` — logo and photography

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — lint with ESLint

## Contact form email

The enquiry form (`src/components/ContactForm.tsx`) is sent by the server action in `src/app/actions/enquiry.ts`, through Gmail SMTP, to the SolMerge inbox. Replying to an enquiry email goes to the person who sent it.

Set these environment variables in `.env.local` for development, and in the hosting provider's settings for production:

- `SMTP_USER`: the Gmail address that sends and receives enquiries (`solmergefa@gmail.com`)
- `SMTP_PASS`: a Gmail App Password for that account (Google Account → Security → 2-Step Verification → App passwords)
- `ENQUIRY_TO` (optional): a different address to receive enquiries
