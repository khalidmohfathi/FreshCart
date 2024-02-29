import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Spinner from '../Spinner/Spinner'
import Brand from '../Brand/Brand'
import ReactPaginate from 'react-paginate'

export default function Brands() {

   useEffect(() => {
      localStorage.setItem('Page', 0)
      return () => {
         localStorage.removeItem('Page')
      }
   }, [])

   const [pageNum, setPageNum] = useState(Number(localStorage.getItem('Page')))

   function getBrands(pageNum) {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/brands?sort=name&limit=20&page=${pageNum + 1}`)
   }

   let { data, isLoading } = useQuery(['getBrands', pageNum], () => getBrands(pageNum), {
      cacheTime: 43200,
   })

   function pageClick(num) {
      localStorage.setItem('Page', num.selected)
      setPageNum(Number(num.selected))
      window.scroll(0, 0)
   }

   if (isLoading) return <Spinner />

   return (
      <>
         <section className='container my-4'>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gy-4">
               {data?.data.data.map(brand => {
                  return <Brand key={brand._id} brand={brand} />
               })}
            </div>
            <ReactPaginate
               previousLabel={<i className="fa-solid fa-backward"></i>}
               nextLabel={<i className="fa-solid fa-forward"></i>}
               pageCount={3}
               initialPage={Number(localStorage.getItem('Page'))}
               onPageChange={pageClick}
               containerClassName={'pagination justify-content-center mt-4'}
               pageClassName={'page-item'}
               pageLinkClassName={'page-link'}
               previousClassName={'page-item'}
               previousLinkClassName={'page-link'}
               nextClassName={'page-item'}
               nextLinkClassName={'page-link'}
               activeClassName={'active'}
            />
         </section>
      </>
   )
}
