
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

// Controls
const container = document.querySelector(".testimonials");
let prevBtn, nextBtn; // <- moved outside to fix scope

// Function to update slide position
function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width + 16; // include gap
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Left button (prev)
  if (currentIndex === 0) {
    prevBtn.disabled = true;
    prevBtn.style.background = "#081935ff"; // darker blue when no more slides
    prevBtn.style.cursor = "not-allowed";
  } else {
    prevBtn.disabled = false;
    prevBtn.style.background = "#1C4D8C"; // normal blue
    prevBtn.style.cursor = "pointer";
  }

  // Right button (next)
  if (currentIndex >= slides.length - 1) {
    nextBtn.disabled = true;
    nextBtn.style.background = "#ccc"; // gray when no more slides
    nextBtn.style.cursor = "not-allowed";
  } else {
    nextBtn.disabled = false;
    nextBtn.style.background = "#1C4D8C"; // normal blue
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

if (container) {   // ✅ only run if testimonials section exists
  prevBtn = document.createElement("button");
  nextBtn = document.createElement("button");

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
}

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
});

// ==============================
// PROJECTS MODAL SLIDESHOW (auto-detect jpg/png)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("projectModal");

  // Only continue if modal exists
  if (!modal) return;

  const modalImage = document.getElementById("modalImage");
  const closeModal = modal.querySelector(".close");
  const prevBtn = modal.querySelector(".prev");
  const nextBtn = modal.querySelector(".next");

  if (!modalImage || !closeModal || !prevBtn || !nextBtn) return;

  const projectMap = {
    "1_herbal-coffee": { folder: "images/projects/1_herbal-coffee/", prefix: "hc", total: 6 },
    "2_financial-poster": { folder: "images/projects/2_financial-poster/", prefix: "fp", total: 6 },
    "3_photoalbum": { folder: "images/projects/3_photoalbum/", prefix: "pa", total: 6 },
    "4_noor-gourmet": { folder: "images/projects/4_noor-gourmet/", prefix: "ng", total: 6 },
    "5_social-media": { folder: "images/projects/5_social-media/", prefix: "sm", total: 6 },
    "6_logo-designs": { folder: "images/projects/6_logo-designs/", prefix: "ld", total: 6 }
  };

  let currentProject = null;
  let currentIndex = 1;

  function showImage(index) {
  if (!currentProject) return;

  const config = projectMap[currentProject];
  const jpgPath = `${config.folder}${config.prefix}${index}.jpg`;
  const pngPath = `${config.folder}${config.prefix}${index}.png`;

  // Try jpg first, then png, then skip if missing
  const img = new Image();
  img.onload = () => {
    modalImage.src = img.src;
  };
  img.onerror = () => {
    // Try PNG
    const imgPng = new Image();
    imgPng.onload = () => {
      modalImage.src = imgPng.src;
    };
    imgPng.onerror = () => {
      // Skip to next image if it exists
      if (index < 6) {
        currentIndex++;
        showImage(currentIndex);
      } else if (index > 1) {
        currentIndex--;
        showImage(currentIndex);
      } else {
        // No images available, show placeholder
        modalImage.src = "images/placeholder.png";
      }
    };
    imgPng.src = pngPath;
  };
  img.src = jpgPath;
}

  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      currentProject = card.getAttribute("data-project");
      currentIndex = 1;
      showImage(currentIndex);
      modal.style.display = "flex";
    });
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < projectMap[currentProject].total) {
      currentIndex++;
      showImage(currentIndex);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 1) {
      currentIndex--;
      showImage(currentIndex);
    }
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal.click();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });
});











