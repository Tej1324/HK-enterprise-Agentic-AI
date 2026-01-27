// =====================================================
// SCROLL REVEAL ANIMATIONS
// =====================================================

// Intersection Observer for reveal animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Trigger value card animations when values section becomes visible
      if (entry.target.classList.contains('values-section')) {
        const valueCards = entry.target.querySelectorAll('.value-card');
        valueCards.forEach(card => {
          card.classList.add('animate');
        });
      }
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// =====================================================
// COUNTER ANIMATION
// =====================================================

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Observer for counters
const counterElements = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, target);
      entry.target.classList.add('counted');
    }
  });
}, {
  threshold: 0.5
});

counterElements.forEach(counter => {
  counterObserver.observe(counter);
});

// =====================================================
// SMOOTH SCROLL FOR SCROLL INDICATOR
// =====================================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const firstSection = document.querySelector('.section');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// =====================================================
// VIDEO AUTOPLAY AND CONTROL
// =====================================================

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  // Ensure video plays
  heroVideo.play().catch(err => {
    console.log('Video autoplay prevented:', err);
  });
  
  // Pause video when out of view for performance
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroVideo.play();
      } else {
        heroVideo.pause();
      }
    });
  }, { threshold: 0.5 });
  
  videoObserver.observe(heroVideo);
}

// =====================================================
// PARALLAX EFFECT ON SCROLL
// =====================================================

let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  
  // Subtle parallax for impact cards only
  const impactCards = document.querySelectorAll('.impact-card:not(:hover)');
  impactCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    const cardVisible = cardTop < window.innerHeight && cardTop > -card.offsetHeight;
    
    if (cardVisible) {
      const speed = (index % 2 === 0) ? 0.02 : -0.02;
      const baseTransform = card.style.transform || '';
      if (!baseTransform.includes('translateY(-8px)')) {
        card.style.transform = `translateY(${scrolled * speed}px)`;
      }
    }
  });
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// =====================================================
// MOUSE FOLLOW EFFECT FOR VALUE CARDS
// =====================================================

const valueCards = document.querySelectorAll('.value-card');

valueCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `translateY(-12px) translateX(5px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// =====================================================
// IMAGE LAZY LOADING WITH FADE IN
// =====================================================

const images = document.querySelectorAll('.impact-card.image img');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
      
      // Simulate loading
      setTimeout(() => {
        img.style.opacity = '1';
      }, 100);
      
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => {
  imageObserver.observe(img);
});

// =====================================================
// HERO TEXT GLITCH EFFECT (OPTIONAL)
// =====================================================

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const originalText = heroTitle.textContent;
  
  // Subtle glitch on page load
  setTimeout(() => {
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
      if (glitchCount < 3) {
        heroTitle.style.textShadow = `
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(255, 0, 0, 0.5),
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 255, 255, 0.5)
        `;
        glitchCount++;
      } else {
        heroTitle.style.textShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        clearInterval(glitchInterval);
      }
    }, 100);
  }, 1500);
}

// =====================================================
// ADD PARTICLE EFFECT TO HERO (OPTIONAL)
// =====================================================

function createParticles() {
  const heroOverlay = document.querySelector('.hero-overlay');
  if (!heroOverlay) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    heroOverlay.appendChild(particle);
  }
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// =====================================================
// LOADING PROGRESS BAR
// =====================================================

window.addEventListener('load', () => {
  document.body.style.overflow = 'hidden';
  
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #8b0000, #dc143c, #ff8c00);
    z-index: 10000;
    transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress >= 100) {
      progress = 100;
      progressBar.style.width = '100%';
      
      setTimeout(() => {
        progressBar.style.opacity = '0';
        document.body.style.overflow = '';
        setTimeout(() => progressBar.remove(), 300);
      }, 200);
      
      clearInterval(interval);
    } else {
      progressBar.style.width = progress + '%';
    }
  }, 100);
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".reveal-words").forEach(el => {
    const words = el.textContent.trim().split(" ");
    el.innerHTML = "";

    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.animationDelay = `${i * 0.15}s`;
      el.appendChild(span);
    });
  });
});
