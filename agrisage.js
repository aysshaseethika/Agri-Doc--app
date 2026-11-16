/**
 * AgriSage - AI-Powered Agricultural Assistant
 * Bio-Climate Simulation & Doctor Consultation Module
 */

const AgriSage = (function() {
    // Configuration
    const config = {
        // API Endpoints (to be replaced with actual endpoints)
        endpoints: {
            imageAnalysis: '/api/analyze-image',
            weatherData: '/api/weather',
            soilData: '/api/soil',
            doctorSearch: '/api/doctors/search',
            bookAppointment: '/api/appointments/book'
        },
        
        // Default settings
        settings: {
            maxImageSize: 5 * 1024 * 1024, // 5MB
            supportedImageTypes: ['image/jpeg', 'image/png'],
            defaultLocation: { lat: 11.0168, lng: 76.9558 }, // Coimbatore as default
            maxDoctorDistance: 10 // km
        },
        
        // UI Elements
        elements: {}
    };

    // Core Modules
    const modules = {
        // AI Modules
        imageAnalyzer: {
            // Will be implemented in step 2
        },
        
        bioClimateEngine: {
            // Will be implemented in step 3
        },
        
        riskEngine: {
            // Will be implemented in step 4
        },
        
        // Doctor Consultation Module
        doctorConsultation: {
            // Will be implemented in step 6
        },
        
        // UI Module
        ui: {
            // Will be implemented in step 5
        },
        
        // Crop Calendar Module
        cropCalendar: {
            // Crop database with growth stages and tasks
            crops: {
                rice: {
                    name: 'Rice',
                    growthStages: [
                        { 
                            name: 'Nursery', 
                            duration: 21,
                            tasks: [
                                'Prepare seedbed with fine tilth',
                                'Treat seeds with fungicides',
                                'Sow pre-germinated seeds',
                                'Maintain 2-3 cm water level'
                            ]
                        },
                        {
                            name: 'Land Preparation',
                            duration: 7,
                            tasks: [
                                'Plow and harrow the field',
                                'Level the field properly',
                                'Apply basal fertilizer',
                                'Maintain 2-3 cm water level'
                            ]
                        },
                        {
                            name: 'Vegetative',
                            duration: 35,
                            tasks: [
                                'Transplant 20-25 day old seedlings',
                                'Apply nitrogen fertilizer at tillering stage',
                                'Maintain 2-5 cm water level',
                                'Control weeds and pests'
                            ]
                        },
                        {
                            name: 'Reproductive',
                            duration: 35,
                            tasks: [
                                'Apply potassium at panicle initiation',
                                'Maintain 5-10 cm water level',
                                'Monitor for pests and diseases',
                                'Drain field 1 week before harvest'
                            ]
                        },
                        {
                            name: 'Maturity',
                            duration: 30,
                            tasks: [
                                'Stop irrigation',
                                'Monitor grain moisture content',
                                'Harvest when 80-85% of grains are golden yellow',
                                'Thresh and dry grains to 14% moisture content'
                            ]
                        }
                    ]
                },
                wheat: {
                    name: 'Wheat',
                    growthStages: [
                        {
                            name: 'Germination',
                            duration: 7,
                            tasks: [
                                'Prepare seedbed with fine tilth',
                                'Treat seeds with fungicides',
                                'Sow seeds at recommended depth',
                                'Ensure proper soil moisture'
                            ]
                        },
                        {
                            name: 'Tillering',
                            duration: 30,
                            tasks: [
                                'Apply first dose of nitrogen',
                                'Control weeds',
                                'Monitor for pests',
                                'Ensure adequate soil moisture'
                            ]
                        },
                        {
                            name: 'Stem Elongation',
                            duration: 30,
                            tasks: [
                                'Apply second dose of nitrogen',
                                'Monitor for diseases',
                                'Control weeds if necessary',
                                'Ensure adequate soil moisture'
                            ]
                        },
                        {
                            name: 'Heading',
                            duration: 14,
                            tasks: [
                                'Monitor for pests and diseases',
                                'Apply fungicide if necessary',
                                'Ensure adequate soil moisture',
                                'Prepare for harvest'
                            ]
                        },
                        {
                            name: 'Maturity',
                            duration: 30,
                            tasks: [
                                'Stop irrigation',
                                'Monitor grain moisture content',
                                'Harvest when grains are hard and dry',
                                'Thresh and store grains properly'
                            ]
                        }
                    ]
                },
                maize: {
                    name: 'Maize',
                    growthStages: [
                        {
                            name: 'Germination',
                            duration: 7,
                            tasks: [
                                'Prepare seedbed with fine tilth',
                                'Treat seeds with fungicides',
                                'Sow seeds at recommended depth',
                                'Ensure proper soil moisture'
                            ]
                        },
                        {
                            name: 'Vegetative',
                            duration: 40,
                            tasks: [
                                'Apply first dose of nitrogen',
                                'Control weeds',
                                'Monitor for pests',
                                'Ensure adequate soil moisture'
                            ]
                        },
                        {
                            name: 'Tasseling',
                            duration: 20,
                            tasks: [
                                'Apply second dose of nitrogen',
                                'Monitor for diseases',
                                'Control weeds if necessary',
                                'Ensure adequate soil moisture'
                            ]
                        },
                        {
                            name: 'Silking',
                            duration: 20,
                            tasks: [
                                'Monitor for pests and diseases',
                                'Apply fungicide if necessary',
                                'Ensure adequate soil moisture',
                                'Prepare for harvest'
                            ]
                        },
                        {
                            name: 'Maturity',
                            duration: 30,
                            tasks: [
                                'Stop irrigation',
                                'Monitor grain moisture content',
                                'Harvest when grains are hard and dry',
                                'Store grains properly'
                            ]
                        }
                    ]
                },
                cotton: {
                    name: 'Cotton',
                    growthStages: [
                        {
                            name: 'Germination',
                            duration: 10,
                            tasks: [
                                'Prepare seedbed with fine tilth',
                                'Treat seeds with fungicides',
                                'Sow seeds at recommended depth',
                                'Ensure proper soil moisture'
                            ]
                        },
                        {
                            name: 'Vegetative',
                            duration: 50,
                            tasks: [
                                'Apply first dose of nitrogen',
                                'Control weeds',
                                'Monitor for pests',
                                'Ensure adequate soil moisture'
                            ]
                        },
                        {
                            name: 'Flowering',
                            duration: 30,
                            tasks: [
                                'Apply second dose of nitrogen',
                                'Monitor for diseases',
                                'Control weeds if necessary',
                                'Ensure adequate soil moisture'
                            ]
                        },
                        {
                            name: 'Boll Formation',
                            duration: 40,
                            tasks: [
                                'Monitor for pests and diseases',
                                'Apply pesticide if necessary',
                                'Ensure adequate soil moisture',
                                'Prepare for harvest'
                            ]
                        },
                        {
                            name: 'Maturity',
                            duration: 30,
                            tasks: [
                                'Stop irrigation',
                                'Monitor boll opening',
                                'Harvest when bolls are fully open',
                                'Dry and store cotton properly'
                            ]
                        }
                    ]
                },
                sugarcane: {
                    name: 'Sugarcane',
                    growthStages: [
                        {
                            name: 'Germination',
                            duration: 30,
                            tasks: [
                                'Prepare land with deep plowing',
                                'Treat setts with fungicides',
                                'Plant setts in furrows',
                                'Ensure proper soil moisture'
                            ]
                        },
                        {
                            name: 'Tillering',
                            duration: 90,
                            tasks: [
                                'Apply first dose of nitrogen',
                                'Control weeds',
                                'Monitor for pests',
                                'Ensure adequate soil moisture'
                            ]
                        },
                        {
                            name: 'Grand Growth',
                            duration: 120,
                            tasks: [
                                'Apply second dose of nitrogen',
                                'Earthing up',
                                'Monitor for diseases',
                                'Ensure adequate soil moisture'
                            ]
                        },
                        {
                            name: 'Maturity',
                            duration: 60,
                            tasks: [
                                'Withhold irrigation',
                                'Monitor sugar content',
                                'Prepare for harvest',
                                'Arrange for transportation to mill'
                            ]
                        }
                    ]
                }
            },

            /**
             * Generate crop calendar based on crop type and planting date
             * @param {string} cropType - Type of crop (e.g., 'rice', 'wheat')
             * @param {Date} plantingDate - Planting date
             * @returns {Object} Crop calendar with schedule
             */
            generateCalendar: function(cropType, plantingDate) {
                const crop = this.crops[cropType];
                if (!crop) {
                    throw new Error('Invalid crop type');
                }

                let currentDate = new Date(plantingDate);
                const calendar = {
                    crop: crop.name,
                    plantingDate: new Date(plantingDate),
                    stages: []
                };

                // Calculate dates for each growth stage
                crop.growthStages.forEach(stage => {
                    const endDate = new Date(currentDate);
                    endDate.setDate(currentDate.getDate() + stage.duration);
                    
                    calendar.stages.push({
                        name: stage.name,
                        startDate: new Date(currentDate),
                        endDate: new Date(endDate),
                        tasks: [...stage.tasks]
                    });
                    
                    currentDate = new Date(endDate);
                    currentDate.setDate(currentDate.getDate() + 1); // Start next day
                });

                return calendar;
            },

            /**
             * Render crop calendar in the UI
             * @param {Object} calendar - Crop calendar data
             */
            renderCalendar: function(calendar) {
                const container = document.getElementById('cropCalendar');
                if (!container) return;

                let html = `
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-success text-white">
                            <h5 class="mb-0">
                                <i class="bi bi-calendar3 me-2"></i>
                                ${calendar.crop} Cultivation Calendar
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="d-flex align-items-center mb-2">
                                        <i class="bi bi-calendar-check me-2 text-success"></i>
                                        <span class="fw-medium">Planting Date:</span>
                                        <span class="ms-2">${modules.utils.formatDate(calendar.plantingDate)}</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="d-flex align-items-center mb-2">
                                        <i class="bi bi-calendar-x me-2 text-danger"></i>
                                        <span class="fw-medium">Expected Harvest:</span>
                                        <span class="ms-2">${modules.utils.formatDate(calendar.stages[calendar.stages.length - 1].endDate)}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline">
                `;

                // Add timeline items for each growth stage
                calendar.stages.forEach((stage, index) => {
                    const progress = ((index + 1) / calendar.stages.length) * 100;
                    const isLast = index === calendar.stages.length - 1;
                    
                    html += `
                        <div class="timeline-item ${isLast ? 'last' : ''}" style="--progress: ${progress}%">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <div class="d-flex justify-content-between align-items-start">
                                    <h6 class="mb-0">${stage.name}</h6>
                                    <span class="badge bg-light text-dark">
                                        ${stage.duration} days
                                    </span>
                                </div>
                                <div class="small text-muted mb-2">
                                    ${modules.utils.formatDate(stage.startDate)} - ${modules.utils.formatDate(stage.endDate)}
                                </div>
                                <div class="card bg-light border-0 p-2">
                                    <h6 class="small text-uppercase text-muted mb-2">Tasks:</h6>
                                    <ul class="list-unstyled small mb-0">
                                        ${stage.tasks.map(task => `
                                            <li class="mb-1">
                                                <i class="bi bi-check-circle-fill text-success me-2"></i>
                                                ${task}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `;
                });

                html += `
                            </div>
                            <div class="mt-4">
                                <button class="btn btn-outline-primary me-2" onclick="AgriSage.modules.cropCalendar.saveToCalendar()">
                                    <i class="bi bi-calendar-plus me-1"></i> Add to Calendar
                                </button>
                                <button class="btn btn-outline-success" onclick="AgriSage.modules.cropCalendar.printCalendar()">
                                    <i class="bi bi-printer me-1"></i> Print Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                container.innerHTML = html;
            },

            /**
             * Save crop calendar to user's calendar
             */
            saveToCalendar: function() {
                // Implementation for saving to calendar would go here
                modules.utils.showSuccess('Crop calendar saved to your calendar');
            },

            /**
             * Print the crop calendar
             */
            printCalendar: function() {
                window.print();
            },

            /**
             * Initialize crop calendar functionality
             */
            init: function() {
                // Store reference to 'this' for use in callbacks
                const self = this;
                
                // Initialize when the modal is shown
                const cropCalendarModal = document.getElementById('cropCalendarModal');
                if (cropCalendarModal) {
                    // Set default date to today
                    const today = new Date();
                    const dateString = today.toISOString().split('T')[0];
                    const dateInput = document.getElementById('plantingDate');
                    
                    if (dateInput) {
                        dateInput.value = dateString;
                        dateInput.min = dateString; // Prevent selecting past dates
                    }

                    // Handle form submission
                    const form = document.getElementById('cropCalendarForm');
                    if (form) {
                        const handleFormSubmit = function(e) {
                            if (e && e.preventDefault) e.preventDefault();
                            
                            const cropType = document.getElementById('cropType')?.value;
                            const plantingDate = document.getElementById('plantingDate')?.value;
                            
                            console.log('Form submitted with:', { cropType, plantingDate });
                            
                            if (!cropType) {
                                modules.utils.showError('Please select a crop type');
                                return;
                            }

                            if (!plantingDate) {
                                modules.utils.showError('Please select a planting date');
                                return;
                            }

                            try {
                                console.log('Generating calendar for:', cropType, plantingDate);
                                const calendar = self.generateCalendar(cropType, new Date(plantingDate));
                                self.renderCalendar(calendar);
                            } catch (error) {
                                console.error('Error generating calendar:', error);
                                modules.utils.showError('Failed to generate calendar. Please try again.');
                            }
                        };

                        // Handle input changes
                        const handleInputChange = function(e) {
                            console.log('Input changed:', e.target.id, e.target.value);
                            if (form.checkValidity()) {
                                handleFormSubmit(e);
                            }
                        };

                        // Add change event listeners to form inputs
                        const cropTypeSelect = document.getElementById('cropType');
                        const plantingDateInput = document.getElementById('plantingDate');
                        
                        // Remove any existing event listeners
                        cropTypeSelect?.removeEventListener('change', handleInputChange);
                        plantingDateInput?.removeEventListener('change', handleInputChange);
                        form.removeEventListener('submit', handleFormSubmit);
                        
                        // Add new event listeners
                        cropTypeSelect?.addEventListener('change', handleInputChange);
                        plantingDateInput?.addEventListener('change', handleInputChange);
                        form.addEventListener('submit', handleFormSubmit);

                        // Initial render if form is valid
                        if (cropTypeSelect?.value && plantingDateInput?.value) {
                            handleFormSubmit();
                        }
                    }
                }
            }
        },
        
        // Utils
        utils: {
            /**
             * Format date to readable string
             * @param {Date} date - Date object
             * @returns {string} Formatted date string
             */
            formatDate: function(date) {
                return date.toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            },
            
            /**
             * Calculate distance between two coordinates (Haversine formula)
             * @param {Object} coord1 - First coordinate {lat, lng}
             * @param {Object} coord2 - Second coordinate {lat, lng}
             * @returns {number} Distance in kilometers
             */
            calculateDistance: function(coord1, coord2) {
                const R = 6371; // Earth's radius in km
                const dLat = this.toRad(coord2.lat - coord1.lat);
                const dLon = this.toRad(coord2.lng - coord1.lng);
                const a = 
                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(this.toRad(coord1.lat)) * Math.cos(this.toRad(coord2.lat)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                return R * c;
            },
            
            /**
             * Convert degrees to radians
             * @param {number} value - Value in degrees
             * @returns {number} Value in radians
             */
            toRad: function(value) {
                return value * Math.PI / 180;
            },
            
            /**
             * Show error message to user
             * @param {string} message - Error message
             */
            showError: function(message) {
                // Will be implemented in UI module
                console.error('Error:', message);
                alert(`Error: ${message}`);
            },
            
            /**
             * Show success message to user
             * @param {string} message - Success message
             */
            showSuccess: function(message) {
                // Will be implemented in UI module
                console.log('Success:', message);
                alert(`Success: ${message}`);
            }
        }
    };

    // Initialize the application
    function init() {
        console.log('AgriSage initializing...');
        
        // Cache DOM elements
        cacheElements();
        
        // Initialize event listeners
        bindEvents();
        
        // Initialize location services
        initLocation();

        // Initialize crop calendar
        modules.cropCalendar.init();
        
        console.log('AgriSage initialized successfully');
    }
    
    // Cache DOM elements
    function cacheElements() {
        // Bio-Climate Simulation Elements
        config.elements = {
            // Image Upload
            fileInput: document.getElementById('plantImageUpload'),
            selectImageBtn: document.getElementById('selectImageBtn'),
            analyzeImageBtn: document.getElementById('analyzeImageBtn'),
            imagePreview: document.getElementById('imagePreview'),
            imagePreviewContainer: document.getElementById('imagePreviewContainer'),
            
            // Parameter Inputs
            temperature: document.getElementById('temperature'),
            humidity: document.getElementById('humidity'),
            soilMoisture: document.getElementById('soilMoisture'),
            soilPh: document.getElementById('soilPh'),
            
            // Analysis Results
            analysisResults: document.getElementById('analysisResults'),
            imageAnalysisResult: document.getElementById('imageAnalysisResult'),
            
            // Doctor Consultation
            doctorSearchInput: document.getElementById('doctorSearchInput'),
            doctorList: document.getElementById('doctorList'),
            bookAppointmentForm: document.getElementById('bookAppointmentForm')
        };
    }
    
    // Bind event listeners
    function bindEvents() {
        const { fileInput, selectImageBtn, analyzeImageBtn, doctorSearchInput } = config.elements;
        
        // Image upload events
        if (selectImageBtn && fileInput) {
            selectImageBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', handleImageUpload);
        }
        
        // Analyze image button
        if (analyzeImageBtn) {
            analyzeImageBtn.addEventListener('click', analyzeImage);
        }
        
        // Doctor search
        if (doctorSearchInput) {
            doctorSearchInput.addEventListener('input', searchDoctors);
        }

        const form = document.getElementById('bioClimateForm');
        if (form) {
            form.addEventListener('submit', runSimulation);
        }
        
        // Add input validation
        const numberInputs = document.querySelectorAll('input[type="number"]');
        numberInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                // this.validateNumberInput(e.target); // This function is not defined in the provided code
            });
        });

        // Handle current location button
        const useCurrentLocationBtn = document.getElementById('useCurrentLocation');
        if (useCurrentLocationBtn) {
            useCurrentLocationBtn.addEventListener('click', () => {
                // this.getCurrentLocation(); // This function is not defined in the provided code
            });
        }

        // Image upload and preview
        const fieldImage = document.getElementById('fieldImage');
        if (fieldImage) {
            fieldImage.addEventListener('change', handleImageUpload);
        }
        
        // Remove image button
        const removeImageBtn = document.getElementById('removeImage');
        if (removeImageBtn) {
            removeImageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                removeImage();
            });
        }
    }
    
    // Initialize location services
    function initLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    config.settings.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log('User location detected:', config.settings.userLocation);
                },
                (error) => {
                    console.warn('Could not get user location, using default:', error);
                    config.settings.userLocation = { ...config.settings.defaultLocation };
                }
            );
        } else {
            console.warn('Geolocation not supported, using default location');
            config.settings.userLocation = { ...config.settings.defaultLocation };
        }
    }
    
    // Handle image upload and preview
    function handleImageUpload(event) {
        const file = event.target.files[0];
        const previewContainer = document.getElementById('imagePreviewContainer');
        const noImagePreview = document.getElementById('noImagePreview');
        const imagePreview = document.getElementById('imagePreview');
        const fileName = document.getElementById('fileName');
        
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                alert('Please select a valid image file (JPEG or PNG)');
                return;
            }
            
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            
            // Show preview
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                previewContainer.classList.remove('d-none');
                noImagePreview.style.display = 'none';
                fileName.textContent = file.name;
                fileName.classList.remove('text-muted');
                fileName.classList.add('text-success');
            };
            reader.readAsDataURL(file);
        }
    }
    
    // Remove image preview
    function removeImage() {
        const fileInput = document.getElementById('fieldImage');
        const previewContainer = document.getElementById('imagePreviewContainer');
        const noImagePreview = document.getElementById('noImagePreview');
        const fileName = document.getElementById('fileName');
        
        fileInput.value = '';
        previewContainer.classList.add('d-none');
        noImagePreview.style.display = 'block';
        fileName.textContent = 'No file selected';
        fileName.classList.remove('text-success');
        fileName.classList.add('text-muted');
    }
    
    // Analyze image
    async function analyzeImage() {
        // Will be implemented in step 2
        console.log('Image analysis will be implemented in step 2');
    }
    
    // Search for doctors
    async function searchDoctors() {
        const searchTerm = document.getElementById('doctorSearchInput').value.toLowerCase();
        const specialization = document.getElementById('specializationFilter').value.toLowerCase();
        const availability = document.getElementById('availabilityFilter').value;
        const sortBy = document.getElementById('sortBy').value;

        // Sample doctor data - in a real app, this would come from an API
        const doctors = [
            {
                id: 1,
                name: 'Dr. Rajesh Kumar',
                specialization: 'Plant Pathology',
                experience: '12 years',
                rating: 4.8,
                available: true,
                consultationFee: '₹500',
                languages: ['English', 'Hindi', 'Tamil'],
                image: 'https://img.icons8.com/color/96/000000/doctor-male.png',
                bio: 'Expert in plant diseases and their management with over a decade of experience.'
            },
            {
                id: 2,
                name: 'Dr. Priya Sharma',
                specialization: 'Soil Science',
                experience: '8 years',
                rating: 4.6,
                available: true,
                consultationFee: '₹450',
                languages: ['English', 'Hindi'],
                image: 'https://img.icons8.com/color/96/000000/doctor-female.png',
                bio: 'Specialized in soil health and nutrient management for various crops.'
            },
            {
                id: 3,
                name: 'Dr. Arjun Reddy',
                specialization: 'Horticulture',
                experience: '15 years',
                rating: 4.9,
                available: false,
                consultationFee: '₹600',
                languages: ['English', 'Telugu', 'Hindi'],
                image: 'https://img.icons8.com/color/96/000000/doctor-male.png',
                bio: 'Expert in horticultural practices and crop management.'
            },
            {
                id: 4,
                name: 'Dr. Meena Patel',
                specialization: 'Entomology',
                experience: '10 years',
                rating: 4.7,
                available: true,
                consultationFee: '₹550',
                languages: ['English', 'Gujarati', 'Hindi'],
                image: 'https://img.icons8.com/color/96/000000/doctor-female.png',
                bio: 'Specialized in pest management and integrated pest control solutions.'
            }
        ];

        // Filter doctors based on search criteria
        let filteredDoctors = doctors.filter(doctor => {
            const matchesSearch = doctor.name.toLowerCase().includes(searchTerm) || 
                                doctor.specialization.toLowerCase().includes(searchTerm) ||
                                doctor.bio.toLowerCase().includes(searchTerm);
            
            const matchesSpecialization = !specialization || 
                                        doctor.specialization.toLowerCase() === specialization;
            
            const matchesAvailability = !availability || 
                                      (availability === 'available' && doctor.available) ||
                                      (availability === 'offline' && !doctor.available);
            
            return matchesSearch && matchesSpecialization && matchesAvailability;
        });

        // Sort doctors
        filteredDoctors.sort((a, b) => {
            switch(sortBy) {
                case 'rating-desc':
                    return b.rating - a.rating;
                case 'experience-desc':
                    return parseInt(b.experience) - parseInt(a.experience);
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        // Display results
        displayDoctors(filteredDoctors);
    }

    // Display doctors in the UI
    function displayDoctors(doctors) {
        const doctorsList = document.getElementById('doctorsList');
        
        if (doctors.length === 0) {
            doctorsList.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-emoji-frown display-4 text-muted mb-3"></i>
                    <h5>No doctors found</h5>
                    <p class="text-muted">Try adjusting your search criteria</p>
                </div>
            `;
            return;
        }

        const doctorsHTML = doctors.map(doctor => `
            <div class="col-md-6 mb-3">
                <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex">
                            <div class="flex-shrink-0 me-3">
                                <img src="${doctor.image}" alt="${doctor.name}" 
                                     class="rounded-circle" width="80" height="80" 
                                     style="object-fit: cover; border: 2px solid #e9ecef;">
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-start">
                                    <h5 class="mb-1">${doctor.name}</h5>
                                    <p class="text-muted mb-1">${doctor.specialization}</p>
                                    <div class="d-flex align-items-center mb-2">
                                        <div class="text-warning me-2">
                                            ${'<i class="bi bi-star-fill"></i>'.repeat(Math.floor(doctor.rating))}${'<i class="bi bi-star-half"></i>'.repeat(doctor.rating % 1 ? 1 : 0)}${'<i class="bi bi-star"></i>'.repeat(5 - Math.ceil(doctor.rating))}
                                        </div>
                                        <small class="text-muted">${doctor.rating}</small>
                                    </div>
                                </div>
                                <p class="small text-muted mb-2">${doctor.bio}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <span class="badge bg-light text-dark me-1">
                                            <i class="bi bi-briefcase me-1"></i>${doctor.experience}
                                        </span>
                                        <span class="badge bg-light text-dark">
                                            <i class="bi bi-currency-rupee me-1"></i>${doctor.consultationFee}
                                        </span>
                                    </div>
                                    <button class="btn btn-sm btn-primary" onclick="startConsultation(${doctor.id})" ${!doctor.available ? 'disabled' : ''}>
                                        <i class="bi ${doctor.available ? 'bi-camera-video' : 'bi-clock'} me-1"></i>
                                        ${doctor.available ? 'Consult Now' : 'Not Available'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        doctorsList.innerHTML = doctorsHTML;
    }

    // Start consultation with a doctor
    function startConsultation(doctorId) {
        // In a real app, this would initiate a video call
        const consultationModal = new bootstrap.Modal(document.getElementById('consultationModal'));
        consultationModal.show();
        
        // Update the consultation modal with doctor details
        // This is a placeholder - in a real app, you would fetch doctor details by ID
        document.getElementById('consultationDoctorName').textContent = 'Dr. Rajesh Kumar';
        document.getElementById('consultationSpecialty').textContent = 'Plant Pathology';
    }

    // Initialize event listeners for doctor search
    function initDoctorSearch() {
        const searchInput = document.getElementById('doctorSearchInput');
        const filters = ['specializationFilter', 'availabilityFilter', 'sortBy'];
        
        // Add input event for search
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', () => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(searchDoctors, 300);
            });
        }
        
        // Add change events for filters
        filters.forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) {
                element.addEventListener('change', searchDoctors);
            }
        });
    }

    // Call this function when the page loads
    document.addEventListener('DOMContentLoaded', () => {
        initDoctorSearch();
        // Initial load
        searchDoctors();
    });

    // Run simulation with form data
    function runSimulation(event) {
        event.preventDefault();
        
        // Get form values
        const formData = {
            cropType: document.getElementById('cropType').value,
            location: document.getElementById('location').value,
            locationLat: document.getElementById('locationLat').value,
            locationLng: document.getElementById('locationLng').value,
            temperature: document.getElementById('temperature').value,
            humidity: document.getElementById('humidity').value,
            soilMoisture: document.getElementById('soilMoisture').value,
            soilPh: document.getElementById('soilPh').value
        };
        
        // Validate required fields
        if (!formData.cropType) {
            showAlert('Please select a crop type', 'danger');
            return;
        }
        
        // Show loading state
        const runButton = document.getElementById('runSimulation');
        const originalButtonText = runButton.innerHTML;
        runButton.disabled = true;
        runButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Running...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            try {
                // Process simulation (replace with actual logic)
                const score = calculateScore(formData);
                const recommendations = generateRecommendations(formData, score);
                
                // Display results
                displayResults(score, recommendations);
                
                // Scroll to results
                document.getElementById('simulationResults').scrollIntoView({ behavior: 'smooth' });
                
            } catch (error) {
                console.error('Simulation error:', error);
                showAlert('An error occurred during simulation. Please try again.', 'danger');
            } finally {
                // Reset button state
                runButton.disabled = false;
                runButton.innerHTML = originalButtonText;
            }
        }, 1500); // Simulate network delay
    }
    
    // Calculate simulation score (0-100)
    function calculateScore(data) {
        let score = 70; // Base score
        
        // Adjust score based on parameters
        const temp = parseFloat(data.temperature);
        const humidity = parseFloat(data.humidity);
        const soilMoisture = parseFloat(data.soilMoisture);
        const soilPh = parseFloat(data.soilPh);
        
        // Temperature scoring (optimal: 20-30°C)
        if (temp >= 20 && temp <= 30) score += 10;
        else if (temp < 10 || temp > 40) score -= 20;
        
        // Humidity scoring (optimal: 40-70%)
        if (humidity >= 40 && humidity <= 70) score += 10;
        else if (humidity > 90 || humidity < 20) score -= 10;
        
        // Soil moisture scoring (optimal: 40-80%)
        if (soilMoisture >= 40 && soilMoisture <= 80) score += 10;
        else if (soilMoisture < 20 || soilMoisture > 90) score -= 10;
        
        // Soil pH scoring (optimal: 5.5-7.5)
        if (soilPh >= 5.5 && soilPh <= 7.5) score += 10;
        else if (soilPh < 4 || soilPh > 9) score -= 10;
        
        // Ensure score is within 0-100 range
        return Math.min(100, Math.max(0, Math.round(score)));
    }
    
    // Generate recommendations based on simulation results
    function generateRecommendations(data, score) {
        const recommendations = [];
        const temp = parseFloat(data.temperature);
        const humidity = parseFloat(data.humidity);
        const soilMoisture = parseFloat(data.soilMoisture);
        const soilPh = parseFloat(data.soilPh);
        
        // Temperature recommendations
        if (temp < 10) recommendations.push("Temperature is too low for most crops. Consider using greenhouses or cold frames.");
        else if (temp > 35) recommendations.push("High temperature alert! Consider providing shade or increasing irrigation.");
        
        // Humidity recommendations
        if (humidity > 80) recommendations.push("High humidity detected. Improve ventilation to prevent fungal diseases.");
        else if (humidity < 30) recommendations.push("Low humidity detected. Consider using mulch to retain soil moisture.");
        
        // Soil moisture recommendations
        if (soilMoisture < 30) recommendations.push("Soil is too dry. Increase irrigation.");
        else if (soilMoisture > 80) recommendations.push("Soil is waterlogged. Improve drainage.");
        
        // Soil pH recommendations
        if (soilPh < 5.5) recommendations.push("Soil is too acidic. Consider adding lime to raise pH.");
        else if (soilPh > 7.5) recommendations.push("Soil is too alkaline. Consider adding sulfur or organic matter to lower pH.");
        
        // Add general recommendations based on score
        if (score >= 80) {
            recommendations.unshift("Excellent conditions for " + data.cropType + "!");
        } else if (score >= 60) {
            recommendations.unshift("Good conditions for " + data.cropType + " with some room for improvement.");
        } else {
            recommendations.unshift("Conditions are suboptimal for " + data.cropType + ". Please review the recommendations below.");
        }
        
        return recommendations;
    }
    
    // Display simulation results
    function displayResults(score, recommendations) {
        const resultsContainer = document.getElementById('simulationResults');
        
        // Determine score class for styling
        let scoreClass = 'text-danger';
        if (score >= 80) scoreClass = 'text-success';
        else if (score >= 60) scoreClass = 'text-warning';
        
        // Create results HTML
        let html = `
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-light">
                    <h5 class="mb-0">Simulation Results</h5>
                </div>
                <div class="card-body">
                    <div class="text-center mb-4">
                        <div class="d-inline-block position-relative">
                            <div class="progress-circle progress-${Math.round(score)}">
                                <span class="progress-left">
                                    <span class="progress-bar border-${scoreClass}"></span>
                                </span>
                                <span class="progress-right">
                                    <span class="progress-bar border-${scoreClass}"></span>
                                </span>
                                <div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                                    <div class="h2 fw-bold ${scoreClass}">${score}<small class="fs-6">%</small></div>
                                </div>
                            </div>
                            <h5 class="mt-3">Crop Suitability Score</h5>
                        </div>
                    
                    <div class="recommendations mt-4">
                        <h5>Recommendations</h5>
                        <ul class="list-group">
                            ${recommendations.map(rec => `
                                <li class="list-group-item d-flex">
                                    <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                                    <span>${rec}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="mt-4">
                        <button class="btn btn-outline-primary me-2" id="saveResults">
                            <i class="bi bi-download me-2"></i>Save Results
                        </button>
                        <button class="btn btn-outline-secondary" id="shareResults">
                            <i class="bi bi-share me-2"></i>Share
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add CSS for circular progress
        const style = document.createElement('style');
        style.textContent = `
            .progress-circle {
                width: 150px;
                height: 150px;
                line-height: 150px;
                background: none;
                margin: 0 auto;
                box-shadow: none;
                position: relative;
            }
            .progress-circle:after {
                content: "";
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 12px solid #f0f0f0;
                position: absolute;
                top: 0;
                left: 0;
            }
            .progress-circle > span {
                width: 50%;
                height: 100%;
                overflow: hidden;
                position: absolute;
                top: 0;
                z-index: 1;
            }
            .progress-circle .progress-bar {
                width: 100%;
                height: 100%;
                background: none;
                border-width: 12px;
                border-style: solid;
                position: absolute;
                top: 0;
                border-color: #0d6efd;
            }
            .progress-circle .progress-left {
                left: 0;
            }
            .progress-circle .progress-right {
                right: 0;
            }
            .progress-circle .progress-right {
                transform: rotate(180deg);
                transform-origin: left center;
            }
            .progress-circle .progress-value {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
            }
            @keyframes loading-50 {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(180deg); }
            }
            @keyframes loading-100 {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .progress-circle[class*="progress-"] .progress-right .progress-bar {
                animation: loading-50 1.5s linear forwards 1.5s;
            }
            .progress-circle[class*="progress-"] .progress-left .progress-bar {
                animation: loading-100 1.5s linear forwards;
            }
        `;
        
        // Update results container
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(style);
        resultsContainer.insertAdjacentHTML('beforeend', html);
        
        // Add event listeners for action buttons
        document.getElementById('saveResults')?.addEventListener('click', saveResults);
        document.getElementById('shareResults')?.addEventListener('click', shareResults);
    }
    
    // Save results (placeholder function)
    function saveResults() {
        showAlert('Save functionality will be implemented in the next update!', 'info');
    }
    
    // Share results (placeholder function)
    function shareResults() {
        if (navigator.share) {
            navigator.share({
                title: 'Crop Simulation Results',
                text: 'Check out my crop simulation results!',
                url: window.location.href
            }).catch(console.error);
        } else {
            showAlert('Web Share API not supported in your browser', 'warning');
        }
    }
    
    // Show alert message
    function showAlert(message, type = 'info') {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        // Add alert to the top of the modal content
        const modalBody = document.querySelector('#bioClimateModal .modal-body');
        if (modalBody) {
            modalBody.insertAdjacentHTML('afterbegin', alertHtml);
            
            // Auto-remove alert after 5 seconds
            setTimeout(() => {
                const alert = document.querySelector('.alert');
                if (alert) {
                    const bsAlert = new bootstrap.Alert(alert);
                    bsAlert.close();
                }
            }, 5000);
        }
    }
    
    // Public API
    return {
        init,
        modules,
        config
    };
})();

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('bioClimateModal') || document.getElementById('cropCalendarForm')) {
        AgriSage.init();
    }
});
