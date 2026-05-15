// ==========================================
// Farooq Ventures — Motion.js (Framer Motion vanilla)
// ==========================================
import { animate, inView, stagger } from 'https://cdn.jsdelivr.net/npm/motion@11/+esm';

// ==========================================
// Navigation Scroll Effect
// ==========================================
const nav = document.querySelector('.nav');
const hero = document.querySelector('.hero');
if (hero) {
    // Home page — nav transparent over hero, shows bg after scrolling 75% through it
    window.addEventListener('scroll', () => {
        const heroH = hero.offsetHeight || window.innerHeight;
        nav.classList.toggle('scrolled', window.scrollY > heroH * 0.75);
    });
} else {
    // Non-hero pages (e.g. contact.html) — nav always shows background
    nav.classList.add('scrolled');
}

// ==========================================
// Hero Entrance Animations
// ==========================================
const ease = [0.22, 1, 0.36, 1];
const revealEase = [0.16, 1, 0.3, 1]; // spring-like for the hero image reveal

// Hero image — expands from 72% with rounded corners to full-bleed rectangular
animate('.hero-image',    { opacity: [0, 1], scale: [0.72, 1], borderRadius: ['40px', '0px'] }, { duration: 1.6, delay: 0.05, easing: revealEase });

// Text content staggers in while image is still mid-reveal
animate('.hero-title',    { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, delay: 0.45, easing: ease });
animate('.hero-subtitle', { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, delay: 0.60, easing: ease });
animate('.hero-buttons',  { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, delay: 0.72, easing: ease });

// ==========================================
// Stacking Service Panels
// Each panel slides in from below as the user scrolls;
// the sticky CSS handles the stacking — Motion.js animates
// the content inside each panel as it enters the viewport.
// ==========================================
document.querySelectorAll('.service-panel').forEach((panel, i) => {
    const eyebrow  = panel.querySelector('.panel-eyebrow');
    const title    = panel.querySelector('.panel-title');
    const desc     = panel.querySelector('.panel-desc');
    const tags     = panel.querySelectorAll('.tag');
    const img      = panel.querySelector('.panel-right img');
    // Listing-page elements (null on home page — animate only if present)
    const badges   = panel.querySelector('.listing-badges');
    const price    = panel.querySelector('.listing-price');
    const statsRow = panel.querySelector('.listing-stats-row');
    const cta      = panel.querySelector('.listing-cta');

    const isReversed = panel.classList.contains('panel--reversed');
    const isDark     = panel.classList.contains('panel--dark');

    const triggerAnimation = () => {
        if (isReversed) {
            // Image enters from left, text sweeps in from the right
            if (eyebrow)     animate(eyebrow,  { opacity: [0, 1], x: [40, 0]                                               }, { duration: 0.6,  delay: 0.0,  easing: ease });
            if (badges)      animate(badges,   { opacity: [0, 1], x: [30, 0]                                               }, { duration: 0.5,  delay: 0.08, easing: ease });
            if (title)       animate(title,    { opacity: [0, 1], x: [90, 0],  scale: [0.88, 1], filter: ['blur(10px)', 'blur(0px)'] }, { duration: 0.85, delay: 0.15, easing: ease });
            if (price)       animate(price,    { opacity: [0, 1], x: [50, 0]                                               }, { duration: 0.65, delay: 0.35, easing: ease });
            if (desc)        animate(desc,     { opacity: [0, 1], x: [65, 0],  scale: [0.96, 1], filter: ['blur(6px)',  'blur(0px)'] }, { duration: 0.7,  delay: 0.42, easing: ease });
            if (statsRow)    animate(statsRow, { opacity: [0, 1], x: [40, 0]                                               }, { duration: 0.55, delay: 0.58, easing: ease });
            if (cta)         animate(cta,      { opacity: [0, 1], x: [30, 0]                                               }, { duration: 0.5,  delay: 0.68, easing: ease });
            if (img)         animate(img,      { opacity: [0, 1], x: [-80, 0], borderRadius: ['28px', '16px']              }, { duration: 1.0,  delay: 0.05, easing: revealEase });
        } else if (isDark) {
            // Dark panel — cinematic, maximum drama
            if (eyebrow)     animate(eyebrow,  { opacity: [0, 1], y: [20, 0]                                                         }, { duration: 0.65, delay: 0.0,  easing: ease });
            if (badges)      animate(badges,   { opacity: [0, 1], y: [16, 0]                                                         }, { duration: 0.55, delay: 0.1,  easing: ease });
            if (title)       animate(title,    { opacity: [0, 1], y: [100, 0], scale: [0.84, 1], filter: ['blur(14px)', 'blur(0px)'] }, { duration: 1.0,  delay: 0.18, easing: ease });
            if (price)       animate(price,    { opacity: [0, 1], y: [50, 0]                                                         }, { duration: 0.75, delay: 0.40, easing: ease });
            if (desc)        animate(desc,     { opacity: [0, 1], y: [70, 0],  scale: [0.94, 1], filter: ['blur(8px)',  'blur(0px)'] }, { duration: 0.8,  delay: 0.50, easing: ease });
            if (statsRow)    animate(statsRow, { opacity: [0, 1], y: [40, 0]                                                         }, { duration: 0.65, delay: 0.66, easing: ease });
            if (cta)         animate(cta,      { opacity: [0, 1], y: [30, 0]                                                         }, { duration: 0.6,  delay: 0.78, easing: ease });
            if (img)         animate(img,      { opacity: [0, 1], scale: [1.12, 1], borderRadius: ['32px', '16px']                   }, { duration: 1.5,  delay: 0.04, easing: revealEase });
        } else {
            // Default — home page service panels and non-modified listing panels
            if (eyebrow)     animate(eyebrow,  { opacity: [0, 1], y: [20, 0]                                                        }, { duration: 0.6,  delay: 0.0,  easing: ease });
            if (badges)      animate(badges,   { opacity: [0, 1], y: [16, 0]                                                        }, { duration: 0.5,  delay: 0.08, easing: ease });
            if (title)       animate(title,    { opacity: [0, 1], y: [80, 0],  scale: [0.88, 1], filter: ['blur(10px)', 'blur(0px)'] }, { duration: 0.9,  delay: 0.15, easing: ease });
            if (price)       animate(price,    { opacity: [0, 1], y: [44, 0]                                                        }, { duration: 0.65, delay: 0.35, easing: ease });
            if (desc)        animate(desc,     { opacity: [0, 1], y: [60, 0],  scale: [0.96, 1], filter: ['blur(6px)',  'blur(0px)'] }, { duration: 0.75, delay: 0.42, easing: ease });
            if (statsRow)    animate(statsRow, { opacity: [0, 1], y: [36, 0]                                                        }, { duration: 0.6,  delay: 0.58, easing: ease });
            if (tags.length) animate(tags,     { opacity: [0, 1], y: [28, 0]                                                        }, { duration: 0.5,  delay: stagger(0.065, { start: 0.62 }), easing: ease });
            if (cta)         animate(cta,      { opacity: [0, 1], y: [24, 0]                                                        }, { duration: 0.5,  delay: 0.78, easing: ease });
            if (img)         animate(img,      { opacity: [0, 1], scale: [1.08, 1], borderRadius: ['28px', '16px']                  }, { duration: 1.0,  delay: 0.06, easing: revealEase });
        }
    };

    // All panels animate via inView — fire when 80% of the panel is visible
    // (the panel is nearly full-screen before animations start, so text
    // is readable as it comes in rather than animating off-screen at the bottom)
    inView(panel, triggerAnimation, { amount: 0.8 });
});

