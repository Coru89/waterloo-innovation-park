// get needed elements to attach event listeners
//const elSecondaryNav = document.querySelectorAll('.nav__item--has-level-2 > .nav__item-link');
const elNavButton = document.querySelector('.header__mobile-nav-button');
const elMobileNav = document.querySelector('.mobile-nav');

// toggle open and close mobile nav
if (elNavButton && elMobileNav) {
    elNavButton.addEventListener('click', () => {
        elMobileNav.classList.add('mobile-nav--open');
    });
}

const elNavCloseButton = document.querySelector('.mobile-nav__exit-button');

if (elNavCloseButton && elMobileNav) {
    elNavCloseButton.addEventListener('click', () => {
        elMobileNav.classList.remove('mobile-nav--open');
    });
}

// close mobile nav if user clicks outside of nav
// document.onclick = (e) => {
//   if (
//     !e.target.classList.contains('nav') &&
//     !e.target.classList.contains('site-head__inner') &&
//     !e.target.classList.contains('social-icons__list') &&
//     !e.target.classList.contains('nav__button') &&
//     !e.target.classList.contains('nav__item-link') &&
//     !e.target.classList.contains('nav__item-link-text') &&
//     !e.target.classList.contains('nav__secondary')
//   ) {
//     elNavButton.classList.remove('nav__button--active');
//   }
// };

// remove active / open classes from mobile nav if window is resized to desktop-sized viewport
window.addEventListener('resize', function () {
    const newWidth = window.innerWidth;

   if (newWidth > 768 && elMobileNav) {
     document.querySelectorAll('.nav__sublist--open').forEach(el => el.classList.remove('nav__sublist--open'));
     elMobileNav.classList.remove('mobile-nav--open');
   }
 });


