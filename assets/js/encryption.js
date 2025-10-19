/**
 * Encryption and Hashing Algorithms Implementation
 * Using CryptoJS library for secure encryption
 */

class EncryptionManager {
    constructor() {
        this.algorithms = {
            caesar: {
                name: 'Caesar Cipher',
                type: 'encryption',
                description: 'A simple substitution cipher where each letter is shifted by a fixed number of positions.',
                keyRequired: false,
                reversible: true
            },
            aes: {
                name: 'AES (Advanced Encryption Standard)',
                type: 'encryption',
                description: 'Industry-standard symmetric encryption algorithm used worldwide.',
                keyRequired: true,
                reversible: true
            },
            des: {
                name: 'DES (Data Encryption Standard)',
                type: 'encryption',
                description: 'Legacy symmetric encryption algorithm. Less secure than AES.',
                keyRequired: true,
                reversible: true
            },
            base64: {
                name: 'Base64 Encoding',
                type: 'encoding',
                description: 'Encoding scheme that represents binary data in ASCII string format.',
                keyRequired: false,
                reversible: true
            },
            sha256: {
                name: 'SHA-256',
                type: 'hash',
                description: 'Secure Hash Algorithm producing a 256-bit hash value.',
                keyRequired: false,
                reversible: false
            },
            md5: {
                name: 'MD5',
                type: 'hash',
                description: 'Message Digest Algorithm (legacy, for demonstration only).',
                keyRequired: false,
                reversible: false
            }
        };
    }

    /**
     * Get algorithm information
     */
    getAlgorithmInfo(algorithm) {
        return this.algorithms[algorithm] || null;
    }

    /**
     * Caesar Cipher Implementation
     */
    caesarCipher(text, shift, decrypt = false) {
        if (!text || shift < 1 || shift > 25) {
            throw new Error('Invalid input or shift value');
        }

        const actualShift = decrypt ? -shift : shift;
        let result = '';

        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            
            if (char.match(/[a-z]/i)) {
                const isUpperCase = char === char.toUpperCase();
                char = char.toLowerCase();
                
                const charCode = char.charCodeAt(0) - 97;
                const shiftedCode = (charCode + actualShift + 26) % 26;
                const shiftedChar = String.fromCharCode(shiftedCode + 97);
                
                result += isUpperCase ? shiftedChar.toUpperCase() : shiftedChar;
            } else {
                result += char;
            }
        }

