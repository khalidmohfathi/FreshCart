import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

export default function Profile() {

   const [detail, setDetail] = useState({})
   const [loading, setLoading] = useState(true)

   async function getUserDetails() {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/users/${jwtDecode(localStorage.getItem('token')).id}`)
      setDetail(data.data)
      setLoading(false)
   }

   useEffect(() => {
      getUserDetails()
   }, [])

   if (loading) return <Spinner />

   return (
      <> 
         <section className='mx-auto my-5 bg-light shadow-lg p-5 rounded-5 w-50'>
            <h3 className='fw-normal text-center text-main'>My Profile</h3>
            <label htmlFor="name" className='fw-normal my-2 mt-3'>Username:</label>
            <input type="text" id='name' className='form-control bg-white' value={detail.name} disabled />
            <label htmlFor="email" className='fw-normal my-2 mt-3'>User Email:</label>
            <input type="text" id='email' className='form-control bg-white' value={detail.email} disabled />
            <label htmlFor="phone" className='fw-normal my-2 mt-3'>User Phone:</label>
            <input type="number" id='phone' className='form-control bg-white' value={detail.phone} disabled />
            <div className='mt-3 text-center'>
               <Link className='btn bg-main text-white mx-2 px-3 py-2 my-1' to={'update'}>Update Data <i className="fa-solid fa-upload ms-1"></i></Link>
               <Link className='btn bg-main text-white mx-2 px-3 py-2 my-1' to={'change-password'}>Change Password<i className='fa-solid fa-key ms-1'></i></Link>
            </div>
         </section>
      </>
   )
}
