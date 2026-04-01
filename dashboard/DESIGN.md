```markdown
# Design System Specification: High-End Dashboard Experience

## 1. Overview & Creative North Star: "The Architectural Editor"
This design system moves beyond the standard "SaaS dashboard" by embracing the **Architectural Editor** aesthetic. It is inspired by the clarity of Streamlit but elevated through high-end editorial layouts. Instead of a rigid, boxed-in grid, we utilize intentional white space, varied typographic scales, and tonal depth to guide the user’s eye. 

The goal is to make "Minute Master" feel like a premium workspace—quiet, authoritative, and frictionless. We achieve this by rejecting "default" UI patterns (like heavy borders and generic shadows) in favor of layered surfaces and sophisticated type pairings.

---

## 2. Colors & Surface Philosophy
The palette is rooted in professional blues and cool grays, designed to reduce cognitive load while maintaining a "high-performance" feel.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using `1px` solid borders for sectioning or containment. 
*   **The Alternative:** Boundaries must be defined through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background creates a natural, sophisticated edge without the visual noise of a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum.
*   **Base:** `surface` (#f8f9fb)
*   **Primary Containers:** `surface-container-low` (#f1f4f7)
*   **Emphasis/Action Areas:** `surface-container-lowest` (#ffffff) for maximum "pop" and clarity.
*   **The Glass & Gradient Rule:** For floating headers or sidebars, use `surface` at 80% opacity with a `backdrop-blur` of 20px. 

### Signature Textures
Main Action buttons or Hero sections should utilize a subtle linear gradient: 
*   From `primary` (#005db5) to `primary_dim` (#0052a0) at a 135-degree angle. This adds "soul" and prevents the interface from feeling medically sterile.

---

## 3. Typography: The Dual-Sans Approach
We use a high-contrast pairing of **Manrope** for structure and **Inter** for utility.

*   **Display & Headlines (Manrope):** The wider apertures and geometric nature of Manrope provide an "Architectural" feel. Use `display-lg` (3.5rem) sparingly for high-impact data points to create an editorial focal point.
*   **Body & Labels (Inter):** Inter’s high x-height ensures readability at small scales. Use `body-md` (0.875rem) as your workhorse for all dashboard data.
*   **Hierarchy Note:** To achieve the "Minute Master" premium look, increase the tracking (letter-spacing) of `label-sm` by 5% and set it in All Caps when used for category headers.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often a crutch for poor layout. In this system, depth is achieved through **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. The difference in hex value provides enough "lift" for the eye to recognize a new interactive object without needing a border.
*   **Ambient Shadows:** When a card must "float" (e.g., a modal or a primary hover state), use a shadow tinted with the `on-surface` color: `rgba(43, 52, 56, 0.06)` with a 40px blur and 10px Y-offset.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke (e.g., in high-contrast modes), use `outline-variant` (#aab3b9) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components & Interaction Patterns

### Buttons
*   **Primary:** Solid `primary` (#005db5) with `on-primary` text. Border radius: `DEFAULT` (0.5rem).
*   **Secondary:** `secondary_container` (#e2e2e9) with `on-secondary_container` text. No border.
*   **Tertiary/Ghost:** No background. Use `primary` color for text. On hover, apply a `surface-container-high` background.

### Input Fields
*   **Style:** Background `surface-container-low`, 0.5rem radius, no border.
*   **Active State:** Background shifts to `surface-container-lowest` with a `2px` "Ghost Border" using the `primary` color at 40% opacity.

### Cards & Data Lists
*   **Rule:** Forbid divider lines. 
*   **The Spacing Method:** Separate list items using `spacing-4` (1rem) of vertical white space or a alternating `surface` and `surface-container-low` backgrounds (Zebra-striping without lines).
*   **Corner Radius:** Cards should use `md` (0.75rem) to `lg` (1rem) for a friendly, modern feel.

### Chips (The "Streamlit" Influence)
*   **Filter Chips:** Use `secondary_container` with `secondary` text. For selected states, switch to `primary_container` with `on_primary_container` text.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts. Place a large `display-md` metric on the left and a compact `body-sm` description on the right to create visual interest.
*   **Do** use `spacing-12` (3rem) and `spacing-16` (4rem) to let major dashboard sections breathe.
*   **Do** use the `tertiary` (#5d5c78) color for "Secondary Data"—things like timestamps or metadata that shouldn't compete with primary metrics.

### Don’t:
*   **Don’t** use black (#000000). Our darkest color is `inverse_surface` (#0c0f10).
*   **Don’t** use "Card-in-Card" layouts with borders. If you must nest, change the background tone (e.g., a `surface-container-highest` card inside a `surface-container-low` section).
*   **Don’t** use sharp corners. Everything interactive must have at least a `sm` (0.25rem) radius to maintain the "Soft Minimalist" aesthetic.

---

## 7. Signature Component: The "Master Summary"
To represent the 'Minute Master' brand, every dashboard should feature a **Master Summary Bar**. 
*   **Construction:** A full-width `surface-container-lowest` bar with a `0.5rem` radius. 
*   **Styling:** Instead of borders, use a 4px left-accent vertical pill in `primary`. 
*   **Typography:** Large `headline-sm` metrics paired with `label-sm` descriptors. This provides a high-level "editorial" summary of the user's data at a single glance.```