# Tylessia Willis — Portfolio

A clean, dark, minimal multi-page portfolio (HTML/CSS/JS). Built to work great on GitHub Pages.

## Pages

- `index.html` — home
- `about.html` — about
- `resume.html` — resume + skills
- `projects.html` — projects (includes placeholders)
- `services.html` — freelance services
- `contact.html` — contact form (demo)

## Folder structure

```txt
assets/
  css/
    styles.css
  js/
    site.js
    home.js
    contact.js
  img/
    profile.jpeg
    secondary.jpeg
    projects/
```

## Quick edits you probably want

### 1) Update your email

- In `assets/js/contact.js`, change:

```js
const to = 'YOUR_EMAIL_HERE@example.com';
```

- In `contact.html`, update the fallback mailto button:

```html
<a class="btn" href="mailto:your-email@example.com">Email me instead</a>
```

### 2) Add your resume PDF

1. Put your resume PDF in `assets/`
2. Rename it to `Your_Resume_File.pdf` OR update the link in `resume.html`.

### 3) Add your links (GitHub / LinkedIn)

If you want buttons on the homepage, add them in `index.html` inside the `.btns` area.

## Deploy to GitHub Pages

1. Create a new repo on GitHub (example: `tylessia-portfolio`)
2. Upload these files (or push with Git)
3. In GitHub:
   - Go to **Settings → Pages**
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` and `/ (root)`
4. Save — GitHub will give you a live URL.

### Important note (case sensitivity)
GitHub Pages is case-sensitive. This project uses all-lowercase filenames for that reason.

## Making the contact form actually send

Right now the form opens the visitor’s email app (mailto). Two easy upgrades:

- **Formspree** (quickest): add Formspree action URL to the form and remove the mailto logic.
- **Netlify Forms**: if you deploy on Netlify, you can enable form handling easily.

If you want, tell me which option you prefer and I can wire it up.

## License

If you plan to sell templates later, you can choose a license that fits your goals (MIT for open use, or a custom license for selling). This repo currently has no license.
