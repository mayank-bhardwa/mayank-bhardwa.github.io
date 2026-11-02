# mayank-bhardwa.github.io

Personal portfolio of Mayank Bhardwaj — static HTML/CSS/JS, no build step.

## Deploy to GitHub Pages

1. Create a **public** repo named exactly `mayank-bhardwa.github.io` on GitHub.
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/mayank-bhardwa/mayank-bhardwa.github.io.git
   git push -u origin main
   ```
3. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main` / `/ (root)`.
4. Site goes live at https://mayank-bhardwa.github.io/ in a minute or two.

## Local preview

```
python -m http.server 8000
```
Then open http://localhost:8000.
