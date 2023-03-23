

import { createPopper } from '@popperjs/core';

export namespace Calendar {
  const els = document.querySelectorAll('[data-toggle="popover"]');
  const popperInstances: any[] = [];
  console.log('els', els);

  //attach popper instances
  els.forEach((buttonElement, index) => {
    const toolTipElement: HTMLElement | null = buttonElement.querySelector("#tool-tip");
    if (toolTipElement) {
      const popperInstance = createPopper(buttonElement, toolTipElement, {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
      popperInstances.push(popperInstance);
    }

  });

  const showEvents = ["mouseenter", "focus"];
  const hideEvents = ["mouseleave", "blur"];

  showEvents.forEach((event) => {
    els.forEach((buttonElement, index) => {
      buttonElement.addEventListener(event, () => {
        // Make the tooltip visible
        const tooltip: HTMLElement | null = buttonElement.querySelector("#tool-tip");
        if (tooltip) {
          tooltip.setAttribute("data-show", "");
        }
        const popperInstance = popperInstances[index];


        console.log(index, tooltip, popperInstance);
        // Enable the event listeners
        popperInstance.setOptions((options: any) => ({
          ...options,
          modifiers: [
            ...options.modifiers,
            { name: "eventListeners", enabled: true },
          ],
        }));

        // Update its position
        popperInstance.update();
      });
    });
  });

  hideEvents.forEach((event) => {
    els.forEach((buttonElement, index) => {
      buttonElement.addEventListener(event, () => {
        // Hide the tooltip
        const tooltip: HTMLElement | null = buttonElement.querySelector("#tool-tip");
        const arrow: HTMLElement | null = buttonElement.querySelector(".arrow");

        if (tooltip) {
          tooltip.removeAttribute("data-show");
        }

        const popperInstance = popperInstances[index];
        // Disable the event listeners
        popperInstance.setOptions((options: any) => ({
          // ...options,
          modifiers: [
            ...options.modifiers,
            {
              name: "eventListeners",
              enabled: false
            },
            {
            name: 'arrow',
            options: {
              element: arrow,
            },
          }
          ],
        }));
      });
    });
  });

  const menuButtonEl: HTMLElement | null = document.querySelector('#calendar-month-menu');
  const dropDownEl: Element | null = document.querySelector('.dropdown-menu');

  if (menuButtonEl && dropDownEl) {
    menuButtonEl.addEventListener("click", function () {
    dropDownEl.classList.add('show');
    });
  }

   if (menuButtonEl && dropDownEl) {
     menuButtonEl.addEventListener("blur", function () {
     dropDownEl.classList.remove('show');
     });
   }

  let myIframe: HTMLIFrameElement | null = document.querySelector("#calendar");

  if (myIframe) {
    myIframe.addEventListener("load", function () {
      if (myIframe && myIframe.contentWindow) {
        const height = myIframe.contentWindow.document.body.scrollHeight;
        // Set the iframe's height to the calculated height
        myIframe.style.height = `${height}px`;
      }
    });
  }

  window.addEventListener("resize", resizeIframe);

  // Define the function that resizes the iframe
  function resizeIframe() {
    // Get the height of the iframe's content
    if (myIframe && myIframe.contentWindow) {
      const height = myIframe.contentWindow.document.body.scrollHeight;

      // Set the iframe's height to the calculated height
      myIframe.style.height = `${height}px`;
    }
  }

  // let heightVal;

  // {# myIframe.addEventListener("load", function() {
  //   window.addEventListener('message', function(e) {
  //     var eventName = e.data[0];
  //     heightVal = e.data[1];
  //     console.log(heightVal);
  //     myIframe.style.height = heightVal + 'px';
  //   }, false);
  // }); #}
}
