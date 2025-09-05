// Mobile-First Satya Narayana Pooja Invitation Generator
// Simplified version with only 3 fields and default message

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Get form elements (simplified - only 3 fields)
    const form = document.getElementById('invitationForm');
    const guestNameInput = document.getElementById('guestName');
    const familyNameInput = document.getElementById('familyName');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    // Get preview elements
    const previewGuestName = document.getElementById('previewGuestName');
    const previewFamilyName = document.getElementById('previewFamilyName');
    const previewContact = document.getElementById('previewContact');
    const contactText = document.getElementById('contactText');

    // Add event listeners for real-time updates
    guestNameInput.addEventListener('input', updatePreview);
    familyNameInput.addEventListener('input', updatePreview);
    phoneNumberInput.addEventListener('input', updatePreview);

    // Add event listeners for buttons
    generateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        generateInvitation();
    });
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        downloadInvitation();
    });

    // Real-time preview update function
    function updatePreview() {
        const guestName = guestNameInput.value.trim();
        const familyName = familyNameInput.value.trim();
        const phoneNumber = phoneNumberInput.value.trim();

        // Update guest name
        if (guestName) {
            previewGuestName.textContent = `Dear ${guestName}`;
        } else {
            previewGuestName.textContent = 'Dear [Guest Name]';
        }

        // Update family name
        if (familyName) {
            previewFamilyName.textContent = `${familyName} Family`;
            previewFamilyName.classList.remove('hidden');
        } else {
            previewFamilyName.classList.add('hidden');
        }

        // Update contact information
        if (phoneNumber) {
            contactText.textContent = `Contact: ${phoneNumber}`;
            previewContact.classList.remove('hidden');
        } else {
            previewContact.classList.add('hidden');
        }
    }

    // Generate invitation function
    function generateInvitation() {
        const guestName = guestNameInput.value.trim();
        
        if (!guestName) {
            showMobileAlert('Please enter a guest name to generate the invitation.');
            guestNameInput.focus();
            return;
        }

        // Show loading state
        generateBtn.textContent = 'Generating...';
        generateBtn.disabled = true;

        // Update preview one final time
        updatePreview();

        // Simulate generation process for better mobile UX
        setTimeout(() => {
            // Show download button and update generate button
            generateBtn.classList.add('hidden');
            downloadBtn.classList.remove('hidden');
            
            // Reset button state
            generateBtn.textContent = 'Generate Invitation';
            generateBtn.disabled = false;

            // Show success message
            showMobileSuccess('✨ Invitation generated successfully! You can now download it.');
            
            // Scroll to ensure download button is visible on mobile
            downloadBtn.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
            });
        }, 1200);
    }

    // Mobile-optimized download function
    function downloadInvitation() {
        const invitationCard = document.querySelector('.invitation-card');
        const guestName = guestNameInput.value.trim();
        
        // Show loading state
        downloadBtn.textContent = 'Downloading...';
        downloadBtn.disabled = true;
        
        // Try html2canvas for high-quality download
        if (typeof html2canvas !== 'undefined') {
            html2canvas(invitationCard, {
                scale: 3, // Higher scale for mobile clarity
                useCORS: true,
                backgroundColor: '#FFFFFF',
                width: invitationCard.offsetWidth,
                height: invitationCard.offsetHeight,
                scrollX: 0,
                scrollY: 0,
                logging: false,
                allowTaint: true,
                foreignObjectRendering: true
            }).then(canvas => {
                // Create download link
                const link = document.createElement('a');
                link.download = `Satya_Narayana_Pooja_${guestName.replace(/\s+/g, '_')}.png`;
                link.href = canvas.toDataURL('image/png', 1.0);
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Reset button state
                downloadBtn.textContent = 'Download Invitation';
                downloadBtn.disabled = false;
                
                showMobileSuccess('📱 Invitation downloaded successfully!');
            }).catch(error => {
                console.error('Canvas download failed:', error);
                // Reset button state and try fallback
                downloadBtn.textContent = 'Download Invitation';
                downloadBtn.disabled = false;
                downloadAsMobilePDF();
            });
        } else {
            // Fallback if html2canvas is not available
            setTimeout(() => {
                downloadBtn.textContent = 'Download Invitation';
                downloadBtn.disabled = false;
                downloadAsMobilePDF();
            }, 800);
        }
    }

    // Mobile-optimized PDF download fallback
    function downloadAsMobilePDF() {
        const invitationCard = document.querySelector('.invitation-card');
        const guestName = guestNameInput.value.trim() || 'Guest';
        const familyName = familyNameInput.value.trim();
        const phoneNumber = phoneNumberInput.value.trim();
        
        // Create a mobile-optimized print window
        const printWindow = window.open('', '_blank', 'width=400,height=600');
        
        if (!printWindow) {
            showMobileAlert('Please allow popups to download the invitation. Try again and allow popups when prompted.');
            return;
        }
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Satya Narayana Pooja Invitation - ${guestName}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cinzel:wght@500;600&display=swap');
                    
                    * { box-sizing: border-box; }
                    body { 
                        font-family: 'Poppins', sans-serif; 
                        margin: 0; 
                        padding: 16px; 
                        background: white;
                        color: #654321 !important;
                        line-height: 1.6;
                    }
                    .invitation-card {
                        background: linear-gradient(145deg, #FFFFFF 0%, #FFF8F0 100%);
                        border: 4px solid #FFA500;
                        border-radius: 16px;
                        padding: 24px;
                        max-width: 100%;
                        margin: 0 auto;
                        box-shadow: 0 8px 25px rgba(255, 165, 0, 0.3);
                    }
                    .card-header { text-align: center; margin-bottom: 24px; }
                    .decorative-border-top {
                        height: 6px;
                        background: linear-gradient(90deg, #FF9933, #FFD700, #FFA500);
                        border-radius: 4px;
                        margin-bottom: 20px;
                    }
                    .spiritual-symbols {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 16px;
                    }
                    .ganesha-symbol, .kalash-symbol { 
                        font-size: 2.5rem;
                        display: inline-block;
                    }
                    .ganesha-symbol { color: #FF9933; }
                    .kalash-symbol { color: #DAA520; }
                    .om-symbol-small { 
                        font-size: 2rem; 
                        color: #8B0000; 
                    }
                    .card-content { text-align: center; }
                    .opening-mantra {
                        font-size: 16px;
                        color: #8B0000 !important;
                        margin-bottom: 20px;
                        font-weight: 600;
                        padding: 12px;
                        background: linear-gradient(135deg, #FFF8DC 0%, #FFFACD 100%);
                        border-radius: 8px;
                        border: 2px solid #FFD700;
                    }
                    .card-title {
                        font-family: 'Cinzel', serif;
                        font-size: 24px;
                        color: #8B0000 !important;
                        margin-bottom: 12px;
                        font-weight: 700;
                        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
                    }
                    .card-subtitle {
                        font-size: 20px;
                        color: #DAA520 !important;
                        margin-bottom: 12px;
                        font-weight: 600;
                    }
                    .card-occasion {
                        font-size: 16px;
                        color: #654321 !important;
                        font-style: italic;
                        margin-bottom: 20px;
                        font-weight: 500;
                    }
                    .guest-name-section {
                        margin: 24px 0;
                        padding: 20px;
                        background: linear-gradient(135deg, #FFF8DC 0%, #FFFEF7 100%);
                        border-radius: 10px;
                        border: 3px solid #FFD700;
                    }
                    .guest-name {
                        font-size: 20px;
                        color: #654321 !important;
                        font-weight: 700;
                        margin-bottom: 8px;
                    }
                    .family-name {
                        font-size: 18px;
                        color: #8B0000 !important;
                        margin: 0;
                        font-weight: 600;
                    }
                    .invitation-text p {
                        color: #654321 !important;
                        line-height: 1.6;
                        font-size: 16px;
                        font-weight: 500;
                        margin-bottom: 20px;
                    }
                    .event-details-card {
                        background: linear-gradient(135deg, #FFF8DC 0%, #FFFACD 100%);
                        padding: 20px;
                        border-radius: 10px;
                        margin: 24px 0;
                        border: 3px solid #FFA500;
                    }
                    .detail-row {
                        margin-bottom: 12px;
                        font-size: 16px;
                        color: #654321 !important;
                        font-weight: 500;
                    }
                    .detail-row strong {
                        color: #8B0000 !important;
                        font-weight: 700;
                    }
                    .detail-row:last-child { margin-bottom: 0; }
                    .default-blessing {
                        margin-bottom: 24px;
                        padding: 16px;
                        background: linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 100%);
                        border-radius: 10px;
                        border: 2px solid #228B22;
                    }
                    .default-blessing p {
                        color: #654321 !important;
                        font-size: 16px;
                        line-height: 1.6;
                        font-style: italic;
                        font-weight: 500;
                        margin: 0;
                    }
                    .closing-mantras {
                        font-size: 16px;
                        color: #8B0000 !important;
                        font-weight: 700;
                        padding: 12px;
                        background: linear-gradient(135deg, #FFF8DC 0%, #FFFACD 100%);
                        border-radius: 8px;
                        border: 2px solid #FFD700;
                        margin-bottom: 24px;
                    }
                    .host-info {
                        background: linear-gradient(135deg, #FFE4E1 0%, #FFF0F5 100%);
                        padding: 20px;
                        border-radius: 10px;
                        border: 3px solid #8B0000;
                        margin-bottom: 24px;
                    }
                    .invited-by {
                        text-align: center;
                        margin-bottom: 12px;
                    }
                    .invited-by strong {
                        font-size: 16px;
                        color: #8B0000 !important;
                        font-weight: 700;
                        display: block;
                        margin-bottom: 8px;
                    }
                    .host-name {
                        font-size: 18px;
                        color: #654321 !important;
                        font-weight: 700;
                        font-family: 'Cinzel', serif;
                    }
                    .contact-info {
                        text-align: center;
                        margin-top: 12px;
                    }
                    .contact-text {
                        color: #8B0000 !important;
                        font-size: 16px;
                        font-weight: 600;
                        margin: 0;
                    }
                    .card-footer {
                        margin-top: 24px;
                        text-align: center;
                    }
                    .traditional-symbols {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        margin-bottom: 16px;
                    }
                    .diya, .lotus {
                        font-size: 2rem;
                        color: #FF9933;
                    }
                    .decorative-border-bottom {
                        height: 6px;
                        background: linear-gradient(90deg, #FFA500, #FFD700, #FF9933);
                        border-radius: 4px;
                    }
                    .hidden { display: none !important; }
                    
                    @media print {
                        body { padding: 0; background: white !important; }
                        .invitation-card { box-shadow: none; border: 3px solid #FFA500; }
                    }
                </style>
            </head>
            <body>
                <div class="invitation-card">
                    <div class="card-header">
                        <div class="decorative-border-top"></div>
                        <div class="spiritual-symbols">
                            <span class="ganesha-symbol">🐘</span>
                            <span class="om-symbol-small">ॐ</span>
                            <span class="kalash-symbol">🏺</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="opening-mantra">ॐ गणेशाय नमः । ॐ नमो भगवते वासुदेवाय ।</div>
                        <h3 class="card-title">सत्यनारायण पूजा</h3>
                        <h4 class="card-subtitle">Satya Narayana Pooja</h4>
                        <p class="card-occasion">On the blessed occasion of Anant Chaturdashi</p>
                        <div class="guest-name-section">
                            <p class="guest-name">Dear ${guestName}</p>
                            ${familyName ? `<p class="family-name">${familyName} Family</p>` : ''}
                        </div>
                        <div class="invitation-text">
                            <p>You are cordially invited to join us for the auspicious Satya Narayana Pooja as we conclude the sacred Ganesh Chaturthi festival with divine blessings.</p>
                        </div>
                        <div class="event-details-card">
                            <div class="detail-row"><strong>Date:</strong> Friday, 06 September 2025</div>
                            <div class="detail-row"><strong>Time:</strong> 12:00 PM onwards</div>
                            <div class="detail-row"><strong>Occasion:</strong> Anant Chaturdashi</div>
                        </div>
                        <div class="default-blessing">
                            <p>Your presence will add joy to our celebration as we seek the combined blessings of Lord Ganesha and Lord Satya Narayana for prosperity, peace, and happiness in our lives.</p>
                        </div>
                        <div class="closing-mantras">गणपति बप्पा मोरया! । सत्यनारायण की जय!</div>
                        <div class="host-info">
                            <div class="invited-by">
                                <strong>Invited by</strong><br>
                                <span class="host-name">Darshan Hulamani &amp; Family</span>
                            </div>
                            ${phoneNumber ? `<div class="contact-info"><p class="contact-text">Contact: ${phoneNumber}</p></div>` : ''}
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="traditional-symbols">
                            <span class="diya">🪔</span>
                            <span class="lotus">🪷</span>
                            <span class="diya">🪔</span>
                        </div>
                        <div class="decorative-border-bottom"></div>
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            setTimeout(function() {
                                window.close();
                            }, 100);
                        }, 800);
                    };
                </script>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        showMobileSuccess('📄 Invitation opened for download/print!');
    }

    // Mobile-optimized success message
    function showMobileSuccess(message) {
        showMobileNotification(message, 'success');
    }

    // Mobile-optimized alert
    function showMobileAlert(message) {
        showMobileNotification(message, 'warning');
    }

    // Mobile notification system
    function showMobileNotification(message, type = 'success') {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.mobile-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create mobile notification
        const notification = document.createElement('div');
        notification.className = 'mobile-notification';
        
        const icon = type === 'success' ? '✅' : '⚠️';
        const bgColor = type === 'success' ? '#228B22' : '#FF6600';
        
        notification.innerHTML = `
            <div class="mobile-notification-content">
                <span class="mobile-notification-icon">${icon}</span>
                <span class="mobile-notification-text">${message}</span>
            </div>
        `;
        
        // Mobile-optimized styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 16px;
            right: 16px;
            background: ${bgColor};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
            z-index: 9999;
            animation: mobileSlideDown 0.4s ease-out forwards;
            font-size: 16px;
            font-weight: 600;
            text-align: center;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'mobileSlideUp 0.4s ease-in forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 400);
            }
        }, 4000);
    }

    // Reset form function
    function resetForm() {
        form.reset();
        updatePreview();
        generateBtn.classList.remove('hidden');
        downloadBtn.classList.add('hidden');
        generateBtn.textContent = 'Generate Invitation';
        downloadBtn.textContent = 'Download Invitation';
        generateBtn.disabled = false;
        downloadBtn.disabled = false;
        showMobileSuccess('🔄 Form reset successfully!');
    }

    // Add reset functionality with mobile-friendly button
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn btn--outline mobile-btn';
    resetBtn.textContent = 'Reset Form';
    resetBtn.style.marginTop = '16px';
    resetBtn.addEventListener('click', resetForm);
    
    // Add reset button to form actions
    const formActions = document.querySelector('.form-actions');
    formActions.appendChild(resetBtn);

    // Initialize preview on load
    updatePreview();
}

// Smooth scroll to generator section (mobile-optimized)
function scrollToGenerator() {
    const generator = document.getElementById('invitation-generator');
    if (generator) {
        generator.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add mobile-specific animation styles
function addMobileAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes mobileSlideDown {
            from { 
                transform: translateY(-100px); 
                opacity: 0; 
            }
            to { 
                transform: translateY(0); 
                opacity: 1; 
            }
        }
        @keyframes mobileSlideUp {
            from { 
                transform: translateY(0); 
                opacity: 1; 
            }
            to { 
                transform: translateY(-100px); 
                opacity: 0; 
            }
        }
        .mobile-notification-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
        }
        .mobile-notification-icon {
            font-size: 20px;
        }
        .mobile-notification-text {
            font-weight: 600;
            font-size: 16px;
            line-height: 1.4;
        }
        
        /* Mobile loading states */
        .mobile-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: scale(0.98);
        }
        
        /* Mobile focus states for better accessibility */
        .form-group.mobile-focused .form-label {
            color: #8B0000 !important;
            transform: scale(1.05);
        }
        .form-group.mobile-focused .mobile-input {
            border-color: #8B0000 !important;
            box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.2) !important;
            transform: scale(1.02);
        }
        
        /* Mobile touch feedback */
        .mobile-btn:active {
            transform: scale(0.95);
            transition: transform 0.1s ease;
        }
        
        .mobile-input:active {
            transform: scale(1.01);
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(style);
}

// Load html2canvas library for better download quality
function loadHtml2Canvas() {
    if (typeof html2canvas === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.async = true;
        script.onload = function() {
            console.log('html2canvas loaded for high-quality downloads');
        };
        script.onerror = function() {
            console.warn('html2canvas failed to load, using print fallback');
        };
        document.head.appendChild(script);
    }
}

// Enhanced mobile accessibility features
function enhanceMobileAccessibility() {
    // Add ARIA labels for mobile screen readers
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (generateBtn) {
        generateBtn.setAttribute('aria-label', 'Generate personalized Satya Narayana Pooja invitation card');
    }
    
    if (downloadBtn) {
        downloadBtn.setAttribute('aria-label', 'Download generated invitation as high-quality image');
    }
    
    // Enhanced mobile focus management
    const formInputs = document.querySelectorAll('.mobile-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('mobile-focused');
            // Scroll input into view on mobile
            setTimeout(() => {
                this.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'nearest'
                });
            }, 100);
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('mobile-focused');
        });
        
        // Mobile-specific input validation feedback
        input.addEventListener('invalid', function() {
            this.style.borderColor = '#CC0000';
            this.style.boxShadow = '0 0 0 3px rgba(204, 0, 0, 0.2)';
        });
    });
}

