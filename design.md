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

## Addendum · 2026-10-18 · Audit quick wins (omanga.biz-audit/ACTION-PLAN.md Phase 4)

Sitemap `lastmod` on every URL (`PUBLIC_ROUTES.lastModified`; rate pages use
the live snapshot date, sitemap revalidates hourly) and no `priority`;
`aria-label="Amount to convert"` on both converters; hero image
`loading="eager"` + `fetchPriority="high"` (Next 16 deprecates `priority`);
self-hosted 1200×630 share images per post in `public/blog/og/`. The pounds
post no longer mentions the removed 30-day chart.

## Addendum · 2026-10-18 · Regulator wording softened (owner request)

Until licences are confirmed, marketing copy names the partners but no
regulator: "Fuspay Technologies operates the wallet" and "Phillips HMO, a
Nigerian health maintenance organisation (HMO)". Removed: "microfinance bank
licensed by the Central Bank of Nigeria" and "regulated by NAICOM" (the SEO
audit found no CBN record for "Fuspay", and HMOs are usually NHIA-licensed).
/safety headings now read "A payments partner runs your wallet" and "A
Nigerian HMO provides your cover". Legal pages untouched. To restore: the
exact legal name (Fuspay vs Fusepay), licence category and number, the HMO's
regulator and number, and register links.

## Addendum · 2026-10-18 · Wallet partner removed from public copy (owner)

The wallet's operating partner and backend set-up aren't public. Removed from
every marketing page: the "Who operates the Omanga wallet?" FAQ, Fuspay in
copy (Payments closing, Get Started, About, the $100 post), the Fuspay logo
in the partner strip and insurance partners (file deleted), and the wallet
`provider` node in schema (Omanga stays as `brand` only). /safety is now
general: rate before you pay, Phillips HMO for cover (customer-facing, kept),
help, account tips. The legal pages still name Fuspay; review with counsel.

## Addendum · 2026-10-19 · Fuspay logo restored (owner)

The Fuspay logo is back in the partner strip and the insurance partners list
(`public/fusepay-logo.png` restored). Fuspay copy, the "Who operates the
wallet?" FAQ and the schema provider node stay removed.

## Addendum · 2026-10-21 · New redesign: design system v1

Supersedes the earlier type picks (Manrope/Inter, Archivo display) and the
crimson/blush/gold palette for the new redesign. Reference page:
`design-lab/design-system.html` (tokens block at the top of its `<style>`).

- **Direction:** minimal, after asset.framer.ai. Grey page (#F7F7F7), white
  cards, small radii, wide section spacing. Photos carry the warmth; brand
  colour is kept for the one action per view.
- **Type:** Host Grotesk 400/500 only, using the owner's scale: H1 48/52.8/−1.92,
  H2 38/41.8/−1.52, H3 16/17.6/−0.64 medium, P1 16/24/−0.32, P2 14/21/−0.28,
  P3 (buttons) 14/16.8/−0.28 medium. On mobile, H1 drops to 38 and H2 to 32,
  matching Asset's mobile sizes.
- **Colour:** brand ramp generated in OKLCH from #AE2448 (hue 11.8, held
  constant), with brand at step 600. Neutrals are pure grey to match #F7F7F7.
  Only the success and error ramps exist, because the site renders nothing
  else. Error sits at hue 33.8, 22° from brand, so a crimson button never
  reads as an error.
- **Measured pairs:** text #1B1B1B on bg 16.08; secondary #656565 on bg 5.44,
  on white 5.83, on #E8E8E8 4.76; brand on bg 6.23; white on brand 6.68; white
  on brand-700 hover 8.46. Grey 400 (#9E9E9E) fails on bg (2.5), so it is never
  used for text.
- **Space:** measured from Asset at 1440px wide: 1080 container, 72 section padding
  (48 on mobile), 64 from heading to content (40 on mobile), 16 card gap, card
  padding 24/24/32. Radius 2 for cards, 4 for photos, 8 for buttons.
- **Buttons:** minimum height 44 (Asset's 33px is below a comfortable touch
  size), with padding 12 × 16.
- **Photos (Unsplash, hotlinked in design-lab, self-host on build):** hero
  aL_ZYKJiN9Q, feature panel kF0-RhpHhRA (Lekki bridge), steps 1PgSfwSxXx0 /
  jCRrhLwAmJ8 / TPT4pevJEmQ, final CTA 9ySEZ-ugtJA. None repeats a photo
  already on the site.

## Addendum · 2026-10-21 · Brand backgrounds picked (owner)

The owner picked three crimson textures from `design-lab/brand-backgrounds.html`,
modelled on a green aurora reference. They're self-hosted in
`public/photos/brand/`:
- **G1 aurora ribbons** (`bg-aurora-g1.svg/.webp/.jpg`, 2400×1200). Generated
  from the brand ramp (300–950) with film grain, so it matches #AE2448 exactly.
  The SVG source is kept so the image can be re-exported at other ratios. The blur
  filters use a user-space region, because the default region clipped the
  blur into hard edges.
- **U2 flowing waves** (`bg-flowing-waves-u2.jpg`), Unsplash e01vA10bv4w.
- **U3 dark fabric** (`bg-dark-fabric-u3.jpg`), Unsplash ZOUXvXydHRk.

For banners, the final CTA and feature panels. White text goes on the darker
side, with a left-to-right scrim behind body copy.

Placement on home (wireframe, 2026-10-21). Brand textures sit behind product
UI, the step cards and plan prices; people photos stay in the hero:
- **U2** sits behind the switching app screens in "What Omanga does". It replaces
  the Lekki bridge photo, which moves to spare (for /wallet or /visiting-africa).
- **U3** is the background of the Popular Gold plan card, with white text over
  a 35–55% dark scrim and a white "Get Gold" button. The texture marks the
  recommended plan, so no extra badge colour is needed.
- **G1** is the final CTA panel behind the app home screen, closest to the
  aurora reference. The Lagos skyline photo moves to spare.
- **Steps (owner, 2026-10-21):** the three step cards all use U2, cropped
  left, centre and right (300% wide), so the row reads as one continuous
  texture, like img 4's single landscape. The people photos
  (1PgSfwSxXx0, jCRrhLwAmJ8, TPT4pevJEmQ) move to spare. People photography
  now appears only in the hero.

## Addendum · 2026-10-21 · Glass frame on mini visuals (owner)

Every mini visual (an app screen inside a card or panel) now sits in a glass
frame, after an owner reference. The frame is an 8px translucent ring: white at 18%, a 1px white
edge at 38%, a 10px backdrop blur and the float shadow. Inside it is a white card
with an 8px radius. The outer radius is 14. Tokens: `--glass-fill`, `--glass-edge`,
`--glass-blur`, `--radius-glass` (design-lab/design-system.html). It's applied in
the home wireframe to the three step cards, the "What Omanga does" panel and
the final CTA. The CTA screen no longer bleeds off the corner; it is centred
in its frame.

## Addendum · 2026-10-21 · New redesign build setup

The new redesign is built at **/new**, beside the live site. It has its own
route group, `app/(new-redesign)`, with its own root layout, so it gets its own
`<html>`, Host Grotesk (`next/font/google`) and stylesheet. The live site
(`app/(redesign)`, Inter) is untouched. Moving between the two is a full page
load (separate root layouts, per the Next 16 route-groups docs).

- All new code lives in `new-redesign/` (config, styles, components, content,
  doc); only route files sit in `app/(new-redesign)`. See
  `new-redesign/README.md` for the map and cutover steps.
- The stylesheet uses `source(none)` and scans only `new-redesign/` and its
  route group. Tailwind's default palette is cleared (`--color-*: initial`), so
  only the design-system tokens exist.
- Internal links go through `href()` with `REDESIGN_BASE = "/new"`. At cutover
  this becomes "" and no component changes.
- `/new` is `noindex, nofollow` and is not in `config/routes.ts`, so it never
  enters the sitemap. A "Redesign preview" badge marks every page.
- `/new` renders the locked v4 home order as placeholders; each one is
  replaced as its section is built. The hero photo (Unsplash aL_ZYKJiN9Q, a
  different photo from the live `hero-arms-up.jpg`) is self-hosted in
  `public/photos/home/`.
- Verified 2026-10-21: tsc and eslint clean; `next build` lists `/new` as
  static; live `/` still serves Inter and `index, follow`.

## Addendum · 2026-10-21 · /new hero and header (owner)

**Hero (section 1, built).**
- Background: deep crimson. brand-950 (#360511) under a fade to near-black at the
  top. The owner chose it over the sky photo after seeing it while the photo
  was loading. The photo was removed from the hero and from `public/photos/home`.
- Contrast: white H1 17.7:1, sub at 90% white 14.3:1, white on the primary
  button 6.68:1. The button fill against brand-950 is 2.65:1, which is fine
  because the label identifies it.
- Height is the viewport (`svh`), clamped to 640–1000px. Each H1 sentence is its own
  balanced line, so 375px reads "Stay covered / in Nigeria." without an orphan.
- CTAs: "Open your free wallet" (filled) and "Compare health plans" (white
  underlined text, Button `onPhoto` variant), keeping one filled action per view.

**Header, after wise.com (owner).** Measured at 1440: a 76px bar, tabs beside
the logo, Help, Log in and the action on the right. Each tab opens a
full-width white panel (24px top, 40px bottom) with a featured photo card
(340px, image 200px) and link columns (240px) under grey headings, each link
with a tinted icon.
- Over the hero, the bar is transparent with white text. When a panel is open,
  it turns white and swaps to the horizontal colour logo
  (`public/logo-omanga-horizontal.svg`: mark in brand, word in ink, made from the
  white file because `logo-omanga.svg` is the stacked lockup).
- The header action is **Download** (owner), replacing "Open your free wallet".
  Store links are still owner question § 8.6; until they exist it points at
  `/new#download`, the app row to come.
- Help moves from the Company menu to the bar's right side (Wise placement).
  All other locked destinations are unchanged.
- The panel cards reuse the spare photos: wallet phone, doctor, airport, and the
  Lagos skyline (`public/photos/nav/`).
- Behaviour: hover or click opens a panel. A mouse click after hover keeps it open;
  Enter/Space toggles. Escape closes and returns focus to the tab, and leaving
  the header closes it. Below 1024px the bar shows the logo, Download and a
  menu button; the sheet lists every group with icons, then Help, Log in and
  WhatsApp, with Download pinned at the bottom.

## Addendum · 2026-10-21 · Hero converter, Wise menu motion, mobile Download (owner)

**Converter in the hero.** It sits under the CTAs as a white card inside the
glass frame, on the crimson.
- Content: "You add" (amount and GBP/USD/CAD picker), "You get" (naira, read-only
  `output`, announced politely), and a rate line (1 GBP = ₦…, "Mid-market
  rate, updated hourly", "₦20 per transfer", "See all rates →").
- Rates come from `getNgnRates()` in lib/rates.ts, the same hourly public
  snapshot the live rate pages use.
- It has no button of its own, so the hero keeps a single filled action.
- From ₦10,000 up the naira figure drops kobo. Below 768px the NGN chip is
  the flag only (the code stays for screen readers), so ₦17,799,272 fits at
  375px.
- The hero changed from a fixed viewport height to `min-h-svh` and grows with
  its content, so the converter is never clipped on short screens.

**Mega-menu motion copied from wise.com.** Measured from its stylesheet on
2026-10-21:
- The bar's colours and the logo cross-fade over 350ms on
  `cubic-bezier(0.8, 0.05, 0.2, 0.95)` (`--ease-nav`).
- The panel area grows from 0 to the panel's measured height over 350ms.
- The panel fades in over 200ms after a 200ms delay, and fades out over 200ms
  while the area collapses.
- Moving between tabs slides the new panel 10px in from that side and fades
  it over 600ms (it stops moving at 66%).
- A page dimmer (black 50%, 8px blur) fades in over 350ms.
- Every panel stays mounted and `inert` while closed so it can be measured.
  All durations drop to 0 under reduced motion.
- Checked on /new: the height ran 0 → 41 → 330 → 415px at 0/100/200/350ms, and
  the panel's opacity started rising at about 200ms.

**Mobile Download.** It now lives only inside the menu sheet, pinned at its foot.
Below 1024px the bar shows only the logo and the menu button.

## Addendum · 2026-10-21 · Converter: swap and Wise-style currency picker (owner)

- **Swap:** a round 40px button centred on the seam between "You add" and
  "You get" swaps the two currencies. Picking the currency already on the
  other side also swaps, so the converter never shows X → X.
- **Both sides switch:** GBP, USD, CAD and NGN on either side, from the live
  rate pages' cross matrix (`crossMatrix(getNgnRates())`). The rate line
  generalises to "1 FROM = {symbol}rate". Rates under 1 show three significant
  figures (1 CAD = £0.532). More African currencies wait on owner question
  § 8.5 (which currencies the wallet holds).
- **Picker** (`new-redesign/components/ui/CurrencyPicker.tsx`), after Wise's
  "You send exactly" dropdown:
  - A grey chip (flag, code, chevron) opens a white 340px popover.
  - The popover has a search field with a 2px ink border ("Type a currency /
    country"; it matches code, name or country), then an "All currencies"
    label over a rule, then rows of round flag, code and name.
  - The selected row is outlined and ticked.
  - Keyboard: focus moves to the search field, ↑/↓ highlight
    (`aria-activedescendant`), Enter picks, and Escape closes with focus back
    on the chip. Clicking outside or tabbing away also closes it.
- **Mobile (below 768):** the chips show flag and chevron only. The code is in
  the chip's accessible name and in the rate line, so a seven-figure naira sum
  fits. The popover anchors to its field and spans it instead of the chip, so
  it never runs off a 375px screen.
- The hero lost `overflow-hidden` so the popover can extend past the section.

## Addendum · 2026-10-21 · Design system is the single UI source (owner)

The owner asked that the header's menu cards match the design system's card,
and that `design-lab/design-system.html` stay the source for all UI.
- New shared `new-redesign/components/ui/Card.tsx` (`Card`, `PhotoCard`,
  `CardTitle`) implements the spec exactly: white, a 1px `--color-border`
  edge, a 2px radius; a 220px photo flush at the top; a body padded 24 / 24 / 32;
  an H3 led by a 3 × 12 crimson bar; P2 secondary text 8px below; an optional
  "Explore →" in P3 accent.
- The menu card had drifted (4px radius, 200px photo, no bar, 6px gaps). It now
  uses `PhotoCard`, measured on /new at 2px / 220px / 24 24 32 / 3 × 12.
- UI that existed only in code is now specified on the design system page:
  the header bar, the menu panel, the currency popover, the `onPhoto` button
  variant and the nav motion tokens.
- Rule for the build: new UI is added to the design system page first (or in
  the same change), and components reuse `Card`, `Button` and `SectionHead`
  rather than restyling in place.

## Addendum · 2026-10-21 · /new partner strip (section 2, built)

- Follows img 3: a thin white band under the hero (`bg-surface`, 1px bottom
  rule, padded 40px, 32px on mobile), a centred P2 secondary label "Our
  partners", and a static row of logos.
- Partners are the three the live site shows (`content/trust.content.ts`):
  Phillips HMO, Fuspay (restored by the owner 2026-10-19) and Zira. Logos only.
  Partner roles are still an open owner question, so there are no captions and
  no roles in the alt text.
- The logos are grey at rest (grayscale, 60% opacity, as in img 3) and return
  to full colour on hover over 240ms. The trademarks themselves are not
  altered.
- The live PNGs carry different amounts of built-in whitespace, which made the
  marks read small and unequal. /new uses trimmed copies in
  `public/photos/partners/` (the originals are untouched for the live site),
  sized by optical weight with height = 26 × √(3.7 ÷ aspect): Phillips 20px,
  Fuspay 26px, Zira 26px, all 85% of that below 768px.
- No marquee: three logos fit one row at 375px (measured right edge 351px).
  Revisit if there are more than five partners.
- The spec was added to design-system.html before the build.

## Addendum · 2026-10-21 · /new "What Omanga does" (section 3, built)

- Follows img 2 and the locked wireframe: eyebrow "What Omanga does", H2 "One
  app for your money and your health on the trip", sub, then five accordion
  rows beside an app-screen panel.
- **Copy change:** the wireframe's sub-line ended "without paying a deposit up
  front". That is an unconfirmed insurance fact (§ 8.4), so it now ends
  "through Phillips HMO".
- **Rows** (title, line, link): Convert at the real rate → Exchange rates;
  Send for ₦20 → About the wallet; Pay in 50+ African countries → Countries;
  Health cover from $50 a month → Plans and prices; Get care at a network
  hospital → Get care now.
- **Accordion:** one row open, the first open on load. Headers are
  `h3 > button` with aria-expanded/aria-controls, and closed bodies are inert.
  The open row is white with an ink border and the 3 × 12 crimson bar; closed
  rows are `surface-muted`. Rows expand with a grid-rows transition over 240ms.
- **Panel (from 1024px):** the U2 texture (4px radius, at least 380px tall),
  with the open row's screen in the glass frame, at most 320px wide. Screens
  cross-fade with an 8px rise over 240ms. Below 1024px there's no side panel;
  the screen sits inside the open row on a 260px slice of the texture.
- **Screens are illustrative app states:** no names, no invented merchants, no
  speed claims, no "card". The Convert screen uses today's GBP→NGN rate
  (`getNgnRates`), so it matches the hero converter.
- The spec was added to design-system.html before the build.

## Addendum · 2026-10-21 · Spacing re-measured from asset.framer.ai (owner)

The owner found the spacing between sections and inside sections too tight.
Asset was re-measured at 1440 and 375 (computed styles), and /new now
matches it.

| | Asset | /new before | /new now |
|---|---|---|---|
| Section to section, desktop | 72 + 48 gap + 72 = 192 | 144 | 192 (96 + 96) |
| Section to section, mobile | 72 + 72 = 144 | 96 | 144 (72 + 72) |
| Header → content | 64 / 32 mobile | 64 / 40 | 64 / 32 |
| Eyebrow → title, title → sub | 24, 20 | 16, 16 | 24, 20 |
| Eyebrow marker | 14 × 8 | 10 × 5 | 14 × 8 |
| Accordion rows apart | 16 / 8 mobile | 8 | 16 / 8 |
| Accordion row padding | 20·32·20·20 closed, 24 top open, 12 title→text | 14·16 | same as Asset |
| List ↔ panel | 24 (16 stacked) | 16 | 24 / 16 |
| Photo card | image 236, body 32/24, gaps 12 | 220, 24/24/32, 8 | same as Asset |

- Asset's sections sit in a parent with a 48px gap on desktop (none on
  mobile). /new reproduces it with one token: `--section-y` is 96 on desktop
  and 72 on mobile.
- New tokens: `--head-gap` 24, `--head-sub-gap` 20, `--grid-gap-wide` 24.
- Closed accordion rows are a flex button, so the 17.6px H3 sets their height
  (58px plus the 1px edge) rather than the 24px line box.
- Checked on /new at 1440: 192 / 24 / 20 / 64 / 16 / 24. At 375: 144 / 32 / 8.
- design-system.html updated to the same numbers (tokens, Space table, card
  and accordion specs).

## Addendum · 2026-10-21 · /new "Sorted before you land" (section 4, built)

- Follows img 4 and the wireframe: eyebrow "How it works", H2 "Sorted before
  you land", sub, then three step cards in an ordered list.
- **Steps:** Open your free wallet / Add money / Pick your cover. The
  wireframe's "No Nigerian ID needed [confirm]" is left out until the owner
  confirms it (§ 8.5).
- **Cards:** `PhotoCard` (236px image, 32/24 body, crimson-bar title).
  - The image is one texture, U2, sliced across the three cards with a new
    `slice` prop (the image at 300% width, offset 0 / −100 / −200%), so the row
    reads as one continuous picture, as in the owner's 2026-10-21 pick.
  - Each image holds the step's app screen in the glass frame (82%, at most
    280px). The add-money screen uses today's GBP rate and labels it "Rate",
    because "Mid-market rate" doesn't fit the card.
- **Layout:** three across from 1024px, 24px apart, and stacked below that. At
  768px a third of the column is 229px, too narrow for the screens.
- Checked at 375 / 768 / 1024 / 1440: no row overflows and the page width
  stays at the viewport.

## Addendum · 2026-10-21 · /new Health cover prices (section 5, built)

- Follows the pricing reference and the wireframe: eyebrow "Health cover in
  Nigeria", H2 "Simple monthly cover for your trip", sub, a trip-length
  switch, three plan cards, then a footnote and "Compare all plan details →".
- **Facts and copy** are the live site's approved plan content
  (`content/insurance-plans.content.ts`): $50 / $85 / $120, Category A /
  A + B / A + B + C, the included lists and "Buy {plan}" CTAs. The CTAs go to
  the per-tier Paystack pages (`PLAN_CHECKOUT_URLS`, recurring monthly, read on
  2026-09-20). "No commitment. Cancel any time." stays as published, not
  strengthened, while plan terms are open (§ 8.1).
- **Trip-length switch** (1 month / 3 months): a radiogroup that only
  multiplies the monthly price ("$255 for 3 months"; "Billed monthly" for one
  month). No discount is implied.
- **Cards:** Card radius and border, padded 24 / 24 / 32, 32px between the content
  and the button, 16px apart (Asset's pricing cards).
  - Gold is featured: it sits on the U3 dark-fabric texture under a 50–70% scrim
    (raised from 35–55% because the texture's bright streak passes behind the
    text), with white text and the white inverse button.
  - Silver and Diamond use the secondary button, so the hero keeps the page's
    one crimson primary.
- **Alignment:** descriptions reserve two lines from 1024px and the title row is
  pinned to 18px (the "Popular" tag would otherwise add height), so prices
  and rules line up across the three cards (measured equal at 1440).
- "Everything in Silver, plus:" introduces the list, so it gets no tick.
- Three across from 1024px; stacked below that, with Gold first.

## Addendum · 2026-10-21 · /new "Why Omanga" (section 6, built)

- Follows img 5: eyebrow "Why Omanga", H2 "Honest about rates, clear about
  who does what", sub, six icon tiles in a 3 × 2 grid, then "Is Omanga
  safe? →" (/safety).
- **Tile:** Asset's icon card (measured 2026-10-21): padded 24 top and bottom
  and 20 sides, a 64px icon circle, 24px to the text, 8px from title to
  description, tiles 16px apart. It's built on our Card (white, 1px border,
  2px radius). The icon is the shared `NavIcon` at the new `lg` size (64px
  `accent-subtle` circle, 24px brand-700 icon); `tag` and `chat` were added
  to the set.
- **Copy, tightened to confirmed facts:**
  - "No hidden markup" became "₦20 per transfer, shown before you send"
    (conversion cost is § 8.5).
  - "Care, not claims / No pay-then-claim" became "Care through a network /
    Go to a network hospital and Phillips HMO handles your care" (claims
    process is § 8.4).
  - The sub's "every partner named" became "a plain answer to who provides
    what", since the wallet's operator stays off public pages (owner,
    2026-10-18).
