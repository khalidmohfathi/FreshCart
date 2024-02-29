import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Spinner from '../Spinner/Spinner';
import Category from '../Category/Category';

export default function Categories() {

   function getCategories() {
      return axios.get('https://ecommerce.routemisr.com/api/v1/categories?sort=name')
   }

   let { data, isLoading } = useQuery('getCategories', getCategories);

   if (isLoading) return <Spinner />

   return (
      <>
         <section className='container my-4'>
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gy-4">
               {data?.data.data.map(categ => {
                  return <Category key={categ._id} categ={categ} />
               })}
            </div>
         </section>
      </>
   )
}
