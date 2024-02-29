import React from 'react'
import Slider from "react-slick";
import slider1 from "../../Assets/Images/slider1.png"
import slider1Small from "../../Assets/Images/slider1-small.png"
import slider2 from "../../Assets/Images/slider2.png"
import slider2Small from "../../Assets/Images/slider2-small.png"
import slider3 from "../../Assets/Images/slider3.png"
import slider3Small from "../../Assets/Images/slider3-small.png"
import slider4 from "../../Assets/Images/slider4.png"
import slider4Small from "../../Assets/Images/slider4-small.png"


export default function MainSlider() {
   var settings = {
      arrows: false,
      autoplay: true,
      dots: false,
      speed: 1000,
   };

   return (
      <>
         <Slider {...settings} className='container my-4 cursor-pointer'>
            <div>
               <picture>
                  <source media={"(max-width: 992px)"} srcSet={slider1Small} className='w-100' />
                  <img src={slider1} alt="" className='w-100' />
               </picture>
            </div>
            <div>
               <picture>
                  <source media={"(max-width: 992px)"} srcSet={slider2Small} className='w-100' />
                  <img src={slider2} alt="" className='w-100' />
               </picture>
            </div>
            <div>
               <picture>
                  <source media={"(max-width: 992px)"} srcSet={slider3Small} className='w-100' />
                  <img src={slider3} alt="" className='w-100' />
               </picture>
            </div>
            <div>
               <picture>
                  <source media={"(max-width: 992px)"} srcSet={slider4Small} className='w-100' />
                  <img src={slider4} alt="" className='w-100' />
               </picture>
            </div>
         </Slider>
      </>
   )
}
