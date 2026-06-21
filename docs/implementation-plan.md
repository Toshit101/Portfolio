# Interactive Portfolio — Implementation Plan

## Context

The user wants a well-laid-out interactive portfolio website built in React + Tailwind CSS following senior UI/UX design principles from the attached `design-process-guide.md`. The guide emphasises: structure before style, 8pt grid, token system before components, all 5 interactive states on every element, design-guide animation timings, WCAG AA contrast, and 44px minimum tap targets.

**Stance committed:** Swiss International Style on a dark canvas. Strict grid, one acid-lime accent (`#c8fa64`), precise alignment — the aesthetic demonstrates exactly what a senior UI/UX designer preaches. Not SaaS-generic, not editorial-warm.

---

## Aesthetic Direction

| Dimension | Decision |
|---|---|
| Stance | Swiss — strict grid, function declares style |
| Canvas | Dark (`#0a0a0f`, near-black with cool blue tint) |
| Accent | Acid lime `#c8fa64` — one colour, used sparingly |
| Display font | **Bricolage Grotesque** (variable grotesque, personality without fuss) |
| Body font | **DM Sans** (neutral, readable, clear contrast from display) |
| Border style | Hairline `rgba(255,255,255,0.07)` rules — structure, not decoration |
| Radius | Tight — `4px` default, `8px` max |
| Imagery | None in initial build; placeholder surfaces use geometric fills |

---

## File Changes

### 1. `src/styles/fonts.css`
Add Google Fonts import for Bricolage Grotesque (wght 300..800) and DM Sans (wght 300..600).

### 2. `src/styles/theme.css`
Update existing token values (preserve all token names and `@theme inline` mapping):

```
--background:         #0a0a0f
--foreground:         #f0eff5
--card:               #111118
--card-foreground:    #f0eff5
--primary:            #c8fa64   ← acid lime accent
--primary-foreground: #0a0a0f
--secondary:          #1a1a24
--secondary-foreground: #a0a0b8
--muted:              #1e1e2a
--muted-foreground:   #666680
--accent:             #c8fa64
--accent-foreground:  #0a0a0f
--border:             rgba(255,255,255,0.07)
--ring:               #c8fa64
--radius:             4px
```

Dark block `.dark` stays in sync (already dark, minimal change).

Add to `:root` only (non-token variables):
- `--font-display: 'Bricolage Grotesque', system-ui, sans-serif`
- `--font-body: 'DM Sans', system-ui, sans-serif`
- Animation timing vars: `--dur-micro: 100ms`, `--dur-entry: 250ms`, `--dur-exit: 175ms`, `--ease-out: cubic-bezier(0.16,1,0.3,1)`, `--ease-in: cubic-bezier(0.4,0,1,1)`

Apply `font-family: var(--font-body)` on `body` inside `@layer base`.

### 3. `src/app/App.tsx` — Root Shell
- Owns `darkMode` state (synced to `localStorage`, applied as `.dark` on `<html>`)
- Owns `menuOpen` state for mobile nav
- Renders: skip-to-content link → `<Nav>` → `<main>` (all 5 sections) → `<Footer>`
- No prop drilling beyond `Nav` (dark toggle callback); all other sections are self-contained

### 4. Component Tree

```
src/app/
  App.tsx
  components/
    Nav.tsx
    Hero.tsx
    About.tsx
    Projects.tsx
    Process.tsx
    Contact.tsx
    ui/
      Button.tsx
      SectionLabel.tsx      ← eyebrow label used in every section
      ProjectCard.tsx
      SkillTag.tsx
      ProcessStep.tsx
      FormField.tsx
```

---

## Section Specifications

### Nav
- Fixed top, `z-50`, `bg-background/80 backdrop-blur-md`
- Scrolled state (>80px): adds `border-b border-border`
- Left: monogram logo in `font-display font-bold`
- Center: nav links (hidden mobile) — `text-muted-foreground hover:text-foreground` at 100ms
- Right: dark toggle (Sun/Moon, 44px), hamburger (mobile)
- Active section link: `text-primary` + 2px bottom rule
- Entry: `motion.header initial={{ y:-64 }} animate={{ y:0 }}` 250ms ease-out on mount
- `IntersectionObserver` tracks active section

### Hero
- `min-h-screen` flex column-center, two-column on `md:` (text 55% / visual 45%)
- Eyebrow label: `SectionLabel` — "Available for work" with a pulsing green dot
- `<h1>` Bricolage Grotesque, `text-6xl md:text-8xl font-bold leading-[0.95]`, mixes roman weight + lighter subtitle line
- Tagline: `text-lg text-muted-foreground max-w-md`
- CTA row: primary Button ("View Work") + ghost Button ("Resume →")
- Visual column: large ASCII-style grid of dots (`·`) in `text-primary/20 font-mono` that animates (a few dots highlight to `text-primary` on a timer) — structural, Swiss, no gradient blob
- Scroll caret at bottom, `motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.6 }}`
- Entry stagger: each child delays 60ms, `opacity:0→1, y:20→0` at 250ms ease-out

