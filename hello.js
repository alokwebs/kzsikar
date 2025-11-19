// ================== GLOBAL JAVASCRIPT ===================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initNavigation();
  initScrollEffects();
  initAnimations();
  initCounters();
  
  // Initialize page-specific functionality
  if (document.getElementById('contactForm')) {
    initContactForm();
  }
  
  if (document.getElementById('galleryGrid')) {
    initGallery();
  }
  
  if (document.getElementById('calendarDays')) {
    initBooking();
  }
});

// Navigation Functionality
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (!menuToggle || !navLinks) return;
  
  // Toggle mobile menu
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navLinks.contains(event.target) || menuToggle.contains(event.target);
    
    if (!isClickInsideNav && navLinks.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
  });
}

// Scroll Effects
function initScrollEffects() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Animations
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .stat-card, .team-member, .mission-card, .vision-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add animation class
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

// Counter Animation for About Page
function initCounters() {
  // Counter animation for stats
  function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start) + '+';
      }
    }, 16);
  }

  // Start counter animation when stats section is in view
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = document.querySelectorAll('.stat-number');
          statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            animateCounter(stat, target, 2000);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }
}

// Utility function for debouncing
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// ================== CONTACT PAGE JAVASCRIPT ===================

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const eventType = document.getElementById('eventType').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! Our team will contact you within 24 hours.');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // WhatsApp click tracking
    document.querySelectorAll('.social-link.whatsapp').forEach(link => {
        link.addEventListener('click', function() {
            const memberName = this.closest('.team-member').querySelector('.member-name').textContent;
            console.log(`WhatsApp clicked for: ${memberName}`);
        });
    });
}

// ================== GALLERY PAGE JAVASCRIPT ===================

// Gallery functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImageIndex = 0;

    // Filter Functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lightbox Functionality
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        const item = galleryItems[index];
        const img = item.querySelector('.gallery-image');
        const category = item.querySelector('.image-category').textContent;
        const title = item.querySelector('.image-title').textContent;
        const description = item.querySelector('.image-description').textContent;

        lightboxImage.src = img.src;
        lightboxCategory.textContent = category;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;

        currentImageIndex = index;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function navigateLightbox(direction) {
        const visibleItems = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none'
        );

        if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
        } else {
            currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
        }

        const originalIndex = Array.from(galleryItems).indexOf(visibleItems[currentImageIndex]);
        openLightbox(originalIndex);
    }

    // Event Listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
    lightboxNext.addEventListener('click', () => navigateLightbox('next'));

    // Close lightbox on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox('prev');
            if (e.key === 'ArrowRight') navigateLightbox('next');
        }
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    galleryItems.forEach(item => {
        observer.observe(item);
    });
}

// ================== DIRECT BOOKING SYSTEM ===================

