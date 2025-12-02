// Story Manager Class
class StoryManager {
    constructor() {
        this.stories = JSON.parse(localStorage.getItem('storyweave_stories')) || [];
        this.currentStory = null;
        this.currentChapterIndex = 0;
        this.initDemoStory();
    }
    
    initDemoStory() {
        if (this.stories.length === 0) {
            this.stories.push({
                id: 'demo',
                title: 'The Mysterious Forest',
                chapters: [
                    {
                        title: 'The Beginning',
                        content: 'You wake up in a mysterious forest. The air is cool and misty. Ancient trees tower above you, their branches forming a canopy that barely lets light through. You remember nothing about how you got here. As you look around, you see three distinct paths ahead...',
                        choices: [
                            'Take the left path into the dark, dense forest',
                            'Follow the middle path along the bubbling stream',
                            'Go right up the steep mountain trail'
                        ]
                    },
                    {
                        title: 'Dark Forest Path',
                        content: 'You choose the left path. The forest grows darker as you proceed. Strange glowing mushrooms illuminate the path. You hear whispers in the wind that seem to be calling your name...',
                        choices: [
                            'Investigate the glowing mushrooms',
                            'Follow the mysterious whispers',
                            'Turn back and choose another path'
                        ]
                    },
                    {
                        title: 'Stream Path',
                        content: 'You follow the stream. The water is crystal clear and filled with colorful fish. After walking for a while, you come across a beautiful waterfall with a hidden cave behind it...',
                        choices: [
                            'Explore the hidden cave',
                            'Continue following the stream',
                            'Rest by the waterfall'
                        ]
                    },
                    {
                        title: 'Mountain Path',
                        content: 'You climb the mountain trail. The air gets thinner as you ascend. At the peak, you find an ancient temple with strange symbols on its walls. A mysterious voice echoes from within...',
                        choices: [
                            'Enter the ancient temple',
                            'Study the symbols on the walls',
                            'Descend the mountain quickly'
                        ]
                    }
                ],
                createdAt: new Date().toISOString()
            });
            this.saveStories();
        }
    }
    
    saveStories() {
        localStorage.setItem('storyweave_stories', JSON.stringify(this.stories));
    }
    
    createStory(title, content) {
        const newStory = {
            id: 'story_' + Date.now(),
            title: title || 'Untitled Story',
            chapters: [{
                title: 'Chapter 1',
                content: content || 'Write your story here...',
                choices: []
            }],
            createdAt: new Date().toISOString()
        };
        
        this.stories.unshift(newStory);
        this.saveStories();
        return newStory;
    }
    
    addChapter(storyId, chapter) {
        const story = this.stories.find(s => s.id === storyId);
        if (story) {
            story.chapters.push(chapter);
            this.saveStories();
        }
    }
    
    getStory(id) {
        return this.stories.find(s => s.id === id);
    }
    
    deleteStory(id) {
        this.stories = this.stories.filter(s => s.id !== id);
        this.saveStories();
    }
    
    clearStories() {
        this.stories = [];
        this.saveStories();
    }
}

// UI Manager Class
class UIManager {
    constructor(storyManager) {
        this.storyManager = storyManager;
        this.currentPage = 'home';
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showPage('home');
        this.updateLibrary();
    }
    
