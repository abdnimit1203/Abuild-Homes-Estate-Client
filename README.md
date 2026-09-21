# ABuild Homes Estates — Frontend Client 🏡

A modern, high-performance real-estate web application engineered with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **DaisyUI**. Users can discover verified luxury residences, submit purchase offers, share verified reviews, and complete payments via Stripe.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4.4-5A0EF8.svg)](https://daisyui.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange.svg)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Elements-6772E5.svg)](https://stripe.com/)

---

## 🔗 Live Application & Links

- **Live Deployment**: [https://abuild-homes-estate-abd.netlify.app](https://abuild-homes-estate-abd.netlify.app)
- **Backend API Repository**: [https://github.com/abdnimit1203/Abuild-Homes-Estate-server.git](https://github.com/abdnimit1203/Abuild-Homes-Estate-server.git)

---

## ✨ Features & Capabilities

### 🌐 Public & Discovery Portal
- **Next.js 14 App Router Architecture**: Full SSR, metadata optimization, OpenGraph previews, and fast client navigation.
- **Dynamic Search & Multi-Criteria Filtering**: Filter verified real-estate properties by location, type, price ranges, and ascending/descending sorting.
- **Granular Property Locations**: Detailed address tracking with House Number, Road Number, Division, Country, and Continent while maintaining single-string address compatibility.
- **Interactive Reviews Carousel**: Client feedback showcase powered by Swiper.js with manual navigation buttons and autoplay.
- **Dual Light / Dark Mode**: Integrated theme toggle syncing DaisyUI themes (`mytheme` / `dark`) and Tailwind dark-mode classes with local persistence.

### 📸 Dual-Mode Image Upload
- **ImgBB Direct Cloud Upload**: Upload high-resolution images straight from local storage to ImgBB with instant progress indicators and hosted HTTPS URLs.
- **Direct Image URL Input**: Paste existing cloud image URLs directly into listings with real-time preview and fallback handling.

### 👤 Role-Based Portals & Dashboards
- **User Dashboard**: Manage personal profile, explore saved wishlist properties, submit custom purchase offers, review offer statuses, and complete payments for accepted bids.
- **Agent Dashboard**: Add new property listings with granular address fields, manage active listings, track customer offers, and accept or reject bids.
- **Admin Dashboard**: Verify or reject pending property listings, monitor user accounts, assign roles (`agent`, `admin`, `fraud`), and manage customer reviews.
- **Dedicated Table Scrollers**: Responsive data tables featuring horizontal scrolling containers on mobile and tablet devices while displaying full width on desktops.

### 💳 Secure Payments with Stripe
- Integrated **Stripe Elements** with card number, expiration, and CVC formatting.
- Real-time client-side payment validation, transaction receipt generation, and status synchronization with the database.

---

## 🛠️ Project Structure

```
Abuild-Homes-Estate-Client/
├── public/
│   └── assets/               # Brand logos, hero banners, and vector assets
├── src/
│   ├── app/                  # Next.js 14 App Router
│   │   ├── layout.tsx        # Root layout, Navbar, Footer, and Client Providers
│   │   ├── page.tsx          # Modernized landing page
│   │   ├── all-properties/   # Property discovery & search
│   │   ├── properties/[id]/  # Single property showcase & review submission
│   │   ├── login/            # Split-screen responsive login page
│   │   ├── sign-up/          # Registration with ImgBB avatar upload
│   │   ├── career/           # Careers & vacancies
│   │   ├── about-us/         # Mission, pillars & contact channels
│   │   └── dashboard/        # Role-based dashboard views
│   │       ├── profile/
│   │       ├── wishlist/
│   │       ├── add-property/
│   │       ├── added-properties/
│   │       ├── update-property/[id]/
│   │       ├── requested-properties/
│   │       ├── property-bought/
│   │       ├── payment/[id]/
│   │       ├── manage-properties/
│   │       ├── manage-users/
│   │       └── manage-reviews/
│   ├── components/
│   │   ├── Navbar/           # Responsive top navbar with role-aware profile dropdown
│   │   ├── Footer/           # Footer with site map and social links
│   │   ├── Cards/            # AllPropertiesCard, MiniCard
│   │   ├── common/           # ImageUpload, HeaderText
│   │   ├── home/             # Banner, Features, Reviews, Rental, Countries
│   │   ├── auth/             # SocialLogin
│   │   ├── providers/        # AuthProvider, ClientProviders, QueryClient
│   │   └── theme/            # ThemeProvider, ThemeToggle
│   ├── hooks/
│   │   └── useRole.ts        # TanStack Query hook for user role resolution
│   ├── lib/
│   │   ├── api.ts            # Axios instances with token interceptor
│   │   ├── firebase.ts       # Client Firebase Auth initialization
│   │   ├── imgbb.ts          # Direct ImgBB upload handler
│   │   └── confirmDialog.ts  # SweetAlert2 themed confirmation dialogs
│   └── types/
│       └── index.ts          # TypeScript interfaces (Property, Offer, User, Review)
├── tailwind.config.js        # DaisyUI themes & custom colors
├── tsconfig.json             # TypeScript compiler settings
└── next.config.mjs           # Next.js optimization configuration
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```ini
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# Firebase Client Authentication
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=abuild-homesabd.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=abuild-homesabd
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=abuild-homesabd.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=7901...
NEXT_PUBLIC_FIREBASE_APP_ID=1:7901...:web:...

# ImgBB Direct Upload API Key
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

# Stripe Payment Gateway
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.17 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/abdnimit1203/Abuild-Homes-Estate-Client.git
cd Abuild-Homes-Estate-Client

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Build optimized static and server pages
npm run build

# Start production server
npm start
```

---

## 🎨 Theme & Color Palette

| Name | Hex Code | Purpose |
|---|---|---|
| **Primary Sky Blue** | `#38B6FF` | Main buttons, brand accent, active state highlights |
| **Warm Sunset Coral** | `#FF5A3C` | Secondary accent, badges, gradient highlights |
| **Emerald Green** | `#18B47B` | Verified status, success states, pricing badges |
| **Rose Crimson** | `#E11D48` | Destructive actions, delete confirmations, rejections |

---

## 📄 License
ISC © [Abdullah Ibne Ali](https://github.com/abdnimit1203)
