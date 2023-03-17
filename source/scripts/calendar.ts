// import * as Bootstrap from 'bootstrap'
import { Popover } from "bootstrap";

export namespace Calendar {
  const els = document.querySelectorAll('[data-toggle="popover"]');

  els.forEach((el) => {
    const titleEl = el.querySelector(".qtip .title");
    const contentEl = el.querySelector(".qtip .content");

    new Popover(el, {
      title: titleEl ? titleEl.outerHTML : "error",
      content: contentEl ? contentEl.outerHTML : "Could not retrieve event",
      trigger: "hover focus",
      html: true,
      placement: "top",
    });
  });

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
