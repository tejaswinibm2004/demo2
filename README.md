# AccountLab — login / auth demo

A polished sign-in portal with deliberately broken authentication. Self-contained: push this folder as its own GitHub repo.

## Run locally

```bash
cp config.example.js config.js   # set window.BUGSHIELD_KEY
python -m http.server 5173       # visit /account-lab via root `npm run demo`
```

## Deploy

Render **Static Site** using the included `render.yaml`; set `BUGSHIELD_KEY` from the dashboard. `scripts/build.mjs` generates `config.js` and `version.json`.

## Planted bugs

1. Password field is `type="text"` — the password is visible.
2. Any non-empty password is accepted — no real credential check.
3. Email comparison is case-sensitive (`Demo@AccountLab.test` vs `demo@...`).
4. A failed login shows **"Welcome! You are now signed in."**
5. Session token is stored in plain `localStorage`.
6. Failed-attempt counter never resets after a successful login.

## Demo value

These hit **auth / login / session** paths, so BugShield's deterministic sensitive-area gate sends the fix to **AWAITING_APPROVAL** even when the risk score is moderate. Great for showing the human-in-the-loop story.

Suggested report: *"Any password logs you in and the error message says Welcome on failure."*
