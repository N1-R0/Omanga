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
| `display` | 64 → 112 | 1.1 | −0.03em | 500 |
| `h1` | 40 → 64 | 1.2 | −0.03em | 500 |
| `h2` | 32 → 42 | 1.1 | −0.03em | 500 |
| `h3` | 30 → 40 | 1.3 | −0.03em | 500 |
| `h4` | 24 → 28 | 1.3 | −0.03em | 500 |
| `h5` | 22 → 26 | 1.3 | 0 | 500 |
| `h6` | 16 → 20 | 1.3 | 0 | 500 |
| `text-large` | 18 → 20 | 1.5 | 0 | 400 |
| `text-main` | 16 → 18 | 1.5 | 0 | 400 |
| `text-small` | 14 → 16 | 1.5 | 0 | 400 |

`display` is an emphasis role, not a size the page reaches for casually. It
belongs to the closing conversion band and nowhere else. The hero uses `h1`.

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
- Transparent over the hero photograph; opaque white with a 1px hairline once
  scrolled.
- Links at `text-main` (16 → 18), weight 400. **Not 14px.**
- Link group gap `--space-6`; button group gap `--space-2`.
- Mobile panel opens and closes in 200ms.

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
5. Hover states are colour transitions at 200ms. Nothing scales, lifts or
   shadows on hover.

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
