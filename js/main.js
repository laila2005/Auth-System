// Refactored Authentication System

// ===== Utility Functions =====
const qs = selector => document.querySelector(selector);
const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];
const saveUsers = users => localStorage.setItem("users", JSON.stringify(users));

function showMessage(msg, type = 'error') {
  qs('.message')?.remove();
  const div = document.createElement('div');
  div.className = `message ${type}-message`;
  div.textContent = msg;
  div.style.display = 'block';
  qs('.auth-form')?.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

const validate = {
  email: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  password: pass => pass.length >= 6,
  username: name => name.length >= 3
};

// ===== Core Auth Functions =====
function registerUser(username, password) {
  if (!validate.username(username)) return showMessage('Username must be at least 3 characters');
  if (!validate.password(password)) return showMessage('Password must be at least 6 characters');

  const users = getUsers();
  if (users.some(u => u.username === username)) return showMessage('Username already taken');

  users.push({ id: Date.now(), username, password, createdAt: new Date().toISOString() });
  saveUsers(users);
  showMessage('Registration successful! Redirecting...', 'success');
  setTimeout(() => (location.href = 'Login.html'), 2000);
}

function loginUser(username, password) {
  if (!username || !password) return showMessage('Please fill all fields');

  const user = getUsers().find(u => u.username === username && u.password === password);
  if (!user) return showMessage('Invalid credentials');

  localStorage.setItem("currentUser", JSON.stringify({ userId: user.id, username: user.username, loginTime: new Date().toISOString() }));
  showMessage('Login successful! Redirecting...', 'success');
  setTimeout(() => (location.href = 'profile.html'), 1500);
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  showMessage("Logged out!", 'success');
  setTimeout(() => (location.href = 'Login.html'), 1000);
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function protectPage() {
  if (!isLoggedIn()) location.href = 'Login.html';
}

function loadProfile() {
  const user = getCurrentUser();
  if (!user) return;
  qs('#username-display').textContent = user.username;
  qs('#login-time').textContent = new Date(user.loginTime).toLocaleString();
}

// ===== Page Initialization =====
function initializePage() {
  const page = location.pathname.split('/').pop();

  if (page === 'profile.html') {
    protectPage();
    loadProfile();
    qs('#logout-btn')?.addEventListener('click', logoutUser);
  }

  if ((page === 'Login.html' || page === 'index.html') && isLoggedIn()) {
    location.href = 'profile.html';
  }

  if (page === 'index.html') {
    qs('#signup-form')?.addEventListener('submit', e => {
      e.preventDefault();
      registerUser(qs('#username').value.trim(), qs('#pass').value);
    });
  }

  if (page === 'Login.html') {
    qs('#login-form')?.addEventListener('submit', e => {
      e.preventDefault();
      loginUser(qs('#login-username').value.trim(), qs('#login-password').value);
    });
  }
}

// ===== Admin Functions =====
function getAllUsers() {
  return getUsers().map(({ id, username, createdAt }) => ({ id, username, createdAt }));
}

function deleteUser(userId) {
  const users = getUsers().filter(u => u.id !== userId);
  saveUsers(users);
  if (getCurrentUser()?.userId === userId) logoutUser();
}

document.addEventListener('DOMContentLoaded', initializePage);
