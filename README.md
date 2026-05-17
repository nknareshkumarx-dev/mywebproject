# My Web Project

This is a simple modern landing front page with trending gradients and emoji accents.

## Preview
Open `index.html` in your browser, or serve the folder and open `http://localhost:8000/index.html`:

```powershell
# From the project folder
python -m http.server 8000
# Then open http://localhost:8000/index.html
```

## How to switch palettes
Edit `style.css` and replace the `:root { ... }` block at the top with one of the commented alternate palettes included in the file (Mint, Sunset, Cyberpunk). Example: replace the values with the "Mint" block.

## Notes
- Fonts are loaded from Google Fonts (`Poppins`).
- CSS includes dark-mode support via `prefers-color-scheme: dark`.
- To inline styles instead of linking `style.css`, copy the contents of `style.css` into a `<style>` tag in `index.html`.

If you want, I can add a color-switch toggle UI to switch palettes live in the browser.