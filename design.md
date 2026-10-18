# Omanga Design System

**Reference:** claritybusinesstravel.com — audited live, 2026-08-07, via computed
styles and CSS custom properties at 1512px.

Everything in this document is derived from that audit. The only value carried
over from Omanga's previous system is the **brand colour, `#ae2448`**. Type
scale, spacing, grid, radius, elevation, motion and every component measurement
below replace what came before.

`styles/tokens.css` is the machine-readable form of this document. If the two
disagree, this document is wrong and should be corrected — not the stylesheet.

---

## 1 · Design principles

Seven observations explain why the reference feels polished. They are the rules
this system exists to keep.

1. **One heading weight.** Every heading on the reference — display through h6 —
   is weight 500. Not 300, not 600, and never bold. Hierarchy comes from size
   and space, never from weight.
2. **Two tracking values.** `0` for everything, `-0.03em` for headings at h4 and
   above. There is no third value and no positive tracking anywhere.
3. **Four line heights.** `1`, `1.1`, `1.3`, `1.5`, plus `1.2` reserved for the
   display and h1 roles. Eleven line heights is a system that was measured; five
   is a system that was designed.
4. **Everything is fluid.** Type *and* spacing are `clamp()`. There is not one
   breakpoint jump in either. Density tracks the viewport continuously, which is
   why the layout never looks momentarily wrong at an in-between width.
5. **Absolutely flat.** The reference ships zero `box-shadow` declarations.
   Separation comes from surface colour and hairline borders. Elevation is not
   part of this vocabulary.
6. **Generous, and consistently so.** 144px between sections, 40px between
   cards, 80px between feature columns at desktop. One rhythm value for every
   surface — light bands and dark bands get identical space.
7. **Headings are measure-capped.** The hero headline caps at **28ch**, section
   headings at **30ch**. This is the single most important rule for perceived
   quality: a headline that runs the full content column reads as a paragraph,
   not as a statement. The cap also owns the line count — the hero's is set to
   break at three lines, so where it folds is a decision rather than an accident
   of the container width.

---

## 2 · Typography

### Family

**Kantumruy Pro** — one family for the entire site. Headings, body, navigation,
buttons, form fields and footer all use it. There is no second family and no UI
face.

```
--font-sans: "Kantumruy Pro", Arial, sans-serif;
```

A variable font on the weight axis, self-hosted through `next/font/google`, so
one file covers every weight and no request reaches Google at runtime. Arial is
the fallback because it is metrically closer to Kantumruy Pro than the system
sans on any platform, which keeps layout shift near zero while the font swaps.

### Weights

| Token | Value | Use |
| --- | --- | --- |
| `--font-weight-regular` | 400 | All body copy, navigation, buttons, form fields, footer |
| `--font-weight-medium` | 500 | **Every heading**, display through h6 |
| `--font-weight-bold` | 600 | Inline `<strong>` only |

Three weights. 300 is gone — the previous display role used it and it is the
main reason the old hero read as thin rather than confident.

### Scale

All sizes are fluid between a 320px and a 1440px viewport.

| Role | Min → Max | Line height | Tracking | Weight |
| --- | --- | --- | --- | --- |
| `display` | 56 → 96 | 1.1 | −0.03em | 500 |
| `h1` | 40 → 64 | 1.2 | −0.03em | 500 |
| `h2` | 32 → 42 | 1.1 | −0.03em | 500 |
| `h3` | 30 → 40 | 1.3 | −0.03em | 500 |
| `h4` | 24 → 28 | 1.3 | −0.03em | 500 |
| `h5` | 22 → 26 | 1.3 | 0 | 500 |
| `h6` | 16 → 20 | 1.3 | 0 | 500 |
| `text-prose` | 22 → 28 | 1.5 | 0 | 400 |
| `text-large` | 18 → 20 | 1.5 | 0 | 400 |
| `text-main` | 16 → 18 | 1.5 | 0 | 400 |
| `text-small` | 14 → 16 | 1.5 | 0 | 400 |

[ADDED, 2026-08-27] `text-prose` — a fourth body size, for prose that is the
subject of its own band rather than an introduction to one. One caller: the
About page's Our Story panel, whose spec requires the block "set large — close
to sub-headline scale, far larger than normal body copy", with emphasis carried
by colour rather than weight.

The gap it fills is real rather than a caller wanting a bespoke size. `text-large`
at 18 → 20 is two pixels off the body default and does not read as large; every
role that does read as large is weight 500 and tracked, which is heading
treatment applied to a paragraph. Nothing in the scale expressed body copy that
is the largest thing in its section, because the reference audited in § 0 has no
such band.

Nothing else moves to accommodate it. Line height is 1.5, the value every body
role already takes — not an intermediate 1.4, which would cost § 1 principle 3
its closed set of line heights. Tracking is 0 and weight is 400, exactly as the
table above assigns to body copy. It is the only role at that size which is not
a heading.

`display` is an emphasis role, not a size the page reaches for casually. It
belongs to the closing conversion band and nowhere else. The hero uses `h1`.

[CHANGED, 2026-08-23] Display was 64 → 112, the reference's own figure. Reduced
because at 112 the closing band's heading was the largest thing on any page by a
wide margin and read as shouting rather than as emphasis — and the band now
closes four pages rather than one. It still clears `h1` at 40 → 64 comfortably,
so the role keeps its job.

Paragraphs carry `margin-block: var(--space-4)` — the reference sets text
margins from its spacing scale rather than from a typographic default.

### Measure

| Cap | Value | Applies to |
| --- | --- | --- |
| Hero headline | **28ch** | The page's single `h1` |
| Section heading | **30ch** | Every `h2` |
| Body copy | 70ch | Standalone paragraphs |
| Feature copy | 45ch | Copy inside a column or card |

`ch` units, not pixels. The cap has to track the font size it is applied at, and
a pixel value silently stops being 20 characters the moment the clamp moves.

The hero cap also owns the **line count**. It is set so the headline breaks to
three lines at the wide end and folds to four and five as the column narrows —
28ch is the longest line of this headline's best three-line split. The cap
engages at ~1097px against a 1424 content column, so the break is a decision
rather than a coincidence of the viewport. It is wider than the reference's 20ch
only because Omanga's headline is 71 characters against theirs at 52; the `h1`
scale itself is unchanged. Shorten the copy and bring the cap back toward 20ch.

---

## 3 · Spacing scale

Eight steps, every one of them fluid between 320px and 1440px.

| Token | Min → Max | Relationship it expresses |
| --- | --- | --- |
| `--space-1` | 6 → 8 | Icon to label; inside a pill |
| `--space-2` | 10 → 12 | Adjacent controls; nav button group |
| `--space-3` | 14 → 16 | Rows in a list; grid gutter; **heading to its body copy** |
| `--space-4` | 20 → 24 | Card padding; section heading to intro; text margins |
| `--space-5` | 28 → 32 | Card art to copy; block to block inside a card |
| `--space-6` | 32 → 40 | Card grid gap; heading block to content block |
| `--space-7` | 36 → 48 | Major intra-section gap |
| `--space-8` | 40 → 64 | Feature column gap; largest gap in the system |

