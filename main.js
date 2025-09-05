document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const headerNav = document.querySelector('.header__nav');
    
    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            headerNav.classList.toggle('active');
            document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : '';
        });
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      
        document.querySelectorAll('.nav-link').forEach(item => {
            item.classList.remove('active');
        });
    
        this.classList.add('active');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
});

class Slider {
  constructor(container) {
    this.slider = container;
    this.slides = this.slider.querySelectorAll('.slide');
    this.dots = this.slider.querySelectorAll('.pagination-dot');
    this.prevBtn = this.slider.querySelector('.prev');
    this.nextBtn = this.slider.querySelector('.next');
    this.currentSlide = 0;
    
    this.init();
  }
  
  init() {
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Автопрокрутка (опционально)
    this.startAutoPlay();
  }
  
  goToSlide(index) {
    this.slides[this.currentSlide].classList.remove('active');
    this.dots[this.currentSlide].classList.remove('active');
    
    this.currentSlide = index;
    
    this.slides[this.currentSlide].classList.add('active');
    this.dots[this.currentSlide].classList.add('active');
  }
  
  next() {
    let nextIndex = this.currentSlide + 1;
    if (nextIndex >= this.slides.length) nextIndex = 0;
    this.goToSlide(nextIndex);
  }
  
  prev() {
    let prevIndex = this.currentSlide - 1;
    if (prevIndex < 0) prevIndex = this.slides.length - 1;
    this.goToSlide(prevIndex);
  }
  
  startAutoPlay() {
    setInterval(() => {
      this.next();
    }, 5000); // Смена каждые 5 секунд
  }
}

// Инициализация слайдера
document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.hero__slider');
  if (sliderContainer) {
    new Slider(sliderContainer);
  }
});


document.addEventListener('DOMContentLoaded', function() {
            const testimonials = document.querySelector('.testimonials');
            const testimonialItems = document.querySelectorAll('.testimonial');
            const dots = document.querySelectorAll('.testimonial-dot');
            const prevBtn = document.querySelector('.trusted__prev-btn');
            const nextBtn = document.querySelector('.trusted__next-btn');
            
            let currentIndex = 0;
            const itemsToShow = 3; // Number of testimonials visible at once
            const itemWidth = testimonialItems[0].offsetWidth + 50; // Width + gap
            
            // Calculate total width needed for all testimonials
            testimonials.style.width = `${testimonialItems.length * itemWidth}px`;
            
            // Function to update slider position
            function updateSlider() {
                const maxIndex = Math.max(0, testimonialItems.length - itemsToShow);
                currentIndex = Math.min(Math.max(0, currentIndex), maxIndex);
                
                testimonials.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                
                // Update dots
                dots.forEach((dot, index) => {
                    const dotIndex = parseInt(dot.getAttribute('data-index'));
                    dot.classList.toggle('active', dotIndex === currentIndex);
                });
                
                // Update button states
                prevBtn.classList.toggle('active', currentIndex > 0);
                nextBtn.classList.toggle('active', currentIndex < maxIndex);
                
                // Update button colors based on active state
                if (currentIndex > 0) {
                    prevBtn.querySelector('path').setAttribute('fill', 'white');
                } else {
                    prevBtn.querySelector('path').setAttribute('fill', '#DC7000');
                }
                
                if (currentIndex < maxIndex) {
                    nextBtn.querySelector('path').setAttribute('fill', 'white');
                } else {
                    nextBtn.querySelector('path').setAttribute('fill', '#DC7000');
                }
            }
            
            // Next button click
            nextBtn.addEventListener('click', function() {
                const maxIndex = Math.max(0, testimonialItems.length - itemsToShow);
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateSlider();
                }
            });
            
            // Previous button click
            prevBtn.addEventListener('click', function() {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
            
            // Dot click - FIXED
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    currentIndex = parseInt(this.getAttribute('data-index'));
                    updateSlider();
                });
            });
            
            // Handle window resize
            window.addEventListener('resize', function() {
                // Recalculate item width on resize
                const newItemWidth = testimonialItems[0].offsetWidth + 50;
                testimonials.style.transform = `translateX(-${currentIndex * newItemWidth}px)`;
                testimonials.style.width = `${testimonialItems.length * newItemWidth}px`;
            });
            
            // Initialize slider
            updateSlider();
            
            // Auto slide (optional)
            let autoSlideInterval = setInterval(() => {
                const maxIndex = Math.max(0, testimonialItems.length - itemsToShow);
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }, 5000);
            
            // Pause auto slide on hover
            const sliderContainer = document.querySelector('.testimonials-slider');
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    const maxIndex = Math.max(0, testimonialItems.length - itemsToShow);
                    if (currentIndex < maxIndex) {
                        currentIndex++;
                    } else {
                        currentIndex = 0;
                    }
                    updateSlider();
                }, 5000);
            });
        });