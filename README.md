# Web-Based Text Encryption Tool

A single-page web application that allows users to encrypt and decrypt text using various encryption algorithms.

## Features

- **Multiple Encryption Algorithms**: Caesar Cipher, AES, DES, Base64
- **Hashing Options**: SHA-256, MD5
- **Decryption Support**: Decrypt previously encrypted text
- **Copy Functionality**: Easy copy-to-clipboard feature
- **Input Validation**: Prevents empty inputs and ensures algorithm selection
- **Responsive Design**: Works on desktop and mobile devices

## Supported Algorithms

### Encryption Algorithms
1. **Caesar Cipher** - Simple substitution cipher with customizable shift
2. **AES (Advanced Encryption Standard)** - Industry-standard symmetric encryption
3. **DES (Data Encryption Standard)** - Legacy symmetric encryption
4. **Base64** - Encoding scheme for data representation

### Hashing Algorithms
1. **SHA-256** - Secure Hash Algorithm
2. **MD5** - Message Digest Algorithm (for demonstration purposes)

## Usage

1. Open `index.html` in a web browser
2. Enter your text in the input field
3. Select an encryption/hashing algorithm from the dropdown
4. Click "Process" to encrypt/hash the text
5. Use "Decrypt" to reverse the encryption (where applicable)
6. Copy the result using the copy button

## Technical Details

- **Frontend**: Pure HTML, CSS, JavaScript
- **Encryption Library**: CryptoJS
- **No Backend Required**: All processing happens client-side
- **Responsive Design**: Bootstrap-inspired CSS

## Security Note

This tool is for educational and demonstration purposes. For production use, always use proper key management and secure communication channels.