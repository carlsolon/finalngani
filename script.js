function showLogin() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

function register() {
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value;

  if (!username || !password) return;

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.some(user => user.username === username)) return;

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  showLogin();
}

function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Save session info
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirect to home page
    window.location.href = "homepage.html";
  } else {
    alert("Invalid credentials.");
  }
}
