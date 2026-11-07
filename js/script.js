const hamburger = document.querySelector(".hamburger");
const overlay = document.getElementById("menu-overlay");
const closeBtn = document.querySelector(".menu-close");
const menuLinks = document.querySelectorAll(".menu-item");

function openMenu() {
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  hamburger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) {
    closeMenu();
  }
});
