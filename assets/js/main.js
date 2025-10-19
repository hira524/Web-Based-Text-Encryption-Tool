/**
 * Main Application Logic
 * Handles UI interactions and integrates encryption functionality
 */

class TextEncryptionApp {
    constructor() {
        this.encryptionManager = new EncryptionManager();
        this.lastProcessedData = null;
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.bindEvents();
        this.updateCharacterCount();
        this.updateAlgorithmInfo();
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Input text events
        const inputText = document.getElementById('inputText');
        inputText.addEventListener('input', () => {
            this.updateCharacterCount();
            this.clearOutput();
        });

        // Algorithm selection
        const algorithm = document.getElementById('algorithm');
        algorithm.addEventListener('change', () => {
            this.handleAlgorithmChange();
        });

        // Caesar shift input
        const caesarShift = document.getElementById('caesarShift');
        caesarShift.addEventListener('input', () => {
            this.clearOutput();
        });

        // Password input
        const password = document.getElementById('password');
        password.addEventListener('input', () => {
            this.clearOutput();
        });

        // Toggle password visibility
        const togglePassword = document.getElementById('togglePassword');
        togglePassword.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });

        // Process button
        const processBtn = document.getElementById('processBtn');
        processBtn.addEventListener('click', () => {
            this.processText();
        });

        // Decrypt button
        const decryptBtn = document.getElementById('decryptBtn');
        decryptBtn.addEventListener('click', () => {
            this.decryptText();
        });

        // Clear button
        const clearBtn = document.getElementById('clearBtn');
        clearBtn.addEventListener('click', () => {
            this.clearAll();
        });

        // Copy button
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.addEventListener('click', () => {
            this.copyToClipboard();
        });

        // Error modal close
        const closeModal = document.querySelector('.close');
        closeModal.addEventListener('click', () => {
            this.hideErrorModal();
        });

        // Close modal when clicking outside
        const errorModal = document.getElementById('errorModal');
        errorModal.addEventListener('click', (e) => {
            if (e.target === errorModal) {
                this.hideErrorModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.processText();
                        break;
                    case 'k':
                        e.preventDefault();
                        this.clearAll();
                        break;
                    case 'c':
                        if (e.shiftKey) {
                            e.preventDefault();
                            this.copyToClipboard();
                        }
                        break;
                }
            }
        });
    }

    /**
     * Update character count
     */
    updateCharacterCount() {
        const inputText = document.getElementById('inputText');
        const charCount = document.getElementById('charCount');
        const count = inputText.value.length;
        
        charCount.textContent = count;
        
        // Change color based on limit
        if (count > 8000) {
            charCount.style.color = 'var(--danger-color)';
        } else if (count > 6000) {
            charCount.style.color = 'var(--warning-color)';
        } else {
            charCount.style.color = 'var(--text-muted)';
        }
    }

    /**
     * Handle algorithm selection change
     */
    handleAlgorithmChange() {
        const algorithm = document.getElementById('algorithm').value;
        const caesarShiftGroup = document.getElementById('caesarShiftGroup');
        const passwordGroup = document.getElementById('passwordGroup');
        const decryptBtn = document.getElementById('decryptBtn');

        // Hide all conditional inputs
        caesarShiftGroup.style.display = 'none';
        passwordGroup.style.display = 'none';
        decryptBtn.style.display = 'none';

        if (algorithm) {
            const algorithmInfo = this.encryptionManager.getAlgorithmInfo(algorithm);
            
            // Show appropriate inputs
            if (algorithm === 'caesar') {
                caesarShiftGroup.style.display = 'block';
            }
            
            if (algorithmInfo && algorithmInfo.keyRequired) {
                passwordGroup.style.display = 'block';
            }

            // Show decrypt button for reversible algorithms
            if (algorithmInfo && algorithmInfo.reversible) {
                decryptBtn.style.display = 'inline-flex';
            }
        }

        this.updateAlgorithmInfo();
        this.clearOutput();
    }

    /**
     * Update algorithm information display
     */
    updateAlgorithmInfo() {
        const algorithm = document.getElementById('algorithm').value;
        const algorithmInfo = document.getElementById('algorithmInfo');

        if (!algorithm) {
            algorithmInfo.innerHTML = '<p>Select an algorithm to see its description and usage details.</p>';
            return;
        }

        const info = this.encryptionManager.getAlgorithmInfo(algorithm);
        const recommendations = this.encryptionManager.getSecurityRecommendations(algorithm);

        if (info) {
            algorithmInfo.innerHTML = `
                <h4>${info.name}</h4>
                <p><strong>Type:</strong> ${info.type.charAt(0).toUpperCase() + info.type.slice(1)}</p>
                <p><strong>Description:</strong> ${info.description}</p>
                <p><strong>Key Required:</strong> ${info.keyRequired ? 'Yes' : 'No'}</p>
                <p><strong>Reversible:</strong> ${info.reversible ? 'Yes' : 'No'}</p>
                
                <h5>Security Recommendations:</h5>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            `;
        }
    }

    /**
     * Toggle password visibility
     */
    togglePasswordVisibility() {
        const password = document.getElementById('password');
        const toggleBtn = document.getElementById('togglePassword');
        
        if (password.type === 'password') {
            password.type = 'text';
            toggleBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
            `;
        } else {
            password.type = 'password';
            toggleBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
            `;
        }
    }

    /**
     * Process text with selected algorithm
     */
    async processText() {
        const inputText = document.getElementById('inputText').value;
        const algorithm = document.getElementById('algorithm').value;
        const password = document.getElementById('password').value;
        const shift = parseInt(document.getElementById('caesarShift').value) || 3;

        // Show loading state
        this.setLoadingState(true);

        try {
            // Validate input
            const errors = this.encryptionManager.validateInput(inputText, algorithm, {
                password,
                shift
            });

            if (errors.length > 0) {
                throw new Error(errors.join('\n'));
            }

            // Add small delay for better UX
            await new Promise(resolve => setTimeout(resolve, 300));

            // Process the text
            const result = this.encryptionManager.processText(inputText, algorithm, {
                password,
                shift,
                decrypt: false
            });

            // Store the last processed data for potential decryption
            this.lastProcessedData = {
                algorithm,
                password,
                shift,
                originalText: inputText,
                processedText: result
            };

            // Display result
            this.displayResult(result);
            
            // Show success animation
            this.showSuccessAnimation();

        } catch (error) {
            this.showError(error.message);
            this.shakeElement(document.getElementById('processBtn'));
        } finally {
            this.setLoadingState(false);
        }
    }

    /**
     * Decrypt text
     */
    async decryptText() {
        const inputText = document.getElementById('inputText').value;
        const algorithm = document.getElementById('algorithm').value;
        const password = document.getElementById('password').value;
        const shift = parseInt(document.getElementById('caesarShift').value) || 3;

        // Show loading state
        this.setLoadingState(true, 'decryptBtn');

        try {
            // Validate input
            const errors = this.encryptionManager.validateInput(inputText, algorithm, {
                password,
                shift
            });

            if (errors.length > 0) {
                throw new Error(errors.join('\n'));
            }

            const algorithmInfo = this.encryptionManager.getAlgorithmInfo(algorithm);
            if (!algorithmInfo.reversible) {
                throw new Error(`${algorithmInfo.name} is not reversible`);
            }

            // Add small delay for better UX
            await new Promise(resolve => setTimeout(resolve, 300));

            // Decrypt the text
            const result = this.encryptionManager.processText(inputText, algorithm, {
                password,
                shift,
                decrypt: true
            });

            // Display result
            this.displayResult(result);
            
            // Show success animation
            this.showSuccessAnimation();

        } catch (error) {
            this.showError(error.message);
            this.shakeElement(document.getElementById('decryptBtn'));
        } finally {
            this.setLoadingState(false, 'decryptBtn');
        }
    }

    /**
     * Display the processing result
     */
    displayResult(result) {
        const outputText = document.getElementById('outputText');
        const copyBtn = document.getElementById('copyBtn');

        outputText.value = result;
        copyBtn.disabled = false;

        // Add fade-in animation
        outputText.classList.add('fade-in');
        setTimeout(() => outputText.classList.remove('fade-in'), 300);
    }

    /**
     * Clear all inputs and outputs
     */
    clearAll() {
        document.getElementById('inputText').value = '';
        document.getElementById('outputText').value = '';
        document.getElementById('algorithm').selectedIndex = 0;
        document.getElementById('password').value = '';
        document.getElementById('caesarShift').value = '3';
        
        // Reset UI state
        this.handleAlgorithmChange();
        this.updateCharacterCount();
        
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.disabled = true;
        
        // Clear copy status
        this.clearCopyStatus();
        
        // Clear last processed data
        this.lastProcessedData = null;

        // Focus on input
        document.getElementById('inputText').focus();
    }

    /**
     * Clear output only
     */
    clearOutput() {
        document.getElementById('outputText').value = '';
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.disabled = true;
        this.clearCopyStatus();
    }

    /**
     * Copy result to clipboard
     */
    async copyToClipboard() {
        const outputText = document.getElementById('outputText');
        const copyStatus = document.getElementById('copyStatus');

        try {
            await navigator.clipboard.writeText(outputText.value);
            this.showCopySuccess();
        } catch (error) {
            // Fallback for older browsers
            outputText.select();
            document.execCommand('copy');
            this.showCopySuccess();
        }
    }

    /**
     * Show copy success message
     */
    showCopySuccess() {
        const copyStatus = document.getElementById('copyStatus');
        copyStatus.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 4px;">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
            Copied!
        `;
        copyStatus.style.opacity = '1';
        
        setTimeout(() => {
            copyStatus.style.opacity = '0';
            setTimeout(() => copyStatus.innerHTML = '', 300);
        }, 2000);
    }

    /**
     * Clear copy status
     */
    clearCopyStatus() {
        const copyStatus = document.getElementById('copyStatus');
        copyStatus.textContent = '';
        copyStatus.style.opacity = '0';
    }

    /**
     * Set loading state for buttons
     */
    setLoadingState(isLoading, buttonId = 'processBtn') {
        const button = document.getElementById(buttonId);
        const spinner = button.querySelector('.spinner') || document.getElementById('loadingSpinner');
        const text = button.querySelector('#processText') || button;

        if (isLoading) {
            button.disabled = true;
            if (spinner) spinner.style.display = 'block';
            if (buttonId === 'processBtn' && text) {
                text.textContent = 'Processing...';
            }
        } else {
            button.disabled = false;
            if (spinner) spinner.style.display = 'none';
            if (buttonId === 'processBtn' && text) {
                text.textContent = 'Process';
            }
        }
    }

    /**
     * Show error modal
     */
    showError(message) {
        const errorModal = document.getElementById('errorModal');
        const errorMessage = document.getElementById('errorMessage');
        
        errorMessage.textContent = message;
        errorModal.style.display = 'flex';
    }

    /**
     * Hide error modal
     */
    hideErrorModal() {
        const errorModal = document.getElementById('errorModal');
        errorModal.style.display = 'none';
    }

    /**
     * Shake animation for elements
     */
    shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
    }

    /**
     * Show success animation
     */
    showSuccessAnimation() {
        const outputSection = document.querySelector('.output-section');
        outputSection.style.borderLeft = '4px solid var(--success-color)';
        setTimeout(() => {
            outputSection.style.borderLeft = '';
        }, 2000);
    }

    /**
     * Generate random password and fill the password field
     */
    generateRandomPassword() {
        const password = this.encryptionManager.generateRandomPassword();
        document.getElementById('password').value = password;
        this.clearOutput();
    }

    /**
     * Get application statistics
     */
    getStats() {
        return {
            supportedAlgorithms: Object.keys(this.encryptionManager.algorithms).length,
            lastProcessed: this.lastProcessedData ? this.lastProcessedData.algorithm : null,
            version: '1.0.0'
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.textEncryptionApp = new TextEncryptionApp();
    
    // Add keyboard shortcut hints to the UI
    const shortcuts = document.createElement('div');
    shortcuts.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--bg-dark);
        color: var(--text-muted);
        padding: 10px;
        border-radius: 8px;
        font-size: 12px;
        max-width: 200px;
        z-index: 100;
        opacity: 0.7;
    `;
    shortcuts.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;">
                <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/>
            </svg>
            <strong>Shortcuts:</strong>
        </div>
        Ctrl+Enter: Process<br>
        Ctrl+K: Clear All<br>
        Ctrl+Shift+C: Copy Result
    `;
    document.body.appendChild(shortcuts);
    
    console.log('🔐 Text Encryption Tool initialized successfully!');
});