- Three columns from 1024px, two from 768px, one below. Checked at all three
  widths with no overflow.

## Addendum · 2026-10-21 · /new Countries (section 7, built)

- Follows Wise's "works nearly everywhere": eyebrow "Countries", H2 "Omanga
  works across Africa", sub "Hold, convert and pay in 50+ African countries.",
  then tabs over a flag-and-link grid and a "See all …" link.
- **Pay in:** the same 11 African countries the live site shows as its sample
  of 50+ (`content/coverage.content.ts`). The full list is owner question
  § 8.5, so there's no inline "show all". "See all 50+ countries" and each
  country link go to /wallet/countries until per-country pages exist.
- **Exchange rates:** the live site's three rate pages (pounds, dollars and
  Canadian dollars to naira → /rates/[pair]), plus "See all exchange rates".
- **Tabs:** WAI-ARIA tabs with one tab stop, ←/→/Home/End, and each panel
  labelled by its tab. The selected tab is `accent-subtle` with brand-700 text;
  the others have a `border-strong` edge, with an 8px radius (no pills, per the
  button rule).
- **Grid:** five columns from 1024px, three from 768px, two below, rows 48px
  apart. Each entry is a 48px flag with a P3 link 16px below it, underlined
  and turning brand on hover.
- **New shared `Flag` component.** The flag SVGs are 30 × 24 rounded rectangles
  in a 32 × 32 box, so a round crop showed transparent edges. `Flag` scales
  the art 1.4× inside a clipped circle. The currency picker uses it too.

## Addendum · 2026-10-21 · /new FAQ (section 8, built)

- Follows img 6: eyebrow "Questions", H2 "Everything you need before you
  go", and a sub that ends with a "Chat on WhatsApp" link, then eight
  questions in two columns.
- **Every answer is published live-site copy** (payments FAQ, insurance FAQ,
  safety FAQ), so the section adds no new claims. Three wireframe questions
  had no approved answer and were swapped for approved ones: "Do I need a
  Nigerian bank account?" → "What is the Omanga travel wallet?"; "Is health
  cover required to enter Nigeria?" → "Does Omanga health cover work outside
  Nigeria?"; "What happens to leftover money?" → "What fees does Omanga
  charge?". They return once the owner supplies the facts (§ 8.4, § 8.5).
