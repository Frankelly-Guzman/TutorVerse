// Add an event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".fade-in-section");
  const reduceMotionButton = document.getElementById("reduce-motion-button");
  const body = document.body;

  function updateVisibility() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionCenter = sectionTop + section.offsetHeight / 2;
      const isVisible =
        sectionCenter >= 0 && sectionCenter <= window.innerHeight;

      if (isVisible) {
        section.classList.add("is-visible");
      } else {
        section.classList.remove("is-visible");
      }
    });
  }

  // Initial visibility update
  updateVisibility();

  // Handle the "Reduce Motion" button click event
  reduceMotionButton.addEventListener("click", function () {
    body.classList.toggle("reduce-motion");
  });

  // Add a scroll event listener to control section visibility
  window.addEventListener("scroll", updateVisibility);
});

let themeButton = document.getElementById("theme-button");
let isDarkMode = false;

// Toggle Dark Mode
const toggleDarkMode = () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  themeButton.textContent = isDarkMode ? "🌞" : "🌙";

  // Additional code for changing carousel button colors
  const carouselControls = document.querySelectorAll(
    ".carousel-control-prev, .carousel-control-next"
  );

  if (isDarkMode) {
    // Dark mode is enabled
    carouselControls.forEach((control) => {
      control.style.backgroundColor = "white";
      control.style.color = "black";
    });
  } else {
    // Dark mode is not enabled
    carouselControls.forEach((control) => {
      control.style.backgroundColor = "black";
      control.style.color = "white";
    });
  }
};

themeButton.addEventListener("click", toggleDarkMode);

let count = 3; // Starting count of signatures
const signatures = document.querySelector(".signatures");
const counter = document.getElementById("counter");

const addSignature = () => {
  let name = document.getElementById("name").value;
  let hometown = document.getElementById("hometown").value;

  let newSignature = document.createElement("p");
  newSignature.textContent = `🖊️ ${name} from ${hometown} supports this.`;

  // Append the new signature before the counter element
  signatures.insertBefore(newSignature, counter);

  // Increase the count
  count = count + 1;

  // Update the text content of the counter element
  counter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
};

// Add event listener to the sign-now-button
let signNowButton = document.getElementById("sign-now-button");

const validateForm = (e) => {
  e.preventDefault(); // Prevent form submission

  let containsErrors = false;
  const email = document.getElementById("email");
  const petitionInputs = document.querySelectorAll(
    "#sign-petition .form-control"
  );

  petitionInputs.forEach((input) => {
    if (input.value.length < 2) {
      input.classList.add("is-invalid");
      containsErrors = true;
    } else {
      input.classList.remove("is-invalid");
    }
  });

  if (!email.value.includes(".com")) {
    containsErrors = true;
    email.classList.add("is-invalid");
  } else {
    email.classList.remove("is-invalid");
  }

  if (!containsErrors) {
    addSignature();
    petitionInputs.forEach((input) => (input.value = ""));
  }
};

signNowButton.addEventListener("click", validateForm);
