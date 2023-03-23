import Glide from'@glidejs/glide';

export namespace slider {
    const glideEl = document.querySelector('.glide');
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
    