        return result;
    }

    /**
     * AES Encryption/Decryption
     */
    aesEncrypt(text, password) {
        if (!text || !password) {
            throw new Error('Text and password are required for AES encryption');
        }

        try {
            const encrypted = CryptoJS.AES.encrypt(text, password).toString();
            return encrypted;
        } catch (error) {
            throw new Error('AES encryption failed: ' + error.message);
        }
    }

    aesDecrypt(encryptedText, password) {
        if (!encryptedText || !password) {
            throw new Error('Encrypted text and password are required for AES decryption');
        }

        try {
            const decrypted = CryptoJS.AES.decrypt(encryptedText, password);
            const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
            
            if (!plaintext) {
                throw new Error('Invalid password or corrupted data');
            }
            
            return plaintext;
        } catch (error) {
            throw new Error('AES decryption failed: ' + error.message);
        }
    }

    /**
     * DES Encryption/Decryption
     */
    desEncrypt(text, password) {
        if (!text || !password) {
            throw new Error('Text and password are required for DES encryption');
        }

        try {
            const encrypted = CryptoJS.DES.encrypt(text, password).toString();
            return encrypted;
        } catch (error) {
            throw new Error('DES encryption failed: ' + error.message);
        }
    }

    desDecrypt(encryptedText, password) {
        if (!encryptedText || !password) {
            throw new Error('Encrypted text and password are required for DES decryption');
        }

        try {
            const decrypted = CryptoJS.DES.decrypt(encryptedText, password);
            const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
            
            if (!plaintext) {
                throw new Error('Invalid password or corrupted data');
            }
            
            return plaintext;
        } catch (error) {
            throw new Error('DES decryption failed: ' + error.message);
        }
    }

    /**
     * Base64 Encoding/Decoding
     */
    base64Encode(text) {
        if (!text) {
            throw new Error('Text is required for Base64 encoding');
        }

        try {
            return btoa(unescape(encodeURIComponent(text)));
        } catch (error) {
            throw new Error('Base64 encoding failed: ' + error.message);
        }
    }

    base64Decode(encodedText) {
        if (!encodedText) {
            throw new Error('Encoded text is required for Base64 decoding');
        }

        try {
            return decodeURIComponent(escape(atob(encodedText)));
        } catch (error) {
            throw new Error('Base64 decoding failed: Invalid Base64 string');
        }
    }

    /**
     * SHA-256 Hashing
     */
    sha256Hash(text) {
        if (!text) {
            throw new Error('Text is required for SHA-256 hashing');
        }

        try {
            return CryptoJS.SHA256(text).toString();
        } catch (error) {
            throw new Error('SHA-256 hashing failed: ' + error.message);
        }
    }

    /**
     * MD5 Hashing
     */
    md5Hash(text) {
        if (!text) {
            throw new Error('Text is required for MD5 hashing');
        }

        try {
            return CryptoJS.MD5(text).toString();
        } catch (error) {
            throw new Error('MD5 hashing failed: ' + error.message);
        }
    }

    /**
     * Main process method that routes to appropriate algorithm
     */
    processText(text, algorithm, options = {}) {
        const { password, shift, decrypt = false } = options;

        switch (algorithm) {
            case 'caesar':
                return this.caesarCipher(text, shift || 3, decrypt);
            
            case 'aes':
                return decrypt ? this.aesDecrypt(text, password) : this.aesEncrypt(text, password);
            
            case 'des':
                return decrypt ? this.desDecrypt(text, password) : this.desEncrypt(text, password);
            
            case 'base64':
                return decrypt ? this.base64Decode(text) : this.base64Encode(text);
            
            case 'sha256':
                if (decrypt) {
                    throw new Error('SHA-256 is a one-way hash function and cannot be decrypted');
                }
                return this.sha256Hash(text);
            
            case 'md5':
                if (decrypt) {
                    throw new Error('MD5 is a one-way hash function and cannot be decrypted');
                }
                return this.md5Hash(text);
            
            default:
                throw new Error('Unsupported algorithm: ' + algorithm);
        }
    }

    /**
     * Validate input parameters
     */
    validateInput(text, algorithm, options = {}) {
        const errors = [];

        if (!text || text.trim() === '') {
            errors.push('Input text cannot be empty');
        }

        if (!algorithm) {
            errors.push('Please select an encryption algorithm');
        }

        const algorithmInfo = this.getAlgorithmInfo(algorithm);
        if (!algorithmInfo) {
            errors.push('Invalid algorithm selected');
            return errors;
        }

        // Check if password is required
        if (algorithmInfo.keyRequired && (!options.password || options.password.trim() === '')) {
            errors.push(`Password is required for ${algorithmInfo.name}`);
        }

        // Validate Caesar cipher shift
        if (algorithm === 'caesar') {
            const shift = options.shift || 3;
            if (shift < 1 || shift > 25) {
                errors.push('Caesar cipher shift must be between 1 and 25');
            }
        }

        // Check text length
        if (text.length > 10000) {
            errors.push('Text length cannot exceed 10,000 characters');
        }

        return errors;
    }

    /**
     * Generate random password
     */
    generateRandomPassword(length = 16) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        return password;
    }

    /**
     * Get security recommendations for each algorithm
     */
    getSecurityRecommendations(algorithm) {
        const recommendations = {
            caesar: [
                'Caesar cipher is easily breakable and should only be used for educational purposes',
                'Modern frequency analysis can crack it in seconds',
                'Consider using stronger encryption for sensitive data'
            ],
            aes: [
                'Use a strong, unique password of at least 12 characters',
                'Include uppercase, lowercase, numbers, and special characters',
                'Never reuse passwords across different data',
                'Consider using AES-256 for maximum security'
            ],
            des: [
                'DES is considered insecure by modern standards',
                'Use only for legacy compatibility or educational purposes',
                'Prefer AES for new applications',
                'Key length of 56 bits is vulnerable to brute force attacks'
            ],
            base64: [
                'Base64 is encoding, not encryption - provides no security',
                'Anyone can decode Base64 without a key',
                'Use only for data formatting, not security',
                'Combine with actual encryption for secure applications'
            ],
            sha256: [
                'SHA-256 produces irreversible hash values',
                'Excellent for password hashing and data integrity',
                'Consider adding salt for password hashing',
                'Cannot be decrypted - one-way function only'
            ],
            md5: [
                'MD5 is cryptographically broken and vulnerable',
                'Should not be used for security-sensitive applications',
                'Prone to collision attacks',
                'Use SHA-256 or newer hash functions instead'
            ]
        };

        return recommendations[algorithm] || [];
    }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EncryptionManager;
}