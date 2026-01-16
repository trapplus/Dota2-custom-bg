// ===== Gallery Data =====
const backgrounds = [
  {
    id: "adv-time-rain",
    title: "Adventure Time Rain",
    folder: "adv-time-rain",
    description: "Атмосферный дождливый фон из Adventure Time",
  },
  {
    id: "cherry-blossom-sunset",
    title: "Cherry Blossom Sunset",
    folder: "cherry-blossom-sunset",
    description: "Закат с цветущей сакурой",
  },
  {
    id: "eren",
    title: "Eren",
    folder: "eren",
    description: "Эпичный фон с Эреном Йегером",
  },
  {
    id: "fantasy-forest",
    title: "Fantasy Forest",
    folder: "fantasy-forest",
    description: "Волшебный фэнтезийный лес",
  },
  {
    id: "gojo-n-cat",
    title: "Gojo & Cat",
    folder: "gojo-n-cat",
    description: "Годжо с котом - уютный фон",
  },
  {
    id: "madara-sharingan",
    title: "Madara Sharingan",
    folder: "madara-sharingan",
    description: "Мадара с шаринганом",
  },
  {
    id: "madara-susanoo",
    title: "Madara Susanoo",
    folder: "madara-susanoo",
    description: "Мадара в форме Сусаноо",
  },
  {
    id: "makima",
    title: "Makima",
    folder: "makima",
    description: "Макима из Chainsaw Man",
  },
  {
    id: "starfall",
    title: "Starfall",
    folder: "starfall",
    description: "Звездопад в ночном небе",
  },
  {
    id: "your-name",
    title: "Your Name",
    folder: "your-name",
    description: 'Романтичный фон из аниме "Твоё имя"',
  },
  {
    id: "red-moon",
    title: "Red Moon",
    folder: "red-moon",
    description: "None",
  },
];

// ===== Theme Switching =====
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;
const themeIcon = themeToggle.querySelector(".material-icons");

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

function setTheme(theme) {
  if (theme === "dark") {
    html.setAttribute("data-theme", "dark");
    themeIcon.textContent = "dark_mode";
  } else {
    html.removeAttribute("data-theme");
    themeIcon.textContent = "light_mode";
  }
}

// ===== Gallery Generation =====
const galleryGrid = document.getElementById("galleryGrid");

function createGalleryItem(background) {
  const item = document.createElement("div");
  item.className = "gallery-item";
  item.setAttribute("data-id", background.id);

  // Construct GitHub raw URL for the image
  const repoBase =
    "https://raw.githubusercontent.com/trapplus/Dota2-custom-bg/main";
  const imagePath = `${repoBase}/assets/complited-bg/${background.folder}/img.jpg`;
  const downloadPath = `https://github.com/trapplus/Dota2-custom-bg/raw/main/assets/complited-bg/${background.folder}/pak03_dir.vpk`;

  item.innerHTML = `
        <div class="gallery-image-wrapper">
            <img src="${imagePath}" alt="${background.title}" class="gallery-image" loading="lazy">
        </div>
        <div class="gallery-info">
            <h3 class="gallery-title">${background.title}</h3>
            <div class="gallery-meta">
                <span class="material-icons">wallpaper</span>
                <span>${background.description}</span>
            </div>
        </div>
    `;

  item.addEventListener("click", () =>
    openLightbox(background, imagePath, downloadPath),
  );

  return item;
}

// Generate all gallery items
backgrounds.forEach((background) => {
  galleryGrid.appendChild(createGalleryItem(background));
});

// ===== Lightbox Functionality =====
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDownload = document.getElementById("lightboxDownload");

function openLightbox(background, imagePath, downloadPath) {
  lightboxImage.src = imagePath;
  lightboxImage.alt = background.title;
  lightboxTitle.textContent = background.title;
  lightboxDownload.href = downloadPath;
  lightboxDownload.setAttribute("download", `${background.folder}.vpk`);
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close lightbox on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});
// ===== Smooth Scroll with Offset =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    
    // Ignore external links and download links
    if (!href || !href.startsWith("#")) {
      return;
    }
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});
// ===== Method Tabs Switching =====
const tabButtons = document.querySelectorAll(".tab-button");
const methodContents = document.querySelectorAll(".method-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    methodContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and corresponding content
    button.classList.add("active");
    document.getElementById(targetTab).classList.add("active");
  });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observe gallery items
document.querySelectorAll(".gallery-item").forEach((item) => {
  observer.observe(item);
});

// ===== Scroll Progress Indicator =====
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  // You can use this value to create a progress bar if desired
  // For now, it's just calculated and ready to use
});

// ===== Dynamic Repository Info =====

const GITHUB_USERNAME = "trapplus";
const GITHUB_REPO = "Dota2-custom-bg";

// Update all GitHub links dynamically
document.addEventListener("DOMContentLoaded", () => {
  // Update footer GitHub link
  const githubLink = document.querySelector(
    '.footer-link[href="https://github.com"]',
  );
  if (githubLink && GITHUB_USERNAME !== "YOUR_USERNAME") {
    githubLink.href = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}`;
  }

  console.log("Dota 2 Custom Backgrounds loaded successfully!");
  console.log(`Total backgrounds: ${backgrounds.length}`);
});

// ===== Performance Optimization =====
// Lazy load images
if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.src = img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  document.body.appendChild(script);
}

// ===== Accessibility Enhancements =====
// Focus trap for lightbox
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });
}

// Apply focus trap when lightbox opens
lightbox.addEventListener("transitionend", () => {
  if (lightbox.classList.contains("active")) {
    trapFocus(lightbox);
    lightboxClose.focus();
  }
});
