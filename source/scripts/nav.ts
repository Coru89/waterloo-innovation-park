export namespace Nav {
  // get needed elements to attach event listeners
  const elSecondaryNav = document.querySelectorAll(
    ".nav__item--has-level-2 > .nav__item-link"
  );
  const elNavButton = document.querySelector(".nav__button");
  const elOverlay = document.querySelector(".nav__overlay");

  // toggle open and close mobile nav
  if (elNavButton && elOverlay) {
    elNavButton.addEventListener("click", () => {
      elNavButton.classList.toggle("nav__button--active");
      elOverlay.classList.toggle("nav__overlay--active");
    });

    elOverlay.addEventListener("click", () => {
      elNavButton.classList.remove("nav__button--active");
      elOverlay.classList.remove("nav__overlay--active");
    });
  }

  // remove active / open classes from mobile nav if window is resized to desktop-sized viewport
  window.addEventListener("resize", function () {
    const newWidth = window.innerWidth;

    if (newWidth > 1052) {
      document
        .querySelectorAll(".nav__sublist--open")
        .forEach((el) => el.classList.remove("nav__sublist--open"));
      if (elNavButton) {
        elNavButton.classList.remove("nav__button--active");
      }
    }
  });

  // add event listeners to nav items which have nested level 2 navigation
  elSecondaryNav.forEach((el) => {
    el.addEventListener("click", function (e) {
      const target = e.currentTarget as Element;

      //only apply for mobile
      if (window.innerWidth > 1052) {
        return;
      }

      // disable clicking into landing pages on mobile. the top level nav item click instead acts like an accordion
      if (window.innerWidth < 768) {
        e.preventDefault();
      }

      if (!target) {
        console.error("Could not find target element");

        return;
      }

      // get the ul element
      const elLevel2List = target.nextElementSibling;

      if (!elLevel2List) {
        console.error("Could not find level 2 list element");

        return;
      }

      // toggle nav level 2 open / close
      elLevel2List.classList.toggle("nav__sublist--open");
    });
  });
}