// Initialize mobile-optimized application
document.addEventListener('DOMContentLoaded', function() {
    addMobileAnimationStyles();
    loadHtml2Canvas();
    
    // Delay non-critical features for better mobile performance
    setTimeout(() => {
        enhanceMobileAccessibility();
    }, 1000);
});

// Mobile keyboard shortcuts and gestures
document.addEventListener('keydown', function(e) {
    // Enter key to generate invitation (mobile-friendly)
    if (e.key === 'Enter' && !e.shiftKey) {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.matches('.mobile-input:not(textarea)')) {
            e.preventDefault();
            const generateBtn = document.getElementById('generateBtn');
            if (generateBtn && !generateBtn.classList.contains('hidden') && !generateBtn.disabled) {
                generateBtn.click();
            }
        }
    }
});

// Touch events for better mobile interaction
document.addEventListener('touchstart', function(e) {
    // Add subtle touch feedback for buttons
    if (e.target.matches('.mobile-btn')) {
        e.target.style.transform = 'scale(0.98)';
    }
});

document.addEventListener('touchend', function(e) {
    // Reset touch feedback
    if (e.target.matches('.mobile-btn')) {
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }
});

// Prevent zoom on double-tap for input fields (mobile UX improvement)
document.addEventListener('touchend', function(e) {
    if (e.target.matches('.mobile-input')) {
        e.preventDefault();
        e.target.focus();
    }
});

// Mobile performance optimization - lazy load non-critical features
window.addEventListener('load', function() {
    // Add subtle animations after page load for better performance
    setTimeout(() => {
        const spiritualElements = document.querySelectorAll('.ganesha-symbol, .kalash-symbol, .diya, .lotus, .om-symbol');
        spiritualElements.forEach((element, index) => {
            if (element && window.innerWidth > 480) { // Only on larger mobile screens
                element.style.animation = `float ${3 + (index * 0.3)}s ease-in-out infinite`;
                element.style.animationDelay = `${index * 0.2}s`;
            }
        });
    }, 2000);
});