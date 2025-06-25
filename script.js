// Vigenère Cipher Functions
function vigenereEncrypt(text, key) {
  const A = 'A'.charCodeAt(0);
  return text.toUpperCase().split('').map((char, i) => {
    if (/[A-Z]/.test(char)) {
      const keyChar = key[i % key.length].toUpperCase();
      return String.fromCharCode(((char.charCodeAt(0) - A + keyChar.charCodeAt(0) - A) % 26) + A);
    } else if (/[0-9]/.test(char)) {
      const numChar = String.fromCharCode(65 + parseInt(char));
      const keyChar = key[i % key.length].toUpperCase();
      return String.fromCharCode(((numChar.charCodeAt(0) - A + keyChar.charCodeAt(0) - A) % 26) + A);
    }
    return char;
  }).join('');
}

function vigenereDecrypt(text, key) {
  const A = 'A'.charCodeAt(0);
  return text.toUpperCase().split('').map((char, i) => {
    if (/[A-Z]/.test(char)) {
      const keyChar = key[i % key.length].toUpperCase();
      return String.fromCharCode(((char.charCodeAt(0) - keyChar.charCodeAt(0) + 26) % 26) + A);
    }
    return char;
  }).join('');
}

// Show Login Form (no register form anymore)
function showLogin() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.style.display = 'block';
}

// Login (with encrypted comparison)
function login() {
  const username = document.getElementById('login-username').value.trim().toUpperCase();
  const password = document.getElementById('login-password').value.trim().toUpperCase();
  const key = "SECRETKEY";

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  const encUsername = vigenereEncrypt(username, key);
  const encPassword = vigenereEncrypt(password, key);

  const user = users.find(u => u.username === encUsername && u.password === encPassword);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "homepage.html";
  } else {
    alert("Invalid credentials.");
  }
}
