import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'

export default function Orders() {

   const [loading, setLoading] = useState(true)
   const [orders, setOrders] = useState([])

   async function getUserOrders() {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${jwtDecode(localStorage.getItem('token')).id}`)
      setOrders(data)
      setLoading(false)
   }

   useEffect(() => {
      getUserOrders()
   }, [])

   if (loading) return <Spinner />

   return (
      <section className='container my-4'>
         {/* <h4 className='fw-semibold pb-3 text-center text-main'>My Orders</h4> */}
         <table className="table table-hover align-middle text-center">
            <thead className='table-light'>
               <tr>
                  <th scope="col">#</th>
                  <th scope="col">Order Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
               </tr>
            </thead>
            <tbody className='table-group-divider'>
               {
                  orders.map((item) => {
                     return (
                        <tr key={item._id}>
                           <th>#{item.id}</th>
                           <td>{item.totalOrderPrice} EGP</td>
                           <td>
                              <div className='d-flex flex-column align-items-center'>
                                 <span style={{ width: 'fit-content' }} className={`badge my-1 ${item.isPaid ? "bg-success" : "bg-danger"}`}>isPaid</span>
                                 <span style={{ width: 'fit-content' }} className={`badge my-1 ${item.isDelivered ? "bg-success" : "bg-danger"}`}>isDelivered</span>
                              </div>
                           </td>
                           <td>
                              <Link to={item._id} className='btn bg-main text-white'>View</Link>
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
