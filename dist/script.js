// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      
      mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
      
      if (mobileMenu.classList.contains('hidden')) {
        // Menu is now hidden
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        mobileMenuOverlay.classList.add('hidden');
        mobileMenuOverlay.classList.add('opacity-0');
        document.body.style.overflow = '';
      } else {
        // Menu is now shown
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
        mobileMenuOverlay.classList.remove('hidden');
        setTimeout(() => {
          mobileMenuOverlay.classList.remove('opacity-0');
        }, 10);
        document.body.style.overflow = 'hidden';
      }
    });
  }
  
  // Hide mobile menu when clicking outside
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
      mobileMenuOverlay.classList.add('hidden');
      mobileMenuOverlay.classList.add('opacity-0');
      document.body.style.overflow = '';
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
  }
  
  // Close menu when clicking on menu items
  const mobileMenuItems = mobileMenu.querySelectorAll('a');
  mobileMenuItems.forEach(item => {
    item.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
      mobileMenuOverlay.classList.add('hidden');
      mobileMenuOverlay.classList.add('opacity-0');
      document.body.style.overflow = '';
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Close menu on window resize (if expanded to desktop size)
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('block')) {
      mobileMenu.classList.remove('block', 'animate-slideDown');
      mobileMenu.classList.add('hidden');
      mobileMenuOverlay.classList.add('hidden', 'opacity-0');
      menuIconOpen.classList.remove('hidden');
      menuIconOpen.classList.add('block');
      menuIconClose.classList.remove('block');
      menuIconClose.classList.add('hidden');
    }
  });

  // Countdown Timer for Promotional Banner
  function startCountdown() {
    // Set the target date (42 days from now)
    const now = new Date();
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + 42);
    targetDate.setHours(now.getHours() + 13);
    targetDate.setMinutes(now.getMinutes() + 22);
    targetDate.setSeconds(now.getSeconds() + 7);
    
    // Update the countdown every second
    const countdownInterval = setInterval(function() {
      // Get current date and time
      const currentDate = new Date();
      
      // Calculate the time remaining
      const timeRemaining = targetDate - currentDate;
      
      // If countdown is over, clear interval
      if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
      }
      
      // Calculate days, hours, minutes, seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      
      // Display the result
      document.getElementById('days').textContent = days < 10 ? '0' + days : days;
      document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
      document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
      document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);
  }
  
  // Start the countdown timer
  if (document.getElementById('days')) {
    startCountdown();
  }
});

// Quick View Modal Functionality
const modal = document.getElementById('quick-view-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const quickViewButtons = document.querySelectorAll('.quick-view-btn');

// Product data (in a real app this would come from a database or API)
const productData = {
  1: {
    id: 1,
    title: 'قميص حرير فاخر',
    category: 'ملابس رجالية',
    price: '١٢٥٠ ريال',
    oldPrice: '',
    image: './img/products/1.jpg',
    description: '<p>قميص فاخر مصنوع من الحرير الطبيعي 100%، بتصميم أنيق وعصري يناسب المناسبات الرسمية وشبه الرسمية. يتميز بجودة خياطة عالية ولمسات نهائية دقيقة.</p><p>متوفر بعدة ألوان وجميع المقاسات.</p>'
  },
  2: {
    id: 2,
    title: 'قميص حرير فاخر',
    category: 'أحذية رجالية',
    price: '١٨٥٠ ريال',
    oldPrice: '٢١٧٥ ريال',
    image: './img/products/2.jpg',
    description: '<p>حذاء فاخر مصنوع من الجلد الطبيعي 100%، مصمم بأسلوب كلاسيكي أنيق. مريح للغاية ومناسب للاستخدام اليومي والمناسبات الرسمية.</p><p>صناعة يدوية إيطالية أصلية.</p>'
  },
  3: {
    id: 3,
    title: 'قميص حرير فاخر',
    category: 'إكسسوارات نسائية',
    price: '٣٥٠٠ ريال',
    oldPrice: '',
    image: './img/products/5.jpg',
    description: '<p>حقيبة يد فاخرة مصنوعة من الجلد الطبيعي الناعم، تجمع بين الأناقة والعملية. تحتوي على عدة جيوب داخلية وحجرات منظمة للحفاظ على مقتنياتك.</p><p>تصميم حصري وحرفية عالية في التفاصيل.</p>'
  },
  4: {
    id: 4,
    title: 'قميص حرير فاخر',
    category: 'إكسسوارات رجالية',
    price: '٧٨٠٠ ريال',
    oldPrice: '',
    image: './img/products/6.jpg',
    description: '<p>ساعة سويسرية فاخرة مصنوعة من أفضل المواد، حركة أوتوماتيكية دقيقة، وتصميم كلاسيكي أنيق يجمع بين الأصالة والفخامة.</p><p>مقاومة للماء حتى عمق 100 متر، ومقاومة للخدوش بفضل الزجاج الياقوتي عالي الجودة.</p>'
  }
};

// Function to open modal with product details
function openQuickViewModal(productId) {
  // Get product data
  const product = productData[productId];
  if (!product) return;

  // Populate modal with product data
  document.getElementById('product-category').textContent = product.category;
  document.getElementById('product-title').textContent = product.title;
  document.getElementById('product-price').textContent = product.price;
  document.getElementById('product-old-price').textContent = product.oldPrice;
  document.getElementById('product-description').innerHTML = product.description;
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-image').alt = product.title;

  // Show modal
  modal.classList.remove('hidden');
  
  // Animate in with enhanced backdrop effect
  setTimeout(() => {
    modalBackdrop.classList.remove('opacity-0');
    modalContent.classList.remove('scale-95', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');
    
    // Add blur effect to the background
    document.body.classList.add('modal-open');
  }, 10);

  // Prevent body scrolling
  document.body.style.overflow = 'hidden';
}

// Function to close modal
function closeQuickViewModal() {
  // Animate out
  modalBackdrop.classList.add('opacity-0');
  modalContent.classList.remove('scale-100', 'opacity-100');
  modalContent.classList.add('scale-95', 'opacity-0');
  
  // Remove blur effect from the background
  document.body.classList.remove('modal-open');
  
  // Hide modal after animation
  setTimeout(() => {
    modal.classList.add('hidden');
    // Restore body scrolling
    document.body.style.overflow = '';
  }, 300);
}

// Add event listeners for quick view buttons
if (quickViewButtons.length > 0) {
  quickViewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = this.getAttribute('data-product-id');
      openQuickViewModal(productId);
    });
  });
}