- **Layout (Asset's FAQ, measured 2026-10-21):** two independent flex columns
  16px apart, so opening a row only moves its own column (checked: the right
  column stays at 419px when a left row opens). Rows are 10px apart and padded
  18/16, with 16px from question to answer. One column below 1024px.
- **Rows:** `surface-muted`, 8px radius (the accordion-row radius, not Asset's
  4). The question is P3 and the plus turns into a cross. The answer is P2
  secondary and opens with the 240ms grid-rows transition. Any number of rows
  can be open. Each question is `h3 > button` with aria-expanded/aria-controls,
  and closed answers are inert.
- No FAQPage schema while /new is noindex; it's added at cutover with
  `lib/schema.ts`.

## Addendum · 2026-10-21 · /new final CTA and footer (section 9, built). Home complete.

**Final CTA (Asset's CTA, measured 2026-10-21).**
- A white Card padded 40 (24 on mobile), content at most 400px: eyebrow "Get
  started", H2 "Land with everything sorted" (the locked closing line), and
  "Open your free wallet today and add cover when you book your trip."
- 32px down: the primary "Open your free wallet" (wallet) and "Compare health
  plans →".
- Beside it, 16px away, the G1 aurora panel (4px radius, 360px tall; 280px stacked
  under the card on mobile) with an illustrative app home screen in the glass
  frame. The split is 58 : 42 from 1024px.

**Footer (Asset's layout, with the sitemap § 5 locked columns).**
- A white band with a top rule, padded 48 (40 on mobile). Left: the horizontal
  logo, the live site's blurb, and the app row.
- Right: Wallet / Health cover / Travel / Company / Transparency / Legal in a
  3 × 2 grid (two columns on mobile). Headings are P3; links are P2 secondary,
  12px apart.
- Under a rule: "Health cover is provided by Phillips HMO. Omanga is not the
  insurer.", © year, and Instagram.
- **The app row is `#download`**, the header's Download target. The app isn't in
  the stores (§ 8.6), so it says so and offers "Open the web wallet". No
  imitation store badges are drawn (trademark artwork).
- **Held back until confirmed:** "Licences" (Transparency) and the legal entity,
  RC number and address in the who's-who block (§ 8.3). Nothing invented.
- Legal links use the locked `/legal/*` paths, and Fees and Who provides what
  point at `/wallet#fees` and `/safety#who-provides-what`. All are under /new and
  resolve as those pages are built.

**Home complete.** All nine locked sections are built. The placeholder
component is deleted. The page composes sections from a
`Record<HomeSectionId, …>`, so a missing section is a type error. tsc, eslint and
`next build` are clean, and /new is static with an hourly revalidate (rates).

## Addendum · 2026-10-21 · Accordion open row: no border (owner)

The open row in "What Omanga does" lost its 1px ink border. It's now set apart
only by its white fill against the grey closed rows. With no border at all,
closed rows are 58px, exactly Asset's height. Updated in the design-system spec
and its sample.

## Addendum · 2026-10-21 · Hero fills the viewport (owner)

The hero is now exactly one screen, full width: `h-svh` with `min-h-fit`, so it
grows past the screen only when the content can't fit. Its content is centred
in the space under the 76px header. The fixed spacing (160 top, 64 to the
converter, 96 bottom) became height-aware clamps: top 76 + clamp(16, 4vh, 48),
sub → buttons clamp(20, 3.5vh, 32), buttons → converter clamp(24, 5vh, 64),
bottom clamp(24, 5vh, 64). Measured hero size = viewport at 1440×900,
2000×1043, 1280×720, 375×812 and 390×844, with the converter fully inside each
(the tightest is 8px clear at 375×812).

## Addendum · 2026-10-21 · Short section headers lengthened (owner)

The owner found two section headers too short beside the others' two-line
blocks. The copy was rewritten from approved facts only:
- **Steps:** "Sorted before you land" / "Set up from home in a few minutes.
  Everything's ready when you arrive." → "Three steps at home before you fly" /
  "A few minutes on your phone is all it takes. Your naira and your health
  cover are ready the moment you land." (The plan is bought before travel and
  the wallet funded in GBP/USD/CAD, per the approved FAQs.)
- **Countries:** "Omanga works across Africa" / "Hold, convert and pay in 50+
  African countries." → "One wallet for 50+ countries across Africa" / "Hold
  and convert your money, then pay online or in person wherever you travel.
  Today's naira rates are a tab away."
- Measured at 1440: all six section headers (sections 3–8) are now two lines of H2
  and two lines of sub. At 375: two lines of H2 and three of sub. "Land with
  everything sorted" stays only on the final CTA, so the story's closing line
  isn't spent earlier on the page.

## Addendum · 2026-10-21 · Menu links without icons (owner)

- The owner kept the new section copy (steps and countries headers).
- The header's mega-menu links lost their icon circles. They're now text-only
  P3 rows (10px vertical padding, `surface-muted` hover), still aligned under
  the column headings. The mobile sheet lists the same links and dropped its
  icons too, so the two menus match.
- `icon` is removed from the navigation content. The icon set stays for the
  Why Omanga tiles, and its name type moved into `NavIcon.tsx`. The
  design-system spec is updated.

## Hero background: crimson fabric (2026-10-21, live in /new)

- Preview: `design-lab/hero-fabric-bg.html`. Owner asked for an #AE2448 version of
  miyagami.com's hero background.
- Miyagami's is a live WebGL shader, not a video: a lit cloth surface with a
  long diagonal fold that sways in place, a shallower cross fold drifting the
  other way, a woven dot mesh (~3px) bent by the folds, film grain, and soft
  focus to the right. We keep the mesh and drop the film grain (owner,
  2026-10-21). Ours is our own shader that copies that behaviour, not their code.
- Jitter's MCP can't author shaders, so this is code rather than a Jitter
  file. Jitter's in-editor shader agent is the route if a Jitter version is
  wanted.
- Ramp: shadow brand-950 #360511, base brand-600 #AE2448, highlight brand-400
  #F46A82, backdrop #6E4A55.
- Primary button on this background: white fill, #1B1B1B label (owner,
  2026-10-21), as on Miyagami. A crimson fill blended into the cloth.
  #1B1B1B on white is 17.3:1.
- Owner's settings: speed 1, folds 1, texture 0.8, focus 0.8. Built into the
  /new hero as `HeroFabric.tsx` (shader in `heroFabric.glsl.ts`). It replaces
  the flat brand-950 and its top shade, and uses the existing `inverse`
  button. It runs at up to 30 fps, only while on screen, and shows one still
  frame for reduced motion.
- Contrast to watch: white sub text on the lightest folds (brand-400) is
  about 3:1.

## Feature motion scenes (2026-10-21)

- All five "What Omanga does" items play a Jitter scene in place of texture
  + glass + screen. Source: Jitter file "Omanga — Home page motion", one
  artboard per card (Wallet, Convert, Spend, Cover, Care).
- Files in `public/videos/home/`: `wallet-create.mp4` (7s, 0.9 MB),
  `convert.mp4` (10s, 1.4 MB), `spend.mp4` (11.5s, 1.7 MB), `cover.mp4`
  (7.6s, 1.0 MB) and `care.mp4` (7.3s, 1.0 MB). All are re-encoded from the
  Jitter exports to 1080×880 H.264 at about 1.1 Mbps. Each has an end-frame
  poster `.jpg`. Only the open row's video ever downloads.
- The scenes name no hospitals (owner question § 8.4) and show no fee or rate
  for paying abroad (§ 8.5). "$255 for 3 months" is the site's own
  trip-length sum (monthly price × months).
- `FeatureVideo.tsx`: muted, looped, inline, `preload="none"`. It plays only
  while its row is open and on screen, rewinds when the row opens, and keeps
  the poster for reduced motion. On phones it's zoomed 1.35× so the card
  stays readable.
- The scenes bake in today's rates (£1 = ₦1,780.11, $1 = ₦1,330.84), so
  they'll drift from the live converter. Re-export them if the gap grows.


## Feature motion scenes v2 (2026-10-22)

- Owner brief: five distinct scenes, one motion idea each, replacing the
  five near-identical "glass card on satin" v1 scenes. Jitter artboards
  `v2 · 01`–`v2 · 05` in "Omanga — Home page motion" (row below v1; v1 kept
  for reference).
  - 01 Wallet, convergence: GBP, USD and CAD tokens fly in on curved paths
    (an X move and a Y move with different easings) into empty wallet slots
    and become balance rows. 8.6s.
  - 02 Convert, precision: sell 1.2400 and buy 1.2600 markers separate on a
    scale, the 1.2500 midpoint resolves between them, then £1,000 → $1,250,
    a "Review and confirm" button (not pressed) and "Rate updated hourly". 9s.
  - 03 Spend, travel: Africa outline (our own simplified coastline,
    equirectangular) masks in, Lagos and Nairobi pins, a payment dot rides
    a bezier path while the route draws behind it, then "Payment successful"
    and sparse coverage dots. 9s.
  - 04 Cover, selection: one selection frame glides Silver → Gold → Diamond,
    the trip length toggles to 3 months, and it settles on Silver with
    "$150" (monthly price × months, the site's own rule). 9s.
  - 05 Care, guided progression: search, a path from "You" to an H pin, a
    placeholder "Your network hospital" card with "Check your plan category"
    (no eligibility claim, no hospital name), then three care steps. 9s.
- Deviations from the brief: canvas stays 1080×880, not 16:9, because the
  panel beside the accordion is about that shape and the video is
  object-cover. Brand colour is the design system's #AE2448, not the
  brief's #73303A. Background is warm neutral #F4F1ED with a soft glow; the
  U2 satin photo is no longer baked in.
- Every scene starts and ends on the empty canvas, so the loop doesn't jump.
- All amounts and rates are illustrative and labelled "Example" where they
  could be read as live.

## Feature motion v3 · wallet (2026-10-22, approved direction)

- Owner rejected v2. v3 is a real product demo: the U2 satin photo, a white
  glass-framed card that expands from the centre and collapses at the end, and
  the "You" cursor making real clicks (USD, CAD, View all balances). Jitter
  artboard `v3 · 01 Wallet`.
- Pacing and easing follow claritybusinesstravel.com's "A closer look"
  section: a camera group pushes in 1.1× towards the chips for the two
  currency clicks, pulls back for the button and drifts 1.035× on the result.
  The satin drifts 1 → 1.03 → 1 across the loop. Curves are Béziers taken
  from Clarity's files: camera (0.71, 0, 0.29, 1), UI moves (0.65, 0, 0.35, 1),
  arrivals (0.36, 0, 0.03, 1). The loop is 11.6s.
- Cursor (owner said too slow): moves take 380–700ms on (0.45, 0, 0.1, 1),
  a quick start and a long settle. Press 80ms, release 180ms.
- Delivery: a Lottie (vector, 60fps), not MP4, so the panel stays sharp.
  Export the `v3 · 01 Wallet · Lottie test (transparent)` artboard. It has no
  satin, because the page already draws the U2 texture behind the panel. It's
  328 KB, and text and flags are vector shapes.
  - Use lottie-web's SVG renderer. The canvas renderer drew nothing in
    testing.
  - No blur effects in Lottie scenes. A blur on one layer softened the whole
    card in the SVG renderer, so every blur-slide is now a plain slide and
    fade.
- Export from the owner's own browser. Exports from the built-in browser come
  out watermarked because it isn't signed in to the paid plan.
- Wired in on /new (2026-10-22): `FeatureLottie.tsx` plays
  `public/lottie/home/wallet.json` over the panel's U2 texture. It behaves like
  `FeatureVideo`: it plays only while its row is open and on screen, rewinds
  when the row opens, loads once the panel is within 400px of the viewport,
  and holds frame 594 (the all-balances result) for reduced motion. Phones
  keep the 1.35× zoom. `lottie-web` is pinned at 5.12.2.

## Feature motion v3 · convert (2026-10-22, awaiting approval)

- Artboard `v3 · 02 Convert`, with the same shell, camera and cursor as the
  wallet. Three interactions: click "You convert" and type £1,000; open the
  currency menu and pick USD (You get resolves to $1,250.00, the
  "1 GBP = 1.2500 USD · Midpoint rate" line appears and the button turns from
  disabled grey to crimson); then "Preview conversion", which opens a review
  with sell 1.2400, buy 1.2600, midpoint 1.2500, "Rate refreshes every hour"
  and an unpressed "Confirm conversion".
- Rates are illustrative and consistent: midpoint = (1.24 + 1.26) / 2, and
  £1,000 × 1.25 = $1,250.
- Revised (owner, 2026-10-22): converts USD → NGN. Type $500, pick NGN from
  the menu (NGN or GBP) and get ₦665,000.00 at a midpoint of ₦1,330.00
  (sell ₦1,320.00, buy ₦1,340.00). Then Preview conversion, then Confirm
  conversion, ending on "Conversion complete" (₦665,000.00 is now in your
  NGN balance) with a Done button. Both "Rate refreshes hourly" notes are
  removed. The loop is 12.8s; wired in as `public/lottie/home/convert.json`,
  with frame 760 for reduced motion.

## Feature scenes: no outro (owner, 2026-10-22)

- Scenes don't animate out. They end holding the result (wallet: all
  balances; convert: success) and the loop restarts on the card expanding
  from the centre. The camera stays pushed in at the end. The satin still
  drifts back to scale 1. Wallet is now 10.6s.
- The phone panel in the accordion is 360px tall from 640px, and Lottie
  scenes fit (`meet`) rather than cover, because cover cropped the card at
  tablet widths.
- Jitter exports one artboard at a time. Lottie copies are
  `v3 · 0N … · Lottie (transparent)`; rebuild them after editing the main
  artboard.

## Feature motion v3 · spend (2026-10-22, awaiting approval)

- Modelled on Clarity's "Duty of care" visual (owner reference): a larger card
  (840×640) titled "Spend" with a "50+ countries" chip, a real map panel and
  an overlaid list card. Artboard `v3 · 03 Spend`, 11s, no outro.
- Map: Natural Earth 1:50m admin-0 countries and rivers (public domain,
  v5.1.2 via jsDelivr), equirectangular, 6.34 px/degree at the continent
  view. The Gulf of Guinea countries keep fine detail (0.012°); the rest of
  Africa is simplified to 0.09° and its neighbours to 0.2°, about 3,800
  points in total. Land #EEEBE7 (neighbours #E6E3DF), sea #C9D5E3, borders
  and rivers #D2DAE3.
- Story: the map opens 11.05× zoomed on Lagos and Accra. Two avatars (Tolu
  in Lagos, Kofi in Accra) are joined by a route, and a "2 payments" list
  slides in. Click Kofi: the card shows his payment (GH₵180.00, from USD
  balance, Paid), his avatar gets a crimson ring and a ✓ badge, and the
  camera pushes in. Click "See where you can pay": the people fade, the map
  zooms out to the continent, 17 city pins pop in, and the card ends on
  "50+ countries · Pay online or in person from your wallet balance" with
  five flags and "+45".
- Gotcha: a scale animation multiplies the layer's own scale. "Map world"
  sits at scale 11.05, so its zoom-out runs 1 → 1/11.05, with a move of
  (−2225.42, −312.68). The zoom uses ease (0.3, 0.85, 0.25, 1) so it feels
  even: linear scale lingers close in, then snaps at the end.
- Avatars: Unsplash photos (free licence), cropped to faces. The Lottie
  embeds them, so nothing is hotlinked on the site. Names, amounts and the
  payment are illustrative.
- Revised (owner, 2026-10-22): the owner disliked the zoom-out ending. It
  now follows Clarity's "Duty of care" sequence, studied frame by frame from
  their Lottie: the map opens on the whole continent and zooms in (1×→11.05×,
  ease 0.75, 0, 0.35, 1), then the route, two avatars and the "2 payments"
  list. The cursor clicks Kofi. The whole map card (now grouped as
  "Map scene") shrinks to 0.94 and fades, and a new compact card (520×424)
  grows in from 0.6 at the centre: Kofi · Paid in Accra, Ghana; a LOS → ACC
  route bar with a ₵ coin travelling along it; Amount GH₵180.00, Paid from USD
  balance, Status Paid; and a "Share receipt" button the cursor clicks, which
  fills crimson. The coverage pins and the zoom-out are removed. 10.6s, no
  outro.
- Revised again (owner, 2026-10-22): the second card appears instantly on the
  click, fully built, with no grow-in or staggered build. The wallet model,
  per the owner: you hold a separate wallet per currency, convert (e.g. USD →
  NGN) and send naira to anyone. So the list is "Naira sent" (Tolu ₦13,300.00,
  Kofi ₦8,000.00), the click lands on Tolu, and the card reads "Sent to Tolu ·
  Lagos, Nigeria", USD → NGN bar, Amount ₦13,300.00, Converted from $10.00
  USD (₦1,330 midpoint, matching the Convert scene), Status Sent, then Share
  receipt. 9.4s.
- Spend wired in (2026-10-22): `public/lottie/home/spend.json`, 9.4s, with
  frame 556 for reduced motion. Its card is wider than the others, so phones
  zoom it 1.05× (`phoneZoom`) instead of the 1.35× default.

## Feature motion v3 · health cover (2026-10-22, awaiting approval)

- Artboard `v3 · 04 Cover`: the standard 560×472 card, with the camera and
  cursor as in Wallet. Silver / Gold / Diamond tabs with a sliding thumb,
  "Monthly price", "Months in Nigeria" chips (1 / 3 / 6), a "Total for N
  months" line and Continue. Clicks: Diamond ($120 a month), then Gold ($85),
  then 3 months (total $255, the site's monthly price × months rule), then
  Continue. That switches instantly (as the owner wants for second cards) to
  "Review your cover · Provided by Phillips HMO": Gold, 3 months, $85
  monthly, $255 total, "Paid monthly from your USD wallet", and an unpressed
  "Continue to payment". No policy issuance and no coverage claims. 10s, no
  outro.
- Cover wired in (2026-10-22): `public/lottie/home/cover.json`, 10s, with
  frame 590 for reduced motion.
- Export gotcha: after one download, the built-in browser blocks further
  downloads from the same tab. Open each export in a fresh tab.

## Feature motion v3 · network hospital (2026-10-22, awaiting approval)

- Artboard `v3 · 05 Care`: the standard card, camera and cursor, with both
  switches instant (owner rule for second cards). Clicks: the search field
  ("Search by area"), where it types "Lagos" and "3 network hospitals near
  Lagos" appear (placeholder names "Network hospital · Ikeja / Lekki / Yaba";
  two tagged "In your plan", one "Other category"); then Ikeja, which opens
  "In your plan's category" and the three care steps (Visit the hospital ·
  Phillips HMO coordinates your care · Get support through your plan); then
  "Show my cover", which ends on "Your cover · Show this at reception": Gold,
  Phillips HMO, 3 months, Active. "Phillips HMO handles your care through its
  network." 10s, no outro.
- No real hospital names, no member ID and no claim about which categories
  a plan includes.
- Care wired in (2026-10-22): `public/lottie/home/care.json`, 10s, with frame
  590 for reduced motion. All five "What Omanga does" rows now play Lottie
  scenes, so `FeatureVideo.tsx`, the `video` field and the accordion's MP4
  branch are removed. `public/videos/home/` (v1 MP4s and posters, about
  7 MB) is no longer referenced.

## Addendum · 2026-10-22 · /new/wallet hero (section 1, built)

- **Next page is About the wallet** (§ 6.2), at `/new/wallet`. Copy is in
  `new-redesign/content/wallet.content.ts`.
- **Owner answers:** in person you pay by transfer, and leftover naira can be
  converted to dollars. Currencies and fees are still to come. Cards stay
  unmentioned. Recorded in the research doc §§ 6.2 and 8.
- **Hero, after Nova (owner: "something simple"):**
  - The grey page, centred, with no 3D shapes.
  - Eyebrow link: today's "£1 = ₦… today · See all rates →" from the hourly
    rate snapshot.
  - H1 "Travel money, / ready when you land", a sub naming pounds, dollars and
    Canadian dollars, mid-market rate and transfer, and one primary "Open your
    free wallet →".
  - The app's home tab in a phone, cut off by the section's bottom rule.
- **Phone mockup:** the owner's find, open-design's `mobile-app` seed
  (Apache-2.0), was ported to `PhoneFrame`. It's pure HTML/SVG (no device
  artwork to license), scales via `--phone-scale`, and the screen is written in
  real iPhone points. `AppHomeScreen` rebuilds the app's home tab from the
  owner's screenshot:
  - The name becomes "Hi there".
  - The first row is £100 at today's rate, and times are "Today".
  - The tab bar isn't drawn, because the real one has a Cards tab (§ 8.2).
