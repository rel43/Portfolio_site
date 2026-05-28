# Portfolio Site

Static portfolio website for GitHub Pages.

## Structure

- `index.html` — main page for GitHub Pages.
- `pages/` — internal portfolio pages.
- `assets/css/` — styles.
- `assets/js/` — small browser scripts for tabs and local images.
- `assets/images/` — all portfolio images. See `assets/images/README.txt` for exact file names.
- `serve.py`, `start-mac.command`, `start-windows.bat` — local preview helpers.

## Local Preview

On macOS, run:

```bash
./start-mac.command
```

On Windows, run:

```bat
start-windows.bat
```

Or manually:

```bash
python3 serve.py
```

## GitHub Pages

Use repository settings:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

The site entry point is `index.html`.
