import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner';
import Product from '../Product/Product';

export default function SubCategory() {

   let categURL = useParams();
   const [sub, setSub] = useState([]);
   const [prod, setProd] = useState([]);
   const [loading, setLoading] = useState(true);

   async function getSubCateg() {
      localStorage.setItem('subSelected', "")
      let subCat = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categURL.id}/subcategories?sort=name`);
      let subPro = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?sort=title&category=${categURL.id}`)
      setSub(subCat.data.data)
      setProd(subPro.data.data)
      setLoading(false);
   }

   async function update(e) {
      setLoading(true)
      localStorage.setItem('subSelected', e.target.value)
      let update = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?sort=title&category=${categURL.id}${(e.target.value) ? `&subcategory=${e.target.value}` : ""}`)
      setProd(update.data.data)
      setLoading(false)
   }

   useEffect(() => {
      getSubCateg();
      return () => {
         localStorage.removeItem('subSelected')
      }
   }, [])

   if (loading) return <Spinner />

   return (
      <>
         <section className="container my-5">
            <h5 className='fw-semibold mb-2'>{categURL.name}:</h5>
            <div className='d-flex justify-content-center align-items-center my-3'>
               <label htmlFor="sort" className='me-3 rounded-circle bg-main d-inline-flex justify-content-center align-items-center' style={{ width: 30, height: 30 }}>
                  <i className="fa-solid fa-filter text-white"></i>
               </label>
               <select id='sort' className="form-select border-success-subtle w-50" onChange={(e) => update(e)} defaultValue={localStorage.getItem('subSelected')}>
                  <option value="">All Categories</option>
                  {sub.map(item => {
                     return <option key={item._id} value={item._id}>{item.name}</option>;
                  })}
               </select>
            </div>
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