A fixed 64px gap is 20% of a 320px screen and 3% of a 1920px one. Making every
step fluid is what stops mobile layouts feeling cramped between elements while
being over-spaced around them.

**Nothing outside this scale.** No arbitrary values, no raw Tailwind numeric
steps in section markup, no margins on children — spacing between siblings comes
from the parent's `gap`.

---

## 4 · Section rhythm

Four steps. Applied as `padding-block` by the `Section` primitive; no component
sets its own vertical rhythm.

| Token | Min → Max | Use |
| --- | --- | --- |
| `--section-small` | 48 → 80 | A strip rather than a section — partner logos |
| `--section-main` | 64 → 144 | **Every normal band on the page** |
| `--section-large` | 88 → 160 | The closing conversion band, only |
| `--section-page-top` | 112 → 224 | First band below a transparent header |

**Rhythm does not vary by surface.** Light and dark bands take the same value.
Pairing more space with the dark surface was an Omanga invention that made light
sections read as tighter than the reference in exactly the places the reference
is most generous.

---

## 5 · Grid and containers

```
--site-width      : 95rem                                        /* 1520 */
--site-margin     : clamp(1rem, 0.42857rem + 2.857vw, 3rem)      /* 16 → 48 */
--site-columns    : 12
--site-gutter     : 1rem                                         /* 16 */

--container-main  : calc(min(var(--site-width), 100%) - var(--site-margin) * 2)
--container-small : 10 of 12 columns
```

- Outer page width caps at **1520**; the content column therefore caps at
  **1424** and centres above that.
- The page margin is the *only* horizontal padding on the page. One fluid value,
  not four breakpoint steps — four steps means four widths at which the
  horizontal rhythm is momentarily wrong.
- 12 columns with a 16px gutter, for the rare asymmetric section. Most layouts
  are equal-column grids and use the spacing scale for their gap.

### Grid gaps

| Layout | Gap |
| --- | --- |
| 3-up card grid | `--space-6` (32 → 40) |
| 2-up feature split | `--space-8` column (40 → 64), `--space-7` row |
| List rows inside a card | `--space-3` (14 → 16) |
| Button group | `--space-4` (20 → 24) |
| Icon to label | `--space-1` (6 → 8) |

---

## 6 · Border radius

Four values. Named by size, because the reference applies them by size.

| Token | Value | Use |
| --- | --- | --- |
| `--radius-xs` | 4px | Form fields, small inline chips |
| `--radius-sm` | 8px | **Cards** — every card on the page |
| `--radius-md` | 16px | Panels, media plates, large surfaces |
| `--radius-pill` | 100vw | Buttons, badges, tab pills, avatars, dots |

The previous system's `chip` (12) and `device` (50) are removed. Neither exists
in the reference and both were one-off values dressed as tokens.

---

## 7 · Elevation and shadows

**There are none.**

The reference declares zero `box-shadow` values across its entire stylesheet.
Depth is communicated by:

- **Surface colour** — white page, `#f6f6f6` light card, `#161717` dark band,
  `#2d2e2e` dark card.
- **Hairline borders** — `rgb(22 23 23 / 0.1)` on light, `rgb(255 255 255 / 0.1)`
  on dark. 1px, never 0.5px: sub-pixel borders render inconsistently across
  devices and disappear at some zoom levels.

One `box-shadow` survives, and it is not an elevation: `--shadow-rail-break`
paints a ring of the page surface around the timeline marker so the rail behind
it is broken rather than drawn through it. A border would grow the dot; an
outline would not follow the radius on every engine.

Do not reintroduce elevation. If a card needs to separate from its background,
change its surface.

---

## 8 · Colour

Omanga's brand is preserved. Every neutral matches the reference.

### Brand

| Token | Value | Use |
| --- | --- | --- |
| `--color-brand` | `#ae2448` | Primary button fill, active states, the conversion band, focus ring |
| `--color-brand-hover` | `#a02142` | Brand fill on hover where inversion is not available |

Brand is reserved for interaction and emphasis. It is never a surface behind
long-form text except the closing conversion band.

### Neutrals

| Token | Value |
| --- | --- |
| `--color-ink` | `#161717` |
| `--color-ink-elevated` | `#2d2e2e` |
| `--color-ink-muted` | `#666563` |
| `--color-surface-page` | `#ffffff` |
| `--color-surface-light` | `#f6f6f6` |
| `--color-border-hairline` | `rgb(22 23 23 / 0.1)` |
| `--color-border-subtle` | `rgb(255 255 255 / 0.1)` |

### Contrast floor

Every text/background pair clears WCAG AA — 4.5:1 for body, 3:1 for large text
and UI boundaries. Secondary copy is expressed as 80% opacity of the current
colour, never as a separate grey, which keeps it legible on both surfaces
without a second token.

---

## 9 · Components

### Buttons

| Property | Primary / Secondary | In-navigation |
| --- | --- | --- |
| Padding | 16px 24px | 12px 16px |
| Font | `text-main` (16 → 18), weight 400 | 16px, weight 400 |
| Line height | 1 | 1 |
| Radius | pill | pill |
| Icon gap | `--space-1` | `--space-1` |
| Min hit area | 44 × 44 | 44 × 44 |
| Transition | `border-color, color, background-color` 200ms | same |

Buttons are **not bold and not small**. The reference sets them at body size in
regular weight — a 14px semibold button reads as a form control, an 18px regular
pill reads as an invitation.

**Hover is an inversion, not a tint.** The primary fill goes to `--color-ink`
with a light label; the secondary's transparent fill goes to `--color-ink` with a
light label and its border disappears into the fill. Both variants land in the
same place on hover, which is what makes a button group feel like one control
set.

Buttons own no layout. Width is the parent's decision.

### Cards

- Padding `24px 24px 32px` — more at the foot than the head, so the copy block
  does not sit flush to the bottom edge.
- Radius `--radius-sm` (8px).
- No border on a filled card; a hairline on a card that matches its background.
- No shadow, no scale on hover, no different padding for emphasis. **Emphasis is
  a border.**
- Art box ratio **3:2**. A square art box is 33% taller at the same width and is
  what makes cards read as tall and their copy as cramped.
- Card is `flex-column` with `justify-content: space-between`, so art sits at the
  top and the whole copy group sits at the bottom. Cards in a row are equal
  height with actions aligned across the row.

### Navigation

- Height **64px**, sticky.
- Opaque white at all times, with a 1px hairline bottom rule.
- Links at `text-main` (16 → 18), weight 400. **Not 14px.** The 2026-08-07 audit
  of the reference read this size, a pass at `text-small` was tried, and it was
  reverted. Spacing is what was wrong, not the type.
- **No gap on the link row.** Each link carries `--space-3` of padding-inline,
  so adjacent labels sit 28 → 32 apart and every pixel of that distance is
  inside a target. The reference's nav list sets no gap either. The stacked
  mobile panel does use a `--space-3` gap — full-width rows have no horizontal
  padding to borrow.
- Button group gap `--space-2`.
- **Hover:** label to brand at weight 500, and a 3px rule in `currentColor`
  slides in from the left over `--duration-underline` (250ms). The current page
  holds that same rule at full width, drawn from `aria-current` rather than a
  parallel class.
