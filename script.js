class slide {
  constructor(imgPath, name, position) {
    this.imgPath = imgPath;
    this.name = name;
    this.position = position;
  }
}

const slides = [
  new slide("./images/image-tanya.jpg", "Tanya Sinclar", "UX Engineer"),
  new slide(
    "./images/image-john.jpg",
    "John Tarkpor",
    "Junior Front-end Developer"
  ),
  new slide(
    "./images/image-didier.png",
    "Didier Deschamps",
    "Front-end Footballer"
  ),
  new slide(
    "./images/image-patrick.png",
    "Patrick Sébastien",
    "Back-end singer"
  ),
];

let currentSlide = 0;
let lastSlide = Date.now();
const autoSlideInterval = 10000;

let $firstTestimonialImage = document.querySelector(".first-testimonial-image");
let $secondTestimonialImage = document.querySelector(
  ".second-testimonial-image"
);
const $testimonialAuthor = document.querySelector(".testimonial-author");
const $testimonialPosition = document.querySelector(".testimonial-position");

const $nextArrow = document.querySelector(".next-arrow");
const $prevArrow = document.querySelector(".prev-arrow");

function next() {
  if (Date.now() - lastSlide < 500) {
    return;
  }
  currentSlide = (currentSlide + 1) % slides.length;
  updateNextSlide();
}

function prev() {
  if (Date.now() - lastSlide < 500) {
    return;
  }
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updatePrevSlide();
}

function updateSlide() {
  lastSlide = Date.now();
  $testimonialAuthor.textContent = slides[currentSlide].name;
  $testimonialPosition.textContent = slides[currentSlide].position;
}

function updateNextSlide() {
  updateSlide();
  $secondTestimonialImage.style.left = "100%";
  $secondTestimonialImage.style.display = "block";
  $secondTestimonialImage.src = slides[currentSlide].imgPath;
  $firstTestimonialImage.style.left = "0";
  setTimeout(() => {
    $secondTestimonialImage.style.left = "0";
    $firstTestimonialImage.style.left = "-100%";
    const temp = $firstTestimonialImage;
    $firstTestimonialImage = $secondTestimonialImage;
    $secondTestimonialImage = temp;
    setTimeout(() => {
      $secondTestimonialImage.style.display = "none";
    }, 500);
  }, 0);
}

function updatePrevSlide() {
  updateSlide();
  $secondTestimonialImage.style.left = "-100%";
  $secondTestimonialImage.style.display = "block";
  $secondTestimonialImage.src = slides[currentSlide].imgPath;
  $firstTestimonialImage.style.left = "0";
  setTimeout(() => {
    $secondTestimonialImage.style.left = "0";
    $firstTestimonialImage.style.left = "100%";
    const temp = $firstTestimonialImage;
    $firstTestimonialImage = $secondTestimonialImage;
    $secondTestimonialImage = temp;
    setTimeout(() => {
      $secondTestimonialImage.style.display = "none";
    }, 500);
  }, 0);
}

$nextArrow.addEventListener("click", next);
$prevArrow.addEventListener("click", prev);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    next();
  } else if (event.key === "ArrowLeft") {
    prev();
  }
});

function autoSlide() {
  setTimeout(() => {
    if (Date.now() - lastSlide >= autoSlideInterval) {
      next();
    }
    autoSlide(autoSlideInterval);
  }, lastSlide + autoSlideInterval - Date.now());
}

autoSlide(autoSlideInterval);
