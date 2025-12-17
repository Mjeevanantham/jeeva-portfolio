## Jeevanantham Mahalingam – Portfolio

A modern Next.js portfolio with smooth in-page navigation, a project details modal, and a subtle cursor-follow color glow. Includes a contact form with email delivery and a dedicated Resume page.

### Recent Work
- Currently developing a high-level ERP system for a US-based enterprise client (NDA protected)
- Diving into AI and creating Scriptly VS Code extension for AI agent hands-on work

### Features
- Anchor navigation with sticky header and smooth scrolling
- Mobile-friendly menu (hamburger) and responsive sections
- Projects modal: click a project to see lightweight details
- Subtle cursor-follow glow in the Projects grid
- Contact form posting to `/api/contact` (Nodemailer)
- Resume page at `/resume`

### Tech Stack
- Next.js 15 (App Router) + React 19
- Tailwind CSS 4
- Framer Motion for animations
- GSAP ScrollTrigger for scroll-based effects
- Zod for input validation
- Nodemailer for email delivery

### Getting Started
1. Install dependencies:
```bash
npm ci
```
2. Create `.env.local` with the following (Gmail app password recommended):
```bash
GMAIL_USER="youraddress@gmail.com"
GMAIL_APP_PASSWORD="your_app_password"
```
3. Run the dev server:
```bash
npm run dev
```
Open http://localhost:3000

### Scripts
- `npm run dev`: Start dev server
- `npm run build`: Production build
- `npm run start`: Start production server
- `npm run lint`: Lint the project

### Project Structure (key paths)
- `app/page.tsx`: Landing page and sections
- `components/projects-grid.tsx`: Project grid, modal, and glow
- `components/contact-form.tsx`: Contact form with validation and states
- `app/api/contact/route.ts`: Email sending endpoint
- `app/resume/page.tsx`: Resume page

### Accessibility & UX
- Focus-visible styles on interactive elements
- `scroll-mt` offsets to avoid sticky header overlap
- External links open in a new tab with `rel="noopener noreferrer"`

### Notes
- To provide a downloadable resume, add `public/resume.pdf`. A Download button can be enabled on the Resume page.

### License
MIT
