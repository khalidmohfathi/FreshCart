import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function Order() {

   let { id } = useParams()
   const [loading, setLoading] = useState(true)
   const [order, setOrder] = useState([])
   const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   };

   async function getSpecificOrder() {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders?_id=${id}`)
      setOrder(data.data[0]);
      setLoading(false)
   }

   useEffect(() => {
      getSpecificOrder()
   }, [])


   const date = new Date(order.createdAt)

   if (loading) return <Spinner />

   return (
      <section className='container my-5 rounded-5 mx-auto shadow-lg p-5 bg-light'>
         <div className='d-flex justify-content-around align-items-center flex-wrap mb-4'>
            <div className='my-3'>
               <h6 className='fw-normal text-main'><span className='fw-semibold text-black'>Order ID:</span> #{order.id}</h6>
               <h6 className='fw-semibold'>Total Payment Price: <span className="text-main fw-normal">{order.totalOrderPrice} EGP</span></h6>
               <h6 className='fw-semibold d-flex'>Payment Method: <span className="badge bg-main rounded-pill ms-2">{order.paymentMethodType}</span></h6>
               <h6 className='text-muted fw-normal'>{date.toLocaleString('en-IN', dateOptions)}</h6>
            </div>
            <div className="fw-normal my-3">
               <h5 className='fw-semibold'>Address Info <i className="fa-solid fa-location-dot"></i></h5>
               <p className='m-0'><span className='text-body-tertiary'>Address Details:</span> {order.shippingAddress.details}</p>
               <p className='m-0'><span className='text-body-tertiary'>City:</span> {order.shippingAddress.city}</p>
               <p className='m-0'><span className='text-body-tertiary'>Phone:</span> {order.shippingAddress.phone}</p>
            </div>
            <div className="fw-normal my-3">
               <h5 className='fw-semibold'>Customer Info <i className="fa-solid fa-circle-user"></i></h5>
               <p className='m-0'><span className='text-body-tertiary'>Name:</span> {order.user.name}</p>
               <p className='m-0'><span className='text-body-tertiary'>Email:</span> {order.user.email}</p>
               <p className='m-0'><span className='text-body-tertiary'>Phone:</span> {order.user.phone}</p>
            </div>
         </div>
         <table className='table table-hover align-middle text-center'>
            <thead className=''>
               <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
               </tr>
            </thead>
            <tbody className='table-group-divider fw-normal'>
               {
                  order.cartItems.map((item) => {
                     return (
                        <tr key={item._id}>
                           <td>
                              <Link className='d-flex align-items-center justify-content-center flex-wrap' to={'/products/' + item.product._id}>
                                 <img src={item.product.imageCover} style={{ width: 65 }} alt="" />
                                 <p className='m-2'>{item.product.title.split(' ').slice(0, 3).join(' ')}</p>
                              </Link>
                           </td>
                           <td>
                              {item.price} EGP
                           </td>
                           <td>
                              {item.count}
                           </td>
                        </tr>
                     )
                  })
               }
            </tbody>
         </table>
      </section>
   )
}
