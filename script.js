document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const tabLinks = document.querySelectorAll('.main-nav a');
    const tabContents = document.querySelectorAll('.tab-content');
    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');
    const recentScans = document.getElementById('recentScans');
    const analysisResults = document.getElementById('analysisResults');
    const resultsContainer = document.querySelector('.results-container');
    const mentorChat = document.getElementById('mentorChat');
    const userMessageInput = document.getElementById('userMessage');
    
    let currentFile = null;
    let currentDisease = null;

    // Disease database with comprehensive information
    const diseaseDatabase = {
        // Fungal Diseases
        'powdery_mildew': {
            name: 'Powdery Mildew',
            type: 'Fungus',
            species: 'Erysiphe spp., Podosphaera spp.',
            confidence: 92,
            treatment: [
                'Apply sulfur or neem oil fungicide',
                'Remove and destroy infected leaves',
                'Improve air circulation',
                'Use potassium bicarbonate spray'
            ],
            prevention: [
                'Plant resistant varieties',
                'Ensure proper spacing',
                'Avoid overhead watering',
                'Apply compost tea regularly'
            ],
            remedies: [
                'Baking soda + water + neem oil spray',
                'Milk and water (1:2 ratio)',
                'Garlic extract solution',
                'Compost tea foliar spray'
            ],
            genomics: {
                pathogenType: 'Fungus',
                species: 'Erysiphe spp., Podosphaera spp.',
                genomeRef: 'NCBI Accession: GCA_000349005.1',
                resistanceMarkers: ['Pm genes (Pm1-Pm60) in wheat', 'mlo gene in barley'],
                susceptibilityFactors: ['High humidity', 'Moderate temperatures', 'Poor air circulation', 'Dense foliage']
            },
            biologicalControls: [
                'Trichoderma harzianum (soil drench)',
                'Bacillus subtilis (foliar spray)',
                'Ampelomyces quisqualis (commercial product: AQ10)',
                'Garlic extract (foliar application)'
            ]
        },
        
        // Bacterial Diseases
        'bacterial_blight': {
            name: 'Bacterial Blight',
            type: 'Bacteria',
            species: 'Xanthomonas spp., Pseudomonas spp.',
            confidence: 88,
            treatment: [
                'Apply copper-based bactericides',
                'Remove and destroy infected plants',
                'Avoid overhead irrigation',
                'Use streptomycin spray (where approved)'
            ],
            prevention: [
                'Use disease-free seeds',
                'Practice crop rotation',
                'Avoid working in wet fields',
                'Disinfect tools regularly'
            ],
            remedies: [
                'Copper sulfate spray',
                'Garlic extract solution',
                'Compost tea application',
                'Neem oil + baking soda mix'
            ],
            genomics: {
                pathogenType: 'Bacteria',
                species: 'Xanthomonas spp., Pseudomonas spp.',
                genomeRef: 'NCBI Accession: GCA_000007245.1',
                resistanceMarkers: ['Xa genes in rice', 'Bs2 in pepper', 'Rxo1 in maize'],
                susceptibilityFactors: ['Warm, wet conditions', 'Plant wounds', 'High nitrogen levels', 'Poor drainage']
            },
            biologicalControls: [
                'Bacillus subtilis (Serenade, Cease)',
                'Pseudomonas fluorescens (foliar spray)',
                'Streptomyces lydicus (Actinovate)',
                'Bacillus amyloliquefaciens (Double Nickel)'
            ]
        },
        
        // Viral Diseases
        'tobacco_mosaic': {
            name: 'Tobacco Mosaic Virus',
            type: 'Virus',
            species: 'Tobamovirus',
            confidence: 95,
            treatment: [
                'Remove and destroy infected plants',
                'Disinfect tools with 10% bleach solution',
                'Control insect vectors',
                'Avoid tobacco use near plants'
            ],
            prevention: [
                'Use virus-free seeds and transplants',
                'Wash hands before handling plants',
                'Control weeds that may harbor the virus',
                'Use resistant varieties when available'
            ],
            remedies: [
                'Milk spray (10% solution)',
                'Garlic extract solution',
                'Neem oil for vector control',
                'Seaweed extract to boost plant immunity'
            ],
            genomics: {
                pathogenType: 'Virus',
                species: 'Tobamovirus',
                genomeRef: 'NCBI Accession: NC_001367.1',
                resistanceMarkers: ['N gene in tobacco', 'Tm-2² in tomato'],
                susceptibilityFactors: ['Mechanical transmission', 'Insect vectors', 'Contaminated tools', 'Infected plant debris']
            },
            biologicalControls: [
                'Beneficial nematodes for insect vectors',
                'Beauveria bassiana for whiteflies',
                'Neem oil for thrips control',
                'Garlic-pepper spray repellent'
            ]
        }
    };

    // Tab Switching Functionality
    function switchTab(tabId) {
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all tab links
        tabLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show the selected tab content
        document.getElementById(tabId).classList.add('active');
        
        // Add active class to the clicked tab link
        document.querySelector(`.main-nav a[data-tab="${tabId}"]`).classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Add click event listeners to tab links
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // File Upload and Drag & Drop Functionality
    if (dropZone) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });
        
        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });
        
        // Handle dropped files
        dropZone.addEventListener('drop', handleDrop, false);
        
        // Handle file input change
        fileInput.addEventListener('change', handleFileSelect, false);
    }

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropZone.classList.add('dragover');
    }

    function unhighlight() {
        dropZone.classList.remove('dragover');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFileSelect() {
        const files = this.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                analyzeImage(file);
            } else {
                showError('Please upload an image file (JPEG, PNG, etc.)');
            }
        }
    }

    // Image Analysis Function
    async function analyzeImage(file) {
        try {
            // Show loading state
            dropZone.innerHTML = `
                <div class="loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Analyzing image...</p>
                </div>
            `;
            
            // In a real app, you would upload the image to your server here
            // For this example, we'll simulate an API call with a timeout
            const analysisResult = await simulateImageAnalysis(file);
            
            // Save to recent scans
            saveToRecentScans(file, analysisResult);
            
            // Display results
            displayAnalysisResults(analysisResult);
            
        } catch (error) {
            console.error('Error analyzing image:', error);
            showError('Error analyzing image. Please try again.');
            resetUploadArea();
        }
    }

    // Simulate image analysis (replace with actual API call)
    function simulateImageAnalysis(file) {
        return new Promise((resolve) => {
            // Create a preview of the uploaded image
            const reader = new FileReader();
            reader.onload = function(e) {
                // Simulate API delay
                setTimeout(() => {
                    // Mock analysis results
                    const mockResults = {
                        status: 'success',
                        disease: {
                            name: 'Early Blight',
                            scientificName: 'Alternaria solani',
                            confidence: 87,
                            severity: 'Moderate',
                            description: 'Early blight is a common fungal disease that affects tomatoes and potatoes. It causes dark spots with concentric rings on leaves, which can lead to defoliation and reduced yield.',
                            symptoms: [
                                'Small, dark brown to black spots on leaves',
                                'Concentric rings in the spots, giving a target-like appearance',
                                'Yellowing of leaves around the spots',
                                'Spots may merge, causing entire leaves to turn yellow and die'
                            ]
                        },
                        recommendations: {
                            chemical: [
                                'Apply chlorothalonil or copper-based fungicides as a preventive measure',
                                'Use mancozeb or maneb as protectant fungicides',
                                'Apply fungicides every 7-14 days during favorable conditions'
                            ],
                            biological: [
                                'Apply biofungicides containing Bacillus subtilis or Trichoderma species',
                                'Use compost tea or other organic fungicides',
                                'Apply neem oil as a natural fungicide'
                            ],
                            cultural: [
                                'Remove and destroy infected plant debris',
                                'Practice crop rotation (avoid planting tomatoes or potatoes in the same area for 2-3 years)',
                                'Ensure proper plant spacing for good air circulation',
                                'Water at the base of plants to keep foliage dry',
                                'Use mulch to prevent soil from splashing onto leaves'
                            ]
                        },
                        prevention: [
                            'Choose disease-resistant varieties when available',
                            'Avoid overhead irrigation',
                            'Stake plants to improve air circulation',
                            'Remove and destroy infected plant material at the end of the season',
                            'Maintain proper soil fertility and pH levels'
                        ],
                        image: reader.result
                    };
                    resolve(mockResults);
                }, 1500);
            };
            reader.readAsDataURL(file);
        });
    }

    // Display Analysis Results
    function displayAnalysisResults(results) {
        // Update the upload area to show the uploaded image
        dropZone.innerHTML = `
            <div class="upload-preview">
                <img src="${results.image}" alt="Uploaded plant" class="preview-image">
                <div class="preview-overlay">
                    <button class="btn btn-primary" onclick="document.getElementById('fileInput').click()">
                        <i class="fas fa-sync-alt"></i> Upload Another
                    </button>
                </div>
            </div>
        `;
        
        // Show analysis results section
        analysisResults.style.display = 'block';
        
        // Populate results
        resultsContainer.innerHTML = `
            <div class="result-summary">
                <div class="result-header">
                    <h3>${results.disease.name} <span class="scientific-name">(${results.disease.scientificName})</span></h3>
                    <span class="confidence-badge">${results.disease.confidence}% Confidence</span>
                </div>
                
                <div class="result-status">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Severity: <strong class="status-${results.disease.severity.toLowerCase()}">${results.disease.severity}</strong></span>
                </div>
                
                <div class="disease-description">
                    <p>${results.disease.description}</p>
                </div>
            </div>
            
            <div class="disease-details">
                <div class="detail-item">
                    <i class="fas fa-info-circle"></i>
                    <div>
                        <h4>Symptoms</h4>
                        <ul>
                            ${results.disease.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="detail-item">
                    <i class="fas fa-flask"></i>
                    <div>
                        <h4>Chemical Control</h4>
                        <ul>
                            ${results.recommendations.chemical.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="detail-item">
                    <i class="fas fa-leaf"></i>
                    <div>
                        <h4>Biological Control</h4>
                        <ul>
                            ${results.recommendations.biological.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="detail-item">
                    <i class="fas fa-shield-alt"></i>
                    <div>
                        <h4>Prevention</h4>
                        <ul>
                            ${results.prevention.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Scroll to results
        analysisResults.scrollIntoView({ behavior: 'smooth' });
    }

    // Save to Recent Scans
    function saveToRecentScans(file, analysisResult) {
        // In a real app, you would save this to local storage or a database
        const recentScans = JSON.parse(localStorage.getItem('recentScans') || '[]');
        
        const scanData = {
            id: Date.now(),
            fileName: file.name,
            date: new Date().toLocaleDateString(),
            disease: analysisResult.disease.name,
            confidence: analysisResult.disease.confidence,
            image: analysisResult.image,
            severity: analysisResult.disease.severity
        };
        
        // Add to beginning of array
        recentScans.unshift(scanData);
        
        // Keep only the last 5 scans
        if (recentScans.length > 5) {
            recentScans.pop();
        }
        
        // Save to local storage
        localStorage.setItem('recentScans', JSON.stringify(recentScans));
        
        // Update the UI
        updateRecentScansList();
    }

    // Update Recent Scans List
    function updateRecentScansList() {
        const scans = JSON.parse(localStorage.getItem('recentScans') || '[]');
        
        if (scans.length === 0) {
            recentScans.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-images"></i>
                    <p>No recent scans</p>
                </div>
            `;
            return;
        }
        
        recentScans.innerHTML = scans.map(scan => `
            <div class="scan-item" onclick="loadScan(${scan.id})">
                <img src="${scan.image}" alt="${scan.fileName}">
                <div class="scan-info">
                    <h4>${scan.disease}</h4>
                    <p>${scan.date} • ${scan.confidence}% confidence</p>
                </div>
            </div>
        `).join('');
    }

    // Load a previous scan
    function loadScan(scanId) {
        const scans = JSON.parse(localStorage.getItem('recentScans') || '[]');
        const scan = scans.find(s => s.id === scanId);
        
        if (scan) {
            // Populate the analysis results
            displayAnalysisResults({
                disease: {
                    name: scan.disease,
                    confidence: scan.confidence,
                    severity: scan.severity,
                    // Add mock data for other fields
                    scientificName: 'Alternaria solani',
                    description: 'This is a previously analyzed scan. Full details were only available during the original analysis.',
                    symptoms: ['Symptoms not saved in scan history']
                },
                recommendations: {
                    chemical: ['Chemical treatment details not saved in scan history'],
                    biological: ['Biological treatment details not saved in scan history']
                },
                prevention: ['Prevention details not saved in scan history'],
                image: scan.image
            });
            
            // Switch to AGRI Doctor tab
            switchTab('agri-doctor');
        }
    }

    // Reset Upload Area
    function resetUploadArea() {
        dropZone.innerHTML = `
            <i class="fas fa-upload"></i>
            <h3>Drag & Drop Plant Image</h3>
            <p>or</p>
            <button class="btn btn-primary" onclick="document.getElementById('fileInput').click()">
                Browse Files
            </button>
        `;
        
        // Re-attach event listeners
        setupDragAndDrop();
    }

    // Show Error Message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        // Insert before the upload area
        dropZone.parentNode.insertBefore(errorDiv, dropZone);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Mentor Chat Functionality
    if (mentorChat && userMessageInput) {
        // Add welcome message
        addBotMessage("Hello! I'm your AgriSage mentor. How can I assist you with your farming journey today?");
        
        // Handle Enter key in chat input
        userMessageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function sendMessage() {
        const message = userMessageInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addUserMessage(message);
        userMessageInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            addBotMessage(botResponse);
        }, 1000);
    }

    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        mentorChat.appendChild(messageDiv);
        mentorChat.scrollTop = mentorChat.scrollHeight;
    }

    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        mentorChat.appendChild(messageDiv);
        mentorChat.scrollTop = mentorChat.scrollHeight;
    }

    function generateBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! I'm your AgriSage mentor. How can I assist you with your farming journey today?";
        } else if (lowerMessage.includes('scheme') || lowerMessage.includes('funding') || lowerMessage.includes('subsidy')) {
            return "I can help you find suitable government schemes. Here are some popular ones:\n\n1. PM Kisan Samman Nidhi - ₹6,000/year for all farmers\n2. PM Fasal Bima Yojana - Crop insurance\n3. Soil Health Card Scheme\n\nWould you like more details on any of these or help finding schemes you qualify for?";
        } else if (lowerMessage.includes('land') || lowerMessage.includes('lease') || lowerMessage.includes('buy')) {
            return "I can help you find agricultural land. The Land Explorer can show you available government and private agricultural lands in your area. Would you like to check the Land Explorer now?";
        } else if (lowerMessage.includes('crop') || lowerMessage.includes('plant') || lowerMessage.includes('grow')) {
            return "For crop-related advice, I recommend using our AGRI Doctor feature to analyze plant health issues. You can also ask me about:\n\n• Best crops for your region\n• Seasonal planting guides\n• Crop rotation advice\n\nWhat specific crop are you interested in?";
        } else if (lowerMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else {
            return "I'm here to help with all your agricultural needs. You can ask me about:\n\n• Government schemes and funding\n• Finding agricultural land\n• Crop advice and best practices\n• Connecting with experts\n\nWhat would you like to know more about?";
        }
    }

    // Show Section in AgriSage
    function showSection(sectionId) {
        // In a real app, this would load the appropriate section content
        switch(sectionId) {
            case 'schemes':
                addBotMessage("Let me help you find suitable government schemes. You can browse available schemes by category or eligibility criteria.");
                break;
            case 'land':
                addBotMessage("The Land Explorer helps you find agricultural land. You can filter by location, size, and type of land.");
                break;
            case 'experts':
                addBotMessage("I can help you connect with agricultural experts in your area. Would you like to find plant pathologists, soil scientists, or other specialists?");
                break;
            case 'tracker':
                addBotMessage("The Action Tracker helps you manage your farming business. You can track your progress from idea to scaling up.");
                break;
        }
    }

    // Initialize the application
    function init() {
        // Load recent scans
        updateRecentScansList();
        
        // Show home tab by default
        switchTab('home');
    }

    // Run initialization when DOM is loaded
    document.addEventListener('DOMContentLoaded', init);

    // Main JavaScript file to handle navigation between Agrognosis and AgriSage sections, and initialize the application.
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize the application
        initApp();
    });

    function initApp() {
        // Add event listeners for navigation
        document.getElementById('startAgrognosis').addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('agrognosis');
        });

        document.getElementById('startAgriSage').addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('agrisage');
        });

        // Add animation to cards after page load
        setTimeout(() => {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
            });
        }, 100);
    }

    function navigateTo(section) {
        // Show loading state
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
        });

        // Simulate loading delay (in a real app, this would be an API call)
        setTimeout(() => {
            // Store the selected section in session storage
            sessionStorage.setItem('selectedSection', section);
            
            // Redirect to the appropriate page
            if (section === 'agrognosis') {
                window.location.href = 'agrognosis.html';
            } else if (section === 'agrisage') {
                window.location.href = 'agrisage.html';
            }
        }, 1000);
    }

    // Add smooth scrolling for anchor links
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

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate-fade-in');
            }
        });
    };

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);

    // Initial check in case elements are already in view
    animateOnScroll();

    // Add a simple notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
        notification.role = 'alert';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Example usage:
    // showNotification('Welcome to AGRI DOC!', 'success');
});
