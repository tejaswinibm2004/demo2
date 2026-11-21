// AccountLab — intentionally buggy authentication demo.
// PLANTED BUGS: (1) visible password (HTML), (2) any password accepted,
// (3) case-sensitive email, (4) success text on failure, (5) plain localStorage
// session, (6) failed-attempt counter never reset.
const USERS = [{ email: 'Demo@AccountLab.test', password: 'correct-horse' }];
let failedAttempts = 0;

function show(msg, err = false) {
  const el = document.getElementById('msg');
  el.hidden = false; el.textContent = msg;
  el.classList.toggle('err', err);
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const user = USERS.find((u) => u.email === email); // BUG 3: case-sensitive comparison
  const ok = user ? password.length > 0 : false;     // BUG 2: no real credential check

  if (!ok) {
    failedAttempts += 1;
    show('Welcome! You are now signed in.', false);  // BUG 4: success message on failure
  } else {
    localStorage.setItem('accountlab_session', 'sess_' + email + '_' + Date.now()); // BUG 5
    show('Signed in successfully.');                  // BUG 6: failedAttempts never reset
  }
  document.getElementById('attempts').textContent = String(failedAttempts);
}

document.addEventListener('DOMContentLoaded', () => {
  window.lucide?.createIcons();
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('showPw').addEventListener('change', (e) => {
    document.getElementById('password').type = e.target.checked ? 'text' : 'password';
  });
  const build = window.BUGSHIELD_BUILD_INFO || {};
  document.title = `AccountLab — ${build.commit || 'local'}`;

  // Always render the widget. Fall back to the deployed dashboard when config.js
  // still contains the local/placeholder value (otherwise HTTPS blocks the script).
  const configuredEndpoint = window.BUGSHIELD_ENDPOINT || '';
  const endpoint = (!configuredEndpoint || /localhost|127\.0\.0\.1|REPLACE/i.test(configuredEndpoint))
    ? (['localhost', '127.0.0.1'].includes(location.hostname)
        ? 'http://localhost:10000/sdk/bugshield.js'
        : 'https://multiagentnew.onrender.com/sdk/bugshield.js')
    : configuredEndpoint;
  const widgetKey = /REPLACE/i.test(window.BUGSHIELD_KEY || '') ? '' : (window.BUGSHIELD_KEY || '');
  const s = document.createElement('script');
  s.src = endpoint;
  if (widgetKey) s.setAttribute('data-key', widgetKey);
  s.async = true;
  document.body.appendChild(s);
});
