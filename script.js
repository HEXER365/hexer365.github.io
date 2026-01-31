// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initSkillBars();
    initMatrixBackground();
    initGlitchEffect();
    initParallaxEffect();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const commands = [
        'whoami',
        'cat /etc/passwd | grep h3x4r',
        'nmap -sS -O target.com',
        'sqlmap -u "target.com/page.php?id=1" --dbs',
        'python3 exploit.py --target 192.168.1.1',
        'nc -lvp 4444',
        'echo "Welcome to H3X4R\'s domain"'
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeCommand() {
        const currentCommand = commands[commandIndex];
        
        if (!isDeleting && !isPaused) {
            // Typing
            typingElement.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentCommand.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                }, 2000); // Pause for 2 seconds
            }
        } else if (isDeleting && !isPaused) {
            // Deleting
            typingElement.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                commandIndex = (commandIndex + 1) % commands.length;
            }
        }
        
        // Adjust typing speed
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeCommand, speed);
    }
    
    // Start typing animation
    setTimeout(typeCommand, 1000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.finding-card, .project-card, .skill-category, .about-terminal, .contact-terminal'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Skill bar animations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 500);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Matrix background effect
function initMatrixBackground() {
    const matrixBg = document.getElementById('matrix-bg');
    
    // Create matrix rain effect
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        
        matrixBg.appendChild(canvas);
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 50);
    }
    
    // Only create matrix rain on desktop for performance
    if (window.innerWidth > 768) {
        createMatrixRain();
    }
}

// Glitch effect for brand text
function initGlitchEffect() {
    const brandText = document.querySelector('.brand-text');
    
    if (brandText) {
        brandText.setAttribute('data-text', brandText.textContent);
        brandText.classList.add('glitch');
        
        // Random glitch trigger
        setInterval(() => {
            if (Math.random() > 0.95) {
                brandText.style.animation = 'none';
                setTimeout(() => {
                    brandText.style.animation = '';
                }, 100);
            }
        }, 2000);
    }
}

// Parallax effect for sections
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Terminal command simulator
function simulateTerminalCommand(element, command, output) {
    const terminalBody = element.querySelector('.terminal-body');
    
    // Create new command line
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `
        <span class="prompt">root@h3x4r:~$</span>
        <span class="command">${command}</span>
    `;
    
    terminalBody.appendChild(commandLine);
    
    // Add output after delay
    setTimeout(() => {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output';
        outputDiv.innerHTML = output;
        terminalBody.appendChild(outputDiv);
        
        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 1000);
}

// Interactive terminal for contact section
function initInteractiveTerminal() {
    const contactTerminal = document.querySelector('.contact-terminal');
    
    if (contactTerminal) {
        // Add click event to simulate commands
        contactTerminal.addEventListener('click', function() {
            const commands = [
                { cmd: 'cat social_links.txt', output: 'Loading social media profiles...' },
                { cmd: 'ping h3x4r.dev', output: 'PING h3x4r.dev: 64 bytes from server: time=1ms' },
                { cmd: 'whoami', output: 'h3x4r - Ethical Hacker & Security Researcher' }
            ];
            
            const randomCommand = commands[Math.floor(Math.random() * commands.length)];
            simulateTerminalCommand(this, randomCommand.cmd, randomCommand.output);
        });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + Shift + H for home
    if (e.ctrlKey && e.shiftKey && e.key === 'H') {
        e.preventDefault();
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Ctrl + Shift + C for contact
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Loading screen (optional)
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="ascii-art">
██╗  ██╗██████╗ ██╗  ██╗██╗  ██╗██████╗ 
██║  ██║╚════██╗╚██╗██╔╝██║  ██║██╔══██╗
███████║ █████╔╝ ╚███╔╝ ███████║██████╔╝
██╔══██║ ╚═══██╗ ██╔██╗ ╚════██║██╔══██╗
██║  ██║██████╔╝██╔╝ ██╗     ██║██║  ██║
╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝     ╚═╝╚═╝  ╚═╝
            </div>
            <div class="loading-text">Initializing secure connection...</div>
            <div class="loading"></div>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: var(--accent-green);
        font-family: var(--font-mono);
        text-align: center;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 2000);
}

// Easter eggs
function initEasterEggs() {
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Activate easter egg
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 3000);
            
            konamiCode = [];
        }
    });
    
    // Console message
    console.log(`
    ██╗  ██╗██████╗ ██╗  ██╗██╗  ██╗██████╗ 
    ██║  ██║╚════██╗╚██╗██╔╝██║  ██║██╔══██╗
    ███████║ █████╔╝ ╚███╔╝ ███████║██████╔╝
    ██╔══██║ ╚═══██╗ ██╔██╗ ╚════██║██╔══██╗
    ██║  ██║██████╔╝██╔╝ ██╗     ██║██║  ██║
    ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝     ╚═╝╚═╝  ╚═╝
    
    Welcome to H3X4R's domain!
    
    Ethical Hacker | Bug Bounty Hunter | Cybersecurity Researcher
    
    Looking for vulnerabilities? Check out my findings section!
    Interested in collaboration? Feel free to reach out!
    
    Remember: Always hack ethically and responsibly.
    `);
}

// Initialize easter eggs
initEasterEggs();

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Scroll-dependent operations here
        }, 16); // ~60fps
    });
}

// Initialize performance optimizations
optimizePerformance();

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Theme toggle functionality (bonus feature)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: var(--bg-secondary);
        border: 1px solid var(--accent-green);
        color: var(--accent-green);
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        transition: var(--transition);
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        this.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
}

// Initialize theme toggle
initThemeToggle();

