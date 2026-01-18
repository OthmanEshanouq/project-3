// Main JavaScript file for Halawah Restaurant
// Handles theme switching, language toggle, reservations, and more

// ============================================
// Global Variables
// ============================================

let currentLanguage = 'en';
let currentTheme = 'grey';
let selectedDate = null;
let currentMonth = 0; // 0 = January 2026
let currentYear = 2026;

// ============================================
// Initialize Application
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load saved preferences
    loadPreferences();
    
    // Initialize components
    initializeTheme();
    initializeLanguage();
    initializeReservation();
    initializeCarousel();
    initializeMobileMenu();
    loadReviews();
    loadFAQ();
    initializeMenu();
    initializeSocialSharing();
    initializeSmoothScroll();
    initializeStickyHeader();
    initializePoliciesModal();
    
    // Set initial theme and language
    applyTheme(currentTheme);
    applyLanguage(currentLanguage);
}

// ============================================
// Theme Management - Cycle Button
// ============================================

function initializeTheme() {
    const themeCycleBtn = document.getElementById('theme-cycle-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    if (themeCycleBtn) {
        themeCycleBtn.addEventListener('click', function() {
            cycleTheme();
        });
    }
    
    // Set initial icon
    updateThemeIcon();
}

function cycleTheme() {
    const themes = ['light', 'dark', 'grey'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    switchTheme(nextTheme);
}

function switchTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    updateThemeIcon();
    savePreferences();
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        const themes = ['light', 'dark', 'grey'];
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        
        // Show NEXT mode icon, not current
        if (nextTheme === 'grey') {
            // Leaf icon for Earth Tones theme
            themeIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';
        } else {
            const icons = {
                'light': '☀️',
                'dark': '🌙'
            };
            themeIcon.textContent = icons[nextTheme] || '☀️';
        }
    }
}

// ============================================
// Language Management - Dropdown
// ============================================

function initializeLanguage() {
    const languageSelect = document.getElementById('language-select');
    
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', function() {
            switchLanguage(this.value);
        });
    }
}

function switchLanguage(lang) {
    currentLanguage = lang;
    applyLanguage(lang);
    savePreferences();
    
    // Update dropdown
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = lang;
    }
    
    // Reload dynamic content
    loadReviews();
    loadFAQ();
    loadMenu(); // Reload menu with new language
    renderCalendar(); // Regenerate calendar with new language
    // Reset carousel position when language changes
    resetCarousel();
    // Reload policies content if modal is open
    const policiesModal = document.getElementById('policies-modal');
    if (policiesModal && policiesModal.classList.contains('active')) {
        loadPoliciesContent();
    }
}

function applyLanguage(lang) {
    // Set direction
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    
    // Update all elements with data-en and data-ar attributes
    document.querySelectorAll('[data-en][data-ar]').forEach(element => {
        const text = lang === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'OPTION') {
            // Handle option elements
            const optionText = lang === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
            if (optionText) {
                element.textContent = optionText;
            }
        } else {
            element.textContent = text;
        }
    });
    
    // Update meal time options
    const mealTimeSelect = document.getElementById('meal-time');
    if (mealTimeSelect) {
        const lunchOption = mealTimeSelect.querySelector('option[value="lunch"]');
        const dinnerOption = mealTimeSelect.querySelector('option[value="dinner"]');
        if (lunchOption) {
            lunchOption.textContent = lang === 'ar' ? lunchOption.getAttribute('data-ar') : lunchOption.getAttribute('data-en');
        }
        if (dinnerOption) {
            dinnerOption.textContent = lang === 'ar' ? dinnerOption.getAttribute('data-ar') : dinnerOption.getAttribute('data-en');
        }
    }
    
    // Update payment method placeholders
    const cardholderName = document.getElementById('cardholder-name');
    if (cardholderName) {
        const placeholder = lang === 'ar' ? cardholderName.getAttribute('data-ar-placeholder') : cardholderName.getAttribute('data-en-placeholder');
        if (placeholder) {
            cardholderName.placeholder = placeholder;
        }
    }
}

// ============================================
// Reservation System
// ============================================

