# Farooq Ventures — Website

Static marketing website for Farooq Ventures, an investment firm. Built with HTML, CSS, and vanilla JavaScript (Motion.js for animations). No build process, no framework — uploads directly to Namecheap shared hosting.

---

## File Structure

```
farooqventures/
├── index.html               # Full site — single page
├── styles.css               # All styling
├── script.js                # Motion.js animations + form handler
├── google-apps-script.js    # Paste into Google Apps Script editor (not uploaded to Namecheap)
└── README.md                # This file
```

Files ending in `-old` (`index-old.html`, `styles-old.css`, `script-old.js`) are backups and are **not** deployed.

---

## Technology Stack

| Layer | Technology | Hosted by |
|---|---|---|
| Markup | HTML5 | Namecheap |
| Styling | CSS3 (Grid, Flexbox, sticky scroll) | Namecheap |
| Animations | Motion.js 11 (vanilla Framer Motion, ESM CDN) | jsDelivr CDN |
| Fonts | Geist + Inter (Google Fonts CDN) | Google CDN |
| Images | Unsplash (CDN URLs, no local files) | Unsplash CDN |
| Form submissions | Google Apps Script → Google Sheets | Google (free) |

**Nothing runs server-side on Namecheap.** The hosting plan only needs to serve static files.

---

## Design System

```css
--primary-black:  #000000
--footer-blue:    #014670   /* kept as variable, not actively used */
--accent-orange:  #ff833b
--bg-cream:       #f5f3ee   /* main background throughout site */
--bg-cream-dark:  #ede9e0   /* alternate sections */
```

Font stack: `'Geist', 'Inter', ui-sans-serif, system-ui, sans-serif`

---

## Page Sections (top to bottom)

1. **Nav** — fixed, cream background with backdrop-blur, scrolled state darkens border
2. **Hero** — full-viewport, large headline, two CTAs, Unsplash office image
3. **Services (stacking panels)** — 4 full-height panels using CSS `position: sticky`; each stacks over the previous as the user scrolls
4. **Stats** — black background; animated counters trigger on scroll
5. **FAQ + Contact** — two-column layout: sticky form card (left) + collapsible accordion (right)
6. **Footer** — cream background; left column has contact details, right column has nav links with arrow icons, social bar along the bottom

---

## Stacking Scroll Effect

The services section uses **pure CSS sticky stacking** — no JavaScript required for the effect itself.

```css
.service-panel {
    position: sticky;
    top: 0;
    height: 100vh;
}
.service-panel:nth-child(1) { z-index: 1; }
.service-panel:nth-child(2) { z-index: 2; }
.service-panel:nth-child(3) { z-index: 3; }
.service-panel:nth-child(4) { z-index: 4; }
```

As the user scrolls, each panel slides up and visually stacks on top of the previous. The `.services-stack` wrapper has no fixed height — it grows to `4 × 100vh` naturally.

Motion.js animates the **content inside** each panel (eyebrow, title, description, tags, image) as the panel enters the viewport using `inView()`.

---

## Animations (Motion.js)

`script.js` imports Motion.js as an ES module from CDN:

```js
import { animate, inView, stagger } from 'https://cdn.jsdelivr.net/npm/motion@11/+esm';
```

The `<script>` tag in `index.html` must be `type="module"`:

```html
<script type="module" src="script.js"></script>
```

> **Local testing note:** ES modules are blocked by browsers on `file://` URLs.  
> Run a local server to test: `python3 -m http.server 8080` then open `http://localhost:8080`.  
> On Namecheap (served over HTTPS) it works without any changes.

---

## FAQ Accordion

Built with native HTML `<details>` / `<summary>` elements. No JavaScript required — the browser handles open/close natively.

```html
<details class="faq-item">
    <summary class="faq-question">
        <span>Question text</span>
        <span class="faq-icon"></span>
    </summary>
    <div class="faq-answer"><p>Answer text</p></div>
</details>
```

The `+` icon is drawn entirely with CSS `::before` / `::after` pseudo-elements. When `[open]` is present on the `<details>` element, the vertical bar rotates away leaving a `×`.