- **Header:** transparent with dark text and the colour logo on every page
  except home. The home hero keeps white text.
- Checked at 1440 and 375: no horizontal scroll, phone 312 wide on mobile,
  home header unchanged. tsc and eslint clean.

## Addendum · 2026-10-22 · Wallet hero phone matches the real app

- The app (omanga-mobile) was run in the iOS simulator. `AppHomeScreen` now
  uses the app's own specs, read from `src/features/dashboard` and checked
  against the running home tab:
  - Inter type and the app's light-theme hex colours.
  - A 36pt avatar and a 17pt semibold greeting.
  - A pill chip with an 18pt flag.
  - The balance at 42pt bold, −1 tracking.
  - 56pt discs in 80pt columns, with Add money in crimson.
  - A #FAFAFA transactions card with 16 radius, 40pt marks on #E8E5E6, and
    15/13pt rows with the rule inset 52.
  - The Material glyphs the app uses.
- **Inter is added only as `--font-app`** (not preloaded), for app screens
  inside the PhoneFrame. The site's typeface is still Host Grotesk alone.
- Still off the site: the first name and initial (shown as "Hi there" and a
  person glyph), payees, and the Cards tab.

## Addendum · 2026-10-22 · Wallet hero eyebrow as a pill (owner)

- The rate eyebrow follows the owner's reference: a white pill with a soft
  shadow (no border), a 6px grey dot, and the label "£1 = ₦… today" in P2 ink.
- The whole pill links to /rates. "See all rates →" was removed from view and
  lives in the link's accessible name.
- Spec updated in design-system.html.
- Revised the same day (owner): the pill now holds a sentence, "£1 is ₦… at
  today's mid-market rate." ("£1 is ₦… today." below 640px), and "See all
  rates →" is back as a P3 accent link inside the pill, after a hairline. It
  says "is", not "gets you", until the conversion fee is confirmed (§ 8.5).
- Removed the same day (owner): the wallet hero has no eyebrow at all. It
  opens on the H1. The rate copy and the pill spec are deleted.

## Addendum · 2026-10-22 · /new/wallet proof strip (section 2, built)

- Follows the owner's reference: a dark `surface-inverse` band straight under
  the hero, so the cropped phone ends on it.
  - Four items in a row from 1024px, two columns below.
  - Each item is an H3 title in white over P1 in `text-inverse-secondary`
    (9.27:1).
  - No icons or dividers.
  - A hidden H2 ("Wallet facts") keeps the heading order.
- Copy (`walletProof`): "Pay in 50+ countries", "Add from 3 currencies",
  "₦20 per transfer", "Free to open", each with one line of detail. All four
  are already stated on the site.
  - The plan's "6+ currencies" became "3" (GBP, USD and CAD) until the owner
    confirms the list (§ 8.5).
- Spec added to design-system.html first. Checked at 1440 and 375 with no
  horizontal scroll and no console errors. tsc and eslint clean.
- Revised the same day (owner): the reference was for structure only, so
  the strip is on the page grey (`bg`) with ink titles and secondary text,
  not a dark band.
- **The hero shows the whole phone (owner).** There's no crop and no bottom
  rule.
  - The phone is 359 × 776 from 768px and 312 × 675 below.
  - The screen now runs on to the app's "Coming soon" insurance card, cut by
    the screen edge as in the app.
  - The card is drawn from insurance-promo-card.tsx with the app's own photo
    (Lawrence Crayton, Unsplash; not used elsewhere on the site), copied to
    `public/photos/wallet/`.

## Addendum · 2026-10-22 · Wallet hero: phone in a satin box (owner)

- After the owner's product-in-a-box reference, the phone now stands in a
  box of the U2 crimson satin (`bg-flowing-waves-u2.jpg`, the owner's second
  reference).
  - The box spans the full content width, with a 4px radius.
  - It's 600px tall, 440 on mobile.
  - The phone sits 64px from its top (40 on mobile), and the box's bottom
    edge cuts it off below the transactions.
- The proof strip follows under the box, on the page grey, as in the
  reference.
- Spec updated in design-system.html. Checked at 1440 and 375 with no
  horizontal scroll and no console errors. tsc and eslint clean.
- Revised the same day (owner): the box now runs the home hero's moving
  crimson fabric (`HeroFabric`, WebGL) in place of the still U2 photo. It has
  a brand-950 fill until WebGL starts. The fabric already draws only while on
  screen, caps at 30 fps and holds a still frame under reduced motion.
- Revised the same day (owner): the phone's black metal bezel is now the
  design system's glass (the home cards' white 18% fill, 1px white 38% edge,
  10px backdrop blur, float shadow), so the fabric shows through the rim. The
  side buttons use the glass edge colour, and the Dynamic Island stays black.
- Revised the same day (owner): on desktop (1024px and up) the phone sits
  96px from the top of the box, up from 64. Tablet stays at 64 and mobile at
  40.

## Addendum · 2026-10-22 · /new/wallet "What you can do" (section 3, built)

- Follows the structure of the owner's reference, on the page grey:
  - The section header (eyebrow, H2 "Everything your trip money needs, in
    one app", sub).
  - Three rows 96px apart (64 on mobile) that alternate the panel left,
    right, left. On mobile the panel comes first.
- **Six tiles folded into three rows:**
  - Add money and hold each currency (→ Countries).
  - Convert at the mid-market rate (→ Exchange rates).
  - Send and pay in naira by transfer (→ `/wallet#fees`, section 5, still to
    be built).
- **Panels:** the still U2 satin, 4 : 3, with an app card in the glass frame
  at 76% width. The card is at least 110% of the panel tall, so the bottom
  edge always cuts it. The still image is on purpose: the page runs one
  animation, the hero's.
  - Cards use the app's look (Inter, the app's colours and row scale, shared
    from `AppUi.tsx` with the hero phone).
  - "Your wallets" shows GBP, USD, CAD and NGN with illustrative balances.
    Names are hidden below 640px.
  - "Review conversion" uses today's rate, with no fee row because the fee is
    unconfirmed.
  - "Transactions" shows a paid-by-transfer, a bank send and their ₦20 fees.
- **Text:** H3 in the H2 style, P1 secondary and a secondary button, so the
  hero keeps the only primary.
- **Not used:** the app's code has a mobile-money send option. It's left off
  the site until the owner confirms it's live.
- Spec added to design-system.html first. Checked at 1440 and 375 with no
  horizontal scroll and no console errors. tsc and eslint clean.

## Addendum · 2026-10-22 · Phone frame is the owner's rectangle

- `PhoneFrame` is now the owner's Figma rectangle: 309 × 675, 30px radius,
  6px solid black stroke outside, with the screen as its fill. The bezel,
  side buttons and glass are gone. The status bar, Dynamic Island and home
  indicator are drawn as part of the screen, as a screenshot shows them.
  Screens are written at 390 × 852 iPhone points and scaled to fit.
- The wallet hero uses it at full size from 768px (278 × 608 below). Measured
  on /new/wallet at 1440: 309 × 675, 30px radius, 6px black stroke.
- Section 4 ("How you pay in person") will place the same frame in the
  centre with two steps on each side (owner wireframe). Its screens are
  being storyboarded in Jitter ("Omanga · Pay in person walkthrough"):
  - Step 1 (5 screens): home, convert, review, PIN, converted.
  - Step 2 (5 screens): home, recipients, method (bank only), bank details,
    name checked.
  - Step 3 (3 screens): amount, review, PIN.
  - Step 4 (3 screens): sent, receipt, share sheet.
  The flow is taken from omanga-mobile `src/app/convert` and `src/app/send`.
- Revised the same day (owner): the frame's 6px border is glass, not black
  (white 18% fill, 1px white 38% edge, 10px blur, float shadow), and the
  Dynamic Island is removed. Measured: a 309 × 675 screen inside a 321-wide
  glass border.
- Jitter storyboard set up: 16 artboards at 309 × 675, one row per step, each
  holding the screen's name and contents as a placeholder. File: "Omanga · Pay
  in person walkthrough" (jitter.video/file/?id=CgV5WOswWoMGKIf1IuNM9067).
  The screens themselves come next.

## Addendum · 2026-10-22 · Pay-in-person walkthrough: real app screenshots

- All 16 storyboard screens were captured from the real Omanga app on a
  separate simulator ("Omanga Mock iPhone 17 Pro") running against a local
  mock backend with placeholder data:
  - The user is "Ada Doe", with GBP £450 / USD $300 / NGN ₦248,500.
  - The recipient is "Musa Major" at Moniepoint, 0123456789.
  - The rate is £1 = ₦1,784.93.
  - The status bar shows 9:41.
  - The mock and its notes live outside both repos, in the session scratch
    folder.
  - Your own simulator, your session and the omanga-mobile repo were not
    touched.
