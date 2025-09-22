
// Global WebP Support Detection

function canUseWebP() {
  const elem = document.createElement("canvas");
  if (!!(elem.getContext && elem.getContext("2d"))) {
    return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  }
  return false;
}
const supportsWebP = canUseWebP(); // ✅ reuse everywhere



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
let prevBtn, nextBtn;

// Update slide position
function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width + 16;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Left button
  if (currentIndex === 0) {
    prevBtn.disabled = true;
    prevBtn.style.background = "#081935ff";
    prevBtn.style.cursor = "not-allowed";
  } else {
    prevBtn.disabled = false;
    prevBtn.style.background = "#1C4D8C";
    prevBtn.style.cursor = "pointer";
  }

  // Right button
  if (currentIndex >= slides.length - 1) {
    nextBtn.disabled = true;
    nextBtn.style.background = "#ccc";
    nextBtn.style.cursor = "not-allowed";
  } else {
    nextBtn.disabled = false;
    nextBtn.style.background = "#1C4D8C";
    nextBtn.style.cursor = "pointer";
  }
}

function nextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateCarousel();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

if (container) {
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

  updateCarousel();
}



// ABOUT SECTION INTERACTIVITY

document.addEventListener("DOMContentLoaded", () => {
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



// PROJECTS MODAL SLIDESHOW

document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("projectModal");

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

    const path = supportsWebP
      ? `${config.folder}${config.prefix}${index}.webp`
      : `${config.folder}${config.prefix}${index}.jpg`;

    modalImage.src = path;
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



// CONTACT PAGE INTERACTIVITY

document.addEventListener("DOMContentLoaded", () => {
  // Copy email
  const emailLink = document.querySelector(".contact-links a[href^='mailto:']");
  
  if (emailLink) {
    emailLink.addEventListener("click", (e) => {
      e.preventDefault();
      const email = emailLink.getAttribute("href").replace("mailto:", "");

      navigator.clipboard.writeText(email).then(() => {
        showToast(`📋 Email copied: ${email}`);
      });
    });
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "linear-gradient(135deg, #1C4D8C, #2680f7ff)";
    toast.style.color = "#fff";
    toast.style.padding = "10px 15px";
    toast.style.borderRadius = "8px";
    toast.style.fontWeight = "500";
    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    toast.style.zIndex = "2000";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s, transform 0.3s";
    toast.style.transform = "translateY(20px)";

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    }, 100);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // Animate contact links
  const contactLinks = document.querySelectorAll(".contact-links a");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  contactLinks.forEach(link => {
    link.classList.add("hidden");
    observer.observe(link);
  });
});



// Scroll reveal animations

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    observer.observe(section);
  });
});



// WebP for CSS Backgrounds & Thumbnails

if (supportsWebP) {
  document.body.style.backgroundImage = 'url("images/mainbg.webp")';
  if (document.body.classList.contains("home")) {
    document.body.style.backgroundImage = 'url("images/mainbg2.webp")';
  }

  // Swap project thumbnails
  document.querySelectorAll(".project-card img").forEach(img => {
    if (img.src.endsWith(".jpg")) {
      img.src = img.src.replace(".jpg", ".webp");
    } else if (img.src.endsWith(".png")) {
      img.src = img.src.replace(".png", ".webp");
    }
  });
}
