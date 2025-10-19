# Web-Based Text Encryption Tool - User Manual

## Table of Contents
1. [Getting Started](#getting-started)
2. [Supported Algorithms](#supported-algorithms)
3. [How to Use](#how-to-use)
4. [Security Guidelines](#security-guidelines)
5. [Troubleshooting](#troubleshooting)
6. [Technical Details](#technical-details)

## Getting Started

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for CryptoJS library)
- No additional software installation required

### Installation
1. Download all project files
2. Open `index.html` in your web browser
3. The application will load automatically

### Quick Start
1. Enter your text in the input field
2. Select an encryption algorithm
3. Provide required parameters (password/key if needed)
4. Click "Process" to encrypt or "Decrypt" to reverse

## Supported Algorithms

### Encryption Algorithms

#### 1. Caesar Cipher
- **Type**: Substitution Cipher
- **Security Level**: Very Low (Educational only)
- **Key Required**: No (uses shift value)
- **Parameters**: Shift value (1-25)
- **Use Case**: Learning cryptography basics

**How it works**: Each letter is shifted by a fixed number of positions in the alphabet.

**Example**:
- Text: "HELLO"
- Shift: 3
- Result: "KHOOR"

#### 2. AES (Advanced Encryption Standard)
- **Type**: Symmetric Encryption
- **Security Level**: Very High
- **Key Required**: Yes (password)
- **Parameters**: Password/passphrase
- **Use Case**: Securing sensitive data

**How it works**: Industry-standard encryption using a secret key to encrypt and decrypt data.

**Best Practices**:
- Use strong passwords (12+ characters)
- Include uppercase, lowercase, numbers, symbols
- Never reuse passwords

#### 3. DES (Data Encryption Standard)
- **Type**: Symmetric Encryption
- **Security Level**: Low (Legacy)
- **Key Required**: Yes (password)
- **Parameters**: Password/passphrase
- **Use Case**: Legacy system compatibility

**Note**: DES is considered insecure by modern standards. Use AES for new applications.

#### 4. Base64 Encoding
- **Type**: Encoding (not encryption)
- **Security Level**: None
- **Key Required**: No
- **Parameters**: None
- **Use Case**: Data formatting, not security

**Important**: Base64 is NOT encryption! Anyone can decode it without a key.

### Hashing Algorithms

#### 5. SHA-256
- **Type**: Cryptographic Hash
- **Security Level**: Very High
- **Key Required**: No
- **Parameters**: None
- **Use Case**: Data integrity, password hashing

**Note**: SHA-256 is one-way - you cannot decrypt the hash back to original text.

#### 6. MD5
- **Type**: Hash Function
- **Security Level**: Very Low (Broken)
- **Key Required**: No
- **Parameters**: None
- **Use Case**: Educational/compatibility only

**Warning**: MD5 is cryptographically broken. Use SHA-256 instead.

## How to Use

### Basic Encryption Process

1. **Enter Text**
   - Type or paste text in the input field
   - Maximum 10,000 characters
   - Character counter shows current length

2. **Select Algorithm**
   - Choose from dropdown menu
   - Algorithm information appears below
   - Required fields will show automatically

3. **Provide Parameters**
   - **Caesar Cipher**: Set shift value (1-25)
   - **AES/DES**: Enter password
   - **Base64/Hashing**: No additional parameters

4. **Process Text**
   - Click "Process" button
   - Result appears in output area
   - Use "Copy" button to copy result

### Decryption Process

1. **Enter Encrypted Text**
   - Paste encrypted text in input field
   - Select the same algorithm used for encryption

2. **Provide Same Parameters**
   - Use identical password/shift value
   - Parameters must match exactly

3. **Decrypt**
   - Click "Decrypt" button
   - Original text should appear in output

### Advanced Features

#### Keyboard Shortcuts
- **Ctrl+Enter**: Process text
- **Ctrl+K**: Clear all fields
- **Ctrl+Shift+C**: Copy result

#### Password Management
- Click eye icon to show/hide password
- Use strong, unique passwords for each encryption

#### Copy Functionality
- One-click copying to clipboard
- Visual confirmation when copied
- Works with all encrypted/hashed output

## Security Guidelines

### Password Security
1. **Strong Passwords**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Avoid dictionary words
   - Don't use personal information

2. **Password Management**
   - Never reuse encryption passwords
   - Store passwords securely (password manager)
   - Don't share passwords in plain text

### Algorithm Selection
1. **For Sensitive Data**: Use AES
2. **For Learning**: Use Caesar Cipher
3. **For Data Integrity**: Use SHA-256
4. **For Compatibility**: Avoid DES and MD5

### General Security
1. **Environment**
   - Use on trusted computers only
   - Clear browser cache after use
   - Avoid public/shared computers

2. **Data Handling**
   - Don't store sensitive data unencrypted
   - Use secure communication channels
   - Regular security updates

## Troubleshooting

### Common Issues

#### "Text and password are required" Error
- **Cause**: Empty input field or missing password
- **Solution**: Enter text and provide password for AES/DES

#### "Invalid password or corrupted data" Error
- **Cause**: Wrong password or corrupted encrypted text
- **Solution**: Verify password and encrypted text are correct

#### "Caesar cipher shift must be between 1 and 25" Error
- **Cause**: Invalid shift value
- **Solution**: Enter number between 1-25

#### Copy Function Not Working
- **Cause**: Browser security restrictions
- **Solution**: 
  - Allow clipboard access in browser
  - Use Ctrl+C as fallback
  - Try different browser

### Browser Compatibility
- **Supported**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Issues**: Older browsers may not support all features
- **Solution**: Update browser or use modern alternative

### Performance Issues
- **Large Text**: Processing may be slower for very large texts
- **Solution**: Break large texts into smaller chunks

## Technical Details

### Architecture
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Encryption**: CryptoJS library (v4.1.1)
- **Processing**: Client-side only (no server required)

### File Structure
```
Web-Based Text Encryption Tool/
├── index.html              # Main application page
├── test.html              # Algorithm testing page
├── README.md              # Project documentation
├── USER_MANUAL.md         # This user manual
└── assets/
    ├── css/
    │   └── style.css      # Application styling
    └── js/
        ├── encryption.js  # Encryption algorithms
        └── main.js        # UI logic and interactions
```

### Dependencies
- **CryptoJS**: Cryptographic functions library
- **No Build Process**: Pure frontend, no compilation needed
- **CDN Delivery**: External libraries loaded from CDN

### Browser APIs Used
- **Clipboard API**: For copy functionality
- **LocalStorage**: Not used (for security)
- **Web Crypto API**: Not used (CryptoJS provides compatibility)

### Security Considerations
- **Client-Side Only**: All processing happens in browser
- **No Data Transmission**: No data sent to servers
- **Memory Management**: Variables cleared after use
- **No Persistence**: No data stored locally

### Performance Notes
- **Encryption Speed**: Depends on text length and algorithm
- **Memory Usage**: Optimized for typical text sizes
- **Browser Limits**: 10,000 character limit for stability

## Support and Contributing

### Getting Help
- Check this manual for common issues
- Test with the included test.html file
- Verify browser compatibility

### Reporting Issues
When reporting problems, include:
- Browser and version
- Operating system
- Exact error message
- Steps to reproduce

### Educational Use
This tool is designed for:
- Learning cryptography concepts
- Understanding encryption algorithms
- Demonstrating security principles
- Academic projects and assignments

**Remember**: This tool is for educational purposes. For production applications, use established security frameworks and proper key management systems.

---

*Last updated: October 2025*
*Version: 1.0.0*