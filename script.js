

/* Open when someone clicks on the span element */
function openMenu() {
	document.getElementById("menuOverlay").style.width = "100vw";
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeMenu() {
	document.getElementById("menuOverlay").style.width = "0";
  }



//Hover animation
function createScaleAnimation(element) {
	return gsap.to(element, {
		scale: 1.1,
		duration: 0.5,
		ease: "power2.out",
		paused: true // Animation starts paused
	});
}

const elements = document.querySelectorAll('.expandonhover');

elements.forEach(element => {
	const scaleOnHover = createScaleAnimation(element);

	element.addEventListener('mouseenter', () => {
		scaleOnHover.play();
	});

	element.addEventListener('mouseleave', () => {
		scaleOnHover.reverse();
	});
});






// Function to check if the window width is greater than or equal to 1024 pixels
function isDesktop() {
    return window.innerWidth >= 1024;
}


// Check if it's desktop, then execute animations
if (isDesktop()) {

	//ANIMATIONS FOR LANDING PAGE, desktop only
	//
	//
	gsap.to(".spincup", {

		rotation: 360,
		duration: 1,
		ease: "power4.out",
		scrollTrigger: {
			trigger: ".landing",
			start: "top 30px",
			scrub: 0.5,
		}
	});


	gsap.from(".scrolltostart", {
		opacity: 0,
		x: -10,
		duration: 2,
		delay: 2,
	});


	// Animation for each .textbox element
	gsap.utils.toArray(".content .textbox").forEach(textbox => {
		gsap.from(textbox, {
			opacity: 0,
			x: -100,
			duration: 0.6,
			scrollTrigger: {
				trigger: textbox,
				start: "top 90%", // Start animation when the top of the textbox is 70% from the top of the viewport
				end: "top 30%", // End animation when the top of the textbox is 20% from the top of the viewport
				scrub: 0.5
			}
		});
	});

	gsap.from("#unclewave", {
		scale: 1.3,
		y: 400,
		duration: 4,

		scrollTrigger: {
			trigger: "#unclewave",
			scrub: 0.5,
		}
	});


	gsap.from("#whatiskopi img", {

		x: 200,
		scale: 1.2,
		duration: 3,

		scrollTrigger: {
			trigger: "#whatiskopi",
			start: "top 60%",
			end: "top 5%",
			scrub: 0.5,
		}
	});

}


// Function to handle memory lane animations
function setupMemoryLaneAnimations() {
    // Check if the element unique to the index.html page exists so that it only works on index page and doesn't mess the others
    const indexPageElement = document.getElementById('streetsign') || document.querySelector('.memorylane');
    
    if (indexPageElement) {
        // Get the total width of the #gallery element
        const galleryWidth = document.getElementById('gallery').scrollWidth;
        
        // Set scroll adjustment
        const scrollAdjustment = galleryWidth * 0.1; // Adjust this value as needed
        
        // Horizontal scroll for memory lane
        const tween = gsap.to("#gallery", {
            x: -(galleryWidth - scrollAdjustment), // Scroll by adjusted width
            duration: 3,
            ease: "none"
        });

        // Set up ScrollTrigger
        ScrollTrigger.create({
            trigger: ".memorylane",
            start: "top -8%",
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true
        });
    }
}

// Call the function to set up memory lane animations
setupMemoryLaneAnimations();







//ANIMATIONS FOR COMPARE PAGE
//
//
function createSliderTimeline(handleSelector, sideSelector, otherSideSelector, direction) {
	const tl = gsap.timeline({
		paused: true
	});

	const moveAmount = direction === 'left' ? 100 : -100; // Determine the amount to move based on direction

	tl.to(handleSelector, {
		x: moveAmount,
		duration: 0.4,
		ease: "power1.inOut"
	}, 0);
	tl.fromTo(sideSelector, {
		opacity: 0.5,
		duration: 0.4,
		ease: "power1.inOut"
	}, {
		opacity: 1,
		duration: 0.4,
		ease: "power1.inOut"
	}, 0);

	tl.fromTo(otherSideSelector, {
		opacity: 0.5,
		duration: 0.4,
		ease: "power1.inOut"
	}, {
		opacity: 0.5,
		duration: 0.4,
		ease: "power1.inOut"
	}, 0);


	const btn = document.querySelector(sideSelector);
	btn.addEventListener("mouseenter", () => tl.play());
	btn.addEventListener("mouseleave", () => tl.reverse());

	return tl;
}

const roastSliderLeftTimeline = createSliderTimeline('.slider.roast .handle', '.slider.roast .left', '.slider.roast .right', 'left');
const roastSliderRightTimeline = createSliderTimeline('.slider.roast .handle', '.slider.roast .right', '.slider.roast .left', 'right');


const brewSliderLeftTimeline = createSliderTimeline('.slider.brew .handle', '.slider.brew .left', '.slider.brew .right', 'left');
const brewSliderRightTimeline = createSliderTimeline('.slider.brew .handle', '.slider.brew .right', '.slider.brew .left', 'right');

const cupSliderLeftTimeline = createSliderTimeline('.slider.cup .handle', '.slider.cup .left', '.slider.cup .right', 'left');
const cupSliderRightTimeline = createSliderTimeline('.slider.cup .handle', '.slider.cup .right', '.slider.cup .left', 'right');




//ANIMATIONS FOR COMPARE PAGE BOTTOM
//
//
const cellA = document.querySelector('.compare .gallery-cell.a');
const cellB = document.querySelector('.compare .gallery-cell.b');

cellA.addEventListener('click', () => {
	gsap.to(cellA, {
		zIndex: 1,
		left: '30px',
		transform: 'rotate(0deg)'
	});

	gsap.to(cellB, {
		zIndex: 0,
		left: '-430px',
		transform: 'rotate(3deg)',
		ease: "power1.out"
	});

	gsap.to('.compare .gallery-cell.a > *', {
		opacity: 1,
		duration: 0.5,
		ease: "power1.out"
	});

	gsap.to('.compare .gallery-cell.b > *', {
		opacity: 0.5,
		duration: 0.5,
		ease: "power1.out"
	});

});
cellB.addEventListener('click', () => {

	gsap.to(cellB, {
		zIndex: 1,
		left: -500,
		transform: 'rotate(0deg)',
		ease: "power2.out"
	});

	gsap.to(cellA, {
		zIndex: 0,
		left: 300,
		transform: 'rotate(-1deg)'
	});

	gsap.to('.compare .gallery-cell.b > *', {
		opacity: 1,
		duration: 0.5,
		ease: "power1.out"
	});

	gsap.to('.compare .gallery-cell.a > *', {
		opacity: 0.5,
		duration: 0.5,
		ease: "power1.out"
	});

});

const scaleOnHoverCellA = gsap.to(cellA, {
	scale: 1.01,
	duration: 0.5,
	ease: "power2.out",
	paused: true // Animation starts paused
});

const scaleOnHoverCellB = gsap.to(cellB, {
	scale: 1.01,
	duration: 0.5,
	ease: "power2.out",
	paused: true // Animation starts paused
});

cellA.addEventListener('mouseenter', () => {
	scaleOnHoverCellA.play();
});

cellA.addEventListener('mouseleave', () => {
	scaleOnHoverCellA.reverse();
});

cellB.addEventListener('mouseenter', () => {
	scaleOnHoverCellB.play();
});

cellB.addEventListener('mouseleave', () => {
	scaleOnHoverCellB.reverse();
});





