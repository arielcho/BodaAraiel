import { useEffect, useRef } from 'react';

const FloresYAdornos = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let flores = [];
    let copos = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Flor {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50 - Math.random() * 200;
        this.size = 20 + Math.random() * 40;
        this.speedY = 0.5 + Math.random() * 1.2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.opacity = 0.5 + Math.random() * 0.4;
        this.petalos = 5 + Math.floor(Math.random() * 3);
        this.color = this.getColor();
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
        this.wobbleAmount = 0.5 + Math.random() * 2;
      }

      getColor() {
        const colores = ['#FF2A85', '#FF8533', '#9200FF', '#00F0FF', '#FDF7F0', '#FF70B2'];
        return colores[Math.floor(Math.random() * colores.length)];
      }

      update() {
        this.x += this.speedX + Math.sin(this.wobble) * 0.3;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * this.wobbleAmount * 0.1;

        if (this.y > canvas.height + 50) {
          this.reset();
          this.y = -50 - Math.random() * 100;
        }
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        const s = this.size;
        const petalos = this.petalos;

        for (let i = 0; i < petalos; i++) {
          const angle = (i / petalos) * Math.PI * 2;
          const px = Math.cos(angle) * s * 0.5;
          const py = Math.sin(angle) * s * 0.5;
          
          ctx.beginPath();
          ctx.ellipse(px, py, s * 0.4, s * 0.25, angle, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 15;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = '#FF8533';
        ctx.shadowColor = '#FF8533';
        ctx.shadowBlur = 20;
        ctx.fill();

        ctx.restore();
      }
    }

    class CopoOro {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2 + Math.random() * 4;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = -0.2 - Math.random() * 0.5;
        this.opacity = 0.3 + Math.random() * 0.6;
        this.glow = 5 + Math.random() * 15;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glow);
        grad.addColorStop(0, '#FF8533');
        grad.addColorStop(0.5, '#FF2A85');
        grad.addColorStop(1, 'transparent');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glow, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    for (let i = 0; i < 25; i++) {
      const f = new Flor();
      f.y = Math.random() * canvas.height;
      flores.push(f);
    }

    for (let i = 0; i < 20; i++) {
      const c = new CopoOro();
      copos.push(c);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      copos.forEach(c => {
        c.update();
        c.draw(ctx);
      });

      flores.forEach(f => {
        f.update();
        f.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default FloresYAdornos;
