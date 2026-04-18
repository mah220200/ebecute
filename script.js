document.addEventListener('click', function(e) {
            // Tạo ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = (e.clientX - 25) + 'px';
            ripple.style.top = (e.clientY - 25) + 'px';
            ripple.style.width = '50px';
            ripple.style.height = '50px';
            document.body.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Tạo pháo hoa tại vị trí click
            createFirework(e.clientX, e.clientY);
        });

        // Cải thiện pháo hoa với nhiều layer
        function createFirework(x, y) {
            const colors = [
                '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', 
                '#eb4d4b', '#6c5ce7', '#a29bfe', '#fdcb6e', '#ff9ff3'
            ];
            
            // Layer 1: Pháo hoa chính (30 hạt)
            for (let i = 0; i < 30; i++) {
                createParticle(x, y, colors, 120 + Math.random() * 180, 800 + Math.random() * 600);
            }
            
            // Layer 2: Hạt nhỏ lấp lánh (15 hạt)
            for (let i = 0; i < 15; i++) {
                createParticle(x, y, colors, 80 + Math.random() * 100, 1200 + Math.random() * 400, 2);
            }
            
            // Layer 3: Tia sáng (8 tia)
            for (let i = 0; i < 8; i++) {
                createSpark(x, y, colors[Math.floor(Math.random() * colors.length)]);
            }
        }

        function createParticle(x, y, colors, velocity, duration, size = 6) {
            const particle = document.createElement('div');
            particle.className = 'firework firework-particle';
            particle.style.left = (x - size/2) + 'px';
            particle.style.top = (y - size/2) + 'px';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (Math.PI * 2 * Math.random());
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${vx}px, ${vy}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
            
            document.body.appendChild(particle);
        }

        function createSpark(x, y, color) {
            const spark = document.createElement('div');
            spark.className = 'firework firework-particle';
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            spark.style.width = '3px';
            spark.style.height = '3px';
            spark.style.background = color;
            
            const angle = (Math.PI * 2 * Math.random());
            const distance = 50 + Math.random() * 30;
            const vx = Math.cos(angle) * distance;
            const vy = Math.sin(angle) * distance;
            
            spark.animate([
                { transform: 'scale(1)', opacity: 1 },
                { 
                    transform: `translate(${vx}px, ${vy}px) scale(0.5)`, 
                    opacity: 0 
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => spark.remove();
            
            document.body.appendChild(spark);
        }
class ResponsiveDisplay {
    constructor() {
        this.init();
    }

    init() {
        // Set viewport tối ưu cho mobile
        this.setOptimalViewport();
        
        // Detect device và apply layout
        this.detectDevice();
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Load content desktop-like
        this.loadDesktopContent();
        
        // Touch events cho mobile
        this.enableTouchGestures();
    }

    setOptimalViewport() {
        // Force desktop viewport trên mobile
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        
        // Desktop-like viewport (có thể điều chỉnh)
        viewport.setAttribute('content', 'width=1200, initial-scale=0.5, maximum-scale=0.5, user-scalable=no');
    }

    detectDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
        
        document.body.classList.toggle('mobile', isMobile);
        document.body.classList.toggle('tablet', isTablet);
        document.body.classList.toggle('desktop', !isMobile && !isTablet);
    }

    loadDesktopContent() {
        const content = document.getElementById('content');
        if (!content) return;

        // HTML content giống desktop
        const desktopContent = `
            <div class="container">
                <header class="header">
                    <h1>Desktop-like Interface</h1>
                    <nav class="nav">
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#services">Services</a>
                        <a href="#contact">Contact</a>
                    </nav>
                </header>

                <main class="main-content">
                    <div class="sidebar">
                        <h3>Sidebar</h3>
                        <ul>
                            <li>Menu 1</li>
                            <li>Menu 2</li>
                            <li>Menu 3</li>
                        </ul>
                    </div>
                    
                    <div class="content-area">
                        <section class="hero">
                            <h2>Chào mừng đến với giao diện Desktop trên Mobile!</h2>
                            <p>Nội dung được tối ưu để hiển thị giống PC</p>
                        </section>
                        
                        <section class="cards">
                            <div class="card">Card 1</div>
                            <div class="card">Card 2</div>
                            <div class="card">Card 3</div>
                            <div class="card">Card 4</div>
                        </section>
                    </div>
                </main>

                <footer class="footer">
                    <p>&copy; 2024 Responsive Design</p>
                </footer>
            </div>
        `;
        
        content.innerHTML = desktopContent;
        this.applyStyles();
    }

    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }

            .header {
                background: #333;
                color: white;
                padding: 1rem;
                margin-bottom: 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
            }

            .nav {
                display: flex;
                gap: 2rem;
            }

            .nav a {
                color: white;
                text-decoration: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                transition: background 0.3s;
            }

            .nav a:hover {
                background: rgba(255,255,255,0.1);
            }

            .main-content {
                display: flex;
                gap: 2rem;
                flex: 1;
            }

            .sidebar {
                width: 250px;
                background: #f5f5f5;
                padding: 1.5rem;
                border-radius: 8px;
                flex-shrink: 0;
            }

            .content-area {
                flex: 1;
            }

            .hero {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 3rem;
                border-radius: 12px;
                margin-bottom: 2rem;
                text-align: center;
            }

            .cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 1.5rem;
            }

            .card {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                transition: transform 0.3s, box-shadow 0.3s;
            }

            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            }

            .footer {
                background: #333;
                color: white;
                text-align: center;
                padding: 2rem;
                margin-top: 2rem;
            }

            /* Mobile optimizations */
            @media (max-width: 768px) {
                .main-content {
                    flex-direction: column;
                }
                
                .sidebar {
                    width: 100%;
                    order: 2;
                }
                
                .header {
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .nav {
                    flex-wrap: wrap;
                    justify-content: center;
                }
            }

            /* Force desktop layout trên mobile */
            body.mobile .container {
                padding: 10px;
            }
        `;
        
        document.head.appendChild(style);
    }

    handleResize() {
        // Re-apply styles khi resize
        this.applyStyles();
        this.detectDevice();
    }

    enableTouchGestures() {
        let startX, startY;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Swipe left - next
            if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
                console.log('Swipe left');
            }
            // Swipe right - prev
            else if (Math.abs(diffX) > Math.abs(diffY) && diffX < -50) {
                console.log('Swipe right');
            }
        }, { passive: true });
    }
}

// Khởi tạo khi DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveDisplay();
});

// PWA-like behavior
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}
        // ✅ DETECT TOUCH DEVICE
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Tạo bóng bay trái tim
        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = Math.random() * (window.innerWidth - 60) + 'px';
            balloon.style.animation = `floatUp ${4 + Math.random() * 3}s linear infinite`;
            balloon.style.animationDelay = `${Math.random() * 3}s`;
            
            // SVG Heart Balloon
            balloon.innerHTML = `
                <svg viewBox="0 0 100 120" class="balloon-img" style="width:100%;height:100%;">
                    <path d="M50 20 C35 5, 20 20, 25 40 C20 60, 30 80, 50 95 C70 80, 80 60, 75 40 C80 20, 65 5, 50 20 Z" 
                          fill="${['#ff6b6b', '#ff8e8e', '#ff6b9d', '#c44569', '#ff1493'][Math.floor(Math.random()*5)]}" 
                          stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M50 20 C60 10, 75 20, 70 40 C75 55, 65 70, 50 85 C35 70, 25 55, 30 40 C25 20, 40 10, 50 20 Z" 
                          fill="${['#ff6b6b', '#ff8e8e', '#ff6b9d', '#c44569', '#ff1493'][Math.floor(Math.random()*5)]}" 
                          stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
                    <line x1="50" y1="95" x2="50" y2="115" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                </svg>
            `;
            
            balloon.addEventListener('click', explodeBalloon);
            if (isTouchDevice) {
                balloon.addEventListener('touchstart', explodeBalloon, { passive: true });
            }
            document.body.appendChild(balloon);

            setTimeout(() => {
                if (balloon.parentNode) balloon.remove();
            }, 9000);
        }
