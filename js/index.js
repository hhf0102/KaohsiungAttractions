function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const images = document.querySelectorAll('.block img');
const header = document.querySelector('header');

function checkSlide() {
  images.forEach(image => {
    const slideInAt = window.scrollY + window.innerHeight - image.height / 2;
    if (slideInAt > image.offsetTop + header.offsetHeight) image.classList.add('show');
  })
}

window.addEventListener('scroll', debounce(checkSlide));