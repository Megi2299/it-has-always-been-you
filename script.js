const startButton = document.getElementById("startButton");
const ourStory = document.getElementById("ourStory");

startButton.addEventListener("click", function () {
    ourStory.scrollIntoView({
        behavior: "smooth"
    });
});

/* =========================
   MEMORY CAROUSEL
========================= */

const polaroids = document.querySelectorAll(".polaroid");

const prevPhotoButton = document.getElementById("prevPhoto");
const nextPhotoButton = document.getElementById("nextPhoto");

const currentPhotoText = document.getElementById("currentPhoto");
const progressFill = document.getElementById("progressFill");

const carouselStage = document.getElementById("carouselStage");

let currentPhotoIndex = 0;


/* -------------------------
   UPDATE CAROUSEL
------------------------- */

function updateCarousel() {

    polaroids.forEach(function (photo, index) {

        /* Remove old position classes */

        photo.classList.remove(
            "active",
            "prev-1",
            "prev-2",
            "next-1",
            "next-2"
        );


        /*
        Work out the shortest distance
        between this photo and the active photo.
        */

        let difference = index - currentPhotoIndex;


        /*
        This makes the carousel loop smoothly
        from photo 16 back to photo 1.
        */

        if (difference > polaroids.length / 2) {
            difference -= polaroids.length;
        }

        if (difference < -polaroids.length / 2) {
            difference += polaroids.length;
        }


        /* Give each visible photo its position */

        if (difference === 0) {
            photo.classList.add("active");
        }

        else if (difference === -1) {
            photo.classList.add("prev-1");
        }

        else if (difference === -2) {
            photo.classList.add("prev-2");
        }

        else if (difference === 1) {
            photo.classList.add("next-1");
        }

        else if (difference === 2) {
            photo.classList.add("next-2");
        }

    });


    /* Update 01 / 16 counter */

    currentPhotoText.textContent =
        String(currentPhotoIndex + 1).padStart(2, "0");


    /* Update progress line */

    const progress =
        ((currentPhotoIndex + 1) / polaroids.length) * 100;

    progressFill.style.width = progress + "%";
}


/* -------------------------
   NEXT PHOTO
------------------------- */

function nextPhoto() {

    currentPhotoIndex++;

    if (currentPhotoIndex >= polaroids.length) {
        currentPhotoIndex = 0;
    }

    updateCarousel();
}


/* -------------------------
   PREVIOUS PHOTO
------------------------- */

function previousPhoto() {

    currentPhotoIndex--;

    if (currentPhotoIndex < 0) {
        currentPhotoIndex = polaroids.length - 1;
    }

    updateCarousel();
}


/* -------------------------
   ARROW BUTTONS
------------------------- */

nextPhotoButton.addEventListener("click", nextPhoto);

prevPhotoButton.addEventListener("click", previousPhoto);


/* -------------------------
   KEYBOARD ARROWS
------------------------- */

document.addEventListener("keydown", function (event) {

    if (event.key === "ArrowRight") {
        nextPhoto();
    }

    if (event.key === "ArrowLeft") {
        previousPhoto();
    }

});


/* -------------------------
   PHONE SWIPE
------------------------- */

let touchStartX = 0;
let touchEndX = 0;


carouselStage.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


carouselStage.addEventListener(
    "touchend",
    function (event) {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const swipeDistance =
        touchStartX - touchEndX;


    /* Ignore tiny accidental movements */

    if (Math.abs(swipeDistance) < 50) {
        return;
    }


    /* Swipe left → next */

    if (swipeDistance > 0) {
        nextPhoto();
    }


    /* Swipe right → previous */

    else {
        previousPhoto();
    }

}


/* -------------------------
   START
------------------------- */

updateCarousel();

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    `
    .timeline-item,
    .story-ending,
    .section-intro,
    .love-card,
    .daculi-break,
    .kiss-content,
    .developer-intro,
    .code-window,
    .developer-message,
    .soundtrack-intro,
    .song,
    .playlist-note,
    .memories-intro,
    .memory-note,
    .year-ending,
    .letter-heading,
    .letter-paper,
    .finale-beginning,
    .story-finale h2,
    .finale-heart,
    .final-code
    `
);


/* Give them the hidden starting state */

revealElements.forEach(function (element) {
    element.classList.add("reveal-on-scroll");
});


/* Watch for elements entering the screen */

const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                /* Animate only once */
                revealObserver.unobserve(entry.target);
            }

        });

    },

    {
        threshold: 0.15
    }
);


/* Start watching */

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});