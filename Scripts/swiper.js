new Swiper('.carrusel', {
  loop: true,

  pagination: {
    el: '.pag2',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.btn2.swiper-button-next',
    prevEl: '.btn2.swiper-button-prev',
  },
  breakpoints:{
    0:{
      slidesPerView : 1
    },
     768:{
      slidesPerView : 2
    },
     1024:{
      slidesPerView : 3
    },
  }

});
