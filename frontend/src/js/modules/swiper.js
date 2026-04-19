import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/scss'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const swiper = () => {
  new Swiper('.detail-container__swiper', {
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    modules: [Navigation, Pagination],
  })
}
