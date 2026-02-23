<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <title>MediCare Plus - Clinic Management System</title>
    <link rel="stylesheet" href="style.css"> 
</head>
<body>
    <!-- Mobile Navigation -->
    <div class="mobile-nav">
        <div class="mobile-nav-header">
            <div class="logo">MediCare Plus</div>
            <button class="hamburger" onclick="toggleMenu()">☰</button>
        </div>
        <div class="mobile-menu" id="mobileMenu">
            <a href="#home" onclick="closeMenu()">Home</a>
            <a href="#features" onclick="closeMenu()">Features</a>
            <a href="#appointment" onclick="closeMenu()">Book Appointment</a>
            <a href="#admin" onclick="closeMenu()">Admin</a>
            <a href="#patient" onclick="closeMenu()">Patient Portal</a>
            <div class="mobile-menu-buttons">
                <button class="btn btn-secondary" onclick="showLoginModal()">Login</button>
                <button class="btn btn-primary" onclick="showSignupModal()">Sign Up</button>
            </div>
        </div>
    </div>

    <!-- Header for desktop -->
    <header class="desktop-header">
        <nav>
            <div class="logo">MediCare Plus</div>
            <div class="nav-links">
                <a href="#home">Home</a>
                <a href="#features">Features</a>
                <a href="#appointment">Book Appointment</a>
                <a href="#admin">Admin</a>
                <a href="#patient">Patient Portal</a>
            </div>
            <div>
                <button class="btn btn-secondary" onclick="showLoginModal()">Login</button>
                <button class="btn btn-primary" onclick="showSignupModal()">Sign Up</button>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <h1>Welcome to MediCare Plus</h1>
        <p>Your Health, Our Priority - Book appointments online, manage your health records, and more.</p>
        <button class="btn btn-primary" onclick="scrollToAppointment()">Book Appointment Now</button>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
        <div class="section-title">
            <h2>Why Choose MediCare Plus?</h2>
        </div>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">📅</div>
                <h3>Easy Online Booking</h3>
                <p>Book, reschedule, or cancel appointments 24/7 from anywhere</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">💰</div>
                <h3>Secure Payments</h3>
                <p>Pay deposits online to secure your appointment</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">⏰</div>
                <h3>Reduced Wait Times</h3>
                <p>Smart scheduling to minimize your waiting time</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">📱</div>
                <h3>Patient Portal</h3>
                <p>Access your appointment history and medical records</p>
            </div>
        </div>
    </section>

    <!-- Appointment Booking System -->
    <section class="appointment-system" id="appointment">
        <div class="section-title">
            <h2>Book Your Appointment</h2>
            <p>Secure your slot with a 20% down payment</p>
        </div>
        <div class="booking-container">
            <div class="booking-form">
                <h3>Appointment Details</h3>
                <form id="appointmentForm">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="doctor">Select Doctor</label>
                        <select id="doctor" required>
                            <option value="">Choose a doctor</option>
                            <option value="dr-smith">Dr. Sarah Smith (Cardiologist)</option>
                            <option value="dr-johnson">Dr. Michael Johnson (Dermatologist)</option>
                            <option value="dr-williams">Dr. Emily Williams (Pediatrician)</option>
                            <option value="dr-brown">Dr. James Brown (Neurologist)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="date">Preferred Date</label>
                        <input type="date" id="date" required>
                    </div>
                    <div class="form-group">
                        <label for="time">Preferred Time</label>
                        <select id="time" required>
                            <option value="">Select time slot</option>
                            <option value="09:00">09:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">02:00 PM</option>
                            <option value="15:00">03:00 PM</option>
                            <option value="16:00">04:00 PM</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="reason">Reason for Visit</label>
                        <textarea id="reason" rows="3" required></textarea>
                    </div>
                    
                    <div class="payment-section">
                        <h4>Payment Information</h4>
                        <p>Total Consultation Fee: $150</p>
                        <div class="payment-info">
                            <span>Required Down Payment (20%):</span>
                            <span class="down-payment">$30.00</span>
                        </div>
                        <div class="form-group">
                            <label for="card-number">Card Number</label>
                            <input type="text" id="card-number" placeholder="**** **** **** ****" required>
                        </div>
                        <div class="form-group">
                            <label for="expiry">Expiry Date</label>
                            <input type="text" id="expiry" placeholder="MM/YY" required>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" placeholder="***" required>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Book Appointment & Pay Deposit</button>
                </form>
            </div>
            
            <div class="calendar-view">
                <h3>Available Slots</h3>
                <div class="calendar-header">
                    <button class="btn btn-secondary">&lt; Prev</button>
                    <h4>March 2024</h4>
                    <button class="btn btn-secondary">Next &gt;</button>
                </div>
                <div class="calendar-grid" id="calendarGrid"></div>
                <div class="time-slots-mobile" id="timeSlotsMobile" style="display: none;">
                    <h4>Available Times for Selected Date</h4>
                    <div class="time-slot-buttons">
                        <button class="time-slot">09:00 AM</button>
                        <button class="time-slot">10:00 AM</button>
                        <button class="time-slot">11:00 AM</button>
                        <button class="time-slot">02:00 PM</button>
                        <button class="time-slot">03:00 PM</button>
                        <button class="time-slot">04:00 PM</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Admin Dashboard -->
    <section class="admin-dashboard" id="admin">
        <div class="section-title">
            <h2>Admin Dashboard</h2>
            <p>Manage appointments and patient flow efficiently</p>
        </div>
        
        <div class="dashboard-stats">
            <div class="stat-card">
                <div class="stat-value">24</div>
                <div>Today's Appointments</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">3</div>
                <div>Pending</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">2</div>
                <div>Cancelled</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">95%</div>
                <div>Show-up Rate</div>
            </div>
        </div>
        
        <div class="appointments-list">
            <h3>Today's Appointments</h3>
            <div class="appointment-item">
                <div class="appointment-time">09:00</div>
                <div class="appointment-details">
                    <strong>John Doe</strong> - Dr. Smith<br>
                    <small>Cardiology</small>
                </div>
                <span class="appointment-status status-confirmed">✓</span>
            </div>
            <div class="appointment-item">
                <div class="appointment-time">10:30</div>
                <div class="appointment-details">
                    <strong>Jane Smith</strong> - Dr. Johnson<br>
                    <small>Dermatology</small>
                </div>
                <span class="appointment-status status-pending">⏳</span>
            </div>
            <div class="appointment-item">
                <div class="appointment-time">14:00</div>
                <div class="appointment-details">
                    <strong>Robert Wilson</strong> - Dr. Williams<br>
                    <small>Pediatric</small>
                </div>
                <span class="appointment-status status-confirmed">✓</span>
            </div>
        </div>
    </section>

    <!-- Patient Portal -->
    <section class="patient-portal" id="patient">
        <div class="section-title">
            <h2>Patient Portal</h2>
            <p>Manage your appointments</p>
        </div>
        
        <div class="appointment-history">
            <h3>Your Appointments</h3>
            <div class="history-item">
                <div class="history-details">
                    <strong>Mar 15 - 10:00 AM</strong><br>
                    Dr. Sarah Smith
                </div>
                <div>
                    <span class="appointment-status status-confirmed">Confirmed</span>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-small btn-reschedule" onclick="handleReschedule()">↻</button>
                    <button class="btn btn-small btn-cancel" onclick="handleCancel()">✕</button>
                </div>
            </div>
            <div class="history-item">
                <div class="history-details">
                    <strong>Mar 18 - 02:30 PM</strong><br>
                    Dr. Michael Johnson
                </div>
                <div>
                    <span class="appointment-status status-pending">Pending</span>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-small btn-primary" onclick="handlePay()">$</button>
                    <button class="btn btn-small btn-cancel" onclick="handleCancel()">✕</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Login Modal -->
    <div class="modal" id="loginModal">
        <div class="modal-content">
            <span class="close" onclick="closeModal('loginModal')">&times;</span>
            <h2>Login</h2>
            <form onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label for="login-email">Email</label>
                    <input type="email" id="login-email" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
            </form>
        </div>
    </div>

    <!-- Signup Modal -->
    <div class="modal" id="signupModal">
        <div class="modal-content">
            <span class="close" onclick="closeModal('signupModal')">&times;</span>
            <h2>Sign Up</h2>
            <form onsubmit="handleSignup(event)">
                <div class="form-group">
                    <label for="signup-name">Full Name</label>
                    <input type="text" id="signup-name" required>
                </div>
                <div class="form-group">
                    <label for="signup-email">Email</label>
                    <input type="email" id="signup-email" required>
                </div>
                <div class="form-group">
                    <label for="signup-phone">Phone</label>
                    <input type="tel" id="signup-phone" required>
                </div>
                <div class="form-group">
                    <label for="signup-password">Password</label>
                    <input type="password" id="signup-password" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Sign Up</button>
            </form>
        </div>
    </div>

    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>MediCare Plus</h3>
                <p>📍 123 Medical Center Dr</p>
                <p>📞 (555) 123-4567</p>
                <p>✉️ info@medicareplus.com</p>
            </div>
            <div class="footer-section">
                <h3>Hours</h3>
                <p>Mon-Fri: 9AM-6PM</p>
                <p>Sat: 9AM-2PM</p>
                <p>Sun: Closed</p>
            </div>
        </div>
        <div class="copyright">
            <p>&copy; 2024 MediCare Plus</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