// ==========================================
// Hero Stats Tiles — staggered entrance + animated counters
// Tiles are in the hero (always visible on load), so trigger
// via a short delay after the hero image reveal completes.
// ==========================================
function runCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target   = parseInt(el.dataset.target, 10);
        const suffix   = el.dataset.suffix || '';
        const duration = 2200;
        const start    = performance.now();
        const tick = (now) => {
            const t    = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    // Tiles enter with a stagger after hero image finishes revealing
    setTimeout(() => {
        animate('.hero-stat-tile',
            { opacity: [0, 1], y: [16, 0] },
            { duration: 0.55, delay: stagger(0.09), easing: ease }
        );
        runCounters();
    }, 1050);
}

// ==========================================
// Contact Page Animations
// ==========================================
const contactIntro = document.querySelector('.contact-intro');
if (contactIntro) {
    inView('.contact-intro', () => {
        animate('.contact-eyebrow',      { opacity: [0, 1], y: [20, 0]                                                        }, { duration: 0.6,  delay: 0.0,  easing: ease });
        animate('.contact-intro-heading',{ opacity: [0, 1], y: [80, 0], scale: [0.88, 1], filter: ['blur(10px)', 'blur(0px)'] }, { duration: 0.9,  delay: 0.12, easing: ease });
        animate('.contact-detail-item',  { opacity: [0, 1], y: [40, 0]                                                        }, { duration: 0.55, delay: stagger(0.09, { start: 0.35 }), easing: ease });
        animate('.contact-form-card',    { opacity: [0, 1], y: [60, 0], scale: [0.96, 1]                                     }, { duration: 0.75, delay: 0.40, easing: ease });
    }, { amount: 0.2 });

    inView('.contact-map-section', () => {
        animate('.contact-map-section', { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.8, easing: ease });
    }, { amount: 0.3 });
}