function initializeReservation() {
    // Book Now button
    const bookNowBtn = document.getElementById('book-now-btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' });
            showReservationStep(1);
        });
    }
    
    // Initialize calendar
    renderCalendar();
    
    // Calendar navigation - Enable month navigation
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    // Enable navigation buttons
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            changeMonth(-1);
        });
        // Hide prev button if we're at the start date (January 2026)
        updateNavigationButtons();
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            changeMonth(1);
        });
    }
    
    // Initialize swipe gestures for mobile calendar
    initializeCalendarSwipe();
    
    // Initialize Today button for mobile
    initializeTodayButton();
    
    // Form submission
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }
    
    // Back to calendar button
    const backBtn = document.getElementById('back-to-calendar');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            showReservationStep(1);
        });
    }
    
    // Hide reservation info initially
    const reservationInfo = document.getElementById('reservation-info');
    if (reservationInfo) {
        reservationInfo.classList.add('hidden');
    }
    
    // Dynamic price calculation
    // Price: 20 JOD per person
    const PRICE_PER_PERSON = 20;
    const MAX_SEATS = 200;
    
    const peopleInput = document.getElementById('people');
    if (peopleInput) {
        peopleInput.addEventListener('input', function() {
            const peopleCount = parseInt(this.value) || 0;
            if (peopleCount > 0 && peopleCount <= MAX_SEATS) {
                // Calculate total price: number of people × 20 JOD
                const totalPrice = peopleCount * PRICE_PER_PERSON;
                const priceDisplay = document.getElementById('reservation-price-display');
                if (priceDisplay) {
                    priceDisplay.textContent = currentLanguage === 'ar' 
                        ? `السعر الإجمالي: ${totalPrice} دينار`
                        : `Total Price: ${totalPrice} JOD`;
                    // Reset color to default
                    priceDisplay.style.color = '';
                }
                reservationInfo.classList.remove('hidden');
            } else if (peopleCount === 0 || !peopleCount) {
                reservationInfo.classList.add('hidden');
            } else if (peopleCount > MAX_SEATS) {
                // Show error if exceeds maximum
                const priceDisplay = document.getElementById('reservation-price-display');
                if (priceDisplay) {
                    priceDisplay.textContent = currentLanguage === 'ar' 
                        ? `الحد الأقصى: ${MAX_SEATS} مقعد`
                        : `Maximum: ${MAX_SEATS} seats`;
                    priceDisplay.style.color = '#e74c3c';
                }
            }
        });
    }
    
    // Payment Method Toggle
    const paymentCash = document.getElementById('payment-cash');
    const paymentCreditCard = document.getElementById('payment-credit-card');
    const creditCardFormContainer = document.getElementById('credit-card-form-container');
    
    function toggleCreditCardForm() {
        if (paymentCreditCard && paymentCreditCard.checked) {
            if (creditCardFormContainer) {
                creditCardFormContainer.classList.add('show');
            }
        } else {
            if (creditCardFormContainer) {
                creditCardFormContainer.classList.remove('show');
            }
        }
    }
    
    if (paymentCash) {
        paymentCash.addEventListener('change', toggleCreditCardForm);
    }
    
    if (paymentCreditCard) {
        paymentCreditCard.addEventListener('change', toggleCreditCardForm);
    }
    
    // Format card number input
    const cardNumberForm = document.getElementById('card-number-form');
    if (cardNumberForm) {
        cardNumberForm.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            value = value.replace(/\D/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
            e.target.value = formattedValue;
            
            // Validate and update border color
            if (value.length === 16) {
                e.target.classList.remove('invalid');
                e.target.classList.add('valid');
            } else if (value.length > 0) {
                e.target.classList.remove('valid');
                e.target.classList.add('invalid');
            } else {
                e.target.classList.remove('valid', 'invalid');
            }
        });
    }
    
    // Format expiry date input
    const cardExpiryForm = document.getElementById('card-expiry-form');
    if (cardExpiryForm) {
        cardExpiryForm.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
            
            // Validate and update border color
            if (/^\d{2}\/\d{2}$/.test(value)) {
                const [month, year] = value.split('/');
                const monthNum = parseInt(month);
                if (monthNum >= 1 && monthNum <= 12) {
                    e.target.classList.remove('invalid');
                    e.target.classList.add('valid');
                } else {
                    e.target.classList.remove('valid');
                    e.target.classList.add('invalid');
                }
            } else if (value.length > 0) {
                e.target.classList.remove('valid');
                e.target.classList.add('invalid');
            } else {
                e.target.classList.remove('valid', 'invalid');
            }
        });
    }
    
    // Format CVV input
    const cardCvvForm = document.getElementById('card-cvv-form');
    if (cardCvvForm) {
        cardCvvForm.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
            
            // Validate and update border color
            if (e.target.value.length === 3) {
                e.target.classList.remove('invalid');
                e.target.classList.add('valid');
            } else if (e.target.value.length > 0) {
                e.target.classList.remove('valid');
                e.target.classList.add('invalid');
            } else {
                e.target.classList.remove('valid', 'invalid');
            }
        });
    }
    
    // Validate cardholder name
    const cardholderName = document.getElementById('cardholder-name');
    if (cardholderName) {
        cardholderName.addEventListener('input', function(e) {
            if (e.target.value.trim().length >= 3) {
                e.target.classList.remove('invalid');
                e.target.classList.add('valid');
            } else if (e.target.value.length > 0) {
                e.target.classList.remove('valid');
                e.target.classList.add('invalid');
            } else {
                e.target.classList.remove('valid', 'invalid');
            }
        });
    }
    
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.getElementById('calendar-month-year');
    
    if (!calendarGrid) return;
    
    // Reservation period: January 20, 2026 to February 20, 2026 only
    // Clamp to allowed months
    const minMonth = 0; // January
    const maxMonth = 1; // February
    const minYear = 2026;
    const maxYear = 2026;
    
    if (currentYear < minYear || (currentYear === minYear && currentMonth < minMonth)) {
        currentYear = minYear;
        currentMonth = minMonth;
    } else if (currentYear > maxYear || (currentYear === maxYear && currentMonth > maxMonth)) {
        currentYear = maxYear;
        currentMonth = maxMonth;
    }
    
    // Get month name
    const monthNames = currentLanguage === 'ar' 
        ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
        : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    if (monthYearDisplay) {
        monthYearDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Day names
    const dayNames = currentLanguage === 'ar'
        ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers to separate weekdays container
    const weekdaysContainer = document.getElementById('calendar-weekdays');
    if (weekdaysContainer) {
        weekdaysContainer.innerHTML = '';
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            weekdaysContainer.appendChild(dayHeader);
        });
    }
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of month - show ALL days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        // Check if date is valid
        // Reservation period: January 20, 2026 to February 20, 2026
        // Only Thursday, Friday, or Saturday are available
        const minDate = new Date(2026, 0, 20); // January 20, 2026
        const maxDate = new Date(2026, 1, 20); // February 20, 2026
        const dayOfWeek = date.getDay(); // 0 = Sunday, 4 = Thursday, 5 = Friday, 6 = Saturday
        
        // Check if date is within reservation period AND is Thu/Fri/Sat
        const isWithinPeriod = date >= minDate && date <= maxDate;
        const isAvailableDay = dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6;
        
        if (!isWithinPeriod || !isAvailableDay) {
            // Disable but still show the day
            dayCell.classList.add('disabled');
        } else {
            // Available for selection
            dayCell.classList.add('available');
            
            // Use both click and touch events for better mobile support
            const handleDateSelection = function(e) {
                e.preventDefault();
                e.stopPropagation();
                selectDate(date);
            };
            
            dayCell.addEventListener('click', handleDateSelection);
            dayCell.addEventListener('touchend', handleDateSelection, { passive: false });
            
            // Check for scarcity badge (first week Thu/Fri only)
            const firstWeekEnd = new Date(2026, 0, 27); // End of first week (Jan 27)
            if (date <= firstWeekEnd && (dayOfWeek === 4 || dayOfWeek === 5)) {
                const badge = document.createElement('div');
                badge.className = 'scarcity-badge';
                if (currentLanguage === 'ar') {
                    badge.innerHTML = 'مقاعد<br>محدودة';
                } else {
                    badge.innerHTML = 'Almost<br>Sold Out';
                }
                dayCell.appendChild(badge);
            }
        }
        
        // Highlight selected date
        if (selectedDate && 
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()) {
            dayCell.classList.add('selected');
        }
        
        calendarGrid.appendChild(dayCell);
    }
}

