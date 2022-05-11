// ---------------hamburger----------------
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".header-nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((e) =>
  e.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);
// --------function for henting av apiCall----------------
const url = "https://beardland.hols.no/wp-json/wp/v2/posts/";

async function apiCall(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {}
}

const carouselContainerSlideOne = document.querySelector(".slide1");
const carouselContainerSlideTwo = document.querySelector(".slide2");
const carouselContainerSlideThree = document.querySelector(".slide3");
const carouselContainerSlideFour = document.querySelector(".slide4");

async function carouselPostApiCall() {
  try {
    const blogData = await apiCall(url);
    for (let i = 0; i < blogData.length; i++) {
      if (i === 0) {
        carouselContainerSlideOne.innerHTML += `
                                                  <img src="${blogData[i].featured_media_src_url}" alt="" />
                                                  <h2 class="carousel-title">${blogData[i].title.rendered}</h2>`;
      } else if (i === 1) {
        carouselContainerSlideTwo.innerHTML += `
                                                  <img src="${blogData[i].featured_media_src_url}" alt="" />
                                                  <h2 class="carousel-title">${blogData[i].title.rendered}</h2>`;
      } else if (i === 2) {
        carouselContainerSlideThree.innerHTML += `
                                                  <img src="${blogData[i].featured_media_src_url}" alt="" />
                                                  <h2 class="carousel-title">${blogData[i].title.rendered}</h2>`;
      } else if (i === 3) {
        carouselContainerSlideFour.innerHTML += `
                                                  <img src="${blogData[i].featured_media_src_url}" alt="" />
                                                  <h2 class="carousel-title">${blogData[i].title.rendered}</h2>`;
      }
    }
  } catch (e) {}
}
carouselPostApiCall();

let slidePos = 0;
const slides = document.querySelectorAll(".carousel-post");
const totalSlides = slides.length;
const leftButton = document.querySelector(".carousel-button-left");
const rightButton = document.querySelector(".carousel-button-right");

const carouselDott = document.querySelector(".carousel-dott");
const dotts = Array.from(carouselDott.children);
const dott = document.querySelector(".dott")

const updatedotts = () =>{
  for (let dott of dotts){
    dott.classList.remove("dott-selected")
  }
  dotts[slidePos].classList.add("dott-selected")
}

leftButton.addEventListener("click", () => {
  prevSlide();
});
rightButton.addEventListener("click", () => {
  nextSlide();
});

const updateSlides = () => {
  for (let i = 0; i < slides.length; i++) {
    const slideArr = slides[i];
    slideArr.classList.remove("carousel-post-visible");
    slideArr.classList.add("carousel-post-hidden");
  }
  slides[slidePos].classList.add("carousel-post-visible");
};

const nextSlide = () => {
  if (slidePos === totalSlides - 1) {
    slidePos = 0;
  } else {
    slidePos++;
  }
  updateSlides();
  updatedotts();
};

const prevSlide = () => {
  if (slidePos === 0) {
    slidePos = totalSlides - 1;
  } else {
    slidePos--;
  }
  updateSlides();
  updatedotts();
};

// setInterval(() => {
//   nextSlide();
// }, 7000);

const containerSecondary = document.querySelector(".secondary-container");

async function htmlCreate() {
  try {
    const blogData = await apiCall(url);

    containerSecondary.innerHTML += `
                                    <div class="img-container"><img src="${blogData[5].featured_media_src_url}" alt=""></div>
                                    <div>
                                        <h2>${blogData[5].title.rendered}</h2>
                                        <p>${blogData[5].acf.articles}</p>
                                        <button class="btn-readmore"><a href="">Read more</a></button>
                                    </div>`;
  } catch (e) {}
}
htmlCreate();