    setupEventListeners() {
        // Navigation
        document.getElementById('navHome').addEventListener('click', () => this.showPage('home'));
        document.getElementById('navCreate').addEventListener('click', () => this.showPage('creator'));
        document.getElementById('navLibrary').addEventListener('click', () => this.showPage('library'));
        document.getElementById('backHome').addEventListener('click', () => this.showPage('home'));
        document.getElementById('backToCreator').addEventListener('click', () => this.showPage('creator'));
        
        // Home Page
        document.getElementById('startCreating').addEventListener('click', () => this.showPage('creator'));
        document.getElementById('tryDemo').addEventListener('click', () => this.playDemo());
        document.getElementById('createQuickStory').addEventListener('click', () => this.createQuickStory());
        
        // Creator Page
        document.getElementById('addChoice').addEventListener('click', () => this.addChoiceInput());
        document.getElementById('saveChapter').addEventListener('click', () => this.saveChapter());
        document.getElementById('previewStory').addEventListener('click', () => this.previewStory());
        
        // Reader Page
        document.getElementById('restartStory').addEventListener('click', () => this.restartStory());
        
        // Library Page
        document.getElementById('clearStories').addEventListener('click', () => this.clearStories());
        
        // Remove choice buttons (event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-choice') || 
                e.target.parentElement.classList.contains('remove-choice')) {
                const choiceInput = e.target.closest('.choice-input');
                if (choiceInput) {
                    choiceInput.remove();
                }
            }
        });
    }
    
    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(pageName + 'Page').classList.add('active');
        this.currentPage = pageName;
        
        // Update UI based on page
        if (pageName === 'library') {
            this.updateLibrary();
        }
    }
    
    // Home Page Functions
    createQuickStory() {
        const title = document.getElementById('quickTitle').value || 'My Adventure';
        const content = document.getElementById('quickContent').value;
        
        const story = this.storyManager.createStory(title, content);
        this.storyManager.currentStory = story;
        this.storyManager.currentChapterIndex = 0;
        
        this.loadChapter();
        this.showPage('reader');
        this.updateProgress();
    }
    
    playDemo() {
        const demoStory = this.storyManager.stories[0];
        this.storyManager.currentStory = demoStory;
        this.storyManager.currentChapterIndex = 0;
        
        this.loadChapter();
        this.showPage('reader');
        this.updateProgress();
    }
    
    // Creator Page Functions
    addChoiceInput() {
        const container = document.getElementById('choicesContainer');
        const choiceInput = document.createElement('div');
        choiceInput.className = 'choice-input';
        choiceInput.innerHTML = `
            <input type="text" class="form-control" placeholder="Enter choice text">
            <button class="btn btn-danger btn-small remove-choice">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(choiceInput);
    }
    
    saveChapter() {
        const title = document.getElementById('storyTitle').value || 'Untitled Story';
        const content = document.getElementById('chapterContent').value;
        
        // Get choices
        const choiceInputs = document.querySelectorAll('#choicesContainer input');
        const choices = Array.from(choiceInputs)
            .map(input => input.value.trim())
            .filter(text => text.length > 0);
        
        if (!this.storyManager.currentStory) {
            // Create new story
            const story = this.storyManager.createStory(title, content);
            this.storyManager.currentStory = story;
        } else {
            // Add chapter to existing story
            const chapter = {
                title: `Chapter ${this.storyManager.currentStory.chapters.length + 1}`,
                content: content,
                choices: choices
            };
            
            this.storyManager.currentStory.chapters.push(chapter);
            this.storyManager.saveStories();
        }
        
        // Update chapters list
        this.updateChaptersList();
        
        // Show success message
        this.showToast('Chapter saved successfully!', 'success');
    }
    
    updateChaptersList() {
        const container = document.getElementById('chaptersList');
        if (this.storyManager.currentStory && this.storyManager.currentStory.chapters.length > 0) {
            container.innerHTML = this.storyManager.currentStory.chapters.map((chapter, index) => `
                <div class="story-card mb-2">
                    <div class="flex justify-between items-center">
                        <div>
                            <strong>${chapter.title}</strong>
                            <p class="text-muted" style="font-size: 0.9rem; margin-top: 0.25rem;">
                                ${chapter.content.substring(0, 100)}...
                            </p>
                        </div>
                        <button class="btn btn-secondary btn-small" onclick="uiManager.editChapter(${index})">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    previewStory() {
        if (this.storyManager.currentStory) {
            this.storyManager.currentChapterIndex = 0;
            this.loadChapter();
            this.showPage('reader');
            this.updateProgress();
        } else {
            this.showToast('Create a story first!', 'warning');
        }
    }
    
    // Reader Page Functions
    loadChapter() {
        if (!this.storyManager.currentStory || 
            !this.storyManager.currentStory.chapters[this.storyManager.currentChapterIndex]) {
            return;
        }
        
        const chapter = this.storyManager.currentStory.chapters[this.storyManager.currentChapterIndex];
        
        // Update UI
        document.getElementById('currentStoryTitle').textContent = this.storyManager.currentStory.title;
        document.getElementById('chapterNumber').textContent = this.storyManager.currentChapterIndex + 1;
        document.getElementById('storyText').textContent = chapter.content;
        
        // Update choices
        const choicesGrid = document.getElementById('choicesGrid');
        if (chapter.choices && chapter.choices.length > 0) {
            choicesGrid.innerHTML = chapter.choices.map((choice, index) => `
                <button class="choice-btn" onclick="uiManager.makeChoice(${index})">
                    <i class="fas fa-arrow-right"></i>
                    ${choice}
                </button>
            `).join('');
        } else {
            choicesGrid.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-flag-checkered fa-2x mb-2" style="color: var(--primary);"></i>
                    <h3>The End</h3>
                    <p class="text-muted mb-3">This story path ends here.</p>
                    <button class="btn btn-primary" onclick="uiManager.restartStory()">
                        <i class="fas fa-redo"></i> Start Over
                    </button>
                </div>
            `;
        }
        
        this.updateProgress();
    }
    
    makeChoice(choiceIndex) {
        // For demo, just go to next chapter
        if (this.storyManager.currentStory.id === 'demo') {
            const nextChapter = (this.storyManager.currentChapterIndex + 1) % 
                Math.min(this.storyManager.currentStory.chapters.length, 4);
            this.storyManager.currentChapterIndex = nextChapter;
        } else {
            // For user stories, you could implement branching logic here
            this.storyManager.currentChapterIndex++;
        }
        
        if (this.storyManager.currentChapterIndex >= this.storyManager.currentStory.chapters.length) {
            this.storyManager.currentChapterIndex = this.storyManager.currentStory.chapters.length - 1;
        }
        
        this.loadChapter();
    }
    
    restartStory() {
        this.storyManager.currentChapterIndex = 0;
        this.loadChapter();
        this.showToast('Story restarted!', 'info');
    }
    
    updateProgress() {
        if (!this.storyManager.currentStory) return;
        
        const totalChapters = this.storyManager.currentStory.chapters.length;
        const progress = Math.min(100, ((this.storyManager.currentChapterIndex + 1) / totalChapters) * 100);
        
        document.getElementById('progressPercent').textContent = Math.round(progress) + '%';
        document.getElementById('progressFill').style.width = progress + '%';
    }
    
    // Library Page Functions
    updateLibrary() {
        const container = document.getElementById('storiesGrid');
        const stories = this.storyManager.stories;
        
        if (stories.length === 0) {
            container.innerHTML = `
                <div class="text-center col-span-full py-8">
                    <i class="fas fa-book-open fa-3x mb-4" style="color: var(--primary);"></i>
                    <h3>No Stories Yet</h3>
                    <p class="text-muted mb-4">Create your first interactive story!</p>
                    <button class="btn btn-primary" onclick="uiManager.showPage('creator')">
                        <i class="fas fa-plus"></i> Create Story
                    </button>
                </div>
            `;
        } else {
            container.innerHTML = stories.map(story => `
                <div class="story-card">
                    <h3>${story.title}</h3>
                    <div class="story-meta">
                        <span>${story.chapters.length} chapters</span>
                        <span>${new Date(story.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div class="flex gap-2 mt-3">
                        <button class="btn btn-primary flex-1" onclick="uiManager.openStory('${story.id}')">
                            <i class="fas fa-play"></i> Read
                        </button>
                        <button class="btn btn-secondary" onclick="uiManager.deleteStory('${story.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    openStory(storyId) {
        const story = this.storyManager.getStory(storyId);
        if (story) {
            this.storyManager.currentStory = story;
            this.storyManager.currentChapterIndex = 0;
            this.loadChapter();
            this.showPage('reader');
        }
    }
    
    deleteStory(storyId) {
        if (confirm('Are you sure you want to delete this story?')) {
            this.storyManager.deleteStory(storyId);
            this.updateLibrary();
            this.showToast('Story deleted!', 'success');
        }
    }
    
    clearStories() {
        if (confirm('Are you sure you want to delete ALL stories? This cannot be undone.')) {
            this.storyManager.clearStories();
            this.updateLibrary();
            this.showToast('All stories cleared!', 'success');
        }
    }
    
    // Utility Functions
    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                                  type === 'warning' ? 'exclamation-triangle' : 
                                  type === 'danger' ? 'times-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: var(--radius);
                    background: var(--gradient-card);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: var(--shadow-lg);
                    z-index: 9999;
                    animation: slideInRight 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .toast-success { border-left: 4px solid var(--success); }
                .toast-warning { border-left: 4px solid var(--warning); }
                .toast-danger { border-left: 4px solid var(--danger); }
                .toast-info { border-left: 4px solid var(--primary); }
                .toast i { font-size: 1.2rem; }
                .toast-success i { color: var(--success); }
                .toast-warning i { color: var(--warning); }
                .toast-danger i { color: var(--danger); }
                .toast-info i { color: var(--primary); }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    editChapter(index) {
        // Load chapter into editor
        const chapter = this.storyManager.currentStory.chapters[index];
        document.getElementById('chapterContent').value = chapter.content;
        
        // Load choices
        const choicesContainer = document.getElementById('choicesContainer');
        choicesContainer.innerHTML = '';
        chapter.choices.forEach(choice => {
            this.addChoiceInput();
            const inputs = choicesContainer.querySelectorAll('input');
            inputs[inputs.length - 1].value = choice;
        });
        
        this.showPage('creator');
        this.showToast('Chapter loaded for editing', 'info');
    }
}

// Initialize the application
const storyManager = new StoryManager();
const uiManager = new UIManager(storyManager);

// Make uiManager globally available for onclick handlers
window.uiManager = uiManager;