// Sticky Navbar on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Typing Effect in Hero Section
const typedText = ["ERP Development", "Web Development", "SEO & Marketing"];
let textIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const typingSpeed = 120;
const deletingSpeed = 60;
const delayBetweenWords = 1500;

function typeEffect() {
  const element = document.getElementById("typed");
  currentText = typedText[textIndex];

  if (isDeleting) {
    element.textContent = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typedText.length;
    }
  } else {
    element.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenWords);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

// Contact Form Submission
document.querySelector(".contact-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("✅ Thank you for contacting Afa Solutions! We will get back to you soon.");
});

// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Expand Dropdown in Mobile
document.querySelectorAll(".dropdown > a").forEach(drop => {
  drop.addEventListener("click", e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      drop.parentElement.classList.toggle("open");
    }
  });
});
