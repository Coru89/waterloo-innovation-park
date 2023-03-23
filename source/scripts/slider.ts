import Glide from'@glidejs/glide';

export namespace slider {
    window.addEventListener('DOMContentLoaded', () => {
        var glide = new Glide('#glide', {
        type: 'carousel',
        autoplay: 10000,
        gap: 30,
        perView: 1,
        peek: {
            before: 180,
            after: 180
        },
        breakpoints: {
            750: {
            peek: {
                before: 0,
                after: 0
            }
            },
            990: {
            peek: {
                before: 130,
                after: 130
            }
            }
        }
        }).mount();
    });
}
    