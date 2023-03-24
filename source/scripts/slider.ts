import Glide from'@glidejs/glide';

export namespace slider {
    const glideEl = document.querySelector('.glide');
    const glideInstaEl = document.querySelector('.instagram-glide');

    if (glideEl) {
        initImageGlide();
    }

    if (glideInstaEl) {
        initInstaGlide();
    }


    function initImageGlide() {
        var glide = new Glide('.glide', {
            type: 'carousel',
            autoplay: 10000,
            gap: 30,
            perView: 1,
            peek: {
                before: 350,
                after: 350
            },
            breakpoints: {
                768: {
                    peek: {
                        before: 0,
                        after: 0
                    }
                },
                1440: {
                    peek: {
                        before: 130,
                        after: 130
                    }
                }
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

    function initInstaGlide() {
        var glide = new Glide('.instagram-glide', {
            type: 'carousel',
            autoplay: 10000,
            gap: 30,
            perView: 4,
            breakpoints: {
                768: {
                    perView: 2
                },
                1200: {
                    perView: 3
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
    
}
    