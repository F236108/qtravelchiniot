const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".destination__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".showcase__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".showcase__content h4", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".showcase__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".showcase__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".banner__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".discover__card", {
  ...scrollRevealOption,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Payment functionality
function openPayment() {
  document.getElementById("paymentPopup").style.display = "flex";
}

function closePayment() {
  document.getElementById("paymentPopup").style.display = "none";
}

function copyAccount() {
  const accountNumber = document.getElementById("accountNumber").innerText;
  navigator.clipboard.writeText(accountNumber)
    .then(() => {
      // Show feedback
      const copyBtn = document.querySelector('.account-row button');
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = "✓ Copied!";
      copyBtn.style.background = "#10b981";
      copyBtn.style.color = "white";
      
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = "#e5e7eb";
        copyBtn.style.color = "black";
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
      alert("Failed to copy account number. Please copy manually.");
    });
}

// Initialize payment cards functionality
document.addEventListener("DOMContentLoaded", function() {
  const paymentCards = document.querySelectorAll(".payment-card");
  const accountNumberElement = document.getElementById("accountNumber");
  
  // Add click event to each payment card
  paymentCards.forEach(card => {
    card.addEventListener("click", function() {
      // Remove active class from all cards
      paymentCards.forEach(c => c.classList.remove("active"));
      
      // Add active class to clicked card
      this.classList.add("active");
      
      // Get the account number from data-account attribute
      const accountNumber = this.getAttribute("data-account");
      
      // Update the displayed account number
      accountNumberElement.textContent = accountNumber;
    });
  });
  
  // Close payment popup when clicking outside
  const paymentOverlay = document.getElementById("paymentPopup");
  paymentOverlay.addEventListener("click", function(e) {
    if (e.target === this) {
      closePayment();
    }
  });
  
  // Close with Escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && paymentOverlay.style.display === "flex") {
      closePayment();
    }
  });
});

// Form submission (keeping your existing form code)
const form = document.querySelector("#book-now form");
const successMessage = document.getElementById("successMessage");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          successMessage.style.display = "block";
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        alert("Error submitting form.");
        console.error(error);
      });
  });
}