---

## Form Submissions → Google Sheets

### How it works

```
User fills form → script.js validates + sends fetch POST
    → Google Apps Script web app endpoint (free, Google-hosted)
        → appends row to Google Sheet
```

No backend on Namecheap. No paid service. The Google Apps Script endpoint URL is stored in one variable at the top of `script.js`:

```js
const SHEET_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```

### Security layers

| Layer | Where | What it does |
|---|---|---|
| Honeypot field | `index.html` + `script.js` | Hidden input bots fill in; submission silently dropped if populated |
| Client-side validation | `script.js` | Checks required fields, enforces max lengths before sending |
| Server-side honeypot re-check | `google-apps-script.js` | Catches bots that bypass client-side JS |
| Rate limiting | `google-apps-script.js` | Max 5 submissions per email per rolling hour via `PropertiesService` |
| Input sanitisation | `google-apps-script.js` | Strips HTML tags, neutralises spreadsheet formula-injection chars (`=`, `+`, `-`, `@`) |
| Email validation | `google-apps-script.js` | Regex check before writing to Sheet |

### Google Apps Script setup (one-time)

1. Go to [sheets.google.com](https://sheets.google.com) and create a new Sheet.
   Add these exact headers in row 1:

   | A | B | C | D | E |
   |---|---|---|---|---|
   | Timestamp | Name | Phone | Email | Message |

2. In the Sheet: **Extensions → Apps Script**

3. Delete all existing code. Paste the entire contents of `google-apps-script.js`. Save.

4. Click **Deploy → New deployment**:
   - Type: `Web app`
   - Execute as: `Me`
   - Who has access: `Anyone`
   - Click **Deploy** and authorise when prompted

5. Copy the Web app URL (format: `https://script.google.com/macros/s/ABC.../exec`)

6. Open `script.js` and replace:
   ```js
   const SHEET_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
   ```
   with your copied URL.

7. Open `google-apps-script.js` and update:
   ```js
   const ALLOWED_ORIGIN = 'https://farooqventures.com';
   ```

8. In Apps Script: **Deploy → Manage deployments → Edit → New version → Deploy** to publish the updated config.

> Google Apps Script is **free** on any Google account. Quota limits (far beyond what a business site needs): 20,000 URL fetch calls/day, unlimited Sheet writes.

---

## Deploy to Namecheap

### Files to upload

Upload **only these three files** to `public_html`:

```
index.html
styles.css
script.js
```

Do **not** upload `google-apps-script.js`, `README.md`, or any `-old` files.

### Via cPanel File Manager

1. Log into Namecheap → Hosting → cPanel
2. Open **File Manager** → navigate to `public_html`
3. Delete any existing `index.html`
4. Click **Upload** and select `index.html`, `styles.css`, `script.js`
5. Visit your domain — the site is live

### Via FTP (FileZilla)

1. In cPanel → **FTP Accounts** — note your hostname, username, password
2. Open FileZilla. Connect with those credentials
3. Navigate to `public_html` on the remote side
4. Drag and drop the three files from your local machine
5. Done

---

## Go-Live Checklist

- [ ] Update `SHEET_URL` in `script.js` with your Apps Script URL
- [ ] Update `ALLOWED_ORIGIN` in `google-apps-script.js` with your domain
- [ ] Deploy updated Apps Script (new version)
- [ ] Upload `index.html`, `styles.css`, `script.js` to `public_html`
- [ ] Test contact form on live site — verify a row appears in Google Sheet
- [ ] Test FAQ accordion opens/closes
- [ ] Verify stacking scroll effect works on mobile
- [ ] Add favicon (`<link rel="icon">` in `index.html`)
- [ ] Replace placeholder phone/email/address in footer with real details
- [ ] Set up Google Analytics (optional — add GA4 script to `<head>`)

---

## Browser Support

Chrome, Firefox, Safari, Edge (all current versions). `<details>`/`<summary>` and CSS sticky are supported in all modern browsers. ES modules require a server (`http://` or `https://`) — not `file://`.