// ==========================================
// FAQ Accordion Animation
// ==========================================
document.querySelectorAll('.faq-item').forEach(details => {
    const summary = details.querySelector('summary');
    const answer  = details.querySelector('.faq-answer');
    if (!summary || !answer) return;

    // Take over from browser — control visibility via height only
    answer.style.overflow = 'hidden';
    if (!details.open) answer.style.height = '0px';

    summary.addEventListener('click', e => {
        e.preventDefault();

        if (details.open) {
            // Pin the current pixel height so the browser has a start value
            answer.style.height = answer.scrollHeight + 'px';
            // rAF ensures the height is painted before Motion reads it
            requestAnimationFrame(() => {
                animate(answer,
                    { height: '0px', opacity: [1, 0] },
                    { duration: 0.4, easing: [0.4, 0, 1, 1] }
                ).then(() => {
                    details.removeAttribute('open'); // collapse only after animation
                    answer.style.height = '0px';
                });
            });
        } else {
            details.setAttribute('open', '');
            answer.style.height = '0px';
            answer.style.opacity = '0';
            const targetH = answer.scrollHeight;
            requestAnimationFrame(() => {
                animate(answer,
                    { height: [answer.style.height, targetH + 'px'], opacity: [0, 1] },
                    { duration: 0.4, easing: ease }
                ).then(() => { answer.style.height = 'auto'; });
            });
        }
    });
});

// ==========================================
// FAQ Section Entrance
// ==========================================
inView('.faq-section', () => {
    animate('.faq-eyebrow',    { opacity: [0, 1], y: [20,  0]                                                        }, { duration: 0.6,  delay: 0.0,  easing: ease });
    animate('.faq-heading',    { opacity: [0, 1], y: [70,  0], scale: [0.90, 1], filter: ['blur(10px)', 'blur(0px)'] }, { duration: 0.85, delay: 0.12, easing: ease });
    animate('.faq-form-card',  { opacity: [0, 1], y: [80,  0], scale: [0.96, 1]                                     }, { duration: 0.8,  delay: 0.30, easing: ease });
    animate('.faq-item',       { opacity: [0, 1], y: [40,  0]                                                       }, {
        duration: 0.55,
        delay: stagger(0.08, { start: 0.42 }),
        easing: ease
    });
}, { amount: 0.25 });

// ==========================================
// Footer
// ==========================================
inView('.footer', () => {
    animate('.footer-section', { opacity: [0, 1], y: [20, 0] }, {
        duration: 0.5,
        delay: stagger(0.1),
        easing: ease
    });
}, { amount: 0.35 });

// ==========================================
// Smooth Scroll
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
});

// ==========================================
// Contact Form → Google Sheets
// Replace SCRIPT_URL with your deployed Apps Script web app URL.
// Setup instructions are in google-apps-script.js
// ==========================================
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzh9EFTAbKvGEkdR2MHhCP9tpCqrCWPPb_Pf4WTmPAB_h7hjXJoEjU-UnVSFyeEaXDr/exec';

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');

        // Honeypot check — real users never fill this field
        const honeypot = contactForm.querySelector('[name="website"]');
        if (honeypot && honeypot.value.trim() !== '') {
            // Silent fail — don't tell bots they were caught
            contactForm.reset();
            return;
        }

        // Gather and trim fields
        const name    = (contactForm.querySelector('[name="name"]')?.value    || '').trim();
        const phone   = (contactForm.querySelector('[name="phone"]')?.value   || '').trim();
        const email   = (contactForm.querySelector('[name="email"]')?.value   || '').trim();
        const message = (contactForm.querySelector('[name="message"]')?.value || '').trim();

        // Basic client-side validation
        if (!name || !email || !message) {
            btn.textContent = 'Please fill all required fields';
            btn.style.background = '#b03a2e';
            setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; }, 3000);
            return;
        }

        // Enforce max lengths before sending
        if (name.length > 120 || email.length > 200 || message.length > 2000) {
            btn.textContent = 'Input too long';
            btn.style.background = '#b03a2e';
            setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; }, 3000);
            return;
        }

        btn.textContent = 'Sending…';
        btn.disabled = true;

        try {
            await fetch(SHEET_URL, {
                method: 'POST',
                mode:   'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    name, phone, email, message,
                }),
            });

            btn.textContent = 'Message Sent!';
            btn.style.background = '#2a6b3a';
            contactForm.reset();
        } catch (err) {
            btn.textContent = 'Error — try again';
            btn.style.background = '#b03a2e';
        } finally {
            btn.disabled = false;
            setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; }, 4000);
        }
    });
}