- The label reserves its weight-500 width at rest. Kantumruy Pro is variable on
  the weight axis, so a link that bolds on hover without a reservation widens
  and pushes the rest of the group sideways.
- Mobile panel opens and closes in 200ms.

[CHANGED, 2026-08-23] Only the spacing model moved. The link gap was `--space-6`
from the 2026-08-07 audit; it is now padding on the link and no gap at all,
which is how the reference's own nav is built. Type size was briefly taken to
`text-small` in the same pass and put back — recorded because the "Not 14px"
note above has now been tested rather than merely asserted.

### Footer

- `--section-main` rhythm, same as any other band.
- Brand column then equal link columns, `--space-6` gap.
- Column headings at `text-small` weight 500; links at `text-small` weight 400.
- Legal row separated by a hairline, `--space-6` above it.

### Form fields

- `--radius-xs`, 1px hairline border, `--space-3` padding.
- Label above the field at `text-small`. Placeholder is never the label.
- Focus takes the standard ring; the border is not the focus indicator.

### Icons

16, 24 or 32. Nothing between. Stroke inherits `currentColor`. Decorative icons
are `aria-hidden`; an icon-only control carries a visually hidden label.

---

## 10 · Breakpoints and responsive rules

| Name | Min width |
| --- | --- |
| `tablet` | 768 |
| `desktop` | 1024 |
| `wide` | 1440 |

Three named breakpoints. Tailwind's `sm`/`md`/`lg`/`xl` defaults must not appear
in section markup — mixing two breakpoint vocabularies is how a layout ends up
changing at 640px for no design reason.

Because type and spacing are fluid, breakpoints only ever change **layout**:
column counts, direction, and visibility. They never change a font size or a
padding value.

### Rules

- **320px is the floor.** No horizontal scroll, and the 200%-zoom reflow case
  (WCAG 1.4.10) must survive.
- Every multi-column pattern collapses to one column, in DOM order. There is no
  `order` property anywhere in the system — reordering breaks reading order.
- 2-up card grids persist at tablet; 3-up and 4-up wait for desktop, so cards
  never get squeezed below a readable width at 768.
- Buttons stack full-width below tablet within a capped group, so the pair is one
  size on every device rather than growing with the viewport.
- Images declare `sizes` accurately. The hero is the one `priority` image.
- Long unbroken strings wrap rather than forcing horizontal scroll.

### Verification widths

320 · 375 · 390 · 430 · 768 · 1024 · 1280 · 1440 · 1920

---

## 11 · Motion

| Token | Value |
| --- | --- |
| `--ease-standard` | `cubic-bezier(0, 0, 0.2, 1)` — hover, focus, state |
| `--ease-entrance` | `cubic-bezier(0.39, 0.575, 0.565, 1)` — outSine, reveals |
| `--ease-dropdown` | `cubic-bezier(0.075, 0.82, 0.165, 1)` — outCirc, panels |
| `--duration-standard` | 200ms — hover, focus, fill and border |
| `--duration-emphasis` | 300ms — panel change, menu, accordion |
| `--duration-entrance` | 500ms — one-shot reveal on intersection |

### Principles

1. **Transform and opacity only.** Never height, width, top or left.
2. **Entrances are one-shot on intersection**, never scroll-linked. Reveal from
   `translateY(40px)` + `opacity: 0`, held 200ms after trigger, staggered 80ms
   between siblings.
3. **Motion never gates content.** Every animated element is authored so that if
   the animation never runs — no JS, slow network, blocked script — the content
   is fully readable. Elements are visible by default and only *animate* once an
   observer opts them in.
4. **`prefers-reduced-motion` removes entrance, slide and counting motion**,
   holds the final state, and freezes looping animation on frame one. Global, so
   a new component cannot forget it.
5. Hover states are colour transitions at 200ms. Nothing lifts or shadows on
   hover, and nothing scales **except a rule sliding into view** — the nav
   link's underline is drawn at full width and revealed with `scaleX`, which is
   the one sanctioned transform on hover and the only reason
   `--duration-underline` exists. It moves a 3px rule, not a box: no text is
   scaled and no element changes the space it occupies.

---

## 12 · Focus

One ring, identical across buttons, links, tabs and form fields. Never removed.

```
outline: 2px solid var(--focus-ring-color);
outline-offset: 2px;
```

Applied on `:focus-visible`, so pointer users do not get a ring on click and
keyboard users always do. Under forced colours the ring switches to the OS
`Highlight` colour.

### The ring's colour follows the surface

Width, offset and geometry are identical everywhere. Only the colour changes,
and it changes for the same reason text colour does — a foreground has to stay
legible against the surface behind it.

| Surface | Ring | Contrast |
| --- | --- | --- |
| light | `--color-brand` | 6.70:1 |
| dark | `--color-on-dark` | 18.10:1 |
| brand | `--color-on-dark` | 6.70:1 |

`Section` sets this from its `tone`; the header, footer and hero set it from
their own surface. **No component overrides it.** A single brand ring on every
surface fails the 3:1 non-text floor on dark (2.73:1) and is entirely invisible
on the brand band (1.00:1) — which is where the primary conversion control
lives.

---

## Blog, FAQ and brand signals (2026-10-09)

Goal: rank for non-brand searches and strengthen the bare brand query "omanga",
which is dominated by an unrelated public figure.

- **Blog** at `/blog` and `/blog/[slug]`. Posts are typed modules in
  `content/blog/posts/`, registered once in `content/blog/index.ts`; the index,
  static params and sitemap all read that list. Article bodies reuse the legal
  block model and renderer — one long-form prose system, not two.
- **Titles end in "| Omanga"** on every article so the brand name is attached
  to each result. Product-page titles stay short for sitelinks.
- **FAQ** bands on Payments and Insurance, dark, between the light partners
  strip and the brand CTA. Answers only restate approved copy. Native
  `details`/`summary`; answers are plain strings so the visible text and the
  `FAQPage` schema are identical.
- **Schema**: `BlogPosting` (author and publisher are the organisation — no
  invented authors), `FAQPage`, and a three-level breadcrumb for articles.
  Organisation `sameAs` carries the client-supplied Instagram URL.
- **Footer** shows Instagram only. LinkedIn, X and Facebook stay absent until
  their URLs are supplied.
- **Review before launch**: articles and FAQs are drafted, not from the approved
  copy document. Each module carries a `[VERIFY]` note on what needs checking.
- **Blog images** (Mobbin refs: Assembly, Codecademy, Etsy, Uxcel, Revolut,
  Hashnode): newest post as a featured card, image beside text from tablet;
  the rest as image-on-top cards; cover image under each article's title block;
  "More from the Omanga blog" row at the foot. Covers are 4:3 because the
  covers are requested from the Unsplash CDN pre-cropped to 4:3 around faces
  (`fit=crop&crop=faces`). Each cover is also the article's `og:image` and
  `BlogPosting.image`. Photos are free Unsplash images, credited in a caption
  under the cover; `images.unsplash.com` is the only allowed remote host.
- **Mobile menu "Company"** (2026-10-09, on instruction): now a tap-to-expand
  disclosure (`MobileNavGroup`) matching the desktop dropdown, replacing the
  flattened heading + links. Opens by default on About/Contact. Collapsed links
  are `inert`; height animates via grid-rows 0fr→1fr.
