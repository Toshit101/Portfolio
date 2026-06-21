Phase 1 — Understand before you design

Never open Figma before you know who your user is and what problem you are solving
Write a persona based on real conversations, not assumptions — even 5 user interviews are enough
Persona must include name, age, goal, frustration, device preference, and tech comfort level
Write one problem statement before anything else: "This product helps [user] do [task] so they can [outcome]"
Map the happy path on paper or a whiteboard before designing any screen
Identify edge cases only after the happy path is clear, not before
If you cannot write the problem statement in one sentence, you are not ready to design


Phase 2 — Structure before style

Lo-fi wireframes first — gray boxes and placeholder text only, no colour, no real fonts, no icons
The wireframe's only job is to validate layout and information hierarchy
Get at least one person to review the wireframe before moving to hi-fi
A wrong layout caught at wireframe stage costs 2 minutes to fix — at hi-fi it costs 2 hours
Use the 8pt grid — every spacing value must be a multiple of 8
Build a token system before touching components: colour tokens, type scale, spacing tokens, border radius tokens
Build components before building screens — extract every repeating element into a reusable component
A component is not complete until all 5 states are designed
Never design Screen 2 before extracting all repeating elements from Screen 1


Phase 3 — Make it interact

Every interactive element needs 5 states: default, hover, active/pressed, disabled, loading
If any state is missing, the developer will invent it — and it will look inconsistent
Animation entry rule — use ease-out at 200–300ms (things entering the screen slow to a stop naturally)
Animation exit rule — use ease-in at 150–200ms (things leaving should move quickly)
Micro-interactions like hover and button press — 80–120ms only
Page transitions — 250–350ms maximum, anything longer feels sluggish on mobile
Never animate scrolling, drag, or resize — these must be 1:1 with user input, no easing
Always wrap animations in prefers-reduced-motion for accessibility
One choreographed animation moment beats ten scattered effects
Design skeleton screens for loading — never show a blank white page while content loads
Error messages go inline directly below the form field — never in a popup for validation errors
Empty states must have three things: an illustration or icon, a one-line explanation, and a primary CTA
Success feedback is mandatory after every user action — toast, checkmark, or inline confirmation
Never let a user action happen in silence


Phase 4 — Test and iterate

Run the 5-second test: show the design for 5 seconds, cover it, ask what they remember
If the user cannot name the page's purpose — the visual hierarchy has failed, not the user
Minimum tap target on mobile is 44×44px for every interactive element
Text contrast ratio must be at least 4.5:1 against its background (WCAG AA standard)
Every form field must have a visible label — placeholder text alone is not a label
Test on an actual mobile device, not just a Figma frame
Button copy must use action verbs — "Save draft" not "OK", "Send invoice" not "Submit"
Never convey information through colour alone — always pair with an icon, shape, or text label
Before every handoff, remove one element — if nothing can be removed, the design is still cluttered
Run a contrast check, mobile check, and tap target check before calling any design done


8pt Grid — complete rules

All spacing — margin, padding, gap, positional offset — must be a multiple of 8
Valid values: 4, 8, 12, 16, 24, 32, 40, 48, 56, 64px — nothing else
Component heights snap to the grid: 32px small, 40px medium, 48px large, 56px XL
Layout grid gutters: 16px on mobile, 24px on tablet, 32px on desktop
Side margins follow the same values: 16px mobile, 24px tablet, 32px desktop
Column widths are derived — they fill whatever space remains after gutters and margins are set
Line height must produce 8pt-compatible output — 16px text × 1.5 line-height = 24px per line
Border radius uses the same scale: 4px badges and pills, 8px standard components, 12–16px cards and modals, 9999px for full pills
4px is the only permitted off-8 value — use only for micro-gaps between tightly related elements like an icon and its label
Off-grid values like 10px, 15px, or 36px cause sub-pixel blur on high-DPI screens
Why 8 — every common screen density (1×, 1.5×, 2×, 3×) produces whole-number pixel values when multiplied by 8
If you find yourself reaching for 4px often, the layout is too dense


Design tokens — what to define before building

Colour tokens: primary, neutral, success, warning, danger — minimum 5 semantic groups
Each colour group needs at minimum: a background shade, a text shade, and a border shade
Type scale: at least 5 sizes — 11px, 13px, 15px, 18px, 22px — with matching line heights
Spacing tokens: name them by unit — space-1 (8px), space-2 (16px), space-3 (24px), space-4 (32px)
Never type a raw pixel value for spacing in code — always reference the token
Border radius tokens: sm (4px), md (8px), lg (12px), xl (16px), full (9999px)
Define all tokens before writing a single component — changing them later breaks everything


Component checklist — minimum states to design

Button: default, hover, active, disabled, loading
Input field: empty, focused, filled, error, disabled
Card: with image, without image, with badge, loading skeleton
Link: default, hover, visited, focus
Checkbox and radio: unchecked, checked, indeterminate, disabled
Every component must be tested in both light and dark mode if the product supports both


Typography rules

Never go below 13px font size anywhere on screen
Use a maximum of 2 typefaces in one product — one for headings, one for body
Use two font weights only in most UIs — regular (400) and medium (500)
Heading hierarchy must be visually obvious — H1, H2, H3 should look clearly different from each other
Line length (measure) should be 60–75 characters per line for body text — beyond that, reading becomes tiring
Always use sentence case — never ALL CAPS for body text, and use it sparingly even for headings


Visual hierarchy rules

One primary focal point per screen — the user's eye must know where to go first
Use size, weight, and spacing to create hierarchy — not colour alone
The most important action on screen gets the highest visual weight
Secondary actions should be visually quieter than primary actions
Never let two elements compete equally for attention — one must win


Accessibility rules

Contrast ratio: 4.5:1 minimum for normal text, 3:1 minimum for large text (18px+)
All interactive elements must be keyboard navigable with a visible focus ring
No information conveyed by colour alone — always pair with text, icon, or shape
All images need descriptive alt text
All form fields need visible labels, not just placeholder text
Minimum tap target 44×44px on touch screens
Animations must respect prefers-reduced-motion
Font size must never go below 13px — the browser default of 16px is a safe starting point


Senior designer's golden rules

Structure → Visual → Motion — always in this order, never reversed
If you cannot explain why an element is on the screen, delete it
Consistency beats creativity — familiarity makes users faster
Every pixel is a decision — accidental design always shows
Design systems pay back 10× in time saved during developer handoff
The happy path is 20% of what users experience — design the other 80% too
A design tool is not a design skill — knowing Figma shortcuts is not the same as knowing how to design
Show your design to someone who has never seen it before every major decision
The best design is the one the user never notices — they just accomplish their goal
Constraint reveals quality — the fewer elements you need to communicate an idea, the stronger the design