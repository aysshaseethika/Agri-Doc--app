document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const imageUpload = document.getElementById('imageUpload');
    const uploadArea = document.getElementById('uploadArea');
    const previewSection = document.getElementById('previewSection');
    const imagePreview = document.getElementById('imagePreview');
    const removeImageBtn = document.getElementById('removeImage');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsSection = document.getElementById('resultsSection');
    const diseaseResult = document.getElementById('diseaseResult');
    const bioClimateSection = document.getElementById('bioClimateSection');
    const recommendedActions = document.getElementById('recommendedActions');

    // Handle image upload
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                uploadArea.classList.add('d-none');
                previewSection.classList.remove('d-none');
                resultsSection.classList.add('d-none');
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle remove image
    removeImageBtn.addEventListener('click', function() {
        imageUpload.value = '';
        previewSection.classList.add('d-none');
        uploadArea.classList.remove('d-none');
        resultsSection.classList.add('d-none');
    });

    // Handle analyze button click
    analyzeBtn.addEventListener('click', function() {
        if (!imageUpload.files[0]) return;
        
        // Show loading state
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Analyzing...';

        // Simulate API call
        setTimeout(() => {
            analyzePlantDisease(imageUpload.files[0]);
        }, 1500);
    });

    // Function to analyze plant disease
    function analyzePlantDisease(imageFile) {
        // In a real app, this would be an API call to your backend
        // For demo purposes, we'll use mock data with multiple diseases
        
        // Database of plant diseases with detailed information
        const diseaseDatabase = {
            'powdery_mildew': {
                name: "Powdery Mildew",
                scientificName: "Erysiphe cichoracearum",
                description: "A fungal disease that affects a wide range of plants, appearing as white powdery spots on leaves and stems.",
                affectedParts: ["Leaves", "Stems", "Buds", "Shoots", "Fruits"],
                severity: "Moderate",
                symptoms: {
                    description: "White or grayish powdery spots that appear on leaves, stems, and sometimes flowers and fruits.",
                    visualCues: [
                        "White, powdery fungal growth on upper leaf surfaces",
                        "Yellowing and curling of infected leaves",
                        "Distorted or stunted growth",
                        "Premature leaf drop",
                        "Reduced fruit yield and quality"
                    ],
                    conditions: [
                        "Thrives in warm (60-80°F), dry climates",
                        "High humidity (but not wet leaves) promotes growth",
                        "Poor air circulation encourages development",
                        "Shaded areas are more susceptible"
                    ]
                },
                chemicalControl: {
                    description: "Fungicides can be effective when applied at the right time and used as part of an integrated management approach.",
                    products: [
                        {
                            name: "Sulfur-based fungicides",
                            application: "Apply every 7-14 days when conditions favor disease development",
                            notes: "Do not use when temperatures exceed 85°F (29°C) to avoid plant damage"
                        },
                        {
                            name: "Potassium bicarbonate",
                            application: "Mix 1 tablespoon per gallon of water, apply weekly",
                            notes: "Organic option, works by raising pH on leaf surface"
                        },
                        {
                            name: "Neem oil",
                            application: "Mix 2 tablespoons per gallon of water, apply every 7-14 days",
                            notes: "Best used as a preventative measure"
                        }
                    ],
                    safety: [
                        "Always read and follow label instructions",
                        "Wear protective clothing and equipment",
                        "Avoid application during hot, sunny periods",
                        "Rotate chemical classes to prevent resistance"
                    ]
                },
                biologicalControl: {
                    description: "Biological control methods can help manage powdery mildew while being environmentally friendly.",
                    methods: [
                        {
                            name: "Bacillus subtilis",
                            description: "A beneficial bacteria that competes with the fungus",
                            application: "Apply as a foliar spray according to product label"
                        },
                        {
                            name: "Ampelomyces quisqualis",
                            description: "A fungus that parasitizes powdery mildew",
                            application: "Apply preventatively or at first sign of disease"
                        },
                        {
                            name: "Milk solution",
                            description: "Diluted milk has been shown to be effective against powdery mildew",
                            application: "Mix 1 part milk with 2-3 parts water and apply weekly"
                        }
                    ]
                },
                prevention: {
                    culturalPractices: [
                        "Select resistant varieties when available",
                        "Ensure proper plant spacing for good air circulation",
                        "Water at the base of plants to keep foliage dry",
                        "Remove and destroy infected plant parts",
                        "Disinfect tools between plants to prevent spread"
                    ],
                    environmentalControl: [
                        "Maintain consistent moisture levels",
                        "Avoid overhead watering",
                        "Prune plants to improve air circulation",
                        "Use drip irrigation instead of sprinklers"
                    ],
                    monitoring: [
                        "Inspect plants regularly for early signs of disease",
                        "Check the undersides of leaves where powdery mildew often starts",
                        "Monitor weather conditions that favor disease development"
                    ]
                },
                additionalNotes: [
                    "Powdery mildew spores are spread by wind and can survive on plant debris",
                    "The disease is host-specific; different plants have different powdery mildew fungi",
                    "Nighttime temperatures between 60-70°F (15-21°C) are ideal for spore germination"
                ]
            },
            'late_blight': {
                name: "Late Blight",
                scientificName: "Phytophthora infestans",
                description: "A devastating disease of tomatoes and potatoes that can destroy entire crops quickly.",
                affectedParts: ["Leaves", "Stems", "Tubers", "Fruits"],
                severity: "High",
                symptoms: {
                    description: "Water-soaked lesions that turn brown and papery, often with white fungal growth on the underside of leaves during humid conditions.",
                    visualCues: [
                        "Dark, water-soaked spots on leaves that enlarge rapidly",
                        "White, cottony fungal growth on the underside of leaves in humid conditions",
                        "Brown to black lesions on stems and leaf petioles",
                        "Rapid wilting and death of entire plants",
                        "Dark, sunken lesions on tubers"
                    ],
                    conditions: [
                        "Cool, wet weather (60-80°F or 15-27°C) with high humidity",
                        "Extended periods of leaf wetness (10+ hours)",
                        "Poor air circulation in dense plantings",
                        "Successive days of overcast, rainy weather"
                    ]
                },
                chemicalControl: {
                    description: "Fungicides are most effective when used preventatively, before symptoms appear.",
                    products: [
                        {
                            name: "Chlorothalonil",
                            application: "Apply every 7-10 days during favorable disease conditions",
                            notes: "Protectant fungicide, must be applied before infection occurs"
                        },
                        {
                            name: "Copper-based fungicides",
                            application: "Apply every 7-10 days, starting before disease appears",
                            notes: "Organic option, works as a protectant"
                        },
                        {
                            name: "Famoxadone + Cymoxanil",
                            application: "Apply at first sign of disease, then every 7-10 days",
                            notes: "Systemic fungicide with both protective and curative activity"
                        }
                    ],
                    safety: [
                        "Wear protective clothing, gloves, and eye protection",
                        "Do not apply when bees are actively foraging",
                        "Observe pre-harvest intervals (PHI) specified on the label",
                        "Rotate fungicide classes to prevent resistance development"
                    ]
                },
                biologicalControl: {
                    description: "Biological options are limited but can be part of an integrated management program.",
                    methods: [
                        {
                            name: "Bacillus subtilis",
                            description: "A beneficial bacterium that can suppress fungal growth",
                            application: "Apply as a foliar spray every 7-14 days, starting before disease appears"
                        },
                        {
                            name: "Phosphite products",
                            description: "Stimulates the plant's natural defense mechanisms",
                            application: "Apply as a foliar spray or soil drench according to label instructions"
                        }
                    ]
                },
                prevention: {
                    culturalPractices: [
                        "Plant certified disease-free seed potatoes and transplants",
                        "Use resistant varieties when available",
                        "Destroy volunteer potato and tomato plants",
                        "Avoid working in fields when plants are wet",
                        "Remove and destroy infected plant material"
                    ],
                    environmentalControl: [
                        "Space plants to allow for good air circulation",
                        "Use drip irrigation instead of overhead watering",
                        "Orient rows to maximize air movement and sun exposure",
                        "Use plastic or organic mulch to reduce soil splash"
                    ],
                    monitoring: [
                        "Scout fields at least weekly during cool, wet weather",
                        "Use disease forecasting systems if available in your area",
                        "Be particularly vigilant after periods of cool, wet weather"
                    ]
                },
                additionalNotes: [
                    "Late blight was responsible for the Irish Potato Famine in the 1840s",
                    "The disease can spread rapidly under favorable conditions, destroying entire fields in days",
                    "Tubers can become infected and spread the disease if used as seed potatoes"
                ]
            },
            'bacterial_spot': {
                name: "Bacterial Spot",
                scientificName: "Xanthomonas spp.",
                description: "A common disease of tomatoes and peppers that causes spots on leaves, stems, and fruits.",
                affectedParts: ["Leaves", "Stems", "Fruits", "Petioles"],
                severity: "Moderate to High",
                symptoms: {
                    description: "Small, water-soaked spots that become necrotic with yellow halos, leading to defoliation and reduced yield.",
                    visualCues: [
                        "Small, dark, water-soaked spots on leaves (1-3mm in diameter)",
                        "Spots become necrotic with yellow halos",
                        "Leaves may yellow and drop prematurely",
                        "Raised, scabby lesions on fruits",
                        "Fruit cracking around lesions"
                    ],
                    conditions: [
                        "Warm temperatures (75-85°F or 24-29°C)",
                        "High humidity or leaf wetness",
                        "Frequent rainfall or overhead irrigation",
                        "Poor air circulation"
                    ]
                },
                chemicalControl: {
                    description: "Copper-based bactericides can help manage bacterial spot when used preventatively.",
                    products: [
                        {
                            name: "Copper hydroxide",
                            application: "Apply every 7-10 days starting before disease appears",
                            notes: "Works best when applied before infection occurs"
                        },
                        {
                            name: "Copper sulfate pentahydrate",
                            application: "Apply every 5-7 days during wet weather",
                            notes: "Can be phytotoxic in hot weather"
                        },
                        {
                            name: "Acibenzolar-S-methyl",
                            application: "Apply at first sign of disease, then every 7-14 days",
                            notes: "Plant activator that stimulates natural defense mechanisms"
                        }
                    ],
                    safety: [
                        "Wear protective clothing and eye protection",
                        "Do not apply when plants are under drought stress",
                        "Avoid application during hot, sunny conditions",
                        "Obsect pre-harvest intervals"
                    ]
                },
                biologicalControl: {
                    description: "Biological control options can help reduce disease pressure when used as part of an integrated program.",
                    methods: [
                        {
                            name: "Bacillus amyloliquefaciens",
                            description: "A beneficial bacterium that competes with the pathogen",
                            application: "Apply as a foliar spray every 7-14 days, starting before disease appears"
                        },
                        {
                            name: "Streptomyces lydicus",
                            description: "A soil-dwelling bacterium that produces antifungal compounds",
                            application: "Apply as a soil drench or foliar spray according to label"
                        }
                    ]
                },
                prevention: {
                    culturalPractices: [
                        "Use certified disease-free seed and transplants",
                        "Select resistant varieties when available",
                        "Rotate crops away from solanaceous plants for 2-3 years",
                        "Remove and destroy infected plant debris"
                    ],
                    environmentalControl: [
                        "Use drip irrigation instead of overhead watering",
                        "Water early in the day to allow foliage to dry quickly",
                        "Space plants to promote good air circulation",
                        "Use plastic or organic mulch to reduce soil splash"
                    ],
                    monitoring: [
                        "Inspect plants regularly, especially during warm, wet weather",
                        "Look for symptoms on the undersides of leaves",
                        "Monitor weather conditions that favor disease development"
                    ]
                },
                additionalNotes: [
                    "Bacterial spot can survive in plant debris for up to a year",
                    "The bacteria can be seedborne or survive on volunteer plants",
                    "High nitrogen fertilization can increase disease severity"
                ]
            },
            'fusarium_wilt': {
                name: "Fusarium Wilt",
                scientificName: "Fusarium oxysporum",
                description: "A soilborne fungal disease that causes wilting and yellowing of plants, often affecting one side of the plant first.",
                affectedParts: ["Roots", "Vascular System", "Stems", "Leaves"],
                severity: "High",
                symptoms: {
                    description: "Yellowing and wilting of lower leaves that progresses upward, often affecting one side of the plant more than the other.",
                    visualCues: [
                        "Yellowing and wilting of lower leaves that progresses upward",
                        "Brown discoloration of the vascular tissue in stems",
                        "Stunted growth and reduced yield",
                        "Plant death in severe cases",
                        "One-sided wilting (affecting one branch or side of the plant)"
                    ],
                    conditions: [
                        "Warm soil temperatures (75-85°F or 24-29°C)",
                        "Low soil moisture",
                        "Acidic soil conditions",
                        "Poor soil drainage"
                    ]
                },
                chemicalControl: {
                    description: "Chemical control options for Fusarium wilt are limited, and prevention is the best approach.",
                    products: [
                        {
                            name: "Fludioxonil",
                            application: "Apply as a soil drench at planting",
                            notes: "Helps protect roots from infection"
                        },
                        {
                            name: "Mefenoxam",
                            application: "Apply as a soil drench or through drip irrigation",
                            notes: "Effective against some Fusarium species"
                        },
                        {
                            name: "Azoxystrobin",
                            application: "Apply as a soil drench at planting",
                            notes: "Can help reduce disease pressure"
                        }
                    ],
                    safety: [
                        "Follow all label instructions carefully",
                        "Wear appropriate protective equipment",
                        "Rotate chemical classes to prevent resistance",
                        "Be aware of pre-harvest intervals"
                    ]
                },
                biologicalControl: {
                    description: "Biological control can be an important part of managing Fusarium wilt in an integrated program.",
                    methods: [
                        {
                            name: "Trichoderma harzianum",
                            description: "A beneficial fungus that competes with and parasitizes Fusarium",
                            application: "Apply to soil at planting or as a root dip for transplants"
                        },
                        {
                            name: "Bacillus subtilis",
                            description: "A beneficial bacterium that produces antifungal compounds",
                            application: "Apply as a soil drench or root dip"
                        },
                        {
                            name: "Mycorrhizal fungi",
                            description: "Form symbiotic relationships with plant roots, improving plant health and disease resistance",
                            application: "Apply to roots at planting"
                        }
                    ]
                },
                prevention: {
                    culturalPractices: [
                        "Plant resistant varieties when available",
                        "Use certified disease-free seed and transplants",
                        "Practice crop rotation (4+ years away from susceptible crops)",
                        "Remove and destroy infected plants"
                    ],
                    environmentalControl: [
                        "Maintain soil pH between 6.5-7.0",
                        "Improve soil drainage with organic matter",
                        "Avoid overwatering",
                        "Solarize soil in hot summer months"
                    ],
                    monitoring: [
                        "Watch for early symptoms, especially in warm weather",
                        "Test soil for Fusarium levels before planting",
                        "Monitor soil moisture and temperature"
                    ]
                },
                additionalNotes: [
                    "Fusarium can survive in soil for many years as chlamydospores",
                    "The disease is often introduced on contaminated tools, equipment, or soil",
                    "Some races of Fusarium are specific to certain plant species or varieties"
                ]
            }
        };
        
        // For demo purposes, randomly select a disease from our database
        // In a real app, this would be determined by image analysis
        const diseaseKeys = Object.keys(diseaseDatabase);
        const randomDiseaseKey = diseaseKeys[Math.floor(Math.random() * diseaseKeys.length)];
        const selectedDisease = diseaseDatabase[randomDiseaseKey];

        // Prepare the mock response
        const mockResponse = {
            success: true,
            disease: selectedDisease,
            recommendations: [
                `Remove and destroy infected ${selectedDisease.affectedParts.join(' and ')} immediately`,
                `Apply appropriate fungicide as a preventive measure`,
                `Improve air circulation around plants by proper spacing`,
                `Avoid overhead watering to keep foliage dry`,
                `Consider using resistant varieties for future plantings`
            ],
            bioClimate: {
                riskLevel: selectedDisease.severity,
                germinationWindow: "12-72 hours",
                peakInfectionTime: "3-7 days",
                affectedAreas: selectedDisease.affectedParts,
                favorableConditions: selectedDisease.symptoms.conditions
            }
        };

        // Display results
        displayResults(mockResponse);
    }

    // Function to display analysis results
    function displayResults(data) {
        // Update disease result
        diseaseResult.innerHTML = `
            <div class="alert ${getSeverityClass(data.disease.severity)} mb-4">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="alert-heading mb-0">Detected: ${data.disease.name} <small class="text-muted">${data.disease.scientificName}</small></h5>
                    <span class="badge bg-${getSeverityBadgeClass(data.disease.severity)}">
                        Confidence: ${data.disease.confidence}%
                    </span>
                </div>
                <hr>
                <p class="mb-2">${data.disease.description}</p>
                <p class="mb-1"><strong>Affected Parts:</strong> ${data.disease.affectedParts.join(', ')}</p>
                <p class="mb-0"><strong>Severity:</strong> ${data.disease.severity}</p>
                
                <!-- Symptoms Section -->
                <div class="mt-3">
                    <h6><i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>Symptoms</h6>
                    <p>${data.disease.symptoms.description}</p>
                    <ul class="mb-2">
                        ${data.disease.symptoms.visualCues.map(cue => `<li>${cue}</li>`).join('')}
                    </ul>
                    <p class="mb-1"><strong>Favorable Conditions:</strong></p>
                    <ul class="mb-0">
                        ${data.disease.symptoms.conditions.map(condition => `<li>${condition}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <!-- Chemical Control Section -->
            <div class="card mb-4">
                <div class="card-header bg-light">
                    <h5 class="mb-0"><i class="bi bi-droplet-fill text-primary me-2"></i>Chemical Control</h5>
                </div>
                <div class="card-body">
                    <p>${data.disease.chemicalControl.description}</p>
                    <div class="row">
                        ${data.disease.chemicalControl.products.map(product => `
                            <div class="col-md-6 mb-3">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h6 class="card-title">${product.name}</h6>
                                        <p class="card-text small">${product.application}</p>
                                        <p class="card-text small text-muted">${product.notes}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="alert alert-warning mt-3">
                        <h6><i class="bi bi-exclamation-triangle-fill me-2"></i>Safety Precautions</h6>
                        <ul class="mb-0">
                            ${data.disease.chemicalControl.safety.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Biological Control Section -->
            <div class="card mb-4">
                <div class="card-header bg-light">
                    <h5 class="mb-0"><i class="bi bi-flower1 text-success me-2"></i>Biological Control</h5>
                </div>
                <div class="card-body">
                    <p>${data.disease.biologicalControl.description}</p>
                    <div class="row">
                        ${data.disease.biologicalControl.methods.map(method => `
                            <div class="col-md-6 mb-3">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h6 class="card-title">${method.name}</h6>
                                        <p class="card-text small">${method.description}</p>
                                        <p class="card-text small text-muted"><strong>Application:</strong> ${method.application}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Prevention Section -->
            <div class="card mb-4">
                <div class="card-header bg-light">
                    <h5 class="mb-0"><i class="bi bi-shield-check-fill text-info me-2"></i>Prevention</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h6>Cultural Practices</h6>
                            <ul>
                                ${data.disease.prevention.culturalPractices.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6>Environmental Control</h6>
                            <ul>
                                ${data.disease.prevention.environmentalControl.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="mt-3">
                        <h6>Monitoring</h6>
                        <ul>
                            ${data.disease.prevention.monitoring.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Additional Notes -->
            ${data.disease.additionalNotes && data.disease.additionalNotes.length > 0 ? `
                <div class="alert alert-info">
                    <h6><i class="bi bi-info-circle-fill me-2"></i>Additional Notes</h6>
                    <ul class="mb-0">
                        ${data.disease.additionalNotes.map(note => `<li>${note}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        `;
        
        // Update bio-climate simulation
        bioClimateSection.innerHTML = `
            <div class="row">
                <div class="col-md-6 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Risk Level</h6>
                            <h3 class="card-title text-${getSeverityTextClass(data.bioClimate.riskLevel)}">
                                ${data.bioClimate.riskLevel} Risk
                            </h3>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar bg-${getSeverityBadgeClass(data.bioClimate.riskLevel)}" 
                                     role="progressbar" 
                                     style="width: ${data.disease.confidence}%" 
                                     aria-valuenow="${data.disease.confidence}" 
                                     aria-valuemin="0" 
                                     aria-valuemax="100">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Infection Timeline</h6>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Now</span>
                                <span>${data.bioClimate.peakInfectionTime}</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar bg-warning" role="progressbar" style="width: 100%"></div>
                            </div>
                            <div class="d-flex justify-content-between mt-2 small text-muted">
                                <span>Germination: ${data.bioClimate.germinationWindow}</span>
                                <span>Peak: ${data.bioClimate.peakInfectionTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="alert alert-info">
                <i class="bi bi-info-circle-fill me-2"></i>
                Based on current conditions, the disease is expected to reach peak infection in ${data.bioClimate.peakInfectionTime}.
            </div>
        `;

        // Update recommended actions
        recommendedActions.innerHTML = `
            <ul class="list-group list-group-flush">
                ${data.recommendations.map(action => `
                    <li class="list-group-item d-flex align-items-center">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        ${action}
                    </li>
                `).join('')}
            </ul>
            <div class="card-footer text-center">
                <button class="btn btn-outline-primary me-2">
                    <i class="bi bi-share me-1"></i> Share Report
                </button>
                <button class="btn btn-primary">
                    <i class="bi bi-calendar-plus me-1"></i> Add to Calendar
                </button>
            </div>
        `;

        // Show results section
        resultsSection.classList.remove('d-none');
        
        // Reset analyze button
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="bi bi-search me-2"></i>Re-analyze Plant';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Helper functions
    function getSeverityClass(severity) {
        const severityMap = {
            'Low': 'alert-success',
            'Moderate': 'alert-warning',
            'High': 'alert-danger'
        };
        return severityMap[severity] || 'alert-info';
    }

    function getSeverityBadgeClass(severity) {
        const severityMap = {
            'Low': 'success',
            'Moderate': 'warning',
            'High': 'danger'
        };
        return severityMap[severity] || 'info';
    }

    function getSeverityTextClass(severity) {
        const severityMap = {
            'Low': 'success',
            'Moderate': 'warning',
            'High': 'danger'
        };
        return severityMap[severity] || 'info';
    }
});
