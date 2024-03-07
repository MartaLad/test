const $submit = document.getElementById('button');
// $submit.textContent = 'Оформить заказ'

$submit.addEventListener('click', function () {
    this.disabled = true;
    $submit.classList.add('button-disabled');
    $submit.innerText = 'Loading';

    const $spinner = document.createElement('span')
    $submit.append($spinner)
    $spinner.classList.add('fas', 'fa-spinner', 'fa-spin')
})