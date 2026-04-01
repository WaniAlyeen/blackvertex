# Black Vertex | Elite AI Automation Consultancy

## Project Overview
Elite AI consultancy website built with Next.js 14, TypeScript, Tailwind CSS, GSAP, and Supabase. The site features a cinematic premium aesthetic with dark backgrounds, electric cyan accents, and glassmorphic components.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Vanilla CSS for custom components)
- **Animations:** GSAP + ScrollTrigger
- **Database:** Supabase (Auth + Postgres + Storage)
- **Icons:** React Icons (Font Awesome)
- **Markdown:** React Markdown + rehype-highlight (Blog)

## Architecture & Conventions
- **Routing:** App Router (`/` for landing, `/blog` for news, `/admin` for CMS).
- **Styling:** 
  - Background: `#0A0A0A`
  - Accent: `#00D4FF` (Cyan)
  - Cards: `rgba(255,255,255,0.04)` with `backdrop-filter blur(12px)`.
- **Animations:** 
  - All GSAP animations MUST be wrapped in `gsap.context()` inside `useEffect`.
  - **CRITICAL:** Always use `ctx.revert()` in the cleanup function to prevent memory leaks and ScrollTrigger conflicts between page sections.
- **Performance:** 
  - Videos must be hosted on Cloudflare Stream/Vimeo (no raw MP4).
  - Use Next.js `Image` component for all static assets.

## Recent Updates & Fixes
- **Authentication:** Removed login button from Navbar; added a subtle "Admin Login" toggle in the Blog section.
- **Navigation:** Fixed broken anchor links on subpages by using absolute paths (e.g., `/#services` instead of `#services`).
- **Logic Fixes:** 
  - Renamed "Book Discovery Call" to "Contact Us" and wired to the CTA/Contact section.
  - Added `id="contact"` to the CTA section for scroll targeting.
  - Corrected placeholder copy in the Hero section.
  - Fixed `bgRef` type mismatch in the CTA component.
- **Infrastructure:**
  - Added Supabase Storage remote patterns to `next.config.mjs`.
  - Implemented `scrollbar-hide` utility in `globals.css` for clean mobile horizontal scrolling.

## Instructions for Future Models
1. **Design Integrity:** Maintain the "Cinematic Premium" feel. Avoid standard borders; use glassmorphism and subtle glows.
2. **GSAP Hooks:** When adding new sections, follow the `gsap.context()` pattern established in `Hero.tsx` or `Services.tsx`.
3. **Paths:** Always use absolute root-relative paths for Navbar links so they function correctly across both `/` and `/blog/[slug]`.
4. **Environment:** Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are present in `.env.local`.

---
*Maintained by Black Vertex Lead Developer*
