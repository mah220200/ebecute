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
