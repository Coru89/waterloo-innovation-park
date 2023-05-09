//import Glide from'@glidejs/glide';

/// <reference path="./vendor/glide/glide.d.ts" />

import Glide from './vendor/glide/glide.js';

export namespace slider {
    const glideEl = document.querySelector('.glide');
    const glideEventEl = document.querySelector('.glide-event');
    const glideInstaEl = document.querySelector('.instagram-glide');
    const containerEl = document.querySelector('.u-container');

    if (glideEl) {
        initImageGlide();
    }

    if (glideEventEl && containerEl) {
        initEventGlide();
    }

    if (glideInstaEl) {
        initInstaGlide();
    }

    // image slider
    function initImageGlide() {
        var glide = new Glide('.glide', {
            type: 'carousel',
            autoplay: 10000,
            gap: 30,
            perView: 1,
            focusAt: 'center',
            peek: {
                 before: 18,
                 after: 18
             }
            })      
    
            // fixes cumulative layout shift
            glide.on(['build.before'], function() {
                if (glideEl) {
                    glideEl.classList.add('image-slider--visible');
                }
              });

              glide.mount()
    }

    // instagram slider
    function initInstaGlide() {
        var glide = new Glide('.instagram-glide', {
            type: 'carousel',
            autoplay: 10000,
            gap: 30,
            perView: 4,
            peek: {
                before: 18,
                after: 18
            },
            breakpoints: {
                768: {
                    perView: 2,
                    gap: 15,
                    peek: {
                        before: 18,
                        after: 24
                    }
                },
                1200: {
                    perView: 3,
                    peek: {
                        before: 18,
                        after: 18
                    }
                }
            }
        })      
    
        // fixes cumulative layout shift
        glide.on(['build.before'], function() {
            if (glideInstaEl) {
                glideInstaEl.classList.add('instagram--visible');
            }
            });

            glide.mount()
    }

    function initEventGlide() {
        var glide = new Glide('.glide-event', {
            type: 'carousel',
            //gap: 30,
            focusAt: 'center'
            // peek: {
            //      before: 18,
            //      after: 18
            //  }
        })      
    
            // fixes cumulative layout shift
            // glide.on(['build.before'], function() {
            //     if (glideEl) {
            //         glideEl.classList.add('image-slider--visible');
            //     }
            //   });
    
              glide.mount()
    }
}

    