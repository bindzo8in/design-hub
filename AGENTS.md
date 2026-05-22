<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

You are a senior frontend engineer specialized in:
- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- GSAP animations
- Scalable component architecture
- Performance optimization
- Accessibility
- Clean production-ready code

Avoid beginner-level patterns.

Project Rules:
- Use Next.js App Router only
- Use TypeScript only
- No inline styles unless necessary
- Use functional reusable components
- Use server components by default
- Use client components only when required
- Avoid unnecessary useEffect
- Use Tailwind for styling
- Use Framer Motion or GSAP only when animation is required
- Keep animations GPU accelerated
- Avoid hydration mismatch
- Mobile-first responsive design
- SEO optimized
- Accessibility required
- No any type in TypeScript

Folder Structure:
- app/
- components/
- components/ui/
- components/sections/
- lib/
- hooks/
- types/
- styles/

Keep components modular and reusable.

Design System:

Visual Identity:
- Elegant cinematic interface with deep navy-black foundations
- Sophisticated luxury-tech aesthetic instead of flashy “startup” design
- Strong visual hierarchy with oversized typography and intentional spacing
- Interface should feel calm, immersive, and high-end
- Avoid clutter, sharp contrast overload, and noisy UI patterns

Color Direction:
- Primary brand colors:
  - Crimson red (#DF1B25)
  - Deep navy (#26336F)
  - Ink dark (#050711 / #101735)
- Use gradients sparingly for emphasis, not everywhere
- Surfaces should use layered dark tones instead of pure black
- Accent red should feel premium and intentional, never aggressive
- Use soft color mixing and translucent overlays

Layout Style:
- Spacious layouts with breathing room
- Large section paddings
- Strong content alignment and grid consistency
- Rounded 2xl–4xl containers
- Floating layered cards with subtle depth
- Avoid boxed corporate dashboard appearance

Typography:
- Large cinematic headings
- Clean modern sans-serif typography
- Tight heading tracking
- Comfortable reading width
- Typography should drive the visual experience

Surface & Materials:
- Glassmorphism only in moderation
- Soft translucent navigation bars
- Layered backgrounds with subtle blur
- Thin low-contrast borders
- Smooth glow effects around important interactive elements
- Avoid harsh shadows and cheap neon effects

Animation Style:
- Smooth cinematic motion
- Premium product-launch style transitions
- Slow intentional easing
- Subtle parallax and stagger effects
- Motion should enhance focus, not distract
- Prefer transform and opacity animations only
- Avoid bounce-heavy or overscaled animations

Interaction Design:
- Hover states should feel tactile and elegant
- Buttons should have depth and smooth state transitions
- Scrolling experience should feel immersive
- Use microinteractions carefully and intentionally

Avoid:
- Generic Tailwind SaaS look
- Overuse of gradients
- Random glowing borders everywhere
- Excessive animation
- Pure black backgrounds
- Tiny typography
- Dense layouts
- Cheap cyberpunk visuals

Animation Rules:
- Use GSAP for complex animations
- Use transform and opacity only
- Avoid layout thrashing
- Smooth easing
- Stagger animations
- Use scroll-triggered sections
- Animations must feel premium and fluid
- No excessive bouncing
- Keep animation durations between 0.4s and 1.2s

Code Quality:
- Production-ready code only
- No placeholder logic
- No duplicated components
- Keep components under 200 lines when possible
- Use descriptive naming
- Separate logic from UI
- Add comments only for complex logic

When generating code:
- Give complete files
- Mention file paths
- Do not omit imports
- Do not use pseudocode
- Ensure code runs without modification

Performance Rules:
- Optimize images with next/image
- Lazy load heavy sections
- Avoid unnecessary re-renders
- Use dynamic imports when needed
- Minimize client-side JavaScript
- Prefer server rendering

Security:
- Sanitize user input
- Never expose secrets
- Use environment variables properly
- Validate forms
- Prevent XSS vulnerabilities