- Files: `design-lab/walkthrough/*.png` (1206 × 2622 originals) and
  `design-lab/walkthrough/jitter/*.jpg` (618 × 1350, 2× the 309 × 675 frame).
  The story runs: £100 → ₦178,493 conversion, then ₦8,500 to Musa Major
  plus a ₦20 fee, then the receipt and share.
- **App issues found while shooting** (owner to decide; nothing changed in the
  app):
  - Convert shows "1 NGN = £0.0006" for GBP → NGN. `formatRate` always writes
    "1 {target} = {source symbol}{rate}".
  - The conversion receipt shows "Transaction fee – £0.00", which reads as a
    free-conversion claim while the fee is unconfirmed.
  - Conversions are titled "Currency swap" in history.
  - The amount screen says "Usually arrives in seconds" (a speed claim).
  - The home screens (1.1, 2.1) show the tab bar's **Cards** tab, which the
    site can't mention yet.
- **Incident:** one sign-in attempt reached the live backend before the mock
  was wired correctly. The app loaded the default bundler on 8081, and a fake
  number (+234 08000000001) got "OTP Request failed". Fixed by pointing only
  the mock simulator's app at port 8082 (`RCT_jsLocation`). The bundle was
  checked to carry the mock URL before anything else was typed.
- The owner placed all 16 screenshots in the Jitter storyboard, one per
  frame, each matching its file (checked 2026-10-22). The images sit at
  278 × 605, inset 15 / 35 inside the 309 × 675 frames, rather than filling
  them.
- Revised (owner): every screenshot now fills its frame at 309 × 675, from
  0, 0 (all 16 checked). The Cards tab still shows on 1.1 and 2.1 and will be
  covered when those screens are animated.

## Addendum · 2026-10-22 · /new/wallet "How you pay in person" (section 4, built; videos pending)

- **Jitter clips:** four "Clip" artboards (309 × 675) in "Omanga · Pay in
  person walkthrough", built from the real screenshots.
  - Each step holds a screen for 1.6s. A soft tap ring (36px, ink at 25%)
    grows on the button, then the next screen slides in from the right
    (380ms).
  - Screens that change in place crossfade (320ms): PIN → converted, bank
    details → name checked, receipt → share.
  - A white cover hides the Cards tab on the home screens.
  - Lengths: steps 1–2 are 8s, steps 3–4 are 4.8s. They're exported as MP4
    at 2×.
- **Site:** `WalletPayInPerson` + `WalkthroughPlayer`.
  - From 1024px the phone frame sits in the centre (bare mode: the clip
    fills the screen with no drawn status bar), with steps 1–2 on the left
    and 3–4 on the right.
  - Each step has a 2px timer track, a number, an H3 and P2. The active step
    is ink; the rest are at 45%.
  - The timers run on each clip's known length and restart the video. Then
    the next step starts, looping after step 4. Clicking a step plays it.
  - Nothing runs off screen. Under reduced motion nothing autoplays.
  - Below 1024px the phone (0.85 scale) sits above the stacked steps.
- **Posters:** each clip's first frame, in `public/photos/wallet/walkthrough/`.
  The home posters have the Cards tab covered.
- **Videos still to add:** `public/videos/wallet/pay-step-1.mp4` … `-4.mp4`.
  Until then the posters show (one expected 404 per step).
- Spec added to design-system.html first. Checked at 1440 and 375 (timers fill
  and advance, no horizontal scroll). tsc and eslint clean.
- Revised the same day (owner): the clips ship as **Lottie, not video**.
  - All four were exported from Jitter in the owner's signed-in Chrome, so
    there's no watermark: 309 × 675, 60 fps, screens embedded, 296–504 KB
    each.
  - They're at `public/lottie/wallet/pay-step-1.json` … `-4.json` and play
    with lottie-web's SVG build, like the home feature scenes.
  - Each step's clip loads when it becomes active, with the poster showing
    until it's ready.
  - A fresh load of /new/wallet has no errors or failed requests, and step 1
    hands over to step 2 after its 8s.
- Revised the same day (owner): the walkthrough phone has a **solid black 6px
  bezel**. It uses `PhoneFrame`'s new `bezel="black"`; the default stays
  glass, so the hero is unchanged. Measured: walkthrough #000 with 6px, hero
  white 18% with 5px + 1px edge, both 321 wide.
- The raw screenshots stay local only. `/design-lab/` was already ignored,
  and `/design-lab/walkthrough/` now has its own named `.gitignore` line.
- Revised the same day (owner reference): the **active step lifts into a
  white card** (2px radius, padded 24) with a new `--shadow-raise` token
  (0 24 48 at 12% plus 0 2 6 at 6%, tinted ink). It fades in over 240ms.
  Inactive steps keep the same padding, flat at 45%, so nothing shifts as the
  steps advance. Measured on /new/wallet.
- Revised the same day (owner): every step has a P3 accent **"Download now →"**
  link, 20px under its text. It goes to the header's Download target
  (`/new#download`, the footer app row) until store links exist (§ 8.6). The
  card is now the `li`, with the step button and the link as siblings, because
  a link can't nest inside a button.

## Addendum · 2026-10-22 · /new/wallet section 5 (fees) dropped (owner)

- On Mobbin, only Wise shows a dedicated fee table, and it sits on Wise's
  separate Pricing page. Other apps, and Wise's own homepage, show the fee
  inside the converter. The owner felt a full table would reveal more than
  needed while fees aren't settled.
- The confirmed fees still show: "₦20 per transfer" and "Free to open" in the
  proof strip, and "What does it cost?" goes in the FAQ (section 11).
- Links re-pointed:
  - Section 3's third row: "See all fees" → "See how you pay in person"
    (`/wallet#pay-in-person`).
  - Footer Transparency "Fees" → `/wallet#faq` (the FAQ answer, once section
    11 is built).
- The research doc § 6.2 marks row 5 as dropped.

## Addendum · 2026-10-22 · /new/wallet rate explainer (section 6, built)

- As wireframed: two columns from 1024px (text first when stacked).
- **Left:** the header ("The real rate, shown before you convert"), then
  three points:
  - what the mid-market rate is;
  - why a bureau's rate looks different (kept general: no names, no rival
    rates);
  - that the app shows the rate and naira amount before you confirm.

  Then "See all rates →" to `/rates`.
- **Right:** the U2 satin panel with a white rate card in the glass frame:
  GBP, USD and CAD to NGN at two decimals from the hourly snapshot, plus the
  snapshot date. It's the site's own UI, not an app screenshot, because the
  app's review screen prints GBP → NGN backwards.
- Checked at 1440 (£1 = ₦1,784.93, $1 = ₦1,332.27, C$1 = ₦949.24) and 375
  with no horizontal scroll. tsc and eslint clean. Spec added to
  design-system.html first.

## Addendum · 2026-10-22 · /new/wallet countries band (section 7, built)

- As wireframed, kept compact because home has the full directory. It's one
  white Card: on the left the eyebrow, H2 "Pay in 50+ countries across
  Africa" and a sub; on the right, overlapping 40px flags with a 2px white
  ring, a "+39" ink disc and "See all countries →" (`/wallet/countries`).
- The flags are the 11 countries home names, and "+39" makes up the 50+. The
  full list is still owner question § 8.5. A visually hidden sentence names
  the countries; the flags are decorative.
- Fix: the "+N" disc is `relative`, so it paints above the positioned flags.
  Before, the "+" sat under South Sudan's flag on mobile.
- Checked at 1440 and 375 with no horizontal scroll. tsc and eslint clean.
  Spec added to design-system.html first.
- Revised the same day (owner):
  - The band is now **full width**: a white `section` with rules above and
    below, content in the page column. It's no longer a card.
  - From 1024px a paired-row grid puts the **flags on the heading's line**
    and the link on the sub's line. Measured: heading and flags both centred
    at 209px, sub and link at 264px.
  - On mobile the flags overlap by 16px, so all twelve fit one row (right
    edge 320 at 375, no horizontal scroll).

## Addendum · 2026-10-22 · /new/wallet countries, rebuilt as a globe + list (section 7)

- The owner picked Cartesia's "Fluent and native, worldwide" section
  (mobbin.com/sites/sections/9845df3f-…). It **replaces** the full-width flag
  band above. Spec: design-system.html § Country globe (it replaced § Country
  band).
- Layout: SectionHead, then one bordered card. From 1024px it has two
  columns, 5fr : 4fr. Left is the globe; right is the "Where you can pay"
  list (11 rows: flag, name, →) and "See all 50+ countries →"
  (`/wallet/countries`). On mobile the list stacks under the globe.
- Asset: searched Magnific first, as the owner asked. "3D Abstract dotted
  globe" (stock #3078286) was the closest match, Africa-facing, and was
  downloaded on the owner's Magnific Premium (150 credits, owner approved).
  The circle was masked out to cut the stock caption and floor shadow, then
  saved as a transparent 960px WebP:
  `public/photos/wallet/globe-dots.webp` (378KB).
  The sphere under it is CSS (white to neutral-100 radial, float shadow), so
  it follows the tokens.
- Markers are percentage positions on the image (`at` in
  wallet.content.ts). They were placed by overlaying test dots on the
  processed globe. Sierra Leone was moved onto the coast.
- Motion: the active country cycles every 2.4s. Its marker grows and pings,
  and a white chip (flag + name) slides beside it. Hovering or focusing a row
  sets the active country, and the pointer on the list holds the cycle.
  Reduced motion stops the cycle and the ping.
- Every row links to the countries page until per-country pages exist.
- Checked at 1280 and 375 (no horizontal scroll). tsc and eslint clean.

## Addendum · 2026-10-23 · Countries globe, revised (section 7)

- Owner asked for three changes:
  - **Full-width white section, no card.** WalletCountries renders its own
    `section.section-y.bg-surface` instead of `Section`. The card border and
    the column rule are gone.
  - **No auto-advance.** The 2.4s cycle was removed. Hovering or focusing a
    row is the only way to pick a country; Nigeria starts picked.
  - **A real 3D globe that moves slightly and loops**, like the reference.
- Library: **cobe 2.0.1** (shuding/cobe, MIT, about 5KB, no dependencies).
  It draws the dotted globe in WebGL. react-globe.gl was ruled out: it pulls
  in three.js, a 17MB package, for the same look.
  - cobe v2 has no `onRender`. The component runs its own rAF and calls
    `globe.update({ phi })`. phi = Africa-facing angle + 0.3·sin(t / 14s · 2π).
  - The rAF runs only while the canvas is on screen (IntersectionObserver).
    Under reduced motion the globe stays still.
  - Markers now use real lat/lng (`location` in wallet.content.ts) in place of
    the hand-placed percentages.
  - The chip is pinned to the picked marker with CSS anchor positioning, using
    cobe's `--cobe-{id}` anchors. Browsers without anchor support hide the
    chip, and the row highlight still shows the pick.
- `public/photos/wallet/globe-dots.webp` (the Magnific globe, 150 credits) is
  no longer used. It's kept in case the owner wants a static fallback.
- Checked at 1280 (hover moves the chip, globe sways) and 375 (no horizontal
  scroll). tsc and eslint clean. Spec updated in design-system.html.

## Addendum · 2026-10-23 · /new/wallet leftover naira (section 8, built)

- Built as wireframed. Spec: design-system.html § Leftover converter.
  - Left: the "Going home" header, three numbered steps and "See today's
    rates →".
  - Right: a white card converting a fixed ₦50,000 example into dollars at
    the live USD rate, from the same hourly snapshot as section 6. At build
    time that was $37.53 at ₦1,332.
- A plain card, not the satin panel, so it doesn't repeat section 6 two
  sections later.
- Claims stay within the owner's answer: leftover naira can be converted to
  dollars. Step 3 ("keep them in your dollar wallet") rests on the
  per-currency wallets and still needs the owner to confirm. Sending dollars
  to a bank at home is **not** claimed: it's unconfirmed.
- The footnote date uses non-breaking hyphens, so it doesn't split on mobile.
- The unused Magnific globe WebP was deleted (owner, 2026-10-23).
- Checked at 1280 and 375 (no horizontal scroll). tsc and eslint clean.
- Revised the same day (owner): the card now uses the home hero converter's
  layout. There are two fields (naira wallet with a strong border over the
  dollar wallet on surface-muted, H2 amounts, flag + code on the right) with
  the hero's round convert icon on the seam. Here the icon is decorative, not
  a swap button. The rate moved to a "Mid-market rate" detail row, so the
  footnote now reads "Example amount · rate updated hourly · date". The spec
  was updated.

## Addendum · 2026-10-23 · /new/wallet safe at every step (section 9, built)

- Built as wireframed: section header, three icon Cards (the large NavIcon:
  lock, list, shield) in a row from 768px, then "Is Omanga safe? →"
  (`/safety`). Spec: design-system.html § Safety cards.
- Copy rewritten with the copywriting skill:
  - Third card: the owner rejected "message us on WhatsApp" for a security
    point, since a chat app is a support route, not a safeguard. It's now
    "Your codes stay with you", built from the safety page's approved tips
    (keep your PIN and codes private; sign in only through the app or
    omanga.biz). Contact routes stay on /safety.
  - Second card names what the review screen shows: the rate, the ₦20 fee
    and who you're paying.
  - The sub now covers both halves: approve, then see.
- Open: "Your PIN approves every payment" is [NEW] and needs the owner to
  confirm that the app asks for a PIN on every payment. Who holds the funds
  is still left out (unconfirmed; the operator stays off public pages).