/**
 * Change the calendar month
 * @param {number} direction - 1 for next month, -1 for previous month
 */
function changeMonth(direction) {
    // Reservation period: January 20, 2026 to February 20, 2026 only
    const minMonth = 0; // January
    const maxMonth = 1; // February
    const minYear = 2026;
    const maxYear = 2026;
    
    const newMonth = currentMonth + direction;
    let canNavigate = false;
    
    // Check if navigation is allowed
    if (direction === -1) {
        // Going back - only allow if not at minimum (January 2026)
        canNavigate = !(currentMonth === minMonth && currentYear === minYear);
    } else if (direction === 1) {
        // Going forward - only allow if not at maximum (February 2026)
        canNavigate = !(currentMonth === maxMonth && currentYear === maxYear);
    }
    
    if (canNavigate) {
        // Handle month boundaries within the allowed range
        if (newMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (newMonth > 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth = newMonth;
        }
        
        // Clamp to allowed range (shouldn't happen, but safety check)
        if (currentYear < minYear || (currentYear === minYear && currentMonth < minMonth)) {
            currentYear = minYear;
            currentMonth = minMonth;
        } else if (currentYear > maxYear || (currentYear === maxYear && currentMonth > maxMonth)) {
            currentYear = maxYear;
            currentMonth = maxMonth;
        }
        
        // Update navigation buttons state
        updateNavigationButtons();
        
        // Re-render calendar
        renderCalendar();
    }
}

/**
 * Update navigation buttons visibility/enabled state
 * Reservation period: January 20, 2026 to February 20, 2026 only
 */
function updateNavigationButtons() {
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    // Reservation period boundaries
    const minMonth = 0; // January
    const maxMonth = 1; // February
    const minYear = 2026;
    const maxYear = 2026;
    
    const isAtMin = currentMonth === minMonth && currentYear === minYear;
    const isAtMax = currentMonth === maxMonth && currentYear === maxYear;
    
    // Disable prev button if at minimum (January 2026)
    if (prevMonthBtn) {
        if (isAtMin) {
            prevMonthBtn.disabled = true;
            prevMonthBtn.style.opacity = '0.5';
            prevMonthBtn.style.cursor = 'not-allowed';
        } else {
            prevMonthBtn.disabled = false;
            prevMonthBtn.style.opacity = '1';
            prevMonthBtn.style.cursor = 'pointer';
        }
    }
    
    // Disable next button if at maximum (February 2026)
    if (nextMonthBtn) {
        if (isAtMax) {
            nextMonthBtn.disabled = true;
            nextMonthBtn.style.opacity = '0.5';
            nextMonthBtn.style.cursor = 'not-allowed';
        } else {
            nextMonthBtn.disabled = false;
            nextMonthBtn.style.opacity = '1';
            nextMonthBtn.style.cursor = 'pointer';
        }
    }
}

function selectDate(date) {
    selectedDate = date;
    renderCalendar();
    showReservationStep(2);
    
    // Scroll to reservation section when date is selected
    setTimeout(() => {
        const reservationSection = document.getElementById('reservation');
        if (reservationSection) {
            reservationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Focus on full-name input field after scrolling
        const fullNameInput = document.getElementById('full-name');
        if (fullNameInput) {
            fullNameInput.focus();
        }
    }, 150);
    
    // Show reservation info (cost and capacity)
    const reservationInfo = document.getElementById('reservation-info');
    if (reservationInfo) {
        reservationInfo.classList.remove('hidden');
    }
    
    // Display selected date
    const dateDisplay = document.getElementById('selected-date-display');
    if (dateDisplay) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const locale = currentLanguage === 'ar' ? 'ar-JO' : 'en-US';
        dateDisplay.textContent = date.toLocaleDateString(locale, options);
    }
}

function showReservationStep(step) {
    // Hide all steps
    document.querySelectorAll('.reservation-step').forEach(stepEl => {
        stepEl.classList.add('hidden');
    });
    
    // Show selected step
    const stepElement = document.getElementById(`reservation-step-${step}`);
    if (stepElement) {
        stepElement.classList.remove('hidden');
    }
}

// ============================================
// Calendar Mobile Enhancements
// ============================================

/**
 * Initialize swipe gesture support for calendar navigation
 * Supports touch devices with left/right swipe gestures
 */
function initializeCalendarSwipe() {
    const calendarContainer = document.querySelector('.calendar-container');
    if (!calendarContainer) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    
    // Touch event handlers
    calendarContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    calendarContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        // Swipe right (next) - Note: In RTL, this would be reversed
        if (swipeDistance < -swipeThreshold) {
            // Since we only show one month, swipe doesn't navigate
            // But we can provide visual feedback
            if (window.innerWidth <= 768) {
                showSwipeFeedback('right');
            }
        }
        // Swipe left (previous)
        else if (swipeDistance > swipeThreshold) {
            if (window.innerWidth <= 768) {
                showSwipeFeedback('left');
            }
        }
    }
    
    function showSwipeFeedback(direction) {
        const calendarGrid = document.getElementById('calendar-grid');
        if (!calendarGrid) return;
        
        // Add visual feedback
        calendarGrid.style.transform = direction === 'right' ? 'translateX(-5px)' : 'translateX(5px)';
        calendarGrid.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            calendarGrid.style.transform = 'translateX(0)';
        }, 200);
    }
}

