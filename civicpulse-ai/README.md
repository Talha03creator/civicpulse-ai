# CivicPulse AI

CivicPulse AI is an AI-powered municipal infrastructure complaint & auto-dispatch platform. Citizens report issues like potholes and broken streetlights via a simple web interface. The system uses multimodal AI (Gemma 4 via Fireworks AI) deployed on AMD Developer Cloud infrastructure to automatically classify the issue, assign a severity score, and route it to the correct municipal department with predicted SLA timelines.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **AI Infrastructure**: AMD Developer Cloud + Fireworks AI (Gemma 4)

## Prerequisites
- Node.js 20+
- Docker & Docker Compose (optional for local deployment)

## Local Setup (Development)

1. Clone the repository and navigate into the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Deployment (Production)

You can run the full application using Docker.

1. Ensure `.env` is configured.
2. Build and start the container:
   ```bash
   docker-compose up --build
   ```
3. Ensure `NEXT_PUBLIC_SITE_URL` is set to your actual AMD Developer Cloud deployment URL before deploying (needed for correct Open Graph and Sitemap generation).
4. Access the production build at [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description | Required / Optional |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | The public base URL for the site (used for SEO metadata). | Optional (defaults to `http://localhost:3000`) |
| `CONTACT_EMAIL_TO` | The email address where contact form submissions will be routed. | Optional (defaults to `support@civicpulse.ai`) |

## Folder Structure Overview
- `app/` - Next.js App Router layout, pages (marketing, about, contact, privacy), API routes, and SEO files
- `components/ui/` - Reusable foundational components (Buttons, Cards, Inputs, Logo, etc.)
- `components/layout/` - Global layout elements like Navbar and Footer
- `components/sections/` - Content sections specific to the landing page
- `components/about/` - Components specific to the About page
- `components/contact/` - Components specific to the Contact page (ContactForm, ContactInfo, FAQAccordion)
- `components/privacy/` - Privacy policy content
- `lib/` - Utility functions, constants, and validation schemas (`validations.ts`)
- `types/` - Shared TypeScript interfaces (`index.ts`)
- `public/` - Static assets and fonts (if any)
- `Dockerfile` & `docker-compose.yml` - Containerization configurations

## AI Integration Note
This project demonstrates how Gemma 4 (multimodal AI provided by Fireworks AI) can act as an automated dispatcher. By analyzing visual data from citizen reports, the platform significantly reduces the manual triage burden on municipal call centers.

## License
MIT
