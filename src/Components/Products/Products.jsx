import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import { useQuery } from 'react-query'
import Spinner from '../Spinner/Spinner'
import ReactPaginate from 'react-paginate'

export default function Products({ home }) {

   useEffect(() => {
      localStorage.setItem('Page', 0)
      localStorage.setItem('sort', 'title')
      return () => {
         localStorage.removeItem('Page')
         localStorage.removeItem('sort')
      }
   }, [])

   const [pageNum, setPageNum] = useState(Number(localStorage.getItem('Page')))
   const [sort, setSort] = useState(home ? '-sold' : (localStorage.getItem('sort') ? localStorage.getItem('sort') : 'title'))

   function getProducts(pageNum) {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products?sort=${sort}&limit=24&page=${pageNum + 1}`)
   }

   let { data, isLoading } = useQuery(home ? 'getProducts' : ['getProducts', pageNum, sort], () => getProducts(home ? 0 : pageNum), {
      cacheTime: 300000,
   })

   function pageClick(num) {
      localStorage.setItem('Page', num.selected)
      setPageNum(Number(num.selected))
      window.scroll(0, 0)
   }

   async function update(e) {
      localStorage.setItem('sort', e.target.value)
      Number(localStorage.setItem('Page', 0))
      setPageNum(0)
      setSort(e.target.value)
      window.scroll(0, 0)
   }

   if (isLoading) return <Spinner />;

   return (
      <>
         <section className='container my-5'>
            {
               home ?
                  <h3 className='mb-3'>Frequently Bought Products</h3>
                  :
                  // ------------------------------
                  // law Hasl w b2a feeh search ahe mwgoda
                  // <div className='mb-4'>
                  //    <label htmlFor="search" className='me-3 rounded-circle bg-main d-inline-flex justify-content-center align-items-center' style={{ width: 30, height: 30 }}>
                  //       <i className="fa-solid fa-magnifying-glass text-white"></i>
                  //    </label>
                  //    <input type="text" id='search' className='form-control form-control-sm w-25 d-inline-block border-success-subtle' />
                  // </div>
                  // ------------------------------
                  <div className='d-flex justify-content-center align-items-center mb-3'>
                     <label htmlFor="sort" className='me-3 rounded-circle bg-main d-inline-flex justify-content-center align-items-center' style={{ width: 30, height: 30 }}>
                        <i className="fa-solid fa-filter text-white"></i>
                     </label>
                     <select id='sort' className="form-select w-50 border-success-subtle" defaultValue={sort} onChange={(e) => update(e)}>
                        <option value={'-ratingsAverage'}>Top Rated</option>
                        <option value={'-price'}>Price: High to Low</option>
                        <option value={'price'}>Price: Low to High</option>
                        <option value={'title'}>Name: A to Z</option>
                        <option value={'-title'}>Name: Z to A</option>
                     </select>
                  </div>

            }
            <div className="row gy-1 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6">
               {data?.data.data.map(prod => {
                  return <Product data={prod} key={prod._id} />
               })}
            </div>
            {
               home ? "" :
                  <ReactPaginate
                     previousLabel={<i className="fa-solid fa-backward"></i>}
                     nextLabel={<i className="fa-solid fa-forward"></i>}
                     pageCount={3}
                     forcePage={pageNum}
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
            }
         </section>
      </>
   )
}