/**
 * Initialize Today button functionality
 * Scrolls to today's date or first available date in the calendar
 */
function initializeTodayButton() {
    const todayBtn = document.getElementById('calendar-today-btn');
    if (!todayBtn) return;
    
    // Update button text based on language
    function updateTodayButtonText() {
        const todayText = todayBtn.querySelector('span');
        if (todayText) {
            if (currentLanguage === 'ar') {
                todayText.textContent = 'اليوم';
            } else {
                todayText.textContent = 'Today';
            }
        }
    }
    
    // Update on language change - listen to document attribute changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'dir' || mutation.attributeName === 'lang')) {
                updateTodayButtonText();
            }
        });
    });
    
    observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['dir', 'lang'] 
    });
    updateTodayButtonText();
    
    // Handle click/tap
    todayBtn.addEventListener('click', function() {
        scrollToFirstAvailableDate();
    });
    
    // Also handle touch events for better mobile support
    todayBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        scrollToFirstAvailableDate();
    });
    
    function scrollToFirstAvailableDate() {
        const calendarGrid = document.getElementById('calendar-grid');
        if (!calendarGrid) return;
        
        // Find first available date
        const availableDays = calendarGrid.querySelectorAll('.calendar-day.available');
        if (availableDays.length > 0) {
            // Scroll to first available date
            availableDays[0].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'center'
            });
            
            // Add visual highlight
            availableDays[0].style.transform = 'scale(1.1)';
            availableDays[0].style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                availableDays[0].style.transform = 'scale(1)';
            }, 500);
        }
    }
    
    // Show/hide button based on screen size
    function handleResize() {
        if (window.innerWidth <= 768) {
            todayBtn.style.display = 'flex';
        } else {
            todayBtn.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
}

function handleReservationSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const people = document.getElementById('people').value;
    
    // Clear previous errors
    clearErrors();
    
    // Validate form
    let isValid = true;
    
    if (!fullName) {
        showError('name-error', currentLanguage === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name is required');
        isValid = false;
    } else if (!validateFullName(fullName)) {
        showError('name-error', currentLanguage === 'ar' ? 'يرجى إدخال الاسم الكامل (اسمين على الأقل)' : 'Please enter full name (at least 2 words)');
        isValid = false;
    }
    
    if (!phone) {
        showError('phone-error', currentLanguage === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required');
        isValid = false;
    } else if (!validateJordanianPhone(phone)) {
        showError('phone-error', currentLanguage === 'ar' ? 'يرجى إدخال رقم هاتف أردني صحيح (07XXXXXXXX)' : 'Please enter a valid Jordanian phone number (07XXXXXXXX)');
        isValid = false;
    }
    
    if (!people) {
        showError('people-error', currentLanguage === 'ar' ? 'يرجى اختيار عدد الأشخاص' : 'Please select number of people');
        isValid = false;
    } else {
        const peopleCount = parseInt(people);
        const MAX_SEATS = 200;
        if (peopleCount < 1) {
            showError('people-error', currentLanguage === 'ar' ? 'عدد الأشخاص يجب أن يكون على الأقل 1' : 'Number of people must be at least 1');
            isValid = false;
        } else if (peopleCount > MAX_SEATS) {
            showError('people-error', currentLanguage === 'ar' ? `الحد الأقصى هو ${MAX_SEATS} مقعد` : `Maximum is ${MAX_SEATS} seats`);
            isValid = false;
        }
    }
    
    const mealTime = document.getElementById('meal-time').value;
    if (!mealTime) {
        showError('meal-time-error', currentLanguage === 'ar' ? 'يرجى اختيار وقت الوجبة' : 'Please select meal time');
        isValid = false;
    }
    
    // Check payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    // If credit card is selected, validate card fields
    if (paymentMethod === 'credit-card') {
        const cardholderName = document.getElementById('cardholder-name').value.trim();
        const cardNumber = document.getElementById('card-number-form').value.replace(/\s/g, '');
        const cardExpiry = document.getElementById('card-expiry-form').value;
        const cardCvv = document.getElementById('card-cvv-form').value;
        
        if (!cardholderName || cardholderName.length < 3) {
            showError('cardholder-name-error', currentLanguage === 'ar' ? 'اسم حامل البطاقة مطلوب (3 أحرف على الأقل)' : 'Cardholder name is required (at least 3 characters)');
            isValid = false;
        }
        
        if (!cardNumber || cardNumber.length !== 16) {
            showError('card-number-form-error', currentLanguage === 'ar' ? 'رقم البطاقة يجب أن يكون 16 رقم' : 'Card number must be 16 digits');
            isValid = false;
        }
        
        if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            showError('card-expiry-form-error', currentLanguage === 'ar' ? 'تاريخ الانتهاء غير صحيح (MM/YY)' : 'Invalid expiry date (MM/YY)');
            isValid = false;
        } else {
            const [month, year] = cardExpiry.split('/');
            const monthNum = parseInt(month);
            if (monthNum < 1 || monthNum > 12) {
                showError('card-expiry-form-error', currentLanguage === 'ar' ? 'الشهر غير صحيح' : 'Invalid month');
                isValid = false;
            }
        }
        
        if (!cardCvv || cardCvv.length !== 3) {
            showError('card-cvv-form-error', currentLanguage === 'ar' ? 'CVV يجب أن يكون 3 أرقام' : 'CVV must be 3 digits');
            isValid = false;
        }
    }
    
    if (isValid) {
        // Show success message with payment method info
        showReservationStep(3);
        updateThankYouMessage(paymentMethod);
        
        // Scroll to reservation section to show the thank you message
        setTimeout(() => {
            const reservationSection = document.getElementById('reservation');
            if (reservationSection) {
                reservationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
        
        // Log reservation (in real app, send to server)
        console.log('Reservation submitted:', {
            name: fullName,
            phone: phone,
            people: people,
            mealTime: mealTime,
            paymentMethod: paymentMethod,
            date: selectedDate
        });
    }
}

function updateThankYouMessage(paymentMethod) {
    const thankYouMessage = document.getElementById('thank-you-message');
    if (thankYouMessage && typeof contentData !== 'undefined' && contentData.payment) {
        if (paymentMethod === 'credit-card') {
            thankYouMessage.textContent = contentData.payment.thankYouCard[currentLanguage] || contentData.payment.thankYouCard.en;
        } else {
            thankYouMessage.textContent = contentData.payment.thankYouCash[currentLanguage] || contentData.payment.thankYouCash.en;
        }
    }
}


function resetReservationForm() {
    document.getElementById('reservation-form').reset();
    const creditCardFormContainer = document.getElementById('credit-card-form-container');
    if (creditCardFormContainer) {
        creditCardFormContainer.classList.remove('show');
    }
    selectedDate = null;
    const reservationInfo = document.getElementById('reservation-info');
    if (reservationInfo) {
        reservationInfo.classList.add('hidden');
    }
    showReservationStep(1);
    renderCalendar();
}

function validateFullName(name) {
    // Full name must have at least 2 words (captures)
    const nameParts = name.trim().split(/\s+/);
    return nameParts.length >= 2;
}

function validateJordanianPhone(phone) {
    // Jordanian phone format: 07XXXXXXXX (10 digits starting with 07)
    const phoneRegex = /^07\d{8}$/;
    return phoneRegex.test(phone);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
}

// ============================================
// Reviews Carousel
// ============================================

let carouselPosition = 0;

function initializeCarousel() {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            scrollCarousel('prev');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            scrollCarousel('next');
        });
    }
    
    // Touch/swipe support for mobile
    const carousel = document.getElementById('reviews-container');
    if (carousel) {
        let startX = 0;
        let scrollLeft = 0;
        
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('touchmove', function(e) {
            e.preventDefault();
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
}

function loadReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer || typeof contentData === 'undefined') return;
    
    const reviews = currentLanguage === 'ar' ? contentData.reviewsAr : contentData.reviews;
    
    reviewsContainer.innerHTML = reviews.map(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        return `
            <div class="review-card">
                <div class="review-header">
                    <span class="review-name">${review.name}</span>
                    <span class="review-stars">${stars}</span>
                </div>
                <p class="review-text">"${review.text}"</p>
            </div>
        `;
    }).join('');
    
    // Reset carousel position after loading
    resetCarousel();
}

function scrollCarousel(direction) {
    const carousel = document.getElementById('reviews-container');
    if (!carousel) return;
    
    // Get the width of the carousel container
    const containerWidth = carousel.offsetWidth;
    const currentScroll = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
    
    if (direction === 'next') {
        // If at the end, scroll to beginning (circular)
        if (currentScroll >= maxScroll - 10) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            carousel.scrollBy({ left: containerWidth, behavior: 'smooth' });
        }
    } else {
        // If at the beginning, scroll to end (circular)
        if (currentScroll <= 10) {
            carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
            carousel.scrollBy({ left: -containerWidth, behavior: 'smooth' });
        }
    }
}