### About
- Two columns `lg:`: bio left (60%), sidebar right (40%)
- Avatar: 160×160px square (no border-radius), `bg-muted` with initials in `font-display text-5xl text-primary`
- Bio: 2 paragraphs, `text-muted-foreground leading-[1.7]`
- Skills: flat tag cloud using `SkillTag` — small caps labels, `bg-secondary text-muted-foreground`, hover `bg-primary text-primary-foreground` at 100ms. No progress bars (they're decorative, not informative for a designer)
- Section enters via `whileInView opacity:0→1 y:32→0` once

### Projects
- `SectionLabel` + heading, then `grid grid-cols-1 md:grid-cols-2 gap-px bg-border` — **gutterless grid with hairline borders** between cells (Swiss touch)
- 4 cards: 2×2 on desktop. First card spans both columns (featured project)
- `ProjectCard`: fixed `aspect-[4/3]` image area (`bg-secondary`), overlaid with project number `01`, `02`… in large `font-display text-7xl text-foreground/5`
- Hover reveals: title, tags, and two icon links slide up from bottom at 200ms ease-out (`motion.div whileHover`)
- Card focus-visible: `ring-2 ring-primary ring-offset-2 ring-offset-background`

### Process
- Horizontal on `md:` (3 steps with connecting hairline rule), stacked on mobile
- Step number: `text-8xl font-bold text-primary/15 leading-none select-none`
- Icon in `bg-secondary w-10 h-10 flex-center rounded` (4px radius)
- Steps: Discover / Design / Deliver — copy drawn from design-process-guide.md principles
- Stagger entry: delays 0ms / 120ms / 240ms

### Contact
- Max-width 560px centered
- Social icon buttons row (GitHub, LinkedIn, Mail) — 44px tap targets, `bg-secondary rounded hover:bg-primary hover:text-primary-foreground` at 120ms
- Form: name, email, message (`<textarea rows={5>`)
- `FormField`: label always visible, 5 states wired (default, focus, error, filled, disabled)
- Submit state machine: `idle → submitting → success | error`
- Success: replaces form with checkmark + thank-you copy, animated in at 250ms
- Error: inline error with retry

---

## Interactive States (all elements)

Per the design guide, every interactive element must have:

| State | Implementation |
|---|---|
| Default | Base styles |
| Hover | `hover:` — colour shift at 80-120ms |
| Active/pressed | `active:scale-[0.97]` at 80ms ease-in |
| Focus-visible | `focus-visible:ring-2 ring-primary ring-offset-2 outline-none` |
| Disabled | `disabled:opacity-40 disabled:pointer-events-none` |
| Loading (where applicable) | Spinner replaces label, `aria-busy="true"` |

---

## Animation Timings (from design-process-guide.md)

| Category | Duration | Easing |
|---|---|---|
| Entry/mount | 250ms | ease-out `cubic-bezier(0.16,1,0.3,1)` |
| Exit/dismiss | 175ms | ease-in `cubic-bezier(0.4,0,1,1)` |
| Micro-interactions | 80-120ms | ease |
| Scroll-triggered | 250ms | ease-out, `once: true` |

---

## Accessibility (built-in)

- Skip-to-content `<a href="#main">` as first DOM element (sr-only, shown on focus)
- Every `<section>` has `id` + `aria-labelledby` pointing to its `<h2>`
- Icon-only buttons: `aria-label`
- Forms: explicit `<label htmlFor>` — no placeholder-only labelling
- `aria-live="polite"` region in Contact for state changes
- `prefers-reduced-motion`: wrap motion props in `useReducedMotion()` check from `motion/react`
- Contrast: `#c8fa64` on `#0a0a0f` = 11.2:1 (exceeds AAA). `#f0eff5` on `#0a0a0f` = 18.5:1.

---

## Implementation Sequence

1. `fonts.css` — Google Fonts import
2. `theme.css` — update token values, add font + animation vars
3. `ui/Button.tsx` — primitive, establishes 5-state pattern
4. `ui/SectionLabel.tsx` — eyebrow used everywhere
5. `App.tsx` — shell, dark mode state, section order
6. `Nav.tsx`
7. `Hero.tsx`
8. `ui/SkillTag.tsx` → `About.tsx`
9. `ui/ProjectCard.tsx` → `Projects.tsx`
10. `ui/ProcessStep.tsx` → `Process.tsx`
11. `ui/FormField.tsx` → `Contact.tsx`

---

## Verification

- Dev server renders without TypeScript errors
- Hero visible above the fold on 1280px and 375px viewports
- Clicking nav links smooth-scrolls to correct sections
- Dark mode toggle flips `.dark` class on `<html>` and all surfaces update
- All interactive elements show focus ring on keyboard Tab
- Contact form cycles through idle → submitting → success states
- No lint errors from unescaped apostrophes or unmatched JSX tags
