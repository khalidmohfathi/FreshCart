import axios from 'axios'
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import Spinner from '../Spinner/Spinner';
import height from './CategSlider.module.css'
import { Link } from 'react-router-dom';

export default function CategSlider() {

   var settings = {
      arrows: false,
      autoplay: true,
      dots: true,
      speed: 1000,
      slidesToShow: 6,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 4,
            }
         },
         {
            breakpoint: 990,
            settings: {
               slidesToShow: 3,
            }
         },
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 2,
            }
         },
      ]
   };

   function getCategories() {
      return axios.get('https://ecommerce.routemisr.com/api/v1/categories?sort=name')
   }

   let { data , isLoading } = useQuery('getCategories', getCategories, {
      cacheTime: 43200,
   });

   if(isLoading) return <Spinner/>

   return (
      <>
         <section className='container mb-5'>
            <h3 className='mb-3'>Shop Popular Categories</h3>
            <Slider {...settings}>
               {data?.data.data.map(cat => {
                  return (
                     <Link to={'/categories/'+ cat.name + '/' +cat._id} key={cat._id} className='px-1'>
                        <img src={cat.image} className={height.height}  alt="" />
                        <h6 className='my-2 text-black fw-normal'>{cat.name}</h6>
                     </Link>
                  )
               })}
            </Slider>
         </section>
      </>
   )
}
