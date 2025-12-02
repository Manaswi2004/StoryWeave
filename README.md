github
📖 StoryWeave - Interactive Storytelling Platform
<p align="center"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"> <img src="https://img.shields.io/badge/NoBackend-100%25%20Browser-4CAF50?style=for-the-badge" alt="No Backend"> </p><p align="center"> <strong>Create Interactive Choose-Your-Own-Adventure Stories in Your Browser</strong> </p><p align="center"> <a href="#-live-demo">View Demo</a> • <a href="#-features">Features</a> • <a href="#-quick-start">Quick Start</a> • <a href="#-screenshots">Screenshots</a> • <a href="#-project-structure">Structure</a> • <a href="#-how-it-works">How It Works</a> • <a href="#-contributing">Contributing</a> </p>
https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80

🎭 About StoryWeave
StoryWeave is a modern, browser-based interactive storytelling platform that allows you to create, read, and manage choose-your-own-adventure stories. Built entirely with HTML5, CSS3, and vanilla JavaScript, it requires no backend server, database, or installation - everything runs locally in your browser!

Perfect for writers, game designers, educators, or anyone who wants to create interactive narratives without technical complexity.

✨ Key Features
🎨 For Creators
📝 Visual Story Editor - Intuitive interface for writing stories

🌳 Branching Narratives - Create multiple story paths and endings

🎯 Choice Management - Easily add and manage reader choices

💾 Auto-Save - Stories saved locally in your browser

🎮 Instant Preview - Test your stories as you write

📖 For Readers
🎮 Interactive Reading - Click choices to shape the story

📊 Progress Tracking - Visual progress bar and chapter indicators

🔄 Multiple Endings - Discover different story conclusions

📱 Responsive Design - Read on any device

🛠️ Technical Features
⚡ No Installation - Runs 100% in browser

🔒 Privacy First - All data stays on your device

🎨 Modern UI - Beautiful gradients and animations

📱 Mobile Responsive - Works on all screen sizes

💾 Local Storage - Stories persist across sessions

🚀 Quick Start
Prerequisites
Any modern web browser (Chrome, Firefox, Edge, Safari)

Basic text editor (VS Code, Sublime, Notepad++)

Installation
bash
# Clone the repository
git clone https://github.com/yourusername/storyweave.git

# Navigate to project directory
cd storyweave

# That's it! Just open index.html in your browser
Alternative: Direct Download
Download the ZIP file from GitHub

Extract to any folder

Open index.html in your browser

Development Setup
bash
# For development, you can use Live Server in VS Code:
# 1. Install VS Code
# 2. Install "Live Server" extension
# 3. Right-click index.html → "Open with Live Server"
📸 Screenshots
Home Page	Story Creator	Interactive Reader
https://via.placeholder.com/400x250/667eea/ffffff?text=Home+Page	https://via.placeholder.com/400x250/764ba2/ffffff?text=Story+Creator	https://via.placeholder.com/400x250/6C63FF/ffffff?text=Interactive+Reader
Library View	Mobile View	Demo Story
https://via.placeholder.com/400x250/36D1DC/ffffff?text=Story+Library	https://via.placeholder.com/200x350/FF6584/ffffff?text=Mobile+View	https://via.placeholder.com/400x250/FF9800/ffffff?text=Demo+Story
📁 Project Structure
text
storyweave/
├── index.html          # Main HTML file (Everything in one page!)
├── style.css           # Enhanced CSS with animations & gradients
├── script.js           # Complete JavaScript logic
├── README.md           # This documentation
└── assets/             # (Optional) For future images/icons
File Descriptions:
index.html - Single-page application with all UI components

style.css - Modern styling with gradients, animations, and responsive design

script.js - Complete application logic with StoryManager and UIManager classes

🎮 How to Use
Creating Your First Story
Open StoryWeave in your browser

Click "Start Creating" or navigate to Creator page

Enter your story title and opening scene

Add choices for readers to select

Click "Save Chapter" and continue building

Use "Preview" to test your story

Stories are automatically saved in your browser

