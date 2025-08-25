// Navbar Fixed with Blur Effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Add fixed positioning and blur effect when scrolled past 50px
    if (scrollPosition > 50) {
        header.classList.add('navbar-fixed');
        header.classList.add('navbar-blur');
        header.classList.remove('absolute');
        header.classList.add('fixed');
    } else {
        header.classList.remove('navbar-fixed');
        header.classList.remove('navbar-blur');
        header.classList.remove('fixed');
        header.classList.add('absolute');
    }
});

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Calender Demo request
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".project-item");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");

            items.forEach((item) => {
                const category = item.getAttribute("data-category");

                if (filter === "all" || filter === category) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });

            // Optional: ganti tombol aktif
            filterButtons.forEach(b => b.classList.remove("ring-2", "ring-white"));
            btn.classList.add("ring-2", "ring-white");
        });
    });

    // Calendar functionality
    const calendar = {
        currentDate: new Date(),
        monthYear: document.getElementById('monthYear'),
        daysContainer: document.getElementById('days'),
        prevMonthBtn: document.getElementById('prevMonth'),
        nextMonthBtn: document.getElementById('nextMonth'),

        init() {
            this.renderCalendar();
            this.prevMonthBtn.addEventListener('click', () => this.navigateMonth(-1));
            this.nextMonthBtn.addEventListener('click', () => this.navigateMonth(1));
        },

        renderCalendar() {
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();

            // Update month/year display
            this.monthYear.textContent = `${this.getMonthName(month)} ${year}`;

            // Clear previous days
            this.daysContainer.innerHTML = '';

            // Get first day of month and total days
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // Add empty cells for days before first day of month
            for (let i = 0; i < firstDay; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'text-gray-400 p-2 text-center';
                this.daysContainer.appendChild(emptyCell);
            }

            // Add days of the month
            const today = new Date();
            const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'p-2 text-center text-dark cursor-pointer hover:bg-secondary/20 rounded transition-colors';
                dayCell.textContent = day;

                // Create date object for this calendar day
                const calendarDate = new Date(year, month, day);

                // Check if date is in the past
                if (calendarDate < currentDate) {
                    dayCell.classList.add('text-gray-400', 'hover:bg-transparent');
                }

                // Highlight current day
                if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayCell.classList.add('bg-dark/30', 'font-bold',);
                }

                // Add click event to each day cell
                dayCell.addEventListener('click', () => {
                    if (calendarDate >= currentDate) {
                        // Store the selected date for use in time selection
                        window.selectedCalendarDate = calendarDate;

                        // Show time selection modal
                        const timeModal = document.getElementById('timeModal');
                        timeModal.classList.remove('hidden');
                    }
                });
                this.daysContainer.appendChild(dayCell);
            }
        },

        navigateMonth(direction) {
            this.currentDate.setMonth(this.currentDate.getMonth() + direction);
            this.renderCalendar();
        },

        getMonthName(month) {
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            return months[month];
        }
    };

    // Initialize calendar
    if (document.getElementById('calendar')) {
        calendar.init();
    }

    // Time selection functionality
    const timeModal = document.getElementById('timeModal');
    const timeButtons = document.querySelectorAll('.time-btn');
    const cancelTimeBtn = document.getElementById('cancelTime');

    // Handle time selection
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTime = button.getAttribute('data-time');
            if (window.selectedCalendarDate) {
                // Show confirmation with date and time
                const confirmation = confirm(`Do you want to request on ${window.selectedCalendarDate.toLocaleDateString()} at ${selectedTime}?`);
                if (confirmation) {
                    alert('Request confirmed for ' + window.selectedCalendarDate.toLocaleDateString() + ' at ' + selectedTime);
                }
                timeModal.classList.add('hidden'); // Hide modal after selection
            }
        });
    });

    // Handle cancel button
    cancelTimeBtn.addEventListener('click', () => {
        timeModal.classList.add('hidden'); // Hide modal on cancel
    });
});
