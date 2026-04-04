# 🏨 Tapovan Resort Website
## Complete Editing & Deployment Guide

---

## 📁 FOLDER STRUCTURE

```
tapovan-resort/
│
├── index.html              ← MAIN HOMEPAGE (edit this most)
├── css/
│   └── style.css           ← ALL styles & colors
├── js/
│   └── main.js             ← Booking logic, WhatsApp, animations
├── images/                 ← PUT ALL YOUR IMAGES HERE
│   ├── hero.jpg            ← Main hero background (1920x1080)
│   ├── about-main.jpg      ← About section large image
│   ├── about-secondary.jpg ← About section small image
│   ├── room-1.jpg          ← Deluxe room photo
│   ├── room-2.jpg          ← Suite photo
│   ├── villa.jpg           ← Whole villa photo
│   ├── highlight-stay.jpg  ← "Luxury Stay" card image
│   ├── highlight-pool.jpg  ← Pool card image
│   ├── highlight-family.jpg← Family card image
│   ├── highlight-spiritual.jpg ← Spiritual card image
│   ├── gallery-1.jpg       ← Gallery (use your best exterior shot)
│   ├── gallery-2.jpg
│   ├── gallery-3.jpg
│   ├── gallery-4.jpg
│   ├── gallery-5.jpg
│   ├── gallery-6.jpg
│   ├── place-ramghat.jpg
│   ├── place-kamadgiri.jpg
│   ├── place-hanumandhar.jpg
│   ├── place-sphatik.jpg
│   ├── place-gupt-godavari.jpg
│   ├── place-sati-anusuya.jpg
│   └── places-hero.jpg     ← Hero for places page
└── pages/
    ├── places.html         ← Places to Visit page
    ├── privacy.html        ← Privacy Policy
    └── terms.html          ← Terms & Conditions
```

---

## ✏️ WHAT TO EDIT — CHECKLIST

### Step 1: Update Contact Details (MOST IMPORTANT)
Search for `919876543210` across ALL files and replace with uncle's actual WhatsApp number.
Search for `bookings@tapovanresort.com` and replace with actual email.
Search for `+91 98765 43210` and replace with actual phone.

### Step 2: Add Your Images
- Copy all your resort photos into the `images/` folder
- Rename them to match the filenames listed above
- For best quality: use JPG format, keep files under 500KB each
- Recommended tool to compress: https://squoosh.app (free, online)

### Step 3: Update Prices (index.html)
Search for `₹8,999`, `₹14,999`, `₹22,999` and update with actual pricing.

### Step 4: Update the Google Maps Embed (index.html)
- Go to Google Maps
- Search "Tapovan Resort, 6XPG+37V, Chitrakoot"
- Click Share → Embed a map → Copy iframe src URL
- In index.html, find `<iframe` inside the location section and replace the `src="..."` value

### Step 5: Update Google Maps Embed for correct location
Find the iframe in index.html under the Location section and paste your copied URL.

### Step 6: Address & Location Details
Search for `6XPG+37V` and replace with your correct address.

---

## 🎨 HOW TO CHANGE COLORS

Open `css/style.css` and find the `:root` section at the top:

```css
:root {
  --gold: #C9A84C;        ← Main gold color
  --gold-light: #E8D5A3;  ← Light gold
  --gold-dark: #8B6914;   ← Dark gold
  --dark: #1A1612;        ← Main dark background
  --cream: #F7F3EC;       ← Page background color
  ...
}
```

Change any hex color value to retheme the entire site instantly.

---

## 🚀 HOW TO DEPLOY (FREE)

### Option A: Vercel (Recommended — Takes 5 minutes)
1. Create account at https://vercel.com (free)
2. Install Vercel CLI: `npm i -g vercel`
3. Open terminal in your project folder
4. Run: `vercel`
5. Follow prompts — your site is live!
6. Connect domain `tapovanresort.co.in` in Vercel dashboard

### Option B: Netlify (Also great)
1. Go to https://netlify.com
2. Drag and drop the entire `tapovan-resort` folder onto their dashboard
3. Site is live instantly with a free netlify.app URL
4. Connect your custom domain in settings

### Option C: GitHub Pages (Free)
1. Create a GitHub repo named `tapovan-resort`
2. Push all files to the repo
3. Go to Settings → Pages → Enable GitHub Pages
4. Site goes live at `yourusername.github.io/tapovan-resort`

---

## 📱 WHATSAPP BOOKING FLOW

The website is set up so ALL bookings go through WhatsApp. When a guest:
- Clicks "Book Now" → Opens WhatsApp with pre-filled message
- Fills the contact form → Sends data via WhatsApp
- Clicks room "Book Now" → WhatsApp with room name pre-filled

To change the WhatsApp number, open `js/main.js` and update:
```javascript
const phone = '919876543210'; // ← Change this (country code + number, no +)
```

---

## 📧 WANT EMAIL ENQUIRIES INSTEAD OF WHATSAPP?

You can add EmailJS (free for 200 emails/month):
1. Sign up at https://emailjs.com
2. Create a template
3. Add their SDK to your HTML
4. Update the contact form handler in main.js

I can help you set this up when you're ready!

---

## ✅ FINAL CHECKLIST BEFORE SHOWING UNCLE

- [ ] All images added and loading correctly
- [ ] WhatsApp number updated everywhere
- [ ] Phone number updated everywhere
- [ ] Email address updated
- [ ] Prices updated
- [ ] Google Maps showing correct location
- [ ] Address updated
- [ ] Test "Book Now" button opens WhatsApp
- [ ] Test contact form sends to WhatsApp
- [ ] Check on mobile (resize browser to test)

---

*Built with pure HTML, CSS & JavaScript — no frameworks needed.*
*Easy to edit, fast to load, free to host.*
