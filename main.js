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


document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.hero__slider');
  if (sliderContainer) {
    new Slider(sliderContainer);
  }
});


 document.addEventListener('DOMContentLoaded', function() {
            const testimonials = document.querySelector('.testimonials');
            const dots = document.querySelectorAll('.testimonial-dot');
            const prevBtn = document.querySelector('.trusted__prev-btn');
            const nextBtn = document.querySelector('.trusted__next-btn');
            const testimonialItems = document.querySelectorAll('.testimonial');
            
            let currentIndex = 0;
            let itemWidth = testimonialItems[0].offsetWidth + parseInt(getComputedStyle(testimonials).gap);
            
            function updateSlider() {
                testimonials.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
                
            
                prevBtn.classList.toggle('active', currentIndex > 0);
                nextBtn.classList.toggle('active', currentIndex < dots.length - 1);
            }
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateSlider();
                });
            });
            
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
            
            nextBtn.addEventListener('click', () => {
                if (currentIndex < dots.length - 1) {
                    currentIndex++;
                    updateSlider();
                }
            });
            

            updateSlider();
            
      
            window.addEventListener('resize', function() {
                itemWidth = testimonialItems[0].offsetWidth + parseInt(getComputedStyle(testimonials).gap);
                updateSlider();
            });
        });
