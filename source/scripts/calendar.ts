// import * as Bootstrap from 'bootstrap'
import { Popover } from 'bootstrap';

export namespace Calendar {
  const els = document.querySelectorAll('[data-toggle="popover"]');
  
  els.forEach((el) => {
    const titleEl = el.querySelector('.qtip .title');
    const contentEl = el.querySelector('.qtip .content');

    new Popover(el, {
      title: titleEl ? titleEl.outerHTML : 'error',
      content: contentEl ? contentEl.outerHTML : 'Could not retrieve event',
      trigger: 'hover focus',
      html: true,
      placement: 'bottom',
      template: '<div class="popover role="tooltip">' +
       '<div class="popover-arrow"></div>' +
       '<h3 class="popover-header"></h3>' +
       '<div class="popover-body"></div>' +
       '</div>',
    }); 
  });
}

