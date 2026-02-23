    // Mobile Menu Toggle
    function toggleMenu() {
        const menu = document.getElementById('mobileMenu');
        menu.classList.toggle('active');
    }

    function closeMenu() {
        const menu = document.getElementById('mobileMenu');
        menu.classList.remove('active');
    }

    // Smooth Scroll
    function scrollToAppointment() {
        document.getElementById('appointment').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        closeMenu();
    }

    // Modal Functions
    function showLoginModal() {
        document.getElementById('loginModal').style.display = 'block';
        closeMenu();
    }

    function showSignupModal() {
        document.getElementById('signupModal').style.display = 'block';
        closeMenu();
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }

    // Form Handlers
    function handleLogin(event) {
        event.preventDefault();
        alert('Login successful! (Demo)');
        closeModal('loginModal');
    }

    function handleSignup(event) {
        event.preventDefault();
        alert('Account created successfully! (Demo)');
        closeModal('signupModal');
    }

    // Appointment Form
    document.addEventListener('DOMContentLoaded', function() {
        const appointmentForm = document.getElementById('appointmentForm');
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate payment fields
                const cardNumber = document.getElementById('card-number').value;
                const expiry = document.getElementById('expiry').value;
                const cvv = document.getElementById('cvv').value;
                
                if (cardNumber.length < 16) {
                    alert('Please enter a valid card number');
                    return;
                }
                
                if (expiry.length < 5) {
                    alert('Please enter a valid expiry date');
                    return;
                }
                
                if (cvv.length < 3) {
                    alert('Please enter a valid CVV');
                    return;
                }
                
                alert('Appointment booked successfully! Confirmation sent to your email.');
                this.reset();
            });
        }

        // Generate Calendar
        generateCalendar();
    });

    // Calendar Generation
    function generateCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let calendarHTML = '';
        
        // Add day names
        days.forEach(day => {
            calendarHTML += `<div class="calendar-day">${day}</div>`;
        });
        
        // Add days of month (simplified for demo)
        for (let i = 1; i <= 31; i++) {
            const hasAppointment = [10, 15, 18, 22, 25].includes(i);
            calendarHTML += `<div class="calendar-day ${hasAppointment ? 'has-appointment' : ''}" onclick="selectDate(${i})">${i}</div>`;
        }
        
        calendarGrid.innerHTML = calendarHTML;
    }

    // Date Selection
    function selectDate(day) {
        const dateInput = document.getElementById('date');
        const timeSlots = document.getElementById('timeSlotsMobile');
        
        if (dateInput) {
            dateInput.value = `2024-03-${day.toString().padStart(2, '0')}`;
        }
        
        // Show time slots on mobile
        if (window.innerWidth <= 768 && timeSlots) {
            timeSlots.style.display = 'block';
            setTimeout(() => {
                timeSlots.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
        
        // Visual feedback
        alert(`Selected date: March ${day}, 2024`);
    }

    // Payment Input Validation
    document.addEventListener('DOMContentLoaded', function() {
        const cardNumber = document.getElementById('card-number');
        const expiry = document.getElementById('expiry');
        const cvv = document.getElementById('cvv');
        
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                this.value = this.value.replace(/[^0-9]/g, '').substring(0, 16);
            });
        }
        
        if (expiry) {
            expiry.addEventListener('input', function(e) {
                this.value = this.value.replace(/[^0-9]/g, '').substring(0, 4);
                if (this.value.length >= 2) {
                    this.value = this.value.substring(0, 2) + '/' + this.value.substring(2);
                }
            });
        }
        
        if (cvv) {
            cvv.addEventListener('input', function(e) {
                this.value = this.value.replace(/[^0-9]/g, '').substring(0, 3);
            });
        }
    });

    // Appointment Actions
    function handleReschedule() {
        alert('Please select a new date and time for your appointment.');
        scrollToAppointment();
    }

    function handleCancel() {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            alert('Appointment cancelled successfully.');
        }
    }

    function handlePay() {
        alert('Redirecting to payment gateway...');
        scrollToAppointment();
    }

    // Time slot selection
    document.addEventListener('DOMContentLoaded', function() {
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.addEventListener('click', function() {
                const timeSelect = document.getElementById('time');
                if (timeSelect) {
                    const timeValue = this.textContent.trim().replace(' ', ':');
                    Array.from(timeSelect.options).forEach(option => {
                        if (option.text === this.textContent.trim()) {
                            option.selected = true;
                        }
                    });
                    alert(`Selected time: ${this.textContent}`);
                }
            });
        });
    });

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Adjust any layout issues after rotation
            console.log('Orientation changed');
        }, 200);
    });

    // Touch-friendly interactions
    document.addEventListener('touchstart', function() {}, {passive: true});

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMenu();
            }
        });
    });

    // Auto-hide splash screen (if any)
    window.addEventListener('load', function() {
        // Simulate loading complete
        console.log('App ready');
    });

    // Network status
    window.addEventListener('online', function() {
        console.log('Back online');
    });

    window.addEventListener('offline', function() {
        alert('You are offline. Some features may not be available.');
    });