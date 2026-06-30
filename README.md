# ClearBG — AI Background Remover

A fast, browser-based background removal tool built with React and Vite. Upload an image, and ClearBG strips the background instantly using on-device AI — no server upload, no waiting on a backend, and no image ever leaves the user's browser.

## ✨ Features

- **Instant background removal** — powered by [`@imgly/background-removal`](https://github.com/imgly/background-removal-js), which runs entirely client-side in the browser using WebAssembly/ML models. No image data is uploaded to a server.
- **Drag-and-drop upload zone** with sample images to try the tool instantly
- **Pricing page** with multiple plans (Free, Starter, Creator, Pro API) for HD downloads and API access
- **Bulk / API page** for processing multiple images programmatically
- **Authentication flow** — login, registration, and forgot-password pages with a user profile page
- **Responsive layout** with a shared Navbar/Footer and toast notifications for user feedback
- **Built with Tailwind CSS v4** for fast, utility-first styling

## Screenshots

** Signin Page
<img width="1470" height="828" alt="Screenshot 2026-06-30 at 9 29 30 PM" src="https://github.com/user-attachments/assets/f1d5260c-933d-4b1c-abdf-027e8db2ea12" />

## Home Page
<img width="1453" height="833" alt="Screenshot 2026-06-30 at 9 27 39 PM" src="https://github.com/user-attachments/assets/d8d937b4-99ed-400f-9c29-bdf0b11bd521" />

## BulkAPI Page
<img width="1452" height="833" alt="Screenshot 2026-06-30 at 9 28 04 PM" src="https://github.com/user-attachments/assets/e985e03c-bfbe-45f3-8f28-73ff05d7bf1a" />

## Pricing Page
<img width="1455" height="829" alt="Screenshot 2026-06-30 at 9 28 28 PM" src="https://github.com/user-attachments/assets/553e4133-8aeb-4717-a523-d8df75544155" />

## About Page
<img width="1453" height="830" alt="Screenshot 2026-06-30 at 9 28 52 PM" src="https://github.com/user-attachments/assets/0f943cfc-df7d-4dd7-8132-5730a41216a2" />

## Contact Page
<img width="1454" height="831" alt="Screenshot 2026-06-30 at 9 29 15 PM" src="https://github.com/user-attachments/assets/1da8b62b-a41d-4f0e-abd1-e98e57a9c2c1" />


## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **AI Background Removal:** `@imgly/background-removal` (client-side, WASM-based)
- **Icons:** Lucide React
- **Linting:** ESLint

## 📁 Project Structure

```
src/
├── components/
│   ├── common/        # Toast, Button, and other shared UI components
│   └── layout/         # Navbar, Footer
├── context/             # AuthContext, ToastContext (React Context providers)
├── config/               # App-wide constants (sample images, pricing plans)
├── pages/
│   ├── Home/             # Landing page + image upload zone
│   ├── Auth/             # Login, Register, Forgot Password
│   ├── Pricing/           # Pricing plans and cards
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Profile.jsx
│   └── BulkApi.jsx       # Bulk processing / API access page
├── services/
│   ├── ai.service.js      # Wraps @imgly/background-removal for image processing
│   └── auth.service.js    # Authentication service (currently mocked)
├── hooks/                 # Custom React hooks
├── App.jsx                # Route definitions and app layout
└── main.jsx                # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/clearbg.git
cd clearbg

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## ⚙️ How It Works

1. The user drags and drops or selects an image in the **Upload Zone** on the Home page.
2. The image is passed to `removeBackground()` in `src/services/ai.service.js`.
3. `@imgly/background-removal` processes the image entirely in the browser (no server round-trip) and returns a background-free image blob.
4. The result is rendered for preview and download.

> **Note:** Authentication (`src/services/auth.service.js`) is currently a mock service that simulates a login response. Connect it to a real backend/auth provider before using this in production.

## 🗺️ Pages / Routes

| Route | Description |
|---|---|
| `/` | Home — upload and process an image |
| `/pricing` | Pricing plans (Free, Starter, Creator, Pro API) |
| `/bulk` | Bulk / API access page |
| `/about` | About the product |
| `/contact` | Contact page |
| `/login`, `/register`, `/forgot-password` | Authentication pages |
| `/profile` | User profile (requires auth) |

## 📌 Roadmap Ideas

- Connect `auth.service.js` to a real authentication backend
- Add real payment integration for the pricing plans
- Add server-side batch processing for the Bulk API page
- Add image format/export options (PNG, JPG, transparent background presets)

## 📄 License

This project currently has no license specified. Add one (e.g. MIT) before publishing or distributing.

## 🙋 Contact

Reach out via the in-app Contact page, or open an issue in this repository.