- **Article layout** (2026-10-09, on instruction): title through closing action
  sit in one centred 70ch column (`measure-body`, `mx-auto`); the related row
  breaks out to the container width.

## Home v2 preview (2026-10-09)

A second home page, first built as a preview route beside the live one. The
preview route was deleted on 2026-10-09; the v2 components and
`content/home-v2.content.ts` remain so the work can continue. Sections not yet
on `/` (hero, partners, products, features, statement, coverage, collage) are
unused until they are placed.

- **Layouts** are the picks from `design-lab/home-layouts.html`, each a Mobbin
  reference: N1 header, H1 hero, T3 partners, P1 products, F2 features,
  B3 statement, S4 steps, C3 coverage, W1 comparison, R5 collage, Q1 FAQ,
  X1 closing panel, Z3 footer. Insurance plans skipped.
- **Header and footer** are the site's existing ones. N1 and Z3 match what is
  already shipped closely enough that rebuilding them would only fork the chrome.
- **3D objects** load from `public/3d/web` (512px WebP, committed). The 2048px
  PNG masters in `public/3d` are git-ignored (65 MB) and kept locally. Always `alt=""`: each one sits beside the text it stands for.
  The `card.png` virtual card is not used anywhere, because of the no-card rule.
- **New tokens**: `--color-blush`, `--color-blush-strong`, `--color-brand-deep`,
  sampled from the 3D set. Crimson panels use a brand → brand-deep gradient so
  they share the objects' shading.
- **New motion**: `animate-float-3d`, a slow 6s bob, transform only, off under
  reduced motion. A deliberate exception to "no continuous decoration", limited
  to the 3D objects.
- **Copy** reuses the approved content modules. Lines marked [NEW] in
  `content/home-v2.content.ts` (hero headline, collage heading, FAQ help line)
  need sign-off. The collage has no testimonials because none exist yet.
- **Typography** is unchanged on purpose; it is the next decision.
- **Going live**: place the remaining v2 sections in `app/(redesign)/page.tsx`
  (keep its metadata and JSON-LD), then remove old home sections nothing imports.
- **Partly live (2026-10-09)**: on request, four v2 sections now render on the
  live home page `/`: How it works (S4), Why Omanga (W1), a new FAQ (Q1) and
  the closing panel (X1). The rest of `/` is still the current design. The old
  `HowItWorks`, `WhyOmanga` and `CTA` components are no longer used by `/` but
  are kept until the other pages are checked for them.
- **Hero, take 2 (2026-10-09)**: replaced H1 with a wise.com-style hero on
  request. Blush band, huge uppercase headline (Kantumruy 700 until typography is
  picked), one button, then a Payments card and an Insurance card overlapping the
  band edge. Each card ends in a working widget: wallet accounts (the same sample
  balances as the Payments page drawer) and a Silver/Gold/Diamond picker reading
  prices from `insurance-plans.content.ts`. The headline "Pay and stay covered
  across Africa" is [NEW] copy.

---

## Addendum · 2026-10-10 · Display face for flood heroes

The payments hero moved to Wise's flood layout (Y1), then the same day to Wise's
"phone over traveller photo" (Y6, white band, normal header).
Its headline needs a face as heavy as Wise Sans, and Kantumruy Pro tops out at 700.

- **`--font-display`** = Archivo (variable, `wght` 100–900, `wdth` 62–125), vendored
  at `config/fonts/archivo-latin-wdth-variable.woff2`. Used at 900, `font-stretch: 88%`,
  uppercase, `-0.02em` tracking, line height 0.9.
- Headlines only. Body, UI and every other heading stay on Kantumruy Pro, so § 1's
  "one heading weight" rule now has this one exception.
- The phone in that hero is the app's real home screen rebuilt in HTML
  (`components/payments-v2/AppHomeMockup.tsx`) from the mobile app's source, not a screenshot.

## Addendum · 2026-10-10 · Shared closing sections, static 3D

- `WhyOmanga`, `Faq` and `CTA` (components/sections) now render the home page's
  W1 / Q1 / X1 designs on every page; pages pass only their own copy. Home, About,
  Get Started, Contact, Plans, Payments and Insurance all close Why → FAQ → CTA.
  Pages without their own copy use home's (Plans uses Insurance's).
- The FAQ "Can't find your answer? Contact us" line is `FAQ_HELP` in `site.content.ts`.
- 3D objects never animate. `Object3D` has no `float`/`delay`; the `float-3d`
  keyframes are deleted.

## Addendum · 2026-10-10 · Typography F4 (supersedes § 2's family and weights)

Picked from `design-lab/typography.html`; research in `design-lab/type-and-copy-research.md`.

- **Inter** (`--font-sans`): body, UI, navigation, buttons, forms, footer, figures.
- **Manrope** (`--font-heading`, also `--font-display`): display, h1, h2, h3 roles
  and any bare h1/h2, at **800**. Applied by a role rule in `typography.css`, so
  call sites still write `font-sans text-h2`.
- h4–h6 roles: Inter **600**. Buttons: Inter **600**. Body: Inter 400.
- Kantumruy Pro and Archivo are removed. Fraunces stays for the wordmark only.
- Both faces are vendored variable woff2 in `config/fonts/` (no build-time fetch).

## Addendum · 2026-10-10 · Home services as a tilted deck (K5)

`components/sections/Services` is now a sticky "hand of cards": three light,
brand-tinted cards (blush `#FBE8EE`, apricot `#FDEBDD`, pale gold `#FBF1DA`),
each tilted 1–2.5°, with a large free-standing 3D object (wallet, exchange,
medical kit) instead of a photo. Cards are `sticky` under the header and stack
as you scroll — CSS only. Heading shortened to "From funding before you fly to
care mid-trip".

## Addendum · 2026-10-14 · Home services as photo cards (Samara)

Replaces S1; the 3D illustrations leave this section on the owner's instruction.
After Samara on Mobbin (29d6b6a5). Three tall full-bleed photo cards (4:5 on
mobile, 3:4.2 from tablet), each card is the link. Top-left, two white lines of
the same size: the heading at 75% then the action with an arrow. A short black
scrim (55% to 0 over the top half) keeps the text at AA. No body copy on screen;
it stays in `services.content.ts`. Photos: `/service-spend.jpg`, Unsplash
8Nppe0yLmn8 (omid armin, banknotes) for Currencies, `/service-insurance.jpg`.
A round of minimal text-only options is in `design-lab/services-minimal.html`.

## Addendum · 2026-10-14 · Home services as label-tab cards (S1)

Replaces K5. Picked from `design-lab/services-grid.html` (after Anchor on Mobbin,
1ade62cd). Three tall flat cards in a row (blush, crimson, ink; one column below
desktop), approved body copy at the top, the 3D object large and cropped by the
card's right edge, and a label tab (Payments, Currencies, Insurance) that
overhangs both card edges in a sibling card's colour and is the card's link.
Same day, on the owner's note that Anchor's cards are not plain: each card's lower
half got a full-bleed scene (bands, stripes, a second object). Judged too much,
so it is now one angled plane a tone deeper than the card, with the object
standing on it. Text stays on the flat top half.
No sticky behaviour. The service headings stay as visually hidden `h3`s; the tab's
accessible name is "<tag>, <action label>". New `tag` field in `services.content.ts`.