function resetCarousel() {
    const carousel = document.getElementById('reviews-container');
    if (carousel) {
        carousel.scrollLeft = 0;
    }
}

// ============================================
// FAQ - Double Toggle
// ============================================

function loadFAQ() {
    const faqContainer = document.getElementById('faq-container');
    const faqToggleBtn = document.getElementById('faq-toggle-btn');
    const faqMainTitle = document.getElementById('faq-main-title');
    
    if (!faqContainer || typeof contentData === 'undefined') return;
    
    // Toggle FAQ function
    function toggleFAQ() {
        const isHidden = faqContainer.classList.contains('hidden');
        if (isHidden) {
            faqContainer.classList.remove('hidden');
            if (faqToggleBtn) faqToggleBtn.classList.add('active');
        } else {
            faqContainer.classList.add('hidden');
            if (faqToggleBtn) faqToggleBtn.classList.remove('active');
            // Close all FAQ items when hiding
            faqContainer.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
        }
    }
    
    // Make FAQ title clickable
    if (faqMainTitle) {
        faqMainTitle.addEventListener('click', toggleFAQ);
    }
    
    // Initialize toggle button click
    if (faqToggleBtn) {
        faqToggleBtn.addEventListener('click', toggleFAQ);
    }
    
    const faqItems = currentLanguage === 'ar' ? contentData.faqAr : contentData.faq;
    
    faqContainer.innerHTML = faqItems.map((item, index) => {
        return `
            <div class="faq-item">
                <button class="faq-question">
                    <span>${item.question}</span>
                    <span class="faq-icon">▼</span>
                </button>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers for individual questions (second toggle - accordion)
    faqContainer.querySelectorAll('.faq-question').forEach((question, index) => {
        question.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering parent
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            faqContainer.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ============================================
// Menu Tabbed Layout Functionality
// ============================================

function initializeMenu() {
    // Initialize tab switching
    const menuTabs = document.querySelectorAll('.menu-tab');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchMenuTab(targetTab);
        });
    });
    
    // Load initial menu content
    loadMenu();
}

function switchMenuTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('.menu-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetContent = document.getElementById(`${tabName}-content`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

function loadMenu() {
    if (typeof contentData === 'undefined' || !contentData.menuItems) return;
    
    // Get menu items for current language
    const menuData = {
        'main-dishes': currentLanguage === 'ar' ? contentData.menuItems['main-dishes'].ar : contentData.menuItems['main-dishes'].en,
        'drinks': currentLanguage === 'ar' ? contentData.menuItems['drinks'].ar : contentData.menuItems['drinks'].en,
        'desserts': currentLanguage === 'ar' ? contentData.menuItems['desserts'].ar : contentData.menuItems['desserts'].en
    };
    
    // Load content for each tab
    Object.keys(menuData).forEach(tabName => {
        const contentContainer = document.getElementById(`${tabName}-content`);
        if (!contentContainer) return;
        
        const items = menuData[tabName];
        if (!items || items.length === 0) return;
        
        contentContainer.innerHTML = items.map(item => {
            return `
                <div class="menu-item">
                    <span class="menu-item-name">${item.name}</span>
                </div>
            `;
        }).join('');
    });
}

// ============================================
// Social Sharing Functionality
// ============================================

function initializeSocialSharing() {
    const currentUrl = encodeURIComponent(window.location.href);
    
    // Facebook Share
    const facebookShare = document.getElementById('share-facebook');
    if (facebookShare) {
        facebookShare.addEventListener('click', function(e) {
            e.preventDefault();
            const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    }
    
    // Instagram Share (Copy to Clipboard)
    const instagramShare = document.getElementById('share-instagram');
    if (instagramShare) {
        instagramShare.addEventListener('click', function(e) {
            e.preventDefault();
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                showToast(currentLanguage === 'ar' ? 'تم نسخ الرابط!' : 'Link Copied!');
            }).catch(err => {
                console.error('Failed to copy:', err);
                showToast(currentLanguage === 'ar' ? 'فشل النسخ' : 'Failed to copy');
            });
        });
    }
    
    // WhatsApp Share
    const whatsappShare = document.getElementById('share-whatsapp');
    if (whatsappShare) {
        whatsappShare.addEventListener('click', function(e) {
            e.preventDefault();
            const shareUrl = `https://api.whatsapp.com/send?text=${currentUrl}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    }
    
    // X (Twitter) Share
    const xShare = document.getElementById('share-x');
    if (xShare) {
        xShare.addEventListener('click', function(e) {
            e.preventDefault();
            const shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    }
}

// Toast Notification Function
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide and remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ============================================
// Smooth Scroll
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ============================================
// Sticky Header with Scroll Effect
// ============================================

function initializeStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Mobile Menu
// ============================================

function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = mobileMenu?.querySelectorAll('a');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        if (mobileNavLinks) {
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }
}

// ============================================
// Preferences (Local Storage)
// ============================================

function savePreferences() {
    localStorage.setItem('halawah-theme', currentTheme);
    localStorage.setItem('halawah-language', currentLanguage);
}

function loadPreferences() {
    const savedTheme = localStorage.getItem('halawah-theme');
    const savedLanguage = localStorage.getItem('halawah-language');
    
    if (savedTheme) {
        currentTheme = savedTheme;
    }
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
}

// ============================================
// Policies Modal Functionality
// ============================================

function initializePoliciesModal() {
    const policiesLink = document.getElementById('policies-link');
    const policiesModal = document.getElementById('policies-modal');
    const closeBtn = document.getElementById('policies-modal-close');
    
    if (policiesLink) {
        policiesLink.addEventListener('click', function(e) {
            e.preventDefault();
            openPoliciesModal();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closePoliciesModal();
        });
    }
    
    if (policiesModal) {
        // Close modal when clicking outside
        policiesModal.addEventListener('click', function(e) {
            if (e.target === policiesModal) {
                closePoliciesModal();
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && policiesModal.classList.contains('active')) {
                closePoliciesModal();
            }
        });
    }
    
    // Load initial content
    loadPoliciesContent();
}

function openPoliciesModal() {
    const policiesModal = document.getElementById('policies-modal');
    if (policiesModal) {
        policiesModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        loadPoliciesContent();
    }
}

function closePoliciesModal() {
    const policiesModal = document.getElementById('policies-modal');
    if (policiesModal) {
        policiesModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function loadPoliciesContent() {
    const modalBody = document.getElementById('policies-modal-body');
    if (!modalBody || !contentData || !contentData.policiesText) {
        return;
    }
    
    const policies = contentData.policiesText[currentLanguage];
    if (!policies) {
        return;
    }
    
    // Clear existing content
    modalBody.innerHTML = '';
    
    // Create policy sections
    const sections = ['reservations', 'buffet', 'payment', 'refunds', 'halal'];
    
    sections.forEach(sectionKey => {
        if (policies[sectionKey]) {
            const section = document.createElement('div');
            section.className = 'policy-section';
            
            const title = document.createElement('h3');
            title.textContent = policies[sectionKey].title;
            
            const content = document.createElement('p');
            content.textContent = policies[sectionKey].content;
            
            section.appendChild(title);
            section.appendChild(content);
            modalBody.appendChild(section);
        }
    });
    
    // Update modal title
    const modalTitle = document.getElementById('policies-modal-title');
    if (modalTitle) {
        const titleText = currentLanguage === 'ar' ? 'الشروط والسياسات' : 'Terms & Policies';
        modalTitle.textContent = titleText;
    }
}

// ============================================
// Initialize Date Cards on Page Load
// ============================================

// Date cards are generated on page load via initializeReservation()
