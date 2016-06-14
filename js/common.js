var button = document.querySelector('.page-header__toggle'),
    menu   = document.querySelector('.main-nav');

button.addEventListener('click', function(event) {
  event.preventDefault();
  var check = menu.classList.contains('main-nav--closed');

  if(check) {
    menu.classList.remove('main-nav--closed');
  }
  else {
    menu.classList.add('main-nav--closed');
  }
});