## Addendum · 2026-10-10 · Home copy and type scale review

Approved in `design-lab/home-copy.html`. Type scale now: display 48→88 (lh 0.98,
−0.035em), h1 40→64 (1.05), h2 30→44 (1.1, −0.025em), h3 24→30 (1.2, −0.02em),
h4 20→22 (1.3, −0.01em), h5 18→20, h6 16→17, large 18→20 (1.55), main 16→18 (1.6),
small 14 (1.45, +0.005em), button 16. Home copy rewritten to the rules in
`design-lab/type-and-copy-research.md` (≤ 8-word headings, ≤ 25-word sentences,
verb + noun sentence-case buttons, no unproven absolutes). Hero headline unchanged
(left undecided). The Ubuntu line is removed from the shared closing CTA.

## Addendum · 2026-10-10 · Site-wide copy pass

All marketing pages (Payments, Insurance, Plans, About, Get Started, Contact,
footer) rewritten to the same rules as the home review, without per-line picks,
on the owner's instruction. Facts, prices and plan data unchanged. SEO: keyword-
bearing H1/H2s and meta descriptions (140–160 chars, with a call to action), FAQ
questions phrased as searches. Page titles kept as the short sitelink labels set
on 2026-10-07, except Plans, which already carried a long title. Nav order is now
Home, Payment, Insurance, Plans.

## Addendum · 2026-10-11 · Blog SEO workflow (question-led posts)

Process, on the owner's instruction: find a real question on AnswerThePublic,
answer the questions Claude asks about Omanga's own experience (by voice is
fine), then write the post from those answers. Aim for two posts a week.

- Research: "travel to nigeria" on AnswerThePublic in four markets: UK, US,
  Canada, Ireland (2026-10-11). Monthly volume: US 720, Canada 110, UK 140 for
  "travel to nigeria from uk". Topics, ranked by how many markets ask them:

  | Topic | UK | US | CA | IE | Example questions |
  | --- | --- | --- | --- | --- | --- |
  | What dollars are worth | ✓ | ✓ | ✓ | ✓ | Is $20 / $100 / $200 / $500 a lot in Nigeria? How far does $100 go? Is Nigeria expensive for tourists? How much does a meal cost? |
  | Safety | ✓ | ✓ | ✓ | ✓ | Is it safe to travel to Nigeria now? Which part of Nigeria is the safest? |
  | Entry requirements | ✓ | ✓ | ✓ | – | Do I need a visa? Can I enter without the yellow fever vaccine? What do I need to travel from Canada / the USA? |
  | Expired Nigerian passport | ✓ | ✓ | ✓ | – | Can I travel to Nigeria with an expired passport? (UK 90, US 50, CA 40/mo) |
  | Travel ban 2026 | – | – | ✓ | ✓ | Will Nigeria have a travel ban in 2026? |
  | Insurance for Nigeria | – | ✓ | ✓ | – | Which travel insurance providers cover trips to Nigeria? (AI prompts) |

- Published 2026-10-11: "How far does $100 go in Nigeria?"
  (`/blog/how-far-does-100-dollars-go-in-nigeria`). On instruction, it
  *replaces* "How to pay in Nigeria as a visitor" rather than adding a fourth
  post. That post was chosen because it covered the same ground: two pages on
  one topic would compete with each other in search. Its cards/cash/rate
  advice is folded into the new post, and the old URL 301s to it
  (`next.config.ts` `redirects`). Prices are researched from dated 2026 Lagos
  sources (listed in the module header), since the owner asked for local
  research instead of interview answers.
- Voice for question-led posts: one person talking to another. Second person,
  scenes the reader recognises, honest about trade-offs. No invented anecdotes.
- Post queue: 2) "What do you need to travel to Nigeria?": visa, yellow fever,
  insurance and money (Insurance). Safety stays an FAQ that links to live
  government advice and is not given its own post, because Omanga can't vouch
  for it.
- Existing posts: each FAQ now answers one of these questions, and each post
  has `updatedDate` 2026-10-11 so `dateModified` updates in the schema.
- Prices and rates in posts come from the owner's interview answers, never
  estimated.

## Addendum · 2026-10-11 · SEO audit response (Veritas scan)

- **Not indexed** was the root cause of the "not scored" result, not a site
  defect: robots, sitemap, `index, follow` and canonicals were all correct. The
  owner has since submitted the site to Google.
- **Page titles**: Payments → "Multi-Currency Travel Wallet for Africa | Omanga",
  Insurance → "Travel Health Insurance for Africa | Omanga". This reverses the
  2026-10-07 short sitelink labels: with no rankings there are no sitelinks, and
  the audit's top gaps were "travel wallet" (~4,400/mo), "multi currency wallet"
  and "travel insurance africa". Home keeps the brand line.
- **Alt text (37 missing)**: not changed. These are the decorative 3D objects,
  which have `alt=""` on purpose (§ Home v2). The scanner counts empty alt as
  missing.
- **/contact?enquiry=talk duplicate title**: not changed. That URL already has a
  canonical tag pointing to /contact.
- **Mobile LCP 2.9s**: the lab figure is Lighthouse's simulated estimate. With
  real devtools throttling, the production build measured LCP 1.7s. Two real
  fixes anyway: the hero source was re-exported from a 5.4MB 4096px file to a
  395KB 2560px JPEG (`/hero.jpg`), which removes a ~3s cold encode after each
  deploy, and Lenis now loads on idle and is skipped on touch-only devices.
  Field data (Vercel Speed Insights, later CrUX) is the measure to watch.

## Addendum · 2026-10-14 · Home UX copy pass

Audit of the home page against the UX writing skill (Material guidance).
Facts confirmed by the owner: **health cover applies in Nigeria only**; the
wallet works in 50+ African countries; audience is anyone visiting Nigeria
(tourists, Nigerians abroad); **transfers cost ₦20**; the wallet is free to open.

Rules applied:
- "50+ countries" describes the wallet only. Never pair it with health cover.
- Name the provider (Phillips HMO), not "established Nigerian providers".
- Name the fee (₦20) and the rate (mid-market) instead of "no hidden fees".
- One noun per thing in body copy: **wallet**, **health cover**, **plan**.
  Product names (Omanga Payment Solutions, Omanga Holiday Insurance) stay as
  titles only.
- Home has one primary action: "Open your free wallet". Insurance links read
  "Compare health plans" (/plans) or "Explore health cover" (/insurance).
- British spelling throughout.

Shared modules changed, so these pages pick up the fixes too: Why Omanga
(every page), the insurance and payments FAQs, the nav label "Payments", the
footer paragraph.

### Copy to-do (blocked on facts)

- [ ] Is ₦20 the only wallet fee? Is converting USD/GBP/CAD to naira free?
      Then update the payments FAQ "What fees does Omanga charge?" and Why Omanga.
- [ ] Does ₦20 apply to all transfers, or only to bank accounts? The FAQ
      currently says Omanga-to-Omanga transfers are free (older approved claim).
