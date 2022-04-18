const access = document.querySelector('.js-access')
const accessNick = document.querySelector('.js-access-nick')

function showAccessNick() {
    if(accessNick.style.display == 'none'){
        accessNick.style.display = 'block'
    }else{
        accessNick.style.display = 'none'
    }
  
 }

  access.addEventListener('click', showAccessNick)

  $(document).ready(function(){
      $('.slider-list').slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 2000,
          prevArrow:"<button type='button' class='slick-prev pull-left slick-arrow'><i class='fa-solid fa-angle-left'></i></button>",
          nextArrow:"<button type='button' class='slick-next pull-right slick-arrow'><i class='fa-solid fa-angle-right'></i></button>",
          responsive: [
              {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                   }
              },
              {
                breakpoint: 740,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 1
                }
             },
             {
                 breakpoint: 480,
                 settings: {
                 slidesToShow: 1,
                 arrows: false,
                 slidesToScroll: 1,
                 infinite: false,
                 }
              },
          ]
      })
  })

