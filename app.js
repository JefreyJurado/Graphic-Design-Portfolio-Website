
// Active Navigation Highlight
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Typewriter Effect in Hero
function typeWriter(element, text, speed = 60) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

const heroTitle = document.querySelector(".hero-text h1");
if (heroTitle) {
  const text = "Hi, I’m Jefrey - Graphic Designer & Web Developer";
  heroTitle.innerHTML = "";
  typeWriter(heroTitle, text, 60);
}

// Testimonials Carousel
const track = document.querySelector(".testimonials-track");
const slides = document.querySelectorAll(".testimonials-track blockquote");

let currentIndex = 0;

// Function to update slide position
function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width + 16; // include gap
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Update button states
  if (currentIndex === 0) {
    prevBtn.disabled = true;
    prevBtn.style.opacity = "0.5";
    prevBtn.style.cursor = "not-allowed";
  } else {
    prevBtn.disabled = false;
    prevBtn.style.opacity = "1";
    prevBtn.style.cursor = "pointer";
  }

  if (currentIndex >= slides.length - 1) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";
    nextBtn.style.cursor = "not-allowed";
  } else {
    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";
    nextBtn.style.cursor = "pointer";
  }
}

// Next Slide
function nextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateCarousel();
  }
}

// Previous Slide
function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

// Controls
const container = document.querySelector(".testimonials");
const prevBtn = document.createElement("button");
const nextBtn = document.createElement("button");

prevBtn.innerText = "⟨";
nextBtn.innerText = "⟩";

[prevBtn, nextBtn].forEach(btn => {
  btn.style.background = "#1C4D8C";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.padding = "0.5rem 1rem";
  btn.style.margin = "0 0.5rem";
  btn.style.borderRadius = "5px";
  btn.style.fontSize = "1.2rem";
});

const controls = document.createElement("div");
controls.style.textAlign = "center";
controls.style.marginTop = "1rem";
controls.appendChild(prevBtn);
controls.appendChild(nextBtn);
container.appendChild(controls);

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Init
updateCarousel();

// ==============================
// ABOUT SECTION INTERACTIVITY
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  // Typing effect for the highlight
  const text = "Graphic Designer & Developer";
  const highlight = document.querySelector(".highlight");
  let i = 0;

  function typeEffect() {
    if (i < text.length) {
      highlight.textContent += text.charAt(i);
      i++;
      setTimeout(typeEffect, 100);
    }
  }

  if (highlight) {
    highlight.textContent = "";
    typeEffect();
  }

  // Resume button click
  const resumeBtn = document.querySelector(".about .btn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
      alert("Your resume is being downloaded!");
      // window.location.href = "resume/my-resume.pdf";
    });
  }
});



