










    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');

      // toggle icon between bars and close
      menuToggle.innerHTML = navLinks.classList.contains('show')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });

 

// ✅ Handle Booking Form Submit
const form = document.getElementById("bookingForm");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.classList.add("loading");
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Booking...`;

  setTimeout(() => {
    submitBtn.classList.remove("loading");
    submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Book Now`;
    showNotification("Success!", "Your booking has been submitted successfully.", "success");
    form.reset();
  }, 1500);
});
