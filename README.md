# The Mirror Jammu Kashmir

Independent, multilingual, mobile-first human rights & advocacy platform.

## Edit homepage content

- Header text: directly in `index.html`
- Ticker text: edit the `<div id="tickerText">…</div>`
- Blog posts: add/modify JSON files in `content/posts/`
- Vlog video: change the YouTube `src` in the `<iframe>` in `index.html`
- Contact form: handled by Netlify Forms (modal at bottom of `index.html`)

## Deploy

This repo is connected to Netlify.
Every push to `main` (or the connected branch) will redeploy automatically.
