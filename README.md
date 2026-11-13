# The Appreciation Club

A small, funny, mobile-friendly static website that helps husbands find natural ways to appreciate their wives.

**Live demo:** Add your GitHub Pages URL here after deployment.

## What's included

- `index.html` — page structure and content
- `styles.css` — responsive styling
- `app.js` — local, template-based appreciation suggestions and interactions
- `assets/` — original SVG vector illustrations and favicon

## No backend. No API key. No build step.

This is a static website. The message generator runs in the visitor's browser using curated templates and simple keyword matching. The visitor's text is not sent to a server or stored by this app.

Google Fonts are loaded from Google Fonts when internet access is available. The page uses system font fallbacks if they are unavailable.

## Run locally

You can simply open `index.html` in a browser. For a more realistic local web-server preview, from this folder run:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publish free with GitHub Pages

1. Sign in to GitHub and create a **public** repository named `husbands-appreciation`.
2. Upload all files and folders from this project. Keep the `assets` folder in the same location as `index.html`.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to finish deploying. Your site will be available at:

   `https://YOUR-GITHUB-USERNAME.github.io/husbands-appreciation/`

If you name the repository `<YOUR-GITHUB-USERNAME>.github.io`, the site can instead be published at the root URL `https://YOUR-GITHUB-USERNAME.github.io/`.

## Update the website

Edit the files locally or directly in GitHub, then commit/push the changes. GitHub Pages automatically republishes the site.

## Important notes

- This project is static and does not need a server, database, account system, or API key.
- The generator is deliberately lightweight and template-based. It is not an AI model and cannot understand every nuance. Users should personalise suggestions and only send words they genuinely mean.
- Do not add private API keys to browser JavaScript.
- GitHub Pages is suitable for this static personal/community project. Check GitHub's current Pages usage limits and terms before using it for a business-critical or high-traffic service.
- The website is a light-hearted joke/entertainment project, not relationship, counselling, or professional advice.

## Suggested GitHub Pages docs

<https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site>