- [ ] Health cover waiting period: "activate in about five minutes" is not the
      same as cover starting. Confirm, then restore that FAQ to the home page.
- [ ] Which six currencies does the wallet hold? The rate card mock shows KES
      and GHS.
- [ ] "Open your free wallet" will change when the native app launches (the
      PWA is being replaced). Update `HERO_PRIMARY_ACTION` and `WALLET_URL`.
- [x] Home title is now "Omanga: Travel Money and Health Insurance for
      Nigeria" (owner approved). `SITE_TAGLINE` stays as the schema.org name.
- [ ] Re-check UK volumes for "travel money nigeria" when OpenSEO credits are
      topped up. US volume is 0; it is kept as a UK term for UK visitors.
- [ ] Zira's role in the partner strip is unexplained.
- [x] Payments, Insurance, Get Started pages rewritten to the same rules
      (2026-10-14). Shared `ctaContent` is now "Land with everything sorted".
- [ ] Hospital categories per plan: plan data says Silver = Category A,
      Gold = A+B, Diamond = A+B+C; the old FAQ and blog post say Silver and
      Gold both get A+B. Confirm which is right.
- [x] 24/7 contact centre confirmed by the owner (2026-10-14).
- [ ] "No commitment, cancel any time" for health cover is published but not
      owner-confirmed. Bigger conflict (2026-10-15): the Paystack checkouts are
      recurring monthly subscriptions ("charged monthly payments of USD 50",
      lib/schema.ts note of 2026-09-20), but /policy-terms §§ 2.2, 4 and 5 say
      payment is one-off for 30 days and never recurs. One of them is wrong;
      the marketing copy matches Paystack, so it was left as is.
- [ ] Claims: "not a refund claim" wording kept on /insurance; confirm how
      claims actually work.
- [ ] Payments hero mockup (`AppHomeMockup.tsx`) shows a "Cards" tab, which
      conflicts with the no-card rule. Confirm whether the app has cards.
- [ ] Enquiry form on /get-started still has no privacy notice.
- [x] Plans, About, Contact rewritten (2026-10-14). Plan buttons now read
      "Buy Silver/Gold/Diamond" (they open Paystack).
- [ ] /plans comparison table has blank cells: admission days (Gold,
      Diamond), eye care (Silver, Diamond), surgical limits (Silver).
- [ ] Hospital categories A/B/C are never defined for visitors.
- [x] Blog index, article layout and all 3 posts rewritten (2026-10-14).
      Posts no longer state per-plan hospital categories (link to /plans).
- [ ] Blog health post suggests asking about cover for a flight home.
      Confirm whether any plan includes repatriation.
- [x] About vision "a leading travel services company in Africa" confirmed
      by the owner (2026-10-14).
- [x] Contact: WhatsApp number, Victoria Island address and 24/7 contact
      centre confirmed by the owner (2026-10-14). Email-updates option
      has no mailing-list provider (people email info@omanga.biz).
- [ ] About page, privacy policy and blog posts still say "for Africa"/"across
      Africa" about insurance in places. Legal copy needs owner sign-off.

## Addendum · 2026-10-15 · SEO audit high-priority fixes

