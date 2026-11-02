# HireLens Design System

## Direction

HireLens uses **Application Journey**: the CV moves through a concrete hiring sequence from document, to role benchmark, ATS screening, revision decision, and submission. Product visuals must show the application moving or changing state rather than decorate “AI.”

## Color

- Paper: `#f8f9ff`
- Pale application field: `#e5eeff`
- Navy working surface and primary ink: `#0b1c30`
- Primary blue: `#0037b0`
- Secondary violet: `#712ae2`
- Body ink: `#434655`
- Hairline/border: `#c8d7f1`

Use blue for the primary action and primary review signals. Violet marks secondary context. Navy carries immersive or high-focus regions. Avoid gradients and decorative glows.

## Typography

Use the configured Inter variable font. Display copy uses tight tracking up to `-0.04em`, strong weight, and compact line height. Body copy runs at 16–22px with 1.45–1.6 line height. Keep headings to two lines where possible.

## Shape and depth

Controls and product surfaces use 2–6px radii. Document planes may rotate slightly to suggest work in progress. Avoid soft floating cards, glass panels, and resting shadows. Separate regions with field color, spacing, or a restrained border.

## Layout

Public pages use a tight outer frame of 20–64px. Large statements and product demonstrations share the viewport. App screens prioritize one task or finding, use flat surfaces, and avoid generic KPI-card rows.

## Motion

The signature move is a scroll-controlled application journey. The CV enters, meets the vacancy, passes through an ATS scan, and resolves into a revision decision. Supporting motion confirms submission, loading progress, hover, and focus. Respect `prefers-reduced-motion`; keep every state readable without spatial travel.

## Components

- Primary action: flat blue rectangle, white label, 48px minimum height.
- Secondary action: underlined text or neutral outline.
- Inputs: visible label, strong focus ring, 48px minimum control height.
- Data: tabular numerals; color represents meaning, not decoration.
- Icons: Lucide outline icons at a consistent stroke and scale.

## Accessibility

Maintain 4.5:1 body-text contrast, visible keyboard focus, semantic headings, labeled controls, 44px minimum interactive targets, and working non-WebGL content. Do not encode status with color alone.
