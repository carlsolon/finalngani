// Vigenère Cipher Functions
function vigenereEncrypt(text, key) {
  const A = 'A'.charCodeAt(0);
  return text.toUpperCase().split('').map((char, i) => {
    if (/[A-Z]/.test(char)) {
      const keyChar = key[i % key.length].toUpperCase();
      return String.fromCharCode(((char.charCodeAt(0) - A + keyChar.charCodeAt(0) - A) % 26) + A);
    } else if (/[0-9]/.test(char)) {
      // Convert numbers to letters (0 → A, 1 → B, ..., 9 → J)
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
      const decryptedCharCode = ((char.charCodeAt(0) - keyChar.charCodeAt(0) + 26) % 26) + A;
      const decryptedChar = String.fromCharCode(decryptedCharCode);
      return decryptedChar;
    }
    return char;
  }).join('');
}

// UI Switching
function showLogin() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

// Register with encryption
function register() {
  const username = document.getElementById('reg-username').value.trim().toUpperCase();
  const password = document.getElementById('reg-password').value.trim().toUpperCase();
  const key = "SECRETKEY";

  if (!username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  const encUsername = vigenereEncrypt(username, key);
  const encPassword = vigenereEncrypt(password, key);

  if (users.some(user => user.username === encUsername)) {
    alert("Username already exists.");
    return;
  }

  users.push({ username: encUsername, password: encPassword });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful!");
  showLogin();
}

// Login with decryption
function login() {
  const username = document.getElementById('login-username').value.trim().toUpperCase();
  const password = document.getElementById('login-password').value.trim().toUpperCase();
  const key = "SECRETKEY";

  const encUsername = vigenereEncrypt(username, key);
  const encPassword = vigenereEncrypt(password, key);

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(u => u.username === encUsername && u.password === encPassword);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "homepage.html";
  } else {
    alert("Invalid credentials.");
  }
}
