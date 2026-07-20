document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. PRELOADER
     ========================================================================== */
  const preloader = document.querySelector('.loader-wrapper');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }, 600);
    });
    // Fallback if load event takes too long
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 2500);
  }

  /* ==========================================================================
     2. CUSTOM CURSOR & SPOTLIGHT
     ========================================================================== */
  const cursorDot = document.querySelector('.custom-cursor');
  const cursorGlow = document.querySelector('.custom-cursor-glow');
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    // Lerp (Linear Interpolation) for outline and dot delay
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    if (cursorDot) {
      cursorDot.style.left = `${cursorX}px`;
      cursorDot.style.top = `${cursorY}px`;
    }
    if (cursorGlow) {
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Highlight cursor on hoverable elements
  const hoverables = document.querySelectorAll('a, button, .glass-card, input, textarea');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursorDot) cursorDot.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      if (cursorDot) cursorDot.classList.remove('hovered');
    });
  });

  /* ==========================================================================
     3. SCROLL PROGRESS BAR & STICKY NAVBAR & BACK-TO-TOP
     ========================================================================== */
  const progressBar = document.querySelector('.scroll-progress-bar');
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;

    // 1. Scroll Progress Bar
    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }

    // 2. Sticky Navbar scrolled state
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // 3. Back-to-Top visibility
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     4. MOBILE NAVIGATION HAMBURGER
     ========================================================================== */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     5. FLOATING PARTICLE CANVAS (80 particles)
     ========================================================================== */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 80;

    // Resize canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle constructor
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around boundaries
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(34, 197, 94, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    init();

    // Connection lines
    function drawLines() {
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - (distance / 120)) * 0.15;
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation Loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      drawLines();
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ==========================================================================
     6. TYPEWRITER SUBTITLE EFFECT
     ========================================================================== */
  const typewriterTarget = document.getElementById('typewriter');
  if (typewriterTarget) {
    const words = ["Full Stack Developer", "AI Automation Engineer", "UI/UX Strategist", "Website Architect"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typewriterTarget.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterTarget.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before typing next word
      }

      setTimeout(type, typingSpeed);
    }
    type();
  }

  /* ==========================================================================
     7. FADE-IN REVEAL ON SCROLL (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     8. 3D CARD TILT ON HOVER
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      const centerX = cardRect.left + cardWidth / 2;
      const centerY = cardRect.top + cardHeight / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const maxRotate = 8; // Max rotation degrees
      const rotateX = -(mouseY / (cardHeight / 2)) * maxRotate;
      const rotateY = (mouseX / (cardWidth / 2)) * maxRotate;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  /* ==========================================================================
     9. BUTTON RIPPLE EFFECT
     ========================================================================== */
  const rippleButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .social-icon');
  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  /* ==========================================================================
     10. PARALLAX GLOW ORBS ON SCROLL
     ========================================================================== */
  const glowOrbs = document.querySelectorAll('.glow-orb');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    glowOrbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.15;
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  /* ==========================================================================
     11. ANIMATED CODE EDITOR (line-by-line reveal)
     ========================================================================== */
  const codeLines = [
    { text: 'const developer = new Professional();', color: 'keyword' },
    { text: 'developer.skills = [ "FullStack", "AI", "Cloud" ];', color: 'string' },
    { text: 'developer.philosophy = "Build clean, scalable apps";', color: 'string' },
    { text: 'developer.status = "Open for partnerships";', color: 'string' },
    { text: '// Ready to accelerate your business growth', color: 'comment' },
    { text: 'developer.initiateCollaboration();', color: 'function' }
  ];

  const editorBody = document.querySelector('.editor-body');
  if (editorBody) {
    editorBody.innerHTML = ''; // Clear template contents
    let currentLineIndex = 0;
    
    function typeLine() {
      if (currentLineIndex >= codeLines.length) return;

      const lineConfig = codeLines[currentLineIndex];
      const lineDiv = document.createElement('div');
      lineDiv.className = 'code-line';
      
      const promptSpan = document.createElement('span');
      promptSpan.style.color = '#16A34A';
      promptSpan.textContent = '>> ';
      lineDiv.appendChild(promptSpan);

      const codeSpan = document.createElement('span');
      codeSpan.className = lineConfig.color;
      lineDiv.appendChild(codeSpan);
      editorBody.appendChild(lineDiv);

      let charIndex = 0;
      const textToType = lineConfig.text;
      
      function typeChar() {
        if (charIndex < textToType.length) {
          codeSpan.textContent += textToType[charIndex];
          charIndex++;
          setTimeout(typeChar, 40);
        } else {
          currentLineIndex++;
          setTimeout(typeLine, 800);
        }
      }
      typeChar();
    }

    // Start typewriter coding when preloader starts hiding
    setTimeout(typeLine, 1000);
  }

  /* ==========================================================================
     12. COUNTER NUMBER ANIMATION
     ========================================================================== */
  const counterElements = document.querySelectorAll('.counter-anim');
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target'));
        const duration = 2000; // Counter runtime duration in ms
        const stepTime = Math.abs(Math.floor(duration / targetValue));
        let currentValue = 0;

        const timer = setInterval(() => {
          currentValue += 1;
          target.textContent = currentValue;
          
          if (currentValue >= targetValue) {
            target.textContent = targetValue + (target.getAttribute('data-suffix') || '');
            clearInterval(timer);
          }
        }, Math.max(stepTime, 20));

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.8 });

  counterElements.forEach(el => counterObserver.observe(el));
});
