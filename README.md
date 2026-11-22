# Dentia - Modern Dental Clinic & Implant Center Website

A high-converting, local SEO-optimized website template for dental clinics, dentists, and implant centers based on the **Dentia** design architecture.

---

## 🚀 Quick Start

1. **Direct Browser Preview:**
   Double-click `index.html` to open the website directly in any web browser (Chrome, Edge, Safari, Firefox).

2. **Run with a Local Web Server (Optional):**
   ```bash
   # Using Python 3
   python -m http.server 3000

   # Or using Node.js / npx
   npx serve .
   ```
   Open `http://localhost:3000` in your browser.

---

## 📁 Package Contents

| File | Purpose |
| :--- | :--- |
| `index.html` | Complete homepage markup with 15 sections, embedded `Dentist` & `LocalBusiness` JSON-LD schema, and `FAQPage` schema. |
| `styles.css` | Healthcare design system, CSS custom properties, responsive breakpoints, animations, and typography. |
| `script.js` | Interactive appointment modal, Before/After smile makeover slider, service filter tabs, gallery tabs, and WhatsApp confirmation. |
| `README.md` | Setup guide and customization instructions. |

---

## 🎨 Design System & Colors

The styles are configured with the following healthcare palette:

* **Primary Deep Teal:** `#174A5B` (`--primary`)
* **Muted Teal:** `#7FAEAA` (`--secondary`)
* **Soft Aqua:** `#EAF5F5` (`--soft-aqua`)
* **Charcoal:** `#263238` (`--charcoal`)
* **Pure White:** `#FFFFFF` (`--white`)
* **Accent Green:** `#10B981` (`--accent-green`)

---

## 🛠️ Customization Guide

### 1. Update Clinic Contact & Address
Search for `+91 98765 43210` in `index.html` and replace it with your clinic's phone and WhatsApp number.
Search for `Harmony Health Plaza` to replace the address with your local clinic location.

### 2. Update Google Maps Embed
In the `<section class="contact-section">` in `index.html`, replace the `src` attribute of the `<iframe>` with your Google Business Profile embed URL.

### 3. Update Doctor Profiles
In the `<section class="doctors-section">`, customize the names, degrees (BDS, MDS), experience, and Dental Council of India (DCI) registration numbers.

---

## 📱 Features Included

- Sticky navigation on scroll with glassmorphism blur
- Mobile slide-out drawer navigation
- Above-the-fold Quick Appointment Booking bar
- 12 comprehensive treatment cards with category filters
- Interactive Before & After Smile Transformation split slider
- Verified Google Reviews rating badge (4.9★ / 850+ reviews)
- Filterable clinic facilities photo gallery
- Accessible FAQ accordion with 7 core dental questions
- Responsive appointment request modal with reference ID generation & 1-click WhatsApp sync
- Mobile bottom sticky action bar (`Call Now` | `WhatsApp` | `Book Now`)
