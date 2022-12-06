const carousel = document.querySelector(".carousel");
const carouselCards = document.querySelectorAll(".carousel-card");
const carouselNext = document.querySelector(".carousel-next");
const carouselPrev = document.querySelector(".carousel-prev");
const carouselControls = document.querySelector(".carousel-controls");

const CAROUSEL_ITEMS_GAP = 20;

let activeIndex = 0;

function changeCarouselItem() {
    if (activeIndex === 0) {
        carouselPrev.disabled = true;
    } else {
        carouselPrev.disabled = false;
    }

    if (activeIndex === carouselCards.length - 1) {
        carouselNext.disabled = true;
    } else {
        carouselNext.disabled = false;
    }

    // Changing Active carousel Control Styling
    carouselControls.childNodes.forEach((control, idx) => {
        if (activeIndex === idx) {
            control.classList.add("selected");
        } else {
            control.classList.remove("selected");
        }
    });

    carousel.style.setProperty(
        "--x",
        `${-(
            activeIndex * window.innerWidth +
            activeIndex * CAROUSEL_ITEMS_GAP
        )}px`,
    );
}

carouselNext.addEventListener("click", () => {
    activeIndex =
        activeIndex + 1 >= carouselCards.length
            ? carouselCards.length - 1
            : activeIndex + 1;
    changeCarouselItem();
});

carouselPrev.addEventListener("click", () => {
    activeIndex = activeIndex - 1 <= 0 ? 0 : activeIndex - 1;
    changeCarouselItem();
});

// Adding Carousel Control Buttons
carouselCards.forEach((_, idx) => {
    const controlBtn = document.createElement("button");
    controlBtn.classList.add("control-btn");
    controlBtn.addEventListener("click", (e) => {
        activeIndex = idx;
        changeCarouselItem();
    });
    carouselControls.appendChild(controlBtn);
});

// To get the Initial Control Buttons Styling
changeCarouselItem();

// To adjust the Positioning of Items based on Window Resize
window.addEventListener("resize", changeCarouselItem);
