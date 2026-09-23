# EMBER & PLATE

A premium, responsive website for a **fictional contemporary restaurant**. Built as a professional portfolio/demo project with a charcoal palette, cream typography, muted gold accents, and local restaurant photography.

## Technologies

HTML5, CSS3, and vanilla JavaScript. No framework, package installation, build step, database, or backend. DM Sans and Italiana are hosted locally; their SIL Open Font License notices are included in `assets/fonts/`.

## Main features

- Responsive hero, restaurant story, signature dishes, editorial gallery, and clearly labeled demo testimonials.
- Five filterable menu categories with descriptions, prices, and vegetarian indicators.
- Sticky navigation, accessible mobile menu, active section links, and back-to-top control.
- Locally validated reservation demo with labeled errors and an explicit no-booking success message.
- Keyboard focus states, skip link, reduced-motion support, lazy-loaded photography, and responsive hero/story images.
- SEO metadata, social-sharing placeholders, branded SVG/ICO favicons, and an Apple touch icon.
- No runtime third-party requests, analytics, external libraries, or form submissions.

## Run locally

Open `index.html` directly for a quick preview. For the recommended HTTP preview, open a terminal in this directory and run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Visit `http://localhost:8000`. Stop the server with `Ctrl+C`.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page sections, metadata, contact copy, initial menu fallback, and form fields |
| `styles.css` | Font declarations, design tokens, components, responsive layouts, and motion preferences |
| `script.js` | Menu data, navigation, filtering, demo validation, and reveal animations |
| `assets/` | Local photography and branded browser icons |
| `assets/fonts/` | Local WOFF2 fonts and their license notices |

## Customize restaurant information

Edit the brand, tagline, introduction, story, and opening hours in `index.html`. Colors and font families live in the `:root` block of `styles.css`. Keep the section IDs in sync with navigation links and JavaScript selectors.

This version must remain clearly fictional when used as a portfolio. Retain the demo labels on testimonials, contact information, and reservations; do not add unsupported business claims.

### Replace images

1. Save optimized photographs in `assets/`, preferably using the existing filenames to minimize edits.
2. Update each image's `src`, meaningful `alt`, and intrinsic `width`/`height` in `index.html`.
3. If the dimensions or filenames change, update `srcset` and `sizes` where present. Keep the hero's image preload in the `<head>` synchronized with its image sources.
4. Keep the hero eager/high priority and other photography `loading="lazy"` with `decoding="async"`.
5. Adjust `object-position` in `styles.css` if a subject needs a different crop. The salmon crop currently targets its filename.

Existing photos are illustrative Unsplash imagery, not evidence of a real restaurant or its actual dishes. Use images you are entitled to publish. Social-sharing metadata currently reuses the local `assets/restaurant-1600.jpg` photograph as its placeholder image.

### Update menu items

Edit the `menu` object near the top of `script.js`. Each entry has `name`, `description`, `price`, and an optional `vegetarian: true` value. Preserve the category keys unless you also update the filter buttons' `data-category` attributes.

Keep the four static starter entries in `index.html` synchronized with `menu.starters`; they are the accessible initial/no-JavaScript fallback. Signature dishes are separately authored in `index.html` and need their copy and prices updated too. Prices are illustrative USD; if changing currency, update the JavaScript price formatter, static prices, and menu footnote together.

### Update contact information

The location/contact section and footer in `index.html` contain the address, opening hours, phone, and email. Social buttons use `data-demo` to open a placeholder notice; the map is decorative. Replace those controls with actual destination links or a map only when preparing a real business site.

Reservation time options are in `index.html`; Monday closure, date checks, and same-day time validation are in `script.js`. Update both if opening hours change.

## Deploy the portfolio

Upload `index.html`, `styles.css`, `script.js`, and the complete `assets/` directory to any static host. Serve the project root as the public directory. There is no build command. Paths are relative so the page can also be hosted in a subdirectory.

Before publishing:

1. Replace `https://emberandplate.example/` in the canonical URL, `og:url`, `og:image`, and `twitter:image` metadata with the actual public site origin/path. Use absolute HTTPS URLs. The reserved `.example` origin is intentionally a placeholder and will not resolve.
2. Keep the title and descriptions accurate for the fictional portfolio. If replacing the social image, update its absolute URL, alt text, and dimensions. Upload the image along with the site.
3. Keep the included font license files with the locally hosted fonts.
4. Enable HTTPS, compression, and sensible asset caching through the chosen host. Avoid long immutable caching for unversioned filenames unless you add a cache-busting strategy.
5. Check the live page and social-sharing preview after deployment; local tests cannot validate the final domain, host headers, or crawler access.

## Demo boundaries

The restaurant, testimonials, address, menu, phone number, and email are fictional. The reserved `.example` email cannot receive mail. The reservation form validates in the browser only: it sends and persists no guest data and never books a table. Successful input remains visible in the page until changed or reloaded. WhatsApp and Instagram buttons display a demo explanation. There is no live map or reservation service.

No-JavaScript visitors can navigate the site and read the starter menu; filtering and the reservation demonstration require JavaScript, and submission stays disabled without it.

## Validation and remaining deployment work

Validated in headless Chrome at **320, 375, 390, 430, 768, 1024, and 1440 pixels**, including shorter phone viewports. Checks cover overflow, clipped controls, image/font loading, internal links, menu filters, mobile keyboard focus and Escape, resize behavior, invalid/valid demo requests, social dialogs, reduced motion, and the no-JavaScript fallback. CSS cleanup is compared against computed-style baselines at all seven widths.

Remaining: supply the real portfolio URL, configure the chosen static host, and verify live social previews. Real-device Safari/Firefox testing is recommended before client handoff; current browser checks use Chrome viewport emulation. Real bookings, messaging, and maps are intentionally outside this demo.