// Booking functionality
function initBooking() {
    // DOM Elements
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthEl = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const displayDate = document.getElementById('displayDate');
    const bookingForm = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBtn');
    const notification = document.getElementById('notification');
    const notificationTitle = document.getElementById('notificationTitle');
    const notificationMessage = document.getElementById('notificationMessage');

    // Calendar state
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDate = null;
    let bookedDates = [];

    // Send WhatsApp Notification to Admin
    function sendWhatsAppNotification(bookingData) {
        const message = `🎉 *NEW BOOKING CONFIRMED!*

*Customer:* ${bookingData.name}
*Phone:* ${bookingData.phone}
*Email:* ${bookingData.email}
*Event:* ${bookingData.eventType}
*Date:* ${bookingData.date}
*Guests:* ${bookingData.guests}
*Address:* ${bookingData.address}
${bookingData.message ? `*Notes:* ${bookingData.message}` : ''}

*Booking ID:* ${bookingData.bookingId}

Please contact the customer within 24 hours.`;
        
        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp in new tab
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1000);
    }

    // Send Email Notification to Customer
    function sendCustomerConfirmation(bookingData) {
        const emailSubject = `Booking Confirmed - ${bookingData.eventType} on ${bookingData.date}`;
        const emailBody = `Dear ${bookingData.name},

Thank you for choosing KZ Events Sikar!

📅 Your Booking Details:
• Event Type: ${bookingData.eventType}
• Date: ${bookingData.date}
• Number of Guests: ${bookingData.guests}
• Booking ID: ${bookingData.bookingId}

📍 Event Address:
${bookingData.address}

${bookingData.message ? `📝 Your Notes: ${bookingData.message}` : ''}

We will contact you within 24 hours to discuss the event details and requirements.

For any queries, call us at +91 98765 43210

Best regards,
KZ Events Team
Sikar, Rajasthan`;

        // Create mailto link
        const mailtoLink = `mailto:${bookingData.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1500);
    }

    // Save to Firebase with notifications
    async function saveBookingToFirebase(bookingData) {
        try {
            const bookingsRef = db.ref("bookings");
            const newRef = bookingsRef.push();
            
            const completeBookingData = {
                ...bookingData,
                status: 'confirmed',
                bookingId: newRef.key,
                createdAt: new Date().toISOString(),
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };

            await newRef.set(completeBookingData);
            
            // Send notifications
            sendWhatsAppNotification(completeBookingData);
            sendCustomerConfirmation(completeBookingData);
            
            return true;
        } catch (error) {
            console.error('Firebase save error:', error);
            return false;
        }
    }

    // Fetch booked dates from Firebase
    function fetchBookedDates() {
        const bookingsRef = db.ref("bookings");
        bookingsRef.on('value', (snapshot) => {
            bookedDates = [];
            snapshot.forEach((childSnapshot) => {
                const booking = childSnapshot.val();
                if (booking.date && booking.status === 'confirmed') {
                    bookedDates.push(booking.date);
                }
            });
            renderCalendar();
        });
    }

    // Render calendar
    function renderCalendar() {
        calendarDays.innerHTML = '';
        currentMonthEl.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { 
            month: 'long', 
            year: 'numeric' 
        });

        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        // Previous month days
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = prevMonthLastDay - i;
            calendarDays.appendChild(day);
        }

        // Current month days
        const today = new Date().toISOString().split('T')[0];
        for (let i = 1; i <= totalDays; i++) {
            const day = document.createElement('div');
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            
            let className = 'calendar-day available';
            
            // Check if date is in past
            if (dateStr < today) {
                className = 'calendar-day booked';
            }
            // Check if date is booked
            else if (bookedDates.includes(dateStr)) {
                className = 'calendar-day booked';
            }
            // Check if date is selected
            else if (selectedDate === dateStr) {
                className = 'calendar-day selected';
            }

            day.className = className;
            day.textContent = i;
            day.dataset.date = dateStr;

            if (className === 'calendar-day available') {
                day.addEventListener('click', () => selectDate(dateStr));
            }

            calendarDays.appendChild(day);
        }

        // Next month days
        const totalCells = 42; // 6 weeks
        const remainingCells = totalCells - (startingDay + totalDays);
        for (let i = 1; i <= remainingCells; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = i;
            calendarDays.appendChild(day);
        }
    }

    // Select date
    function selectDate(dateStr) {
        selectedDate = dateStr;
        renderCalendar();
        openBookingModal();
    }

    // Open booking modal
    function openBookingModal() {
        displayDate.textContent = new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Show notification
    function showNotification(type, title, message) {
        notification.className = `notification ${type}`;
        notificationTitle.textContent = title;
        notificationMessage.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Validate form data
    function validateFormData(formData) {
        const errors = [];

        if (!formData.name.trim()) errors.push('Name is required');
        if (!formData.phone.match(/^[6-9]\d{9}$/)) errors.push('Valid 10-digit phone number required');
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.push('Valid email required');
        if (!formData.eventType) errors.push('Event type is required');
        if (!formData.guests || formData.guests < 1) errors.push('Number of guests is required');
        if (!formData.address.trim()) errors.push('Event address is required');
        if (!selectedDate) errors.push('Please select a date');

        return errors;
    }

    // Event Listeners
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    modalClose.addEventListener('click', closeModal);

    // Close modal on outside click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Booking form submission - DIRECT BOOKING
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            eventType: document.getElementById('eventType').value,
            guests: document.getElementById('guests').value,
            address: document.getElementById('address').value.trim(),
            message: document.getElementById('message').value.trim(),
            date: selectedDate
        };

        // Validate form
        const errors = validateFormData(formData);
        if (errors.length > 0) {
            showNotification('error', 'Please check your input', errors.join(', '));
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Confirming Booking...';
        submitBtn.disabled = true;

        try {
            // Save to Firebase
            const success = await saveBookingToFirebase(formData);
            
            if (success) {
                showNotification('success', '🎉 Booking Confirmed!', 
                    'Your event has been booked successfully! Check your email for confirmation.');
                
                // Reset and close
                closeModal();
                bookingForm.reset();
                selectedDate = null;
                renderCalendar();
                
                console.log('✅ Booking completed:', formData);
            } else {
                throw new Error('Failed to save booking');
            }
            
        } catch (error) {
            console.error('Booking error:', error);
            showNotification('error', 'Booking Failed', 'Please try again or contact us directly.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Booking';
            submitBtn.disabled = false;
        }
    });

    // Initialize
    function init() {
        fetchBookedDates();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        console.log('✅ Direct booking system initialized');
    }

    init();
}

// Initialize when DOM is loaded for booking page
if (document.getElementById('calendarDays')) {
    try {
        if (typeof firebase !== 'undefined') {
            initBooking();
        } else {
            throw new Error('Firebase SDK not loaded');
        }
    } catch (error) {
        console.error('❌ System initialization failed:', error);
        // Fallback: Show error notification
        const notification = document.getElementById('notification');
        const notificationTitle = document.getElementById('notificationTitle');
        const notificationMessage = document.getElementById('notificationMessage');
        
        if (notification) {
            notification.className = 'notification error';
            notificationTitle.textContent = 'System Error';
            notificationMessage.textContent = 'Please check your internet connection and refresh the page.';
            notification.classList.add('show');
        }
    }
}