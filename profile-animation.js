// ===== PROFILE IMAGE CANVAS ANIMATION =====
const canvas = document.getElementById('profileCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Resize canvas
    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        // Make canvas larger than container to allow particles to float out
        width = canvas.width = rect.width * 1.4;
        height = canvas.height = rect.height * 1.4;
    }

    // Particle class
    class Particle {
        constructor() {
            this.angle = Math.random() * Math.PI * 2;
            this.radius = Math.random() * (width / 2.5 - width / 3.5) + width / 3.5;
            this.speed = Math.random() * 0.02 + 0.01;
            this.size = Math.random() * 3 + 1;
            this.color = Math.random() > 0.5 ? '#6366f1' : '#8b5cf6';
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.angle += this.speed;
            this.x = width / 2 + Math.cos(this.angle) * this.radius;
            this.y = height / 2 + Math.sin(this.angle) * this.radius;
            
            // Pulse effect
            this.opacity += Math.sin(Date.now() * 0.005) * 0.01;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = Math.max(0, Math.min(1, this.opacity));
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw orbital rings
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, width / 3, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(width / 2, height / 2, width / 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    // Initialize
    window.addEventListener('load', () => {
        resizeCanvas();
        initParticles();
        animate();
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}