Reading Stories
Browse stories in the Library page

Click "Read" on any story

Read the chapter content

Click on choices to advance the story

Track your progress with the progress bar

Discover multiple endings!

Demo Story
Try the pre-loaded demo story "The Mysterious Forest" to see StoryWeave in action!

🛠️ How It Works
Technology Stack
HTML5 - Semantic markup and structure

CSS3 - Modern styling with CSS Grid, Flexbox, and custom properties

Vanilla JavaScript - No frameworks, pure JavaScript

Local Storage API - Browser-based data persistence

ES6 Classes - Modular, object-oriented design

Core Components
StoryManager Class - Handles story data and local storage

UIManager Class - Manages UI interactions and page navigation

Single Page Architecture - Smooth transitions between views

Responsive Design - Works on desktop, tablet, and mobile

Data Storage
javascript
// Stories are stored in browser's localStorage
localStorage.setItem('storyweave_stories', JSON.stringify(stories));

// Example story structure
{
  id: 'unique_id',
  title: 'Story Title',
  chapters: [
    {
      title: 'Chapter 1',
      content: 'Story text...',
      choices: ['Choice 1', 'Choice 2', 'Choice 3']
    }
  ],
  createdAt: '2024-01-01T12:00:00Z'
}
🌟 Features in Detail
1. Branching Narrative System
Create unlimited story branches

Multiple endings support

Non-linear story progression

2. Beautiful UI/UX
Gradient backgrounds and modern cards

Smooth animations and transitions

Intuitive navigation

Progress indicators

3. Data Management
Automatic save/load from localStorage

Import/export functionality (coming soon)

Story statistics and analytics

4. Accessibility
Keyboard navigation support

Screen reader friendly

High contrast mode ready

🔮 Future Roadmap
Planned Features
Cloud Sync - Save stories to cloud accounts

Collaborative Editing - Multiple authors per story

Story Templates - Pre-built story structures

Export Options - PDF, EPUB, HTML export

Advanced Analytics - Reader behavior tracking

Multimedia Support - Images, audio in stories

Themes & Customization - Custom color schemes

PWA Support - Install as app on mobile

Technical Improvements
Service Workers - Offline functionality

IndexedDB - Larger story storage

Web Components - Modular UI elements

TypeScript - Type-safe development

🤝 Contributing
We welcome contributions! Here's how you can help:

Reporting Issues
Check if the issue already exists

Create a new issue with clear description

Include steps to reproduce

Add screenshots if possible

Suggesting Features
Check the roadmap first

Create a feature request issue

Explain the use case and benefits

Suggest implementation ideas

Pull Requests
Fork the repository

Create a feature branch

Make your changes

Add/update tests if needed

Submit PR with clear description

Development Guidelines
bash
# Code Style
- Use meaningful variable names
- Comment complex logic
- Follow existing code structure
- Keep functions small and focused

# Git Commit Messages
feat: Add new feature
fix: Bug fix
docs: Documentation changes
style: Code formatting
refactor: Code restructuring
test: Add/update tests
📚 Learning Resources
For Beginners
MDN Web Docs - HTML/CSS/JavaScript reference

JavaScript.info - Modern JavaScript tutorial

CSS-Tricks - CSS guides and tricks

For Advanced Users
LocalStorage API

CSS Custom Properties

ES6 Classes

🐛 Troubleshooting
Common Issues
Q: Stories are not saving
A: Check if localStorage is enabled in your browser settings

Q: Page looks broken
A: Clear browser cache and reload (Ctrl+F5 or Cmd+Shift+R)

Q: Can't add more choices
A: Refresh the page and try again

Q: Mobile view issues
A: Ensure you're using a modern browser (Chrome/Firefox/Safari)

Browser Compatibility
✅ Chrome 60+

✅ Firefox 55+

✅ Safari 11+

✅ Edge 79+

✅ Opera 47+

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Icons by Font Awesome

Color palette inspired by Coolors

Gradient generator by CSS Gradient

Demo story inspired by classic choose-your-own-adventure books

