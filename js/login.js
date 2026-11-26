const form = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");
const emailError = document.getElementById("login-email-error");
const passwordError = document.getElementById("login-password-error");
const statusBox = document.getElementById("login-status");
const toggleButton = document.getElementById("toggle-password");
const rememberBox = document.getElementById("remember");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(input, errorElement, message) {
  errorElement.textContent = message;
  input.closest(".form-field").classList.add("invalid");
}

function clearError(input, errorElement) {
  errorElement.textContent = "";
  input.closest(".form-field").classList.remove("invalid");
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (value === "") {
    showError(emailInput, emailError, "Please enter your email.");
    return false;
  }
  if (!emailPattern.test(value)) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    return false;
  }
  clearError(emailInput, emailError);
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  if (value === "") {
    showError(passwordInput, passwordError, "Please enter your password.");
    return false;
  }
  if (value.length < 6) {
    showError(passwordInput, passwordError, "Password must be at least 6 characters.");
    return false;
  }
  clearError(passwordInput, passwordError);
  return true;
}

function togglePassword() {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  toggleButton.textContent = isHidden ? "Hide" : "Show";
  toggleButton.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
  toggleButton.setAttribute("aria-pressed", isHidden ? "true" : "false");
}

function saveSession(email) {
  const storage = rememberBox.checked ? localStorage : sessionStorage;
  try {
    storage.setItem("auraUser", email);
  } catch (error) {
    statusBox.textContent = "Could not save your session in this browser.";
    statusBox.className = "form-status error";
  }
}

function handleSubmit(event) {
  event.preventDefault();
  statusBox.textContent = "";
  statusBox.className = "form-status";

  const emailOk = validateEmail();
  const passwordOk = validatePassword();

  if (!emailOk || !passwordOk) {
    statusBox.textContent = "Please fix the highlighted fields.";
    statusBox.className = "form-status error";
    return;
  }

  const email = emailInput.value.trim().toLowerCase();
  saveSession(email);
  statusBox.textContent = "Welcome back! Redirecting you to the home page...";
  statusBox.className = "form-status success";

  setTimeout(function () {
    window.location.href = "../index.html";
  }, 1500);
}

toggleButton.addEventListener("click", togglePassword);
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);
form.addEventListener("submit", handleSubmit);
