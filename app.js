// Mobile-Optimized Satya Narayana Pooja Invitation Generator
// Fixed download functionality for mobile devices

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Get form elements
    const form = document.getElementById('invitationForm');
    const guestNameInput = document.getElementById('guestName');
    const familyNameInput = document.getElementById('familyName');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');

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

    // Fixed real-time preview update function
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

        // Update family name (fixed the concatenation issue)
        if (familyName) {
            previewFamilyName.textContent = `${familyName} Family`;
            previewFamilyName.classList.remove('hidden');
        } else {
            previewFamilyName.classList.add('hidden');
        }

        // Update contact information (separate from family name)
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
            showMobileNotification('⚠️ Please enter a guest name to generate the invitation.', 'warning');
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
            showMobileNotification('✨ Invitation generated successfully! You can now download it.', 'success');
            
            // Scroll to ensure download button is visible on mobile
            downloadBtn.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
            });
        }, 1200);
    }

    // Fixed mobile-optimized download function with working implementation
    async function downloadInvitation() {
        const invitationCard = document.getElementById('invitationCard');
        const guestName = guestNameInput.value.trim();
        
        if (!invitationCard || !guestName) {
            showMobileNotification('❌ Please generate the invitation first.', 'error');
            return;
        }

        // Show loading state
        downloadBtn.textContent = 'Preparing Download...';
        downloadBtn.disabled = true;

        try {
            // First try html2canvas if available
            if (typeof html2canvas !== 'undefined') {
                await downloadWithHtml2Canvas(invitationCard, guestName);
            } else {
                // If html2canvas not loaded, use direct blob method
                await downloadWithDirectMethod(guestName);
            }
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback to print method
            downloadWithPrint(guestName);
        } finally {
            // Reset button state
            downloadBtn.textContent = 'Download Invitation';
            downloadBtn.disabled = false;
        }
    }

    // Method 1: HTML2Canvas download (fixed implementation)
    async function downloadWithHtml2Canvas(element, guestName) {
        try {
            showMobileNotification('📸 Capturing invitation image...', 'info', 2000);
            
            // Fixed html2canvas options for mobile
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#FFFFFF',
                width: element.offsetWidth,
                height: element.offsetHeight,
                scrollX: 0,
                scrollY: 0,
                logging: false,
                removeContainer: true
            });

            // Convert canvas to blob and download
            canvas.toBlob(function(blob) {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `Satya_Narayana_Pooja_${guestName.replace(/\s+/g, '_')}.png`;
                    
                    // Force download on mobile
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Clean up
                    setTimeout(() => URL.revokeObjectURL(url), 1000);
                    
                    showMobileNotification('✅ Invitation downloaded successfully!', 'success');
                } else {
                    throw new Error('Canvas to blob conversion failed');
                }
            }, 'image/png', 1.0);
            
        } catch (error) {
            console.error('html2canvas error:', error);
            throw error;
        }
    }

    // Method 2: Direct download method (simplified fallback)
    async function downloadWithDirectMethod(guestName) {
        try {
            showMobileNotification('📋 Preparing invitation for download...', 'info', 2000);
            
            const familyName = familyNameInput.value.trim();
            const phoneNumber = phoneNumberInput.value.trim();
            
            // Create a simplified HTML version for download
            const htmlContent = createDownloadableHTML(guestName, familyName, phoneNumber);
            
            // Create blob and download
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `Satya_Narayana_Pooja_${guestName.replace(/\s+/g, '_')}.html`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            
            showMobileNotification('📄 Invitation HTML file downloaded! Open in browser to view/print.', 'success');
            
        } catch (error) {
            console.error('Direct download error:', error);
            throw error;
        }
    }

    // Method 3: Print method (final fallback)
    function downloadWithPrint(guestName) {
        try {
            showMobileNotification('🖨️ Opening print dialog...', 'info', 2000);
            
            const familyName = familyNameInput.value.trim();
            const phoneNumber = phoneNumberInput.value.trim();
            
            const printContent = createPrintableHTML(guestName, familyName, phoneNumber);
            
            const printWindow = window.open('', '_blank', 'width=800,height=600');
            
            if (printWindow) {
                printWindow.document.write(printContent);
                printWindow.document.close();
                
                printWindow.onload = function() {
                    setTimeout(() => {
                        printWindow.print();
                    }, 500);
                };
                
                showMobileNotification('🖨️ Print dialog opened! Use "Save as PDF" to download.', 'success');
            } else {
                showMobileNotification('❌ Please allow popups and try again.', 'error');
            }
            
        } catch (error) {
            console.error('Print method error:', error);
            showMobileNotification('❌ Download failed. Please take a screenshot of the invitation above.', 'error');
        }
    }

    // Create downloadable HTML content
    function createDownloadableHTML(guestName, familyName, phoneNumber) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Satya Narayana Pooja Invitation - ${guestName}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cinzel:wght@500;600&display=swap');
        
        body { 
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 20px;
            background: #FFF8F0;
            color: #654321;
            line-height: 1.6;
        }
        .invitation-card {
            max-width: 800px;
            margin: 0 auto;
            background: linear-gradient(145deg, #FFFFFF 0%, #FFF8F0 100%);
            border: 4px solid #FFA500;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 8px 25px rgba(255, 165, 0, 0.3);
        }
        .card-header { text-align: center; margin-bottom: 32px; }
        .decorative-border-top {
            height: 8px;
            background: linear-gradient(90deg, #FF9933, #FFD700, #FFA500);
            border-radius: 4px;
            margin-bottom: 24px;
        }
        .spiritual-symbols {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-bottom: 24px;
        }
        .ganesha-symbol, .kalash-symbol { font-size: 3rem; }
        .ganesha-symbol { color: #FF9933; }
        .kalash-symbol { color: #DAA520; }
        .om-symbol-small { font-size: 2.5rem; color: #8B0000; }
        .opening-mantra {
            font-size: 18px;
            color: #8B0000;
            margin-bottom: 24px;
            font-weight: 600;
            padding: 16px;
            background: linear-gradient(135deg, #FFF8DC 0%, #FFFACD 100%);
            border-radius: 10px;
            border: 3px solid #FFD700;
            text-align: center;
        }
        .card-title {
            font-family: 'Cinzel', serif;
            font-size: 32px;
            color: #8B0000;
            margin-bottom: 16px;
            font-weight: 700;
            text-align: center;
        }
        .card-subtitle {
            font-size: 28px;
            color: #DAA520;
            margin-bottom: 16px;
            font-weight: 600;
            text-align: center;
        }
        .card-occasion {
            font-size: 18px;
            color: #654321;
            font-style: italic;
            margin-bottom: 24px;
            font-weight: 500;
            text-align: center;
        }
        .guest-name-section {
            margin: 32px 0;
            padding: 24px;
            background: linear-gradient(135deg, #FFF8DC 0%, #FFFEF7 100%);
            border-radius: 12px;
            border: 4px solid #FFD700;
            text-align: center;
        }
        .guest-name {
            font-size: 24px;
            color: #654321;
            font-weight: 700;
            margin-bottom: 12px;
        }
        .family-name {
            font-size: 20px;
            color: #8B0000;
            margin: 0;
            font-weight: 600;
        }
        .invitation-text {
            text-align: center;
            margin-bottom: 24px;
        }
        .invitation-text p {
            color: #654321;
            line-height: 1.7;
            font-size: 18px;
            font-weight: 500;
        }
        .event-details-card {
            background: linear-gradient(135deg, #FFF8DC 0%, #FFFACD 100%);
            padding: 24px;
            border-radius: 12px;
            margin: 32px 0;
            border: 4px solid #FFA500;
            text-align: center;
        }
        .detail-row {
            margin-bottom: 16px;
            font-size: 18px;
            color: #654321;
            font-weight: 500;
        }
        .detail-row strong {
            color: #8B0000;
            font-weight: 700;
        }
        .default-blessing {
            margin-bottom: 32px;
            padding: 20px;
            background: linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 100%);
            border-radius: 12px;
            border: 3px solid #228B22;
            text-align: center;
        }
        .default-blessing p {
            color: #654321;
            font-size: 18px;
            line-height: 1.7;
            font-style: italic;
            font-weight: 500;
            margin: 0;
        }
        .closing-mantras {
            font-size: 18px;
            color: #8B0000;
            font-weight: 700;
            padding: 16px;
            background: linear-gradient(135deg, #FFF8DC 0%, #FFFACD 100%);
            border-radius: 10px;
            border: 3px solid #FFD700;
            margin-bottom: 32px;
            text-align: center;
        }
        .host-info {
            background: linear-gradient(135deg, #FFE4E1 0%, #FFF0F5 100%);
            padding: 24px;
            border-radius: 12px;
            border: 4px solid #8B0000;
            margin-bottom: 32px;
            text-align: center;
        }
        .invited-by strong {
            font-size: 18px;
            color: #8B0000;
            font-weight: 700;
            display: block;
            margin-bottom: 12px;
        }
        .host-name {
            font-size: 22px;
            color: #654321;
            font-weight: 700;
            font-family: 'Cinzel', serif;
        }
        .contact-info {
            margin-top: 16px;
        }
        .contact-text {
            color: #8B0000;
            font-size: 18px;
            font-weight: 600;
            margin: 0;
        }
        .card-footer {
            margin-top: 32px;
            text-align: center;
        }
        .traditional-symbols {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin-bottom: 20px;
        }
        .diya, .lotus {
            font-size: 2.5rem;
            color: #FF9933;
        }
        .decorative-border-bottom {
            height: 8px;
            background: linear-gradient(90deg, #FFA500, #FFD700, #FF9933);
            border-radius: 4px;
        }
        
        @media print {
            body { background: white; padding: 0; }
            .invitation-card { box-shadow: none; margin: 0; }
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
</body>
</html>`;
    }

    // Create printable HTML for mobile print method
    function createPrintableHTML(guestName, familyName, phoneNumber) {
        return createDownloadableHTML(guestName, familyName, phoneNumber);
    }

    // Mobile notification system with better UX
    function showMobileNotification(message, type = 'success', duration = 4000) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.mobile-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'mobile-notification';
        
        const icons = {
            success: '✅',
            warning: '⚠️',
            error: '❌',
            info: 'ℹ️'
        };
        
        const colors = {
            success: '#228B22',
            warning: '#FF6600',
            error: '#CC0000',
            info: '#0066CC'
        };
        
        const icon = icons[type] || icons.success;
        const bgColor = colors[type] || colors.success;
        
        notification.innerHTML = `
            <div class="mobile-notification-content">
                <span class="mobile-notification-icon">${icon}</span>
                <span class="mobile-notification-text">${message}</span>
            </div>
        `;
        
        // Apply styles
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
            white-space: pre-line;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'mobileSlideUp 0.4s ease-in forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 400);
            }
        }, duration);
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
        showMobileNotification('🔄 Form reset successfully!', 'success');
    }

    // Add reset button
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn btn--outline mobile-btn';
    resetBtn.textContent = 'Reset Form';
    resetBtn.style.marginTop = '16px';
    resetBtn.addEventListener('click', resetForm);
    
    const formActions = document.querySelector('.form-actions');
    formActions.appendChild(resetBtn);

    // Enhanced mobile accessibility
    enhanceMobileAccessibility();
    
    // Initialize preview
    updatePreview();
}

// Smooth scroll to generator
function scrollToGenerator() {
    const generator = document.getElementById('invitation-generator');
    if (generator) {
        generator.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced mobile accessibility features
function enhanceMobileAccessibility() {
    // Add ARIA labels
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (generateBtn) {
        generateBtn.setAttribute('aria-label', 'Generate personalized Satya Narayana Pooja invitation card');
    }
    
    if (downloadBtn) {
        downloadBtn.setAttribute('aria-label', 'Download generated invitation as high-quality image or HTML file');
    }
    
    // Enhanced focus management for mobile
    const formInputs = document.querySelectorAll('.mobile-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('mobile-focused');
            
            // Scroll input into view on mobile with better positioning
            setTimeout(() => {
                const rect = this.getBoundingClientRect();
                const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                
                if (!isVisible) {
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center',
                        inline: 'nearest'
                    });
                }
            }, 100);
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('mobile-focused');
        });
        
        // Mobile-specific validation feedback
        input.addEventListener('invalid', function() {
            this.style.borderColor = '#CC0000';
            this.style.boxShadow = '0 0 0 3px rgba(204, 0, 0, 0.2)';
            
            // Show validation message
            const message = this.validationMessage || 'Please fill in this field correctly';
            showMobileNotification(`⚠️ ${message}`, 'warning', 3000);
        });
        
        input.addEventListener('input', function() {
            // Reset validation styles when user starts typing
            if (this.checkValidity()) {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
    });
}

// Mobile keyboard shortcuts
document.addEventListener('keydown', function(e) {
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
    if (e.target.matches('.mobile-btn')) {
        e.target.style.transform = 'scale(0.98)';
    }
});

document.addEventListener('touchend', function(e) {
    if (e.target.matches('.mobile-btn')) {
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }
});

// Prevent zoom on double-tap for input fields
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        if (e.target.matches('.mobile-input')) {
            e.preventDefault();
        }
    }
    lastTouchEnd = now;
});

// Add mobile-specific CSS animations
document.addEventListener('DOMContentLoaded', function() {
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
    `;
    document.head.appendChild(style);
});

// Check html2canvas availability and provide user feedback
window.addEventListener('load', function() {
    if (typeof html2canvas === 'undefined') {
        console.warn('html2canvas library not loaded - using fallback download methods');
        // Could show a subtle notice to user about download options
    }
    
    // Performance optimization for mobile
    setTimeout(() => {
        const cards = document.querySelectorAll('.about-card, .tradition-item');
        cards.forEach((card, index) => {
            if (window.innerWidth > 480) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, 1000);
});

// Network-aware features for mobile
if ('navigator' in window && 'connection' in navigator) {
    const connection = navigator.connection;
    
    if (connection && connection.effectiveType) {
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            console.log('Slow connection detected - optimizing for mobile');
            // Could adjust canvas quality or prefer lighter download methods
        }
    }
}