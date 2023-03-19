var currentPage = 1;
var perPage = {{displayLimit}};
var count = perPage;

document.querySelector('.js-loadMore').addEventListener('click', e => {
    e.preventDefault();
    e.currentTarget.classList.add('disabled', 'pointer-events-none');
    var originalWidth = e.currentTarget.offsetWidth;
    var buttonText = document.querySelector('.js-loadMore').textContent;
    e.currentTarget.style.width = originalWidth;
    e.currentTarget.textContent = 'Loading...';

    if({{ pageInfo.total }} > count){
        fetch(e.currentTarget.getAttribute('href'), {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            method: 'GET'
        }).then(response => response.text()).then(data => {

            document.querySelector('#js-ajaxPagination').insertAdjacentHTML('beforeend', data);
            var button = document.querySelector('.js-loadMore');
            button.textContent = buttonText;
            // increment the counters
            count = count + perPage;
            currentPage++;
            button.style.display = 'inline-block';
            button.href = '/{{ craft.app.request.pathInfo }}/p' + (currentPage + 1);
            button.classList.remove('disabled', 'pointer-events-none');
            if({{ pageInfo.total }} <= count){
                button.remove();
            }
        });
    }
}); 