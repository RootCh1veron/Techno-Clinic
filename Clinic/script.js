    // ===== BOOKING PRISON SYSTEM - DATES LOCKED FOREVER =====

    // Initialize database
    function initDatabase() {
        if (!localStorage.getItem('appointments')) {
            localStorage.setItem('appointments', JSON.stringify([]));
        }
        if (!localStorage.getItem('lockedDates')) {
            localStorage.setItem('lockedDates', JSON.stringify([
                { date: '2026-03-15', lockedBy: 'System', lockDate: '2026-01-01', reason: 'Sample booking' },
                { date: '2026-03-20', lockedBy: 'System', lockDate: '2026-01-01', reason: 'Sample booking' },
                { date: '2026-03-25', lockedBy: 'System', lockDate: '2026-01-01', reason: 'Sample booking' },
                { date: '2026-04-01', lockedBy: 'System', lockDate: '2026-01-01', reason: 'Sample booking' },
                { date: '2026-04-10', lockedBy: 'System', lockDate: '2026-01-01', reason: 'Sample booking' }
            ]));
        }
    }

    // Check if date is locked
    function isDateLocked(year, month, day) {
        let dateString = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
        let lockedDates = JSON.parse(localStorage.getItem('lockedDates')) || [];
        return lockedDates.some(locked => locked.date === dateString);
    }

    // Lock a date
    function lockDate(dateString, bookedBy, reason) {
        let lockedDates = JSON.parse(localStorage.getItem('lockedDates')) || [];
        if (!lockedDates.some(locked => locked.date === dateString)) {
            let today = new Date();
            let todayString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
            lockedDates.push({ date: dateString, lockedBy: bookedBy, lockDate: todayString, reason: reason });
            localStorage.setItem('lockedDates', JSON.stringify(lockedDates));
            return true;
        }
        return false;
    }

    // Unlock a date (admin only)
    function unlockDate(dateString) {
        let lockedDates = JSON.parse(localStorage.getItem('lockedDates')) || [];
        let initialCount = lockedDates.length;
        lockedDates = lockedDates.filter(locked => locked.date !== dateString);
        if (lockedDates.length < initialCount) {
            localStorage.setItem('lockedDates', JSON.stringify(lockedDates));
            if (document.getElementById('calendarGrid')) renderCalendar();
            return true;
        }
        return false;
    }

    // Get all locked dates
    function getLockedDates() {
        return JSON.parse(localStorage.getItem('lockedDates')) || [];
    }

    // Get all appointments
    function getAppointments() {
        return JSON.parse(localStorage.getItem('appointments')) || [];
    }

    // Generate reference number
    function generateReferenceNumber() {
        return 'HC-' + Date.now() + '-' + Math.floor(Math.random() * 9999);
    }

    // Calendar Variables
    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;

    // Initialize on load
    window.onload = function() {
        initDatabase();
        if (document.getElementById('calendarGrid')) {
            renderCalendar();
            renderTimeSlots();
        }
    };

    // Change month
    function changeMonth(direction) {
        currentDate.setMonth(currentDate.getMonth() + direction);
        renderCalendar();
    }

    // Render calendar
    function renderCalendar() {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let displayElement = document.getElementById('displayMonthYear');
        if (displayElement) displayElement.innerHTML = monthNames[month] + ' ' + year;
        
        let firstDay = new Date(year, month, 1).getDay();
        let lastDate = new Date(year, month + 1, 0).getDate();
        let calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;
        
        calendarGrid.innerHTML = '';
        
        for (let i = 0; i < firstDay; i++) {
            let emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyCell);
        }
        
        for (let d = 1; d <= lastDate; d++) {
            let dayCell = document.createElement('div');
            let cellDate = new Date(year, month, d);
            cellDate.setHours(0, 0, 0, 0);
            let isLocked = isDateLocked(year, month, d);
            
            if (cellDate < today) {
                dayCell.className = 'calendar-day past';
                dayCell.innerHTML = d;
                dayCell.onclick = function() { alert('❌ Cannot select past dates'); };
            } 
            else if (isLocked) {
                dayCell.className = 'calendar-day locked';
                dayCell.innerHTML = d + ' 🔒';
                dayCell.onclick = function() { alert('🔒 This date is LOCKED. Only admin can unlock.'); };
            }
            else {
                dayCell.className = 'calendar-day';
                dayCell.innerHTML = d;
                dayCell.onclick = function() { selectDate(d); };
                if (selectedDate && selectedDate.getDate() === d && selectedDate.getMonth() === month && selectedDate.getFullYear() === year) {
                    dayCell.classList.add('selected');
                }
            }
            calendarGrid.appendChild(dayCell);
        }
    }

    // Select date
    function selectDate(day) {
        document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected'));
        event.target.classList.add('selected');
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let displayElement = document.getElementById('selectedDateDisplay');
        if (displayElement) {
            displayElement.innerHTML = 'Selected: ' + monthNames[selectedDate.getMonth()] + ' ' + selectedDate.getDate() + ', ' + selectedDate.getFullYear();
        }
    }

    // Render time slots
    function renderTimeSlots() {
        let timeSlotsGrid = document.getElementById('timeSlots');
        if (!timeSlotsGrid) return;
        let timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
        timeSlotsGrid.innerHTML = '';
        timeSlots.forEach(time => {
            let slot = document.createElement('button');
            slot.className = 'time-slot';
            slot.innerHTML = time;
            slot.onclick = function() { selectTime(this, time); };
            timeSlotsGrid.appendChild(slot);
        });
    }

    // Select time
    function selectTime(element, time) {
        document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        selectedTime = time;
    }

    // Continue to details
    function continueToDetails() {
        if (!selectedDate) { alert('Please select a date'); return; }
        if (!selectedTime) { alert('Please select a time slot'); return; }
        
        let year = selectedDate.getFullYear();
        let month = selectedDate.getMonth();
        let day = selectedDate.getDate();
        
        if (isDateLocked(year, month, day)) {
            alert('❌ This date just got LOCKED by someone else.');
            renderCalendar();
            return;
        }
        
        document.getElementById('patientDetailsForm').style.display = 'block';
        document.querySelector('.continue-btn').style.display = 'none';
        document.getElementById('confirmButton').style.display = 'block';
    }

    // Confirm booking
    function confirmBooking() {
        let name = document.getElementById('name')?.value || '';
        let email = document.getElementById('email')?.value || '';
        let phone = document.getElementById('phone')?.value || '';
        let doctor = document.getElementById('doctor')?.value || '';
        
        if (!name || !email || !phone || !doctor) {
            alert('❌ Please fill in all patient details');
            return;
        }
        
        if (!selectedDate || !selectedTime) {
            alert('❌ Please select date and time');
            return;
        }
        
        let year = selectedDate.getFullYear();
        let month = selectedDate.getMonth();
        let day = selectedDate.getDate();
        let dateString = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
        
        if (isDateLocked(year, month, day)) {
            alert('❌ This date is already LOCKED!');
            renderCalendar();
            return;
        }
        
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let formattedDate = monthNames[month] + ' ' + day + ', ' + year;
        let refNumber = generateReferenceNumber();
        
        let appointment = {
            referenceNumber: refNumber,
            date: dateString,
            formattedDate: formattedDate,
            time: selectedTime,
            doctor: doctor,
            patientName: name,
            patientEmail: email,
            patientPhone: phone,
            bookedAt: new Date().toISOString(),
            status: 'locked'
        };
        
        let appointments = getAppointments();
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        lockDate(dateString, name, `Appointment with ${doctor}`);
        
        alert('🔒 APPOINTMENT CONFIRMED & DATE LOCKED!\n\n' +
            'Reference: ' + refNumber + '\n' +
            'Date: ' + formattedDate + '\n' +
            'Time: ' + selectedTime + '\n' +
            'Doctor: ' + doctor + '\n' +
            'Patient: ' + name + '\n\n' +
            '✅ This date is now LOCKED.\n' +
            '🔓 Only ADMIN can unlock it.');
        
        renderCalendar();
        
        document.getElementById('patientDetailsForm').style.display = 'none';
        document.querySelector('.continue-btn').style.display = 'block';
        document.getElementById('confirmButton').style.display = 'none';
        document.getElementById('appointmentForum')?.reset();
        selectedDate = null;
        selectedTime = null;
    }

    // Admin functions
    function adminViewLockedDates() {
        let lockedDates = getLockedDates();
        if (lockedDates.length === 0) { alert('✅ No locked dates'); return; }
        let message = '🔒 LOCKED DATES:\n\n';
        lockedDates.forEach((locked, i) => {
            message += `${i+1}. ${locked.date}\n   👤 ${locked.lockedBy}\n   📝 ${locked.reason}\n\n`;
        });
        alert(message);
    }

    function adminUnlockDate() {
        let dateToUnlock = prompt('Enter date to UNLOCK (YYYY-MM-DD):\nExample: 2026-03-15');
        if (!dateToUnlock) return;
        if (!dateToUnlock.match(/^\d{4}-\d{2}-\d{2}$/)) {
            alert('❌ Invalid format. Use YYYY-MM-DD');
            return;
        }
        let lockedDates = getLockedDates();
        if (!lockedDates.some(locked => locked.date === dateToUnlock)) {
            alert('❌ This date is not locked.');
            return;
        }
        if (confirm(`🔓 Release date ${dateToUnlock}?`)) {
            unlockDate(dateToUnlock);
            let appointments = getAppointments();
            appointments = appointments.filter(a => a.date !== dateToUnlock);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            alert(`✅ Date ${dateToUnlock} released!`);
            if (typeof updateAdminStats === 'function') updateAdminStats();
        }
    }

    function adminViewAllAppointments() {
        let appointments = getAppointments();
        if (appointments.length === 0) { alert('📭 No appointments'); return; }
        let message = '📋 ALL BOOKINGS:\n\n';
        appointments.forEach((app, i) => {
            message += `${i+1}. ${app.referenceNumber}\n   📅 ${app.date} ${app.time}\n   👤 ${app.patientName} - ${app.doctor}\n\n`;
        });
        alert(message);
    }

    // Login functions
    function showLoginModal() { document.getElementById('loginModal').classList.add('active'); }
    function hideLoginModal() { document.getElementById('loginModal').classList.remove('active'); }
    function handleLogin() {
        let u = document.getElementById('username').value;
        let p = document.getElementById('password').value;
        if(u && p) { alert('Welcome ' + u + '!'); hideLoginModal(); } 
        else { alert('Please enter both fields'); }
    }
    function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('active'); }
    function closeMenu() { document.getElementById('mobileMenu').classList.remove('active'); }
    function scrollToAppointment() { window.location.href = '#appointment'; }
    function sendMessage() {
        let n = document.getElementById('contact-name')?.value;
        let e = document.getElementById('contact-email')?.value;
        let s = document.getElementById('contact-subject')?.value;
        let m = document.getElementById('contact-message')?.value;
        if(n && e && s && m) { alert('✅ Message sent!'); document.getElementById('contactForm')?.reset(); } 
        else { alert('❌ Fill all fields'); }
    }
    function showHomeFeatures() { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); return false; }