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
