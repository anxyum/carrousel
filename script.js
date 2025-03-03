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

$nextTestimonialImage.style.left = "100%";
$currentTestimonialImage.style.left = "0";
$prevTestimonialImage.style.left = "-100%";

const $nextArrow = document.querySelector(".next-arrow");
const $prevArrow = document.querySelector(".prev-arrow");

function next() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateNextSlide();
}

function prev() {
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
  $nextTestimonialImage.style.display = "block";
  $currentTestimonialImage.display = "block";
  $nextTestimonialImage.style.left = "100%";
  $currentTestimonialImage.style.left = "0";
  setTimeout(() => {
    $nextTestimonialImage.src = slides[currentSlide].imgPath;
    $currentTestimonialImage.style.left = "-100%";
    $nextTestimonialImage.style.left = "0";
    setTimeout(() => {
      $currentTestimonialImage.style.display = "none";
      $currentTestimonialImage.src = slides[currentSlide].imgPath;
      $currentTestimonialImage.style.left = "0";
      setTimeout(() => {
        $currentTestimonialImage.style.display = "block";
        $nextTestimonialImage.style.display = "none";
        $nextTestimonialImage.style.left = "100%";
      }, 500);
    }, 500);
  }, 0);
}

function updatePrevSlide() {
  updateSlide();
  $prevTestimonialImage.style.display = "block";
  $currentTestimonialImage.display = "block";
  $prevTestimonialImage.style.left = "-100%";
  $currentTestimonialImage.style.left = "0";
  setTimeout(() => {
    $prevTestimonialImage.src = slides[currentSlide].imgPath;
    $currentTestimonialImage.style.left = "100%";
    $prevTestimonialImage.style.left = "0";
    setTimeout(() => {
      $currentTestimonialImage.style.display = "none";
      $currentTestimonialImage.src = slides[currentSlide].imgPath;
      $currentTestimonialImage.style.left = "0";
      setTimeout(() => {
        $currentTestimonialImage.style.display = "block";
        $prevTestimonialImage.style.display = "none";
        $prevTestimonialImage.style.left = "-100%";
      }, 500);
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
