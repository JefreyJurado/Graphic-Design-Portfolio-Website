
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

// Scroll-to-Top Button
const scrollBtn = document.getElementById("scrollTopBtn");
if (scrollBtn) {
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Typewriter Effect in Hero
function typeWriter(element, text, speed = 70) {
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

// ============================
// Testimonials Carousel
// ============================

const track = document.querySelector(".testimonials-track");
const slides = document.querySelectorAll(".testimonials-track blockquote");

let currentIndex = 0;

// Function to update slide position
function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width + 16; // 16 = gap
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
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
  btn.style.cursor = "pointer";
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


// About Section Enhancements

// 1. Scroll Reveal Effect
document.addEventListener("DOMContentLoaded", () => {
  const aboutElements = document.querySelectorAll(".about p, .about h2, .about .btn");

  const revealOnScroll = () => {
    aboutElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

// 2. Typewriter Effect for Highlighted Role
const highlight = document.querySelector(".highlight");
if (highlight) {
  const text = highlight.textContent;
  highlight.textContent = "";
  let i = 0;

  function typeEffect() {
    if (i < text.length) {
      highlight.textContent += text.charAt(i);
      i++;
      setTimeout(typeEffect, 100); // speed of typing
    }
  }

  typeEffect();
}

// 3. Resume Button Click Animation / Alert
const resumeBtn = document.querySelector(".btn");
if (resumeBtn) {
  resumeBtn.addEventListener("click", () => {
    alert("Your resume is downloading...");
    // Optional: uncomment below to trigger download automatically
    // window.location.href = "files/Jefrey_Jurado_Resume.pdf";
  });
}


