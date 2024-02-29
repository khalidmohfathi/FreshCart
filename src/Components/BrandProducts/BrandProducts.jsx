import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../Product/Product'
import Spinner from '../Spinner/Spinner'

export default function BrandProducts() {

   let brand = useParams()
   const [prod, setProd] = useState([])
   const [loading, setLoading] = useState(true);

   async function getBrandProd() {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?sort=title&brand=${brand.id}`)
      setProd(data.data)
      setLoading(false);
   }

   useEffect(() => {
      getBrandProd()
   }, [])

   if (loading) return <Spinner />


   return (
      <>
         <section className='container my-5'>
            <h4 className='fw-semibold mx-2 my-3'>{brand.name}:</h4>
            {
               (prod.length) ?
               <div className="row gy-1 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6">
                  {prod.map(prod => {
                     return <Product data={prod} key={prod._id} />
                  })}
               </div>
               : <h2 className='text-center my-5'>No Stock Available <i className="fa-regular fa-face-frown text-main"></i></h2>
            }
         </section>

      </>
   )
}
