# Atlas Web Studio — Premium Web Design Agency Website

A high-end, conversion-focused agency website built with **pure HTML, CSS, and JavaScript** — no frameworks, no build step. Designed to attract clients in the **UAE & Saudi Arabia**.

> **Tagline:** Modern Web Design That Converts Visitors Into Clients

🔗 **Live demo:** `https://YOUR-USERNAME.github.io/YOUR-REPO/` (update after deploying)

---

## ✨ Features

- **Dark / Light mode** toggle with `localStorage` + system-preference support
- **Glassmorphism sticky navbar** with scroll-spy active-link highlighting
- **Slide-in mobile menu** (from the right) with backdrop + Escape-to-close
- **Scroll-reveal** animations, **count-up** stats, animated outcome metrics
- Subtle **neon glow accents**, **animated background orbs**, and a soft grid
- **How We Work** process section, **Testimonials**, and an **FAQ** accordion
- **Floating WhatsApp button** with a pre-filled, lead-focused message
- Smooth scrolling, accessible markup, full `prefers-reduced-motion` support
- 100% responsive (mobile, tablet, desktop) and fully static

## 🧩 Sections

Hero · About · Services · How We Work · Work (portfolio) · Stats · Testimonials · FAQ · Contact

## 🛠️ Tech

- HTML5, CSS3 (custom properties, grid, flexbox, `clamp()`, backdrop-filter)
- Vanilla JavaScript (IntersectionObserver) — no dependencies
- Google Fonts: **Sora** (display) & **Inter** (body)

## 📁 Project structure

```
portfolio/
├── index.html        # main page (root — required by GitHub Pages)
├── css/
│   └── style.css     # all styles
├── js/
│   └── script.js     # all interactivity
├── assets/           # put your images / logos here
├── .nojekyll         # tells GitHub Pages to serve files as-is
├── .gitignore
└── README.md
```

> **Note:** Project images currently use free Unsplash URLs, so they work online with no local files. To use your own images, drop them in `assets/` and update the `src` paths in `index.html`.

## 🚀 Run locally

Open `index.html` directly, or serve it:

```bash
npx http-server -p 8000
# then visit http://localhost:8000
```

## 🌐 Deploy to GitHub Pages — step by step

> Run these commands from inside the project folder (`portfolio`).

### 1. Initialize Git

```bash
git init
git add .
git commit -m "Initial commit: Atlas Web Studio portfolio"
```

### 2. Create a repo on GitHub

- Go to <https://github.com/new>
- Name it (e.g. `portfolio` or `atlas-web-studio`)
- Keep it **Public**
- **Do not** add a README/.gitignore (you already have them)
- Click **Create repository**

### 3. Connect your local project to GitHub

Replace `YOUR-USERNAME` and `YOUR-REPO` with your details:

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### 4. Enable GitHub Pages

1. Open your repo on GitHub → **Settings**
2. In the left sidebar, click **Pages**
3. Under **Build and deployment → Source**, choose **Deploy from a branch**
4. Set **Branch** to `main` and folder to `/ (root)`, then click **Save**
5. Wait ~1 minute, then refresh — your live URL will appear at the top:
   `https://YOUR-USERNAME.github.io/YOUR-REPO/`

### 5. Updating the site later

Whenever you make changes:

```bash
git add .
git commit -m "Describe your change"
git push
```

GitHub Pages redeploys automatically within a minute.

---

## ✅ Before you go live — checklist

- [ ] Replace WhatsApp number `212708053592` in `index.html` if needed
- [ ] Update the email `hello@atlaswebstudio.com` in `index.html`
- [ ] Add real social media links (Instagram / LinkedIn / X)
- [ ] Swap demo project links/images for your real work
- [ ] Connect the contact form to a service (e.g. Formspree) — it's a front-end demo

## 📄 License

Free to use and adapt.
