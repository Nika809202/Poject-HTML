const calGrid = document.getElementById("calendar-grid");
const calMonthLabel = document.getElementById("calendar-month");
const calYearLabel = document.getElementById("calendar-year");
const calPrev = document.getElementById("calendar-prev");
const calNext = document.getElementById("calendar-next");
const calTodayButton = document.getElementById("calendar-today");
const calTime = document.getElementById("calendar-time");
const calFullDate = document.getElementById("calendar-date");
const calInput = document.getElementById("consult-date");
const calForm = document.getElementById("consult-form");

const calMonthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const calStart = new Date();
let calViewYear = calStart.getFullYear();
let calViewMonth = calStart.getMonth();
let calSelected = "";

function calPad(number) {
  return String(number).padStart(2, "0");
}

function calKey(year, month, day) {
  return year + "-" + calPad(month + 1) + "-" + calPad(day);
}

function calMinKey() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return calKey(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
}

function calTodayKey() {
  const now = new Date();
  return calKey(now.getFullYear(), now.getMonth(), now.getDate());
}

function renderCalendar() {
  const minKey = calMinKey();
  const todayKey = calTodayKey();
  const firstWeekday = new Date(calViewYear, calViewMonth, 1).getDay();
  const daysInMonth = new Date(calViewYear, calViewMonth + 1, 0).getDate();
  const now = new Date();

  calMonthLabel.textContent = calMonthNames[calViewMonth];
  calYearLabel.textContent = calViewYear;
  calPrev.disabled = calViewYear * 12 + calViewMonth <= now.getFullYear() * 12 + now.getMonth();
  calGrid.innerHTML = "";

  for (let cell = 0; cell < 42; cell++) {
    const day = cell - firstWeekday + 1;

    if (day < 1 || day > daysInMonth) {
      const blank = document.createElement("span");
      blank.className = "calendar-blank";
      calGrid.appendChild(blank);
      continue;
    }

    const key = calKey(calViewYear, calViewMonth, day);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.textContent = day;
    button.dataset.date = key;
    button.setAttribute(
      "aria-label",
      new Date(calViewYear, calViewMonth, day).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    );

    if (key < minKey) {
      button.disabled = true;
    }
    if (key === todayKey) {
      button.classList.add("is-today");
    }
    if (key === calSelected) {
      button.classList.add("is-selected");
      button.setAttribute("aria-pressed", "true");
    }

    calGrid.appendChild(button);
  }
}

function selectDate(key) {
  calSelected = key;
  calInput.value = key;
  calInput.dispatchEvent(new Event("change"));
  renderCalendar();
}

function changeMonth(step) {
  calViewMonth += step;
  if (calViewMonth < 0) {
    calViewMonth = 11;
    calViewYear -= 1;
  }
  if (calViewMonth > 11) {
    calViewMonth = 0;
    calViewYear += 1;
  }
  renderCalendar();
}

function goToToday() {
  const now = new Date();
  calViewYear = now.getFullYear();
  calViewMonth = now.getMonth();
  renderCalendar();
}

function updateClock() {
  const now = new Date();
  calTime.textContent = now.toLocaleTimeString("en-US");
  calFullDate.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function handleGridClick(event) {
  const button = event.target.closest(".calendar-day");
  if (!button || button.disabled) {
    return;
  }
  selectDate(button.dataset.date);
}

function handleFormReset() {
  calSelected = "";
  goToToday();
}

calGrid.addEventListener("click", handleGridClick);
calPrev.addEventListener("click", function () {
  changeMonth(-1);
});
calNext.addEventListener("click", function () {
  changeMonth(1);
});
calTodayButton.addEventListener("click", goToToday);
calForm.addEventListener("reset", handleFormReset);

renderCalendar();
updateClock();
setInterval(updateClock, 1000);