- Checked at 1280 and 375 (no horizontal scroll). tsc and eslint clean.
- **Dropped the same day (owner):** competitors rarely give safety its own
  section on a product page. The component, its content and the § Safety
  cards spec are removed. Safety stays on /safety and in the FAQ (section
  11). The PIN claim is no longer on the page, so it needs no confirmation.

## Addendum · 2026-10-23 · /new/wallet pair it with cover (section 10, built)

- The owner asked for the home final CTA's UI in place of the crimson banner
  in the wireframe. The home panel is now one shared component,
  `new-redesign/components/ui/CtaPanel.tsx`. HomeFinalCta is a thin wrapper
  around it (it renders the same as before) and WalletCover is a second one.
- Wallet version:
  - Eyebrow "Health cover", H2 "Add health cover for your time in Nigeria",
    and text naming Silver, Gold and Diamond from $50 a month, with Phillips
    HMO as the provider.
  - Primary "Compare plans" (/health-cover/plans) and secondary "How health
    cover works →" (/health-cover).
  - The panel uses the **U3 dark fabric** with home's "Your plan" screen. U3
    keeps it apart from the page's closing band, which will use G1 like home.
  - All facts are approved home copy.
- Checked at 1280 and 375 (no horizontal scroll). The home final CTA still
  renders. tsc and eslint clean. The § Final CTA spec now notes the shared
  component.
- **Dropped the same day (owner):** insurance pulls a payments page off
  topic, and the panel read as a final CTA before the FAQ. WalletCover and
  its content are removed. Health cover becomes one text link in the closing
  band. `CtaPanel` stays: home uses it, and the wallet closing band will.

## Addendum · 2026-10-23 · /new/wallet FAQ (section 11, built)

- Uses the home FAQ's UI, as the owner asked, so there was no wireframe.
  `FaqList` now takes `items`: home passes its own questions and the wallet
  page passes `walletFaq`. Home still shows the same 8 rows.
- Eight questions, all approved copy, nothing new:
  - five from content/payments-faq.content.ts;
  - the wallet half of "Is Omanga safe to use?" from the safety page;
  - two owner answers from 2026-10-22, worded as sections 4 and 8 put them:
    pay in person by bank transfer, and convert leftover naira to dollars.
- Health-cover questions stay on home and /health-cover. The section has
  `id="faq"`, so the footer's Fees link lands here.
- Checked at 1280 (rows open) and 375 (no horizontal scroll). tsc and
  eslint clean.

## Addendum · 2026-10-23 · /new/wallet closing band (section 12, built)

- Uses the shared `CtaPanel` with the G1 aurora, like home's final CTA.
  - Copy: "Get started", H2 "Your naira, ready before you land", and text
    on opening in a few minutes (approved home copy), adding pounds or
    dollars, and paying by transfer.
  - Primary "Open your free wallet" (WALLET_URL), the page's one filled
    action.
  - Secondary "Add health cover for your trip →" (/health-cover/plans) is
    the only place this page mentions cover.
- Screen: an illustrative "Your wallet" with balances only (naira, pounds,
  dollars). There's no cover row and no status line, so the panel stays on
  payments.
- The wallet page now runs: hero, proof, features, pay in person, rate,
  countries, leftover naira, FAQ, closing band. Sections 5, 9 and 10 were
  dropped.
- Checked at 375 (no horizontal scroll). tsc and eslint clean.

## Addendum · 2026-10-23 · Hero first paint and pre-commit cleanup

- The owner saw the old dark hero background on first load: the flat
  brand-950 section fill, which showed while the fabric faded in over 700ms.
  Changes:
  - The fill is removed from the home hero section and the wallet hero box.
  - The fade-in is removed from HeroFabric.
  - The canvas now carries `bg-brand-600`, the fabric's base colour, so the
    server HTML opens on the same crimson and the folds draw over it.
  - Without WebGL, brand-600 stays (white text 6.68:1). HeroFabric itself is
    kept.
- Unused-code scan over new-redesign and app/(new-redesign):
  - No unreferenced files, and no unused exports apart from local type
    exports.
  - Both new dependencies (cobe, lottie-web) are in use.
  - Content keys are all read.
  - Only two assets are unreferenced: `public/photos/brand/bg-aurora-g1.svg`
    and `.webp`. They were kept: the SVG is G1's only source file.
- Removed earlier today: WalletSafety, WalletCover and the Magnific globe.

## Addendum · 2026-10-23 · /new/health-cover hero (section 1, built; visual pending)

- **Next page is About health cover** (§ 6.3), at `/new/health-cover`. Copy
  is in `new-redesign/content/health-cover.content.ts`.
- **Hero matches the wallet hero (owner):** the same centred H1, sub, one
  primary action and moving crimson fabric box (HeroFabric), at the same
  sizes. `HealthHero` copies the markup rather than sharing a component,
  because the two stages will hold different visuals.
- **The box is empty for now (owner).** It holds no phone. Its visual is
  planned with the owner next.
- Copy:
  - H1 "Travel health insurance / for your trip to Nigeria". This keeps the
    live page's SEO heading (keyword pass 2026-10-18), not the plan's
    "Health cover for your trip to Nigeria".
  - The sub restates approved facts: Phillips HMO, Nigeria only, from $50 a
    month, and hospital care, diagnostics and emergency evacuation.
  - Primary "Compare health plans →" goes to `/new/health-cover/plans`,
    which 404s until § 6.4 is built.
- Still blocked: sections 6 (Good to know) and 7 (Hospitals) wait on the
  § 8.4 insurance facts.
- Checked at 1440 and 375 (no horizontal scroll, no console errors). tsc and
  eslint clean.

## Addendum · 2026-10-23 · Health cover hero visual (Jitter, draft for review)

- The owner's storyboard and motion brief are built in Jitter: file
  "Omanga · Health cover hero", artboard "Health cover · How it works".
  It's 1080 × 600, the hero box's size at 1440, and it runs 20s.
- **Story (customer side only):** pick Gold → secure checkout (name, email,
  trip dates typed) → Pay $85 → spinner → "Payment confirmed" and "Policy
  created" → "My cover" dashboard: "Cover active", masked policy number, the
  digital ID card (flips to its back) and hospitals in the plan → the card
  blurs and shrinks away, back to the bare background.
- **Left out on purpose:** the Omanga and Phillips HMO admin dashboards
  (internal tools, and the float balance stays off public pages). The
  owner's idea of linking cover to the Omanga balance is a portal product
  decision, and it would mention cards (§ 8.2).
- **Deviations from the brief:**
  - No image was attached, so the background is a still of the site's own
    HeroFabric, captured at the hero box's size. It's the bottom layer,
    named so it can be hidden for a transparent Lottie that plays over the
    live fabric.
  - Hospital rows show area, city and category only, with no hospital names.
    Invented names could read as real partners, and the named list is still
    owed (§ 8.4).
  - Jitter has no 3D rotate, so the ID card flip squeezes the front to zero
    width and opens the back from zero.
  - Type is Host Grotesk with the v3 "You" cursor, so it matches the home
    scenes. The masked numbers use Inter, because Host Grotesk's bullet dots
    are too small.
- Demo data: "Ada Bello", ada@example.com, "12 Dec – 9 Jan". The back of the
  ID card shows only approved facts: Gold, Nigeria only, Phillips HMO.
- Mobile: the box is 440 tall. With the Lottie set to cover, the 440-wide
  card fits the visible middle (about 468 of the 1080). That's checked by
  arithmetic only, not yet on the page.