- **OG image** is now a static `public/og.png` (the old route's own output).
  Inside the `(redesign)` route group Next served `opengraph-image.tsx` at a
  hashed path, so `/opengraph-image` in `lib/seo.ts` was a 404 on every page.
- **Cookie banner**: compact bar on mobile (heading visually hidden, Accept
  and Reject in equal halves, Manage below; ~27% of a 375 × 812 viewport,
  was ~45%), a 26rem bottom-right card on desktop. Body copy shortened and
  lifted to 80% white for contrast. "Reject non-essential" became
  "Reject all" so it fits and pairs with "Accept all".
- **Schema**: Organization gets `alternateName` (mirrors WebSite) and a raster
  logo (`/apple-icon.png`, 180px); no `legalName` until the registered name
  is confirmed. Providers have `@id`s. The wallet is a `FinancialProduct`
  with its ₦20 fee; service nodes now appear only on home, /payments,
  /insurance and /plans. /about and /contact are `AboutPage`/`ContactPage`.
- **Copy contradictions**: Silver categories, "50+ countries" and "lost 30"
  were already fixed on 2026-10-14. Monthly vs one-off billing is open (see
  Copy to-do).

## Addendum · 2026-10-15 · How it works as Norma cards

- Owner pick: Norma's "How it works" (mobbin section 96f4183b). A Superpower
  photo-card version was built first and rejected the same day; its Unsplash
  photos were removed.
- Left-aligned heading. Three bordered cards (28px radius): number circle,
  title, line, a hairline, then an app screen cropped by the card's bottom
  edge. Fixed screen-area height so the cards end level.
- Screens are HTML in `StepPhone` (same `--u` unit as `AppHomeMockup`): Add
  money, Choose a plan, and the existing app home screen.
- Steps 1 and 3 now use real screenshots from the app in the iOS simulator
  (`public/app-screens`, shown by `ScreenshotPhone`): Top up and Home. Home
  shows the owner's own test account; the owner approved it. Step 2 stays
  drawn until the app's insurance screen is built.
- Choose a plan is a card carousel (Wise "Choose an option", mobbin screen
  9fd7794c): tall tinted card per plan in display type, next card peeking,
  dots. The app has no insurance screen yet (its tab is a placeholder), so
  this design exists only on the site. Plan data comes from the plans content. Sample figures,
  `aria-hidden`. "Minimum: None" rather than a fee line, because whether
  top-ups are free is unconfirmed.
- The section's button is replaced by Norma's closing chip line, "Fund your
  wallet from USD · GBP · CAD". The hero and closing panel keep the wallet CTA.
- **No 3D assets.** The owner no longer wants them. Other sections still using
  `Object3D` are open for the same change.

## Addendum · 2026-10-15 · Home hero, Revolut layout

- Owner pick: Revolut "Change the way you money" (mobbin section e936d541).
  Built as `components/home-v2/HeroPoster`; the old plane-window `Hero` is
  kept but no longer used by `/`.
- Photo: a woman with her arms up against deep blue sky (Unsplash, owner pick
  "Q13"), self-hosted at `public/hero-arms-up.jpg`. Tried and removed first:
  "S10" plane wing, "P16" Lagos danfo, "P03" arms crossed.
- One screen tall (`h-svh`), text top-left over the sky, nothing below the
  fold. On small screens the photo starts 32% down so her raised hand clears
  the actions (gap filled with the photo's sampled top-edge sky). On desktop it
  sits at the top; a 14% shift was tried and rejected as losing the feel.
- Copy (UX writing pass, owner's Material-based skill): h1 "Pay and stay
  covered in Nigeria"; line "One free wallet for your travel money, plus
  health cover for your trip." The long keyword h1 moved out; the <title>
  still carries it. Both [NEW], need sign-off.
- Type: see the site-wide type addendum below. The hero h1 uses `text-display`
  in sentence case, not Revolut's capitals, per the owner.
- Actions: new Button variant `white` (white fill, ink label, ink hover) for
  the primary; the secondary stays the bordered white style.
- Header: transparent with light text over the hero on `/` until the page
  scrolls 24px, then the usual white bar. The hero runs under it
  (`-mt-header pt-header`). Revolut's glass phone panel was built and removed
  on request.
- The line under the h1 is [NEW] copy restating approved facts; it needs
  sign-off. It does not name Phillips HMO (owner: not professional in the
  hero).
- Header nav hover is now Revolut's tinted pill (`white/15` on photo,
  `ink/6%` on the white bar), with no underline or weight change on hover.
  No underline for the current page either (owner request); keyboard focus
  keeps it.
- The language switcher (flag) is removed from the header on request; the
  component is kept.

## Addendum · 2026-10-15 · Site-wide type, Revolut style

Measured on revolut.com at 1440: Aeonik Pro at 500 for all headlines (h1 88px,
h2 52px, line-height 1.0, tracking −0.024em / −0.012em), Aeonik 500 for nav
and buttons, Inter for small UI text.

- **Geist replaces Manrope** as `--font-heading` (self-hosted, latin). Aeonik
  is commercial; Geist is the closest free face and is already the Omanga
  app's heading font. Manrope's file and loader are removed.
- **Heading weight 500** (was 800). Display and h1: line-height 1.0, tracking
  −0.024em. h2: 1.05, −0.012em. h3: 1.15, −0.01em. Sizes unchanged.
- **Buttons and header nav** now set in Geist 500 (were Inter 600 / 400).
- Body, forms, footer and h4–h6 stay Inter.
- Not changed: the Payments hero still sets `font-display font-extrabold`
  (Wise-heavy, an earlier owner pick); it now renders in Geist 800.

## Addendum · 2026-10-15 · Button, Revolut standard

Measured on revolut.com at 1440: 42px pill, 10 × 24 padding, Aeonik 16 / 500,
three treatments (near-black, white, 2px outline with a 10% white fill), hover
= same fill at 85% opacity, colour easing 0.3s cubic-bezier(0.15, 0.5, 0.5, 1).
The design-taste library had no button entries, so Revolut is the reference.

`components/ui/Button.tsx` is the one button on the site, so the change lands
everywhere:

- 44px fixed height (Revolut's 42 rounded up to the touch floor), 24px inline
  padding; header `compact` is 36px with a 44px hit area.
- Geist 16 / 500, no wrapping.
- Hover: 85% opacity on every boxed variant (was an ink inversion). Press:
  scale 0.98, off under reduced motion.
- Secondary: 2px border; on dark or photo also a 10% white fill.
- Omanga crimson stays the primary fill on light surfaces (owner confirmed,
  2026-10-15), rather than Revolut's near-black (#1F1F1F).

## Addendum · 2026-10-15 · Payment Solutions visual, Wise converter

- The home Payment Solutions card now shows a working currency check in the
  style of wise.com's converter (owner request): rate chip, "You convert"
  (amount field + USD/GBP/CAD pill) and "You get" (NGN), then Rate
  (mid-market) and Transfers (₦20 each).
- Live: `getNgnRates()` in `lib/rates.ts` reads the same public daily FX
  snapshot as the Payments page, revalidated hourly, with a fallback.
  Labelled "Indicative rate · {date}". NGN shown in whole naira.
- Accessible: labelled field and native select, result in an `aria-live`
  `<output>`. Server wrapper `ConverterVisual`, client `ConverterWidget`.
- The drawn `PaymentsVisual` app panel is kept but no longer used on `/`.
- [2026-10-15, later] Card shape follows wise.com's product cards (owner
  reference): heading and intro stay in columns 1–4; two cards in 5–12. Each
  card: large rounded neutral panel, title, line and underlined link top-left.
  Insurance: an asset centred below (current stepper visual as a placeholder
  until the asset is chosen). Payments: the converter as a white panel to the
  card's sides and bottom, with Wise-style icon fact rows and a full-width
  "Open your free wallet" button. Neutral colours on purpose until the
  section's palette is decided (`ProductPanel.tsx` holds the colour).
- Insurance card media: a Wise-style cover pill ("Hospital stay · Covered"
  with an "Emergency evacuation included" chip), owner pick 2026-10-15 over a
  Magnific watercolour globe. Both claims hold for every plan. Neutral until
  colours are chosen. `InsuranceVisual` (the stepper) is kept but unused here.

## Addendum · 2026-10-15 · Mobile menu, Revolut style

Measured on revolut.com (375 wide): a full-screen sheet over the page,
rgba(0,0,0,0.5) with an 85px backdrop blur, white type; top-level rows about
46px; groups as accordion rows with a chevron, smaller sub-links and a hairline
after them; two pills pinned at the foot ("Log in" / "Sign up").

- `MobileNav` now renders that sheet: rows in Geist 500, "Company" as the one
  accordion (opens by default when it holds the current page), then two
  full-width pills stacked right under the links (owner request, instead of
  Revolut's pair pinned at the foot): "Open your free wallet" (white,
  `navigationContent.menuAction`) above "Get started" (outline).
- The header goes transparent with light text while the menu is open
  (`onOpenChange`), so the bar and sheet read as one surface.
- Desktop is unchanged. The old `MobileNavGroup` is no longer used by the menu.

## Addendum · 2026-10-15 · Dead-code cleanup

Found with knip plus manual checks of `public/` and the CSS utilities; build,
types and lint pass afterwards.

- Removed 30 unused components and modules: the old plane-window `Hero`, the
  old `HowItWorks` section, the unused home-v2 sections (hero, partners,
  products, features, statement, coverage, collage) and their content blocks,
  `SolutionCard` and its drawn visuals, `LanguageSwitcher` and its content
  and prop, `MobileNavGroup` and the column branch of `Navigation`, `Avatar`,
  two icons, `useMediaQuery`, `config/locales.ts`,
  `insurance-reasons.content.ts`.
- Removed unused assets: the old hero photo, Next starter SVGs, old screen
  captures, two flags, and Manrope (earlier).
- Removed ~60 dead `pv-*` utilities, `animate-hero-pan` with its keyframes and
  tokens, `bleed-copy`, `transition-underline`, and a few unused constants.
- Dropped `@vercel/analytics` and `lucide-react` from `package.json` (never
  imported).
- Fixed the long-standing `MobileNav` lint error (state set in an effect).
- Kept on purpose: the 3D objects (still rendered by FAQ, closing panel and Why
  Omanga), unused exported prop types, and constants used inside their files.

## Addendum 2026-10-15: photo hero on every page

- Owner: every page opens with the home hero's layout. The markup is now
  `components/sections/PhotoHero.tsx`; `HeroPoster` (home) wraps it.
- Each page brings its own Unsplash sky photo (self-hosted, never reused)
  plus framing classes: a backdrop sampled from the photo's edges, the photo
  box per breakpoint (desktop pushes it right and fades its left edge so the
  subject clears the copy; mobile starts it low and fades its top edge).
- Header goes transparent only on `PHOTO_HERO_PATHS` in Header.tsx; add each
  page there as it moves over.
- Done: home, insurance (Unsplash ZYV7qZNe5wY), payments (Unsplash 6tAsnpxxGiw; replaces the Y6 phone-over-photo hero, copy unchanged), about (Unsplash Uwz5MKKgD8g; intro shortened, [NEW] copy; home hero actions added). Insurance intro shortened to
  one line ([NEW] copy, needs sign-off); h1 unchanged for SEO.
- Type: Geist (headings) + Inter (text) are global tokens, so every page
  already uses the home page's fonts.

## Addendum · 2026-10-15 · Colour palette 2026-10 (home 60/30/10)

Owner's Adobe Color triad on `#AE2448`: crimson, teal `#248CAD`, olive
`#ADA424`, plum `#58303B`, charcoal `#242F33`. Applied to the home page on the
60/30/10 rule, white background unchanged.

| Share | Colour | Where |
| --- | --- | --- |
| 60 | White `#fff` and `#f6f6f6` (unchanged) | Every light section |
| 30 | Charcoal `--color-surface-dark`, plum `--color-brand-deep`, ink footer | Features band (`AccountFeatures tone="dark"`), brand→plum gradient on Why Omanga card and CTA panel |
| 10 | Crimson `--color-brand`; teal `--color-support` / `--color-support-strong` | Crimson: actions only. Teal: wayfinding only (step numbers, feature icons) |

Measured (WCAG 2.x): white on charcoal 13.73, white 80% on charcoal 9.32,
white on plum 11.05, white on support-strong 5.83, support-strong on white
5.83, teal on its 10% tint 3.45 (icons only), brand on charcoal **2.06** (so no
brand on the dark band).

Decisions:

- **Olive not used.** 2.59:1 on white fails even the 3:1 UI floor, it reads as
  a warning colour and clashes with the gold tier badge. Only safe as a fill
  under ink text (6.94:1); no home element needs that role, so no token.
- **Plum replaces `#7c1530` as `--color-brand-deep`.** Same hue as the brand,
  so it reads as dark brand. Because `CTA` and `WhyOmanga` are shared, their
  gradient end changes on every page.
- **Feature icons are teal everywhere `AccountFeatures` renders** (home,
  Payments, Insurance), so teal keeps one meaning site-wide. Brand stays for
  actions.
- **CTA intro** moved from white 50% (2.70:1 on brand, a failure) to white 85%
  (5.21:1).
- Charcoal is a home-only surface for now; the footer stays `--color-ink`.
- Charcoal darkened on request to `#111d21` (OKLCH L 0.22, same hue 222):
  white 17.19, white 80% 11.31, brand 2.58 (still no brand on it).

## Addendum · 2026-10-15 · Coverage as a Popcorn pill cloud

Owner pick: Mobbin section efced987 (Popcorn "Our coverage?"). The flag arch is
replaced by a centred pill eyebrow, heading and intro over a faint Africa dot
map (`public/coverage/africa-dots.svg`, generated from a rough outline: ink
cropped to north of ~6°S and faded at the bottom, ink at 6%, a random fifth
in teal at 20%, no country highlight because it sat behind the heading;
Magnific's dotted Africa maps were checked and rejected, all posters with baked
titles and backgrounds), then tilted flag + name pills closing on a derived
"39+ more" pill (`COUNTRIES_SERVED - flags.length`). Heading and intro are
capped and balanced so each runs to two lines (owner). Old FlagCluster / FlagColumn / FlagItem / CoverageContent deleted.
- Action relabelled "See all countries" (owner). [BLOCKED] It still links to
  /plans: no list of the 50+ countries exists in the project.
- [REVERTED, 2026-10-15] Features band back to `--color-surface-light`, the
  FAQ grey (owner). `--color-surface-dark` and `AccountFeatures`' `tone` prop
  removed. The "30" is now the brand→plum gradients and the ink footer only;
  feature icons stay teal.

## Addendum · 2026-10-18 · Competitor copy and keyword pass

Full review: `design-lab/copy-seo-review-2026-10-18.md` (Wise, Revolut, LemFi
copy research + Semrush free-plan keyword pulls). Applied: keyword-first titles
on /insurance ("Travel Insurance for Nigeria"), /plans ("Health Insurance Plans
in Nigeria") and /payments ("Pounds and Dollars to Naira"), the insurance H1
now says "travel health insurance", and three search-phrased FAQs. "Send money
to Nigeria" (UK ~12K/mo) is **not** targeted until it is confirmed the wallet
pays out UK-funded money in Nigeria. "Card" terms stay out (no card). Biggest
open opportunity: live pounds/dollars-to-naira rate pages (UK ~180K/mo).

## Addendum · 2026-10-18 · Live rate pages

/rates/pounds-to-naira, /rates/dollars-to-naira, /rates/canadian-dollars-to-naira
(`app/(redesign)/rates/[pair]`, copy in `content/rates.content.ts`). One page per
funding currency covers both directions (pounds↔naira) so there are no thin
duplicates. Rate from `lib/rates.ts` (public mid-market snapshot, fetched hourly,
ISR); the page states it is a reference rate and the app shows the exact rate
before you confirm. Static HTML holds the rate, two tables and a FAQ (FAQPage
schema with the live figure). Linked from the footer, from the converter
("GBP to NGN today") and between pairs; in the sitemap. Copy is [NEW] and needs
sign-off.
Layout (owner pick from Mobbin, same day): R1 plum band with a wide converter
card across its edge (Wise converter 669f7e5e; choosing another currency opens
that pair's page), R2 30-day chart (removed the same day, owner request) and
high/low/change as text (Wise rate tracker 76aac368; history from the feed's
dated archive), M1 USD/GBP/CAD/NGN matrix (Wise top currencies b54e2297),
which replaces the two amount tables. Components in `components/rates/`.

## Addendum · 2026-10-18 · Site-wide copy audit

Applied fixes and the 8 open items (facts or decisions) are in
`design-lab/copy-seo-review-2026-10-18.md` § 7. Page-specific FAQs for About
and Contact live in `content/page-faqs.content.ts`.
Owner answers same day: free Omanga-to-Omanga transfers and all 24/7 claims
removed (unconfirmed; legal pages untouched, flagged), "6+ currencies", Plans
FAQ split, FAQ questions phrased as searches, Payments H1 "Travel money, ready
when you land in Africa". Waiting on Phillips HMO: admission days per plan,
emergency number, when cover starts, exclusions.

## Addendum · 2026-10-18 · Phase 1 (plan from the copy and SEO review)

- Payments hero: the home converter sits over the photo on the right
  (`SkyHero` `aside` slot; stacks under the copy below desktop).
- `/safety`, "Is Omanga safe?": partners and regulators, what Omanga is and
  isn't, account tips, FAQ. Approved facts only; nothing on how funds are
  held. In the footer and sitemap.
- Blog: the health-insurance post is retargeted to "Do you need travel
  insurance for Nigeria?" (same slug) rather than a second post on the same
  question. New post: "Pounds to naira: how to get the best rate in
  Nigeria" (`/blog/pounds-to-naira-best-rate`), linking to the rate page.
  Both [NEW] copy, need sign-off.
- Currency picker: Wise-style `CurrencyPicker` (search, popular list, flag,
  code, name, tick) replaces the native select in both converters.
- To check: the site says Phillips HMO is "regulated by NAICOM". In Nigeria,
  HMOs are usually accredited by the NHIA. Confirm which regulator to name.
