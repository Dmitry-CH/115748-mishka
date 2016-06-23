var html = document.querySelector('.no-js');

html.classList.remove('no-js');


var button = document.querySelector('.page-header__toggle'),
    menu   = document.querySelector('.main-nav');

button.addEventListener('click', function(event) {
  event.preventDefault();

  var check = menu.classList.contains('main-nav--closed');

  if(check) {
    button.classList.add('page-header__toggle--open');
    menu.classList.remove('main-nav--closed');
  }
  else {
    button.classList.remove('page-header__toggle--open');
    menu.classList.add('main-nav--closed');
  };
});
