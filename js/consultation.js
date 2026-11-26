const form = document.getElementById("consult-form");
const successBox = document.getElementById("consult-success");
const successName = document.getElementById("success-name");
const successDate = document.getElementById("success-date");
const statusBox = document.getElementById("consult-status");
const dateInput = document.getElementById("consult-date");
const phoneInput = document.getElementById("consult-phone");
const consentBox = document.getElementById("consult-consent");
const consentWrap = document.getElementById("consent-wrap");
const resetButton = document.getElementById("consult-reset");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\-\s]{7,20}$/;

function setMinDate() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.min = year + "-" + month + "-" + day;
}

function setError(fieldId, message) {
  const field = document.getElementById(fieldId).closest(".form-field");
  const errorElement = field.querySelector(".form-error");
  errorElement.textContent = message;
  if (message === "") {
    field.classList.remove("invalid");
  } else {
    field.classList.add("invalid");
  }
}

function checkRequired(fieldId, message) {
  const value = document.getElementById(fieldId).value.trim();
  if (value === "") {
    setError(fieldId, message);
    return false;
  }
  setError(fieldId, "");
  return true;
}

function checkEmail() {
  const value = document.getElementById("consult-email").value.trim();
  if (value === "") {
    setError("consult-email", "Please enter your email.");
    return false;
  }
  if (!emailPattern.test(value)) {
    setError("consult-email", "Please enter a valid email address.");
    return false;
  }
  setError("consult-email", "");
  return true;
}

function checkPhone() {
  const value = phoneInput.value.trim();
  if (value !== "" && !phonePattern.test(value)) {
    setError("consult-phone", "Please enter a valid phone number.");
    return false;
  }
  setError("consult-phone", "");
  return true;
}

function checkDate() {
  const value = dateInput.value;
  if (value === "") {
    setError("consult-date", "Please choose a preferred date.");
    return false;
  }
  if (value < dateInput.min) {
    setError("consult-date", "Please choose a date from tomorrow onwards.");
    return false;
  }
  setError("consult-date", "");
  return true;
}

function checkConsent() {
  if (!consentBox.checked) {
    consentWrap.classList.add("invalid");
    return false;
  }
  consentWrap.classList.remove("invalid");
  return true;
}

function formatDate(value) {
  const parts = value.split("-");
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function handleSubmit(event) {
  event.preventDefault();
  statusBox.textContent = "";
  statusBox.className = "form-status";

  const results = [
    checkRequired("consult-first", "Please enter your first name."),
    checkRequired("consult-last", "Please enter your last name."),
    checkEmail(),
    checkPhone(),
    checkRequired("consult-type", "Please choose a project type."),
    checkDate(),
    checkRequired("consult-time", "Please choose a time."),
    checkConsent()
  ];

  if (results.includes(false)) {
    statusBox.textContent = "Please fix the highlighted fields.";
    statusBox.className = "form-status error";
    return;
  }

  successName.textContent = document.getElementById("consult-first").value.trim();
  successDate.textContent = formatDate(dateInput.value) + " at " + document.getElementById("consult-time").value;
  form.classList.add("hidden");
  successBox.classList.add("visible");
  successBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

function handleReset() {
  form.reset();
  form.classList.remove("hidden");
  successBox.classList.remove("visible");
  statusBox.textContent = "";
  statusBox.className = "form-status";
  form.querySelectorAll(".invalid").forEach(function (item) {
    item.classList.remove("invalid");
  });
  form.querySelectorAll(".form-error").forEach(function (item) {
    item.textContent = "";
  });
}

setMinDate();
form.addEventListener("submit", handleSubmit);
resetButton.addEventListener("click", handleReset);
document.getElementById("consult-email").addEventListener("blur", checkEmail);
phoneInput.addEventListener("blur", checkPhone);
dateInput.addEventListener("change", checkDate);