// Add event listener for close button
if (modalClose) {
  modalClose.addEventListener('click', closeQuickViewModal);
}

// Close modal when clicking on backdrop
if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeQuickViewModal);
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeQuickViewModal();
  }
});

// Prevent closing when clicking inside modal content
if (modalContent) {
  modalContent.addEventListener('click', function(e) {
    e.stopPropagation();
  });
}

// Make overlay softer when hovering cart buttons
document.addEventListener('DOMContentLoaded', function() {
  const cartButtons = document.querySelectorAll('.group\\/cart');
  
  cartButtons.forEach(button => {
    const card = button.closest('.group');
    const overlay = card.querySelector('.product-overlay');
    
    button.addEventListener('mouseenter', function() {
      if (overlay) {
        overlay.style.backgroundColor = 'rgba(64, 42, 50, 0.15)';
      }
    });
    
    button.addEventListener('mouseleave', function() {
      if (overlay) {
        overlay.style.backgroundColor = '';
      }
    });
  });
});

// Initialize Categories Slider
document.addEventListener('DOMContentLoaded', function() {
  const categoriesSlider = new Swiper('.categories-slider', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,
    grabCursor: true,
    touchEventsTarget: 'container',
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 2.5,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 3.5,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 4.5,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 6.5,
        spaceBetween: 0,
      },
    },
  });

  // Initialize Products Swiper
  const productsSwiper = new Swiper('.products-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    touchEventsTarget: 'container',
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.products-swiper .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.products-swiper .swiper-button-next',
      prevEl: '.products-swiper .swiper-button-prev',
    },
    effect: 'slide',
    speed: 800,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    // Add smooth transitions
    on: {
      slideChange: function () {
        // Add animation to product cards when sliding
        const activeSlides = this.slides;
        activeSlides.forEach((slide, index) => {
          const card = slide.querySelector('.group');
          if (card) {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
          }
        });
      },
      transitionStart: function () {
        // Add subtle animation during transition
        const activeSlides = this.slides;
        activeSlides.forEach((slide, index) => {
          const card = slide.querySelector('.group');
          if (card) {
            card.style.transition = 'all 0.3s ease';
          }
        });
      }
    }
  });

  // Pause autoplay on hover for products swiper
  const productsContainer = document.querySelector('.products-swiper');
  if (productsContainer && productsSwiper) {
    productsContainer.addEventListener('mouseenter', () => {
      productsSwiper.autoplay.stop();
    });
    
    productsContainer.addEventListener('mouseleave', () => {
      productsSwiper.autoplay.start();
    });
  }
});

// Quantity Control Functions
function incrementQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 99) {
        quantityInput.value = currentValue + 1;
    }
}

function decrementQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function validateQuantity(input) {
    let value = parseInt(input.value);
    if (isNaN(value) || value < 1) {
        input.value = 1;
    } else if (value > 99) {
        input.value = 99;
    }
}

// Initialize Swiper for Related Products
const relatedProductsSwiper = new Swiper('.related-products-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1.5,
            spaceBetween: 16,
        },
        640: {
            slidesPerView: 2.5,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3.5,
            spaceBetween: 24,
        },
        1280: {
            slidesPerView: 4.5,
            spaceBetween: 24,
        },
    },
});