- Revised the same day (owner):
  - The white card sits in the home scenes' **glass frame**: 8px of white
    18% with a 1px white 38% edge, radius 14 outside and 8 inside. The frame
    follows every card resize.
  - The "You" tag is **black** (#1B1B1B), the pointer's colour, not crimson.
- **Exported and placed:** a transparent Lottie with the background hidden,
  downloaded from the owner's signed-in Chrome (no watermark), 1080 × 600,
  60 fps, 612 KB. It's at `public/lottie/health-cover/how-it-works.json`.
  - HealthHero plays it with `FeatureLottie` over the live HeroFabric. The
    film keeps its 1080 × 600 frame at the box's full height, centred, so a
    phone crops only the empty sides.
  - Reduced motion holds frame 864, the dashboard.
- Checked at 1440 and 375 (no horizontal scroll). tsc and eslint clean.

## Addendum · 2026-10-23 · /new/health-cover what this is and isn't (section 2, built)

- Built as wireframed. Spec: design-system.html § Is / isn't cards.
  - The section header ("What this is", "Health cover for your time in
    Nigeria"), then two equal cards from 768px, stacked below with "is"
    first.
  - "What it is" is a white Card with green checks. "What it isn't" sits on
    surface-muted with grey crosses, so the pair contrasts without warning
    colours.
- Fixes the audit's search-intent mismatch: people looking for travel
  insurance out of Nigeria land on this page.
- Copy (`healthScope`):
  - The three "is" lines and "Cover outside Nigeria" are approved site copy:
    Nigeria only, monthly with no commitment, Phillips HMO's own network, and
    the FAQ's outside-Nigeria answer.
  - The owner confirmed two new lines on 2026-10-23: it isn't travel
    insurance (no flights, luggage or cancelled trips), and it isn't a visa
    or entry requirement.
- The section has `id="scope"`. Checked at 1440 and 375 (no horizontal
  scroll, no console errors). tsc and eslint clean.
- Revised the same day (owner):
  - The hero's primary now reads **"Get insurance plan →"**, replacing the
    site-wide "Compare health plans" on this page only.
  - Section 2 has a primary **"Compare insurance plans →"** under its sub.
    `SectionHead` takes an optional `action`, placed 32px under the title
    block. Both buttons go to /new/health-cover/plans.

## Addendum · 2026-10-23 · /new "How it works" step cards: photos (owner)

- After the owner's reference, each step card now has its **own people
  photo**. This replaces the U2 texture sliced across the row. The photos
  are from Unsplash, self-hosted in `public/photos/steps/`, and not used
  anywhere else on the site:
  - Step 1: a woman in headphones smiling at her phone (nBiJoRbVHmA).
  - Step 2: a man smiling at his phone (NfJIA8X91gg).
  - Step 3: a mother and daughter laughing in warm light (558JeoJkeMM,
    cropped on the faces).
  - The earlier spare photos (1PgSfwSxXx0, jCRrhLwAmJ8, TPT4pevJEmQ)
    weren't reused, because the header menu already shows them. A beach
    family photo was tried for step 3 and dropped: its faces sat under
    the glass.
- **Compact glass card** over the photo's lower part, replacing the full app
  screen: a bold title with a muted meta, a rule, then one row.
  - Step 1: "Create account · 1 of 3", Email, you@example.com.
  - Step 2: "Add money · £200.00", You get ₦…, at today's GBP rate.
  - Step 3: "Your plan · Gold", Price, $85 / month.
- The photos are 300px tall, up from 236. `PhotoCard` takes
  `imageClassName` and `objectPosition` for this. Spec updated in
  design-system.html § Step cards.
- **Home hero (owner):** the secondary button now reads "Get insurance
  plan", replacing "Compare health plans".
- Checked at 1440 and 375 (no horizontal scroll). tsc and eslint clean.

## Addendum · 2026-10-25 · No rate source, refresh timing or fee amounts (owner)

- The owner wants none of these disclosed anywhere, on the live site or /new:
  - the rate source ("mid-market", "real rate", "midpoint", "public market
    data");
  - how often the rate changes ("hourly", "refreshed every hour");
  - fee amounts ("₦20 per transfer", "flat fee").
- What may still be said: "see the rate before you confirm", "free to open",
  "no minimums", and "you see any charge in the app before you confirm".
- Rate pages label their figure "Reference rate, {date}", with the note that
  your exact rate is shown in the app.
- Removed outright:
  - the "What exchange rate does Omanga use?" FAQ (payments, home, wallet);
  - the rate pages' "What is the mid-market rate?" block and FAQ;
  - the transfer-fee row in the home converter widget;
  - the "Transfer fee −₦20" rows in the drawn app screens.
- **Blog posts:** they keep general advice that names the mid-market rate as
  a benchmark for readers (pounds-to-naira, $100, Detty December). Every
  claim that Omanga uses it, refreshes it or charges ₦20 is gone. Remove the
  general advice too if the owner wants.
- **Not changed:** comments, schema derive from the edited copy
  (`PAYMENTS_FEES_ANSWER`), and the docs in new-redesign/doc.

## Addendum · 2026-10-25 · /new home § 3 "Convert your money, then pay across Africa" (owner)

- **Order:** hero, partners (the owner moved the strip back right after the
  hero), then this section.
- **Layout:** the phone on the left and the head on the right from 1024px.
  Below that the head comes first, then the whole phone, as on LemFi's
  international-money-transfer page on mobile. The phone is shown whole, not
  cropped.
- **Right column:** eyebrow, H2 and sub, a rule, LemFi's globe line ("Pay in
  50+ African countries"), and a "See today's rates" link.
- **Phone:** the shared `PhoneFrame`, with the black bezel and
  `decorative={false}`, because the converter in it works. The screen
  (`RateConvertScreen`) follows the owner's card reference:
  - "You convert" and "You get" halves with a dark rate pill on the seam;
  - a card of three facts (pay by bank transfer, rate shown before you
    confirm, free to open), replacing the reference's speed and fee rows;
  - "Convert money" pinned to the foot of the screen, going to the web
    wallet.
- **Picker and figures:**
  - `CurrencyPicker` takes `trigger="plain"` (no fill, 28px flag, large
    code).
  - Long figures step down from 38 to 32 to 28pt so a seven-figure naira sum
    fits.
  - `HeroConverter` is deleted, and its copy moved to `homeRates`.
- Checked at 1440 and 375 (no horizontal scroll). Typing and switching
  currencies both work. tsc and eslint clean.

## Addendum · 2026-10-25 · /new home § 3: card and photo box (owner)

- **Reference:** the owner's "Seamless Payments" card. The section is now one
  white `Card`, padded 12px (16 from 768px).
  - **Left (from 1024px):** a photo box holding the phone.
  - **Right:** the head, vertically centred in its half.
  - **Below 1024px:** the head first, then the box.
- **Photo:** misty blue mountains, Unsplash PdGBci-4jR8 by Alessio Soggetti,
  self-hosted at `public/photos/home/rates-mountains.jpg` (1800px) and not
  used anywhere else.
- **Phone:**
  - It uses the glass bezel, because the owner removed the black one.
  - It stands 48px down (40 on mobile) and is cut by the box's 4px-radius
    bottom edge.
  - The box is 640px tall (540 on mobile), so the "You get" currency list
    stays inside it.
  - "Convert money" now sits right under the facts rather than pinned to
    the foot, so the crop doesn't hide it.
- Checked at the pane's desktop width and at 375 (no horizontal scroll).
  tsc and eslint clean.

## Addendum · 2026-10-25 · /new home § 3: box on the right, wide phone (owner)

- **Order:** the head is now on the left and the photo box on the right
  (from 1024px). Below 1024px the head still comes first.
- **Phone:** after LemFi's phone (owner: "wide, not long"), it's drawn large
  and only its top shows:
  - Scale is 1.2 from 1024px (383px wide), 1.05 from 768px and 0.9 below.
  - The box's bottom edge cuts it a little under "Convert money".
  - The box is 710px tall (650 / 550), the least that keeps the "You get"
    currency list inside it.
- **Screen:** compacted so the button sits in the visible top. The halves and
  the facts card are padded 20pt, and the button is 56pt tall.

## Addendum · 2026-10-25 · /new home § 3: head only, phone lower (owner)

- **Head:** the rule, the "Pay in 50+ African countries" globe line and the
  "See today's rates" link are removed. The left half is now eyebrow, H2 and
  sub only.
- **Phone:** it stands lower in the box, so "Convert money" ends about 20px
  above the box's bottom edge (about 30 on mobile).
  - Top offsets: 118px from 1024px, 130 from 768px, 100 below.
  - Box heights: 710, 650 and 562px.
- **Pickers:** `CurrencyPicker` takes `searchable={false}`, which drops the
  search field. The list then takes focus and the arrow keys. The phone's
  pickers use it: with four currencies the field only added height, and
  without it the list ends above the button, inside the crop.

## Addendum · 2026-10-25 · /new home: "Payments and insurance" in one section (owner)

- **One section (`HomeProducts`, id `products`):** structure v2's sections 3
  and 4 now share it.
  - **Head:** centred, after the owner's "Send Money Anywhere" reference. The
    eyebrow is "What you get"; the H2 is "Your money and your health, sorted
    for the trip"; the sub is two lines.
  - **Cards:** the Payments card, then the Insurance card, 16px apart. Both
    card titles are H3s.
- **Payments card:** unchanged, now `PaymentsCard` (it was `HomeRates`).
- **Insurance card (`InsuranceCard`):** after the owner's "Trusted Across
  Borders" reference, a full photo card.
  - **Photo:** Unsplash eosyJcVFHq4 by Ato Aikins, self-hosted at
    `public/photos/home/insurance-friends.jpg` and not used anywhere else.
  - **Shape:** 4px radius, 580px tall (520 / 560), with a dark fade from the
    foot.
  - **Bottom left:** the title, the sub, and the plans as pill buttons
    (Silver, Gold, Diamond; a radio group, Gold picked first). The picked
    pill is solid white; the others are white outlines.
  - **Bottom right:** the picked plan's price ("$85 / month"), its hospital
    category and "Get Gold →" to the plans page. This text changes with the
    pill. Below 768px it sits under the pills.
  - Prices and categories come from `homePrices`.
- **Old prices section:** "prices" (`HomePrices`) is off the home page,
  because the Insurance card replaces it. `HomePrices` and `PlanCards` stay
  in the code for the plans page.
- **Note:** the old "What Omanga does" section further down is still in the
  page order, and it overlaps this one. It goes when the later v2 sections
  are built.

## Addendum · 2026-10-25 · /new home "Payments and insurance": smaller phone, two insurance cards, metrics (owner)

- **Phone scaled down (the section ran too long):**
  - Scale 1 from 1024px, 0.95 from 768px, 0.85 below.
  - The photo box is 566 / 540 / 486px; the Payments card is about 600px
    tall on desktop.
  - "Convert money" ends about 24px above the box edge, and the "You get"
    list still fits inside.
- **Insurance, after the owner's two-card reference:** a photo card and a
  white card side by side from 1024px, each as tall as the Payments card
  (598px; 572 from 768px). They stack below 1024px. This replaces the single
  full-width photo card.
  - **Photo card:** the H3 "Insurance plans for your time in Nigeria", the
    sub, the plan pills (radio group, Gold first) and the picked plan's
    price on the right.
  - **White card:** the picked plan's facts drawn as app UI in the centre: a
    grey "What's included" bubble (first three items), "Provided by Phillips
    HMO", and a crimson-tint row with price and hospitals. Below that sit
    "{Plan} plan", its description and "Get {Plan} →". The whole card
    changes with the pill.
- **Metrics strip:** between the Payments card and the Insurance cards,
  after the owner's "Growing every day" reference.
  - An "At a glance" label, then three H1-sized figures with hairline
    dividers: 50+ African countries to pay in, 6+ currencies in one wallet,
    3 insurance plans from Phillips HMO.
  - The reference's user and transaction counts are left out, because Omanga
    has no figures for them. The label avoids a growth claim.

## Addendum · 2026-10-25 · /new home Insurance white card: chat animation (owner)

- **Where:** Jitter file "Omanga — Home insurance chat", artboard "Insurance
  chat" (440 × 392, white, 7.6s loop). It animates the white card's centre
  UI as a chat.
- **Sequence:**
  1. The customer's dark bubble slides in from the right ("Which plan gives
     me a private ward?", labelled "You").
  2. Omanga's avatar (the crimson marker) and a grey typing bubble pop in,
     and three dots pulse twice.
  3. The typing bubble grows into the reply bubble, and "What's included"
     and the three Gold items rise in line by line, then "Provided by
     Phillips HMO".
  4. The Gold card lifts in; its shield badge grows and the check fades on.
  5. Everything fades to white at 6.9–7.3s, so the loop restarts cleanly.
- **Style:** Host Grotesk, the card's own colours (#E8E8E8 bubble, #FEF2F3
  row, #AE2448), customer right and Omanga left. No bounce: slowdown and
  smooth easings.
- **Customer question:** it's illustrative copy, picked so the Gold reply
  answers it. It names no person.
- **Not yet on the site:** the card still shows the static UI. To ship,
  export the Lottie to `public/lottie/home/insurance-chat.json` and play it
  in the card's centre with the existing `FeatureLottie` player (SVG build).
  The plan pills currently change the static UI, so pick one before
  shipping: keep the chat Gold-only, or make one export per plan.

## Addendum · 2026-10-25 · Radius rules, insurance card merged, chats live (owner)

- **Radius (owner, from now on):**
  - Buttons are pills: `Button` uses `rounded-full`, padding 12 × 20.
  - Cards are 16px: `--radius-xs` changed from 2 to 16.
  - Photo boxes inside cards are 12px: `--radius-sm` changed from 4 to 12.
  - design-system.html still shows the old radii and needs updating.
- **Insurance is one white parent Card, like Payments:** the photo box with
  the plan pills sits on the left, and the chat half on the right (below
  1024px the photo comes first).
  - The chat half plays the picked plan's Lottie
    (`public/lottie/home/insurance-chat-{silver,gold,diamond}.json`; 440 ×
    360, 60fps, 456 frames) through `FeatureLottie`, remounted from frame 0
    on each plan change.
  - With reduced motion it holds frame 360, the settled chat.
  - Under it sit the plan name, description and buy link; the price and
    hospitals are in an sr-only line.
- **Photo:** the owner's pick, Unsplash _t15AWPJNmg by Sandisk, at
  `public/photos/home/insurance-phone-friends.jpg`. It replaces the earlier
  pick, which is deleted.
- **Jitter chats** (file "Omanga — Home insurance chat", one artboard per
  plan):
  - The customer's bubble now pops in (grow from 0.85) instead of sliding.
  - "Provided by Phillips HMO" is removed.
  - The plan row is a second Omanga message that pops in without typing.
  - Each plan has its own question and three inclusions from `homePrices`.
- **Export:** exported one artboard at a time from Chrome, because batch
  export needs a paid Jitter plan.

## Addendum · 2026-10-25 · /new home § 4 "Set up at home before you fly" (owner-approved wireframe)

- **Wireframe:** `design-lab/home-steps-v2.html`, a hi-fi mock, approved by
  the owner with two additions: the plane moves with the scroll, and the
  cards use the mountain photo.
- **Head:** centred eyebrow "How it works", the H2, and a sub that drops
  "ready the moment you land", because when cover starts is unconfirmed
  (§ 8.1).
- **Journey rail (`StepsRail`, from 1024px only):**
  - "Home" sits on the left and "Lagos" on the right, with a dashed line and
    a stop over each card's centre.
  - The plane's position follows the scroll: progress runs 0 to 1 as the
    rail moves from 85% to 40% of the viewport height.
  - It draws a crimson trail. Each stop fills crimson with a white number
    once the plane reaches it.
  - With reduced motion it sits at the end with every stop filled.
- **Cards:** three white `Card`s. Each top well (240px, 12px radius) shows a
  third of `rates-mountains.jpg` (`background-size` 300%, positions
  0/50/100%), so the row reads as one landscape. This repeats the Payments
  photo, as the owner asked.
- **Mini app screens:** "Create account" with the email field, "Add money"
  with "GBP wallet £200", and "Your plan" with the Gold pill and the Gold
  row. There are no rates or fees.
- **Mobile:** below 1024px the cards stack and each title carries its
  number.
- **CTA:** a pill "Open your free wallet" to the web wallet.
- **Old steps:** their photos (`public/photos/steps/`) are no longer used
  on the home page.

## Addendum · 2026-10-25 · /new home: "What Omanga does" removed (owner)

- **Removed:** "What Omanga does" (`HomeFeatures`, the accordion with the
  Lottie scenes) is off the home page, because it repeated "Payments and
  insurance".
- **Deleted:** `HomeFeatures.tsx` and `FeatureAccordion.tsx`, which nothing
  else used.
- **Kept:** `FeatureScreen`, `FeatureLottie` and `homeFeatures`, which the
  CTA panel, the wallet page, the health hero and the insurance chat still
  use.
- **Order now:** hero, partners, products, steps, why-omanga, countries,
  faq, final-cta.

## Addendum · 2026-10-25 · /new home § 4 steps: pinned scroll, curved dotted path, glass (owner)

- **Structure docs updated:** `home-structure-v2.md` § 3 and the Home entry
  in `sitemap-v2.md` now match the page, with the earlier sections kept (Why
  Omanga, Countries, FAQ, closing band) at the owner's call.
- **Pinned scroll:**
  - Applies on screens at least 1024 × 800 (new `pin` custom variant in
    globals.css). There the section is 260vh tall and its content sticks to
    the viewport.
  - Scrolling through the extra height flies the plane from Home to Lagos,
    and the page moves on once it lands.
  - Smaller screens scroll normally, and the rail falls back to the
    viewport-position progress.
- **Path:** dotted (2px round dots, 7px pitch). The travelled part is dark
  grey (neutral-700) and the rest light grey (border-strong). The crimson
  trail is gone; the stops still fill crimson with white numbers.
- **Curve:** the middle card sits 40px lower (`homeSteps.dip`), and the path
  curves down to its stop and back up. The plane turns with the curve's
  tangent.
- **CTA and spacing:** the CTA moved under the sub. There's more space (64px)
  between the head and the rail.
- **Visuals:**
  - Each mini screen now sits in the glass frame (24px outer, 16px inner
    card).
  - Scaled down: wells are 200px (were 240), screens 72% wide up to 260px,
    with type about 1px smaller.
- **Note:** `dip` lives in content, not in StepsRail, because a server
  component can't import a constant from a "use client" file.

## Addendum · 2026-10-25 · /new home closing panel image (owner)

- **Image:** the closing CTA's panel now shows a plane wing over clouds at
  dawn, Unsplash KB9r_hTzyeQ by Johny Goerend (Unsplash License),
  self-hosted at `public/photos/home/final-cta-wing.jpg` (1600px) and not
  used anywhere else.
- **Replaces:** the crimson aurora texture.
- **Unchanged:** the "Home" app card stays in the glass frame on top.
- **Status:** the owner marked the home page done after this change.

## Addendum · 2026-10-25 · /new home Why Omanga: Vizcom layout (owner pick)

- **Reference:** Vizcom's impact cards (Mobbin section 39a1103e), chosen from
  six grid and horizontal options. Kept in our light style.
- **Head:** eyebrow, H2 and sub on the left. "Is Omanga safe?" moved from a
  text link to a secondary pill button on the right; below 768px it sits
  under the sub.
- **Cards:** six white `Card`s, 3 × 2 from 1024px, 2 columns from 768px,
  stacked below.
  - A bare crimson line icon (new `NavIcon` size `bare`, no tinted circle)
    sits at the top.
  - The point is in large type at the foot (26px, 30px from 768px), with
    one P2 line under it.
  - Heights: 280px from 768px, 184px below.
- **Copy:** unchanged.

## Addendum · 2026-10-25 · /new/payments hero: full-width photo band (owner)

- **Stage:** now a full-width band, edge to edge with no radius, outside the
  content column. It was a column-wide 4px box of the moving crimson fabric
  (HeroFabric).
- **Photo:** layered blue ridges in mist, Unsplash mqO0Rf-PUMs by Paul
  Pastourmatzis (Unsplash License), self-hosted at
  `public/photos/wallet/hero-ridges.jpg` (2400px) and not used anywhere
  else. It sits in the same family as the home page's mountain photo
  without repeating it.
- **Unchanged:** the phone (glass bezel, app home screen), its offsets, and
  the 600 / 440px band heights.
- **Still awaiting owner approval:** the Payments structure in
  `sitemap-v2.md` (remove WalletRates, fix the proof strip's repeated "Free
  to open").

## Addendum · 2026-10-25 · /new/payments hero: converter box (owner)

- **Converter, no phone:** the hero's phone (glass bezel with the app home
  screen) is replaced by the home page's working converter in a frosted box,
  after the owner's converter reference.
  - The box is `RateConvertScreen variant="card"`: translucent white, blurred,
    32px radius, white edge, float shadow. The inner cards are a little
    whiter.
  - There's no "Convert" title. The box is up to 440px wide and shown whole.
  - The owner rejected the phone format.
  - In the box version, the figures shrink with the viewport (min of the
    usual size and 6.4–8vw) so they stay whole at 375px.
- **Photo box:** back to the content width (the full-width band was tried
  and reverted the same day). Radius is 12px (the photo radius, which was
  4px), padding 80px (32 on mobile), with the ridges photo.
- **Deleted:** `AppHomeScreen` and `walletAppHome`, which nothing used once
  the phone went.
- **Still awaiting owner approval:** the Payments structure in
  `sitemap-v2.md` (remove WalletRates, fix the proof strip's repeated "Free
  to open").

## Addendum · 2026-10-25 · /new/payments structure applied (owner approved)

- **Removed:** "See the rate before you convert" (WalletRates, plus the
  `walletRates` content). Its title repeated the second "What you can do"
  item.
- **Proof strip:** the first of two "Free to open" items is now "Pay by
  transfer".
- **Page order:** hero, proof strip, what you can do, paying in person,
  countries, going home, FAQ, closing. `sitemap-v2.md` is marked approved.

## Addendum · 2026-10-25 · /new/payments container photos (owner)

- **Photo swap:** every texture container on the Payments page now uses the
  home page's mountain photo (`/photos/home/rates-mountains.jpg`, Unsplash
  PdGBci-4jR8).
  - The three "What you can do" panels were the U2 satin. Each now shows a
    different crop (20/55/85% across), so they don't look identical.
  - The closing CTA panel was the crimson aurora.
- **Unchanged:** the hero keeps its own ridges photo, and the pay-in-person
  walkthrough keeps its people photos.

## Addendum · 2026-10-25 · /new/payments "Going home": step walkthrough (owner)

- **Reference:** the owner's "Your Wealth. Your Rules." layout. The head sits
  above, the steps on the left as white Cards, and a photo box with the
  animated app on the right. It replaces the static converter card and the
  numbered list.
- **Player:** `StepWalkthrough`, new, sharing nothing with the pay-in-person
  player, which the owner will redo.
  - The active step opens to show its line and a crimson timer bar along its
    foot. When the bar fills (the step's `ms`), the next step starts, looping
    after the last. Clicking a step jumps to it.
  - Timer and Lottie restart together, so text, bar and motion stay in sync.
  - It pauses off screen. Reduced motion shows the settled frame and a full
    bar.
- **Animation:** Jitter file "Omanga — Going home walkthrough", one artboard
  per step (560 × 760, transparent, 60fps). Each was exported as Lottie from
  Chrome to `public/lottie/wallet/going-home-{1,2,3}.json`.
  1. Open your naira wallet (5s): the phone settles in, the camera zooms to
     the ₦50,000 balance, pans to Convert, a tap, the Convert screen slides
     in.
  2. Convert to dollars (6s): zoom to the amount as it types up to ₦50,000,
     a pan to "Into", and $37.18 grows in; then out, a tap on Continue, the
     review slides in, and a tap on Convert now.
  3. Keep them for the next trip (5.5s): Converted slides in, a zoom to
     $37.18 as the Completed badge pops, then out, and the USD wallet home
     slides in with a zoom to $37.18.
- **Screens:** rebuilt as vector UI (Inter, the app's colours) from the
  app's own screens, not screenshots.
  - Left out: names (it says "Hi there"), fees, transfer-fee rows and the
    Cards tab.
  - The example rate (1 USD = ₦1,345) is shown with no source or timing.
- **Photo box:** the home mountain photo, 12px radius, 600px tall (560 from
  768px, 460 below).

## Addendum · 2026-10-25 · /new/payments "How it works" replaces three sections (owner approved)

- **Repetition audit:** converting appeared 4×, pay by transfer 4×, add and
  hold 3×, 50+ countries 2× and free to open 2×. "What you can do",
  "Paying in person" (the screenshot prototype) and "Going home" were three
  slices of one trip.
- **New section:** one "How it works" (`WalletHowItWorks`, id
  `how-it-works`) in the Going home step-walkthrough format
  (`StepWalkthrough`), with four steps.
  - **Steps:** add money, convert to naira, pay by transfer, going home.
  - **Head:** "From home to Nigeria, and back again".
- **Animations:** Jitter file "Omanga — Payments how it works", one
  560 × 760 transparent artboard per step, 60fps. Each was exported as
  Lottie from Chrome to `public/lottie/wallet/how-{1..4}.json` (300/360/360/
  360 frames).
  1. **Add money:** the GBP wallet at £0.00, a tap on Add money, £200 typed,
     Add, then the wallet at £200.00 with a "Money added" row. No funding
     method is named.
  2. **Convert to naira:** a tap on Convert, £100 typed, ₦179,852 grows in
     under "Into", Continue, the review, then Convert now.
  3. **Pay by transfer:** a tap on Send, bank details with the account
     number typed, "Name checked" (the name is a placeholder bar, no
     invented person), Continue, ₦8,500 typed, Send, then Sent.
  4. **Going home:** a tap on Convert, ₦50,000 to $37.18 pre-filled with a
     zoom to the dollars, Continue, Converted with the badge, then the
     dollar wallet with a zoom to $37.18.
- **Screens:** vector UI rebuilt from the app (Inter, the app's colours),
  never screenshots. No fees, names, Cards tab or speed claims. Example
  rates are shown with no source or timing.
- **Deleted:** WalletFeatures, WalletPayInPerson, WalkthroughPlayer, the
  WalletLeftover component (renamed WalletHowItWorks), their content, the
  pay-step Lotties, the walkthrough photos, the going-home Lotties (now step
  4), and the orphaned app-insurance-promo.webp and bg-aurora-g1.jpg.
- **Page:** hero, proof strip, how it works, countries, FAQ, closing (six
  sections). `sitemap-v2.md` is updated.

## Addendum · 2026-10-26 · /new/payments How it works: head beside the box (owner)

- **Head moved:** the eyebrow, H2 and sub now sit at the top of the
  walkthrough's left column, beside the photo box. The step tabs and timer
  bars sit at the column's foot.
- **Mechanism:** `StepWalkthrough` takes a `head` slot. Its left column is a
  justify-between flex with a 24px gap on desktop, so the last step ends
  level with the box's bottom edge (both 646px at 1280 × 860).
- **Below 1024px:** head, then steps, then the box.
- **Fills the viewport** (owner, 2026-10-26): from 1024px the section is
  `min-h-svh`, content centred, with 48px top and bottom padding. The photo
  box is `max(600px, 100svh − 96px)` tall, so at 1280 × 860 it runs 48 to
  812px and the last step ends level with it. The Lottie grows with the box.

## Addendum · 2026-10-26 · /new/insurance structure approved, copy fixes (owner)

- **Structure:** the Insurance page structure in `sitemap-v2.md` is approved
  (8 sections: hero, what it is and isn't, choose your plan, what every plan
  includes, how you get care, who provides your cover, questions, closing).
- **Copy fixes in "What this is":**
  - The H2 is "Insurance for your time in Nigeria" (was "Health cover…").
  - "your health cover doesn't" became "your insurance doesn't".
  - "No commitment. Cancel any time." is out until confirmed (§ 8.1). The
    line now reads "Pay month by month while you're in Nigeria, from $50 a
    month". Monthly is confirmed by the Paystack monthly subscriptions.
- **Still on the home page:** "Cancel any time" remains in the home FAQ
  answer to "How much is travel insurance for Nigeria?". That is
  unconfirmed live-site copy, left for the owner to decide.

### Insurance hero photo (2026-10-26)

The moving crimson fabric behind the Insurance hero is replaced by a still
photo: Unsplash z2BCD8Bgd9M (Fabrizio Conti, Unsplash License), a deep blue
mountain range, self-hosted at `public/photos/insurance/hero-range.jpg`
(2200px, q78) and framed at 50% 70%. Owner picked it from a contact sheet
after turning down a pale misty photo and the Payments ridges. `HeroFabric`
and its shader are deleted as unused.

### Insurance § 3 Choose your plan (2026-10-26)

Owner picked Vercel's pricing section (Mobbin 1671eb10). `HealthPlans` sets
the three plans as columns of one bordered panel split by hairlines; Gold is
the only white column, with a dark "Popular" tab on the panel's top edge
(inline beside the name below 1024px) and the one filled button. Buttons go
straight to each plan's Paystack page. A foot row links to /insurance/plans.
Plan data is `homePrices.plans` from the home content, so names, prices and
benefits have one source. Vercel's metrics row is left out: there are no
confirmed numbers to put in it.

### Insurance proof strip (2026-10-26)

Owner asked for the Payments proof strip under the Insurance hero too, with
insurance facts. `WalletProof` became the shared `ui/ProofStrip` (props: id,
label, items); Payments passes `walletProof`, Insurance passes `healthProof`
(from $50 a month, Phillips HMO, emergency evacuation on every plan,
telemedicine and roaming on every plan; all approved facts).

### Insurance § 4 What every plan includes (2026-10-26)

Owner picked Superpower Health Gap's grouped panel (Mobbin 0fa649f3).
`HealthIncludes`: a muted frame around one white bordered card, a label row,
then three columns split by hairlines (Hospital care, Tests and medicines,
Care as you travel), each benefit a crimson line icon, a medium title and one
secondary line. The eight items are only the shared benefits (Silver's five
plus telemedicine, roaming and the app from the home plans footnote). "The
app" reads as "your Omanga account" because the native app hasn't shipped.

### Insurance § 5 dropped (2026-10-26)

Owner: no need for § 5 How you get care in Nigeria (the step walkthrough).
§ 4 What every plan includes stays; the page goes from it to Who provides
your cover.

### Insurance § 6 skipped, § 7 and § 8 built (2026-10-26)

Owner skipped § 6 Who provides your cover and asked for § 7 and § 8 in the
Payments page's UI. `WalletFaq` became the shared `ui/FaqSection` (props:
eyebrow, title, sub parts, items); Payments passes `walletFaq`, Insurance
`healthFaq`. Because § 5 and § 6 are gone, the FAQ answers who provides the
cover and how HMO care works. `HealthClosing` is the shared `CtaPanel` with
"Get insurance plan" as the primary, the wallet as the text link, the home
mountain photo and an illustrative Gold plan screen.

### Header menu after Ramp (2026-10-26)

Owner reference: Ramp's Products menu. The panel is now a column-width white
card hanging from the bar (rounded at the foot, shadow, hairline under the
bar), with labelled groups side by side on the left, each link a 44px grey
icon tile (`NavIcon size="tile"`), its name and one approved-fact line, and
a grey "Featured" column on the right with the photo, title and line. The
featured photo loads eagerly, because the clipped panel never scrolls it
into view. Bar, motion, dimmer and the mobile sheet are unchanged.

### Cutover: the new design goes live (2026-10-26)

Owner: put home, Payments and Insurance live, keep the other pages in the old
design with the new header and footer, and trim the old design system to what
those pages still use.

- Home, Payments and Insurance moved from `/new/*` to `/`, `/payments` and
  `/insurance` in `app/(new-redesign)`; the old versions are deleted. `/new` is
  gone, and so are the preview badge and `noindex`.
- They carry the old pages' keyword-tested titles and descriptions
  (`new-redesign/content/seo.content.ts`, owner naming applied) and the same
  structured data, plus each page's FAQ as `FAQPage`.
- Links use sitemap-v2 paths; `href()`'s `LIVE_PATHS` sends the pages not yet
  rebuilt to their live URLs (`/insurance/plans` to `/plans`, `/guides` to
  `/blog`, `/help` to `/contact`), and the two with no page yet to the nearest
  one (`/rates` to pounds to naira, claims to the policy terms). The menu's
  Rates group lists the three rate pages; "Get care and claims" is "Claims".
- The old layout renders the new header (opaque, because the old heroes run
  under it with white text), footer, cookie banner and preferences. Their
  styles come from `new-redesign/styles/chrome.css`, scoped under a
  `data-chrome` wrapper so the two systems' same-named classes don't fight.
  The seven shared token names keep their old values, so these components use
  literal radii.
- The cookie banner, preferences dialog and footer "Cookie preferences" were
  rebuilt in the new design and replace the old ones on every page; consent
  is shared across both designs. The 404 is rebuilt in the new design.
- Removed: the old home, Payments and Insurance pages, the old header,
  footer, navigation and consent UI, 83 files they alone used, unused exports,
  `styles/product-visuals.css` and the old header utilities and z-index
  tokens, and the unreferenced images (3D masters, device frames, old app
  screens). Home's FAQ now uses the shared `FaqSection`. The old header-height
  token is 76px, the new bar's height.
