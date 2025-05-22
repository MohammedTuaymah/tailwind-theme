// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    const isMenuOpen = mobileMenu.classList.contains('block');
    
    if (isMenuOpen) {
      // Close menu
      mobileMenu.classList.add('animate-slideUp');
      mobileMenuOverlay.classList.add('opacity-0');
      
      setTimeout(() => {
        mobileMenu.classList.remove('block', 'animate-slideUp');
        mobileMenu.classList.add('hidden');
        mobileMenuOverlay.classList.add('hidden');
        mobileMenuOverlay.classList.remove('opacity-0');
        menuIconOpen.classList.remove('hidden');
        menuIconOpen.classList.add('block');
        menuIconClose.classList.remove('block');
        menuIconClose.classList.add('hidden');
      }, 290);
    } else {
      // Open menu
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('block', 'animate-slideDown');
      mobileMenuOverlay.classList.remove('hidden');
      
      setTimeout(() => {
        mobileMenuOverlay.classList.remove('opacity-0');
        menuIconOpen.classList.remove('block');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
        menuIconClose.classList.add('block');
      }, 10);
    }
  }
  
  // Event listeners
  mobileMenuButton.addEventListener('click', toggleMobileMenu);
  mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
  
  // Close menu when clicking on menu items
  const mobileMenuItems = mobileMenu.querySelectorAll('a');
  mobileMenuItems.forEach(item => {
    item.addEventListener('click', toggleMobileMenu);
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
    image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    description: '<p>قميص فاخر مصنوع من الحرير الطبيعي 100%، بتصميم أنيق وعصري يناسب المناسبات الرسمية وشبه الرسمية. يتميز بجودة خياطة عالية ولمسات نهائية دقيقة.</p><p>متوفر بعدة ألوان وجميع المقاسات.</p>'
  },
  2: {
    id: 2,
    title: 'حذاء جلد طبيعي',
    category: 'أحذية رجالية',
    price: '١٨٥٠ ريال',
    oldPrice: '٢١٧٥ ريال',
    image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    description: '<p>حذاء فاخر مصنوع من الجلد الطبيعي 100%، مصمم بأسلوب كلاسيكي أنيق. مريح للغاية ومناسب للاستخدام اليومي والمناسبات الرسمية.</p><p>صناعة يدوية إيطالية أصلية.</p>'
  },
  3: {
    id: 3,
    title: 'حقيبة يد فاخرة',
    category: 'إكسسوارات نسائية',
    price: '٣٥٠٠ ريال',
    oldPrice: '',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    description: '<p>حقيبة يد فاخرة مصنوعة من الجلد الطبيعي الناعم، تجمع بين الأناقة والعملية. تحتوي على عدة جيوب داخلية وحجرات منظمة للحفاظ على مقتنياتك.</p><p>تصميم حصري وحرفية عالية في التفاصيل.</p>'
  },
  4: {
    id: 4,
    title: 'ساعة سويسرية فاخرة',
    category: 'إكسسوارات رجالية',
    price: '٧٨٠٠ ريال',
    oldPrice: '',
    image: 'https://images.unsplash.com/photo-1600721293678-a2e12a1fa89d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
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
