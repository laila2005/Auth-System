# 🔐 Auth System

A frontend authentication system with glassmorphism design built using vanilla HTML, CSS, and JavaScript.

## 📋 Purpose

Complete user authentication flow including registration, login, session management, and profile dashboard with modern glassmorphism UI design.

## ⚡ Core Functionality

- **User Registration**: Username, email, password validation
- **User Login**: Credential verification and session creation
- **Profile Dashboard**: Protected user area with account details
- **Session Management**: Login state persistence and logout
- **Form Validation**: Real-time input validation with visual feedback

## 📁 Project Structure

```
Auth-System/
├── index.html          # Registration page
├── Login.html          # Login page  
├── profile.html        # User dashboard
├── css/style.css       # Glassmorphism styling
└── js/main.js          # Authentication logic
```

## 🚀 Quick Start

1. Open `index.html` in your browser
2. Register a new account or use existing credentials
3. Navigate through the authentication flow

## 🛠️ Technical Implementation

### **Stack**
- **HTML5**: Form structure and semantic markup
- **CSS3**: Glassmorphism effects with backdrop-filter
- **JavaScript**: Authentication logic and localStorage management

### **Key Functions**
```javascript
registerUser(username, password)  // User registration
loginUser(username, password)     // User authentication  
logoutUser()                      // Session termination
getCurrentUser()                  // Get active session
```

### **Data Storage**
- **LocalStorage**: Client-side user data persistence
- **JSON Format**: Structured user and session data
- **Session Management**: Login state tracking

### **CSS Features**
- **Glassmorphism**: `backdrop-filter: blur()` effects
- **3D Interactions**: Transform animations on hover/click
- **Responsive Design**: Mobile-first breakpoints
- **Form Validation**: Visual feedback for input states

---

**Built with vanilla web technologies** 🚀
