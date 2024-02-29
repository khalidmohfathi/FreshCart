import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { wishContext } from '../../Context/WishlistContext'
import { cartContext } from '../../Context/CartContext'
import { jwtDecode } from 'jwt-decode'

export default function Login() {

   let navigate = useNavigate()
   const [loading, setLoading] = useState(true)
   let { setCounter } = useContext(wishContext)
   let { getCart, setCartCounter } = useContext(cartContext)

   async function getCartProducts() {
      let { data } = await getCart();
      setCartCounter(data?.numOfCartItems)
   }

   async function getWishes() {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/users/${jwtDecode(localStorage.getItem('token')).id}`)
      localStorage.setItem('WishList', JSON.stringify(data.data.wishlist))
      setCounter(data.data.wishlist.length)
   }

   async function logIntoApi(values) {
      setLoading(false)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(
         ({ data }) => {
            if (data.message == 'success') {
               localStorage.setItem('token', data.token)
               getWishes()
               getCartProducts()
               navigate('/')
               toast.success('Logged-in Successfully')
            }
         }
      ).catch((err) => {
         toast.error(err.response?.data.message)
         setLoading(true)
      })
   }

   function validationSchema() {
      let schema = new Yup.object({
         email: Yup.string().email().required(),
         password: Yup.string().matches(/^[a-zA-Z0-9]{8,}$/).required(),
      })
      return schema
   }

   let register = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema,
      onSubmit: (values) => {
         logIntoApi(values)
      }
   })

   return (
      <>
         <div className='w-50 mx-auto my-5 bg-light shadow-lg p-5 rounded-5'>
            <h4 className='fw-normal pe-3'>Welcome back <i className="fa-regular fa-face-smile-beam text-main"></i>, Login here:</h4>
            <form onSubmit={register.handleSubmit}>
               <div className="position-relative">
                  <label htmlFor="email" className='fw-normal my-2 mt-3'>Email:</label>
                  <input type="text" name='email' id='email' className={(register.errors.email ? 'is-invalid' : '') + ' form-control form-control-sm'} onChange={register.handleChange} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.email}
                  </div>
               </div>
               <div className="position-relative">
                  <label htmlFor="password" className='fw-normal my-2 mt-3'>Password:</label>
                  <input type="password" name='password' id='password' className={(register.errors.password ? 'is-invalid' : '') + ' form-control form-control-sm'} onChange={register.handleChange} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.password}
                  </div>
               </div>
               <p className='mt-3 fw-normal'><Link to={'/forget-password'} className='LogSign'>Forgot Password ?</Link></p>
               <button disabled={!(register.dirty && register.isValid) || !loading} type='submit' className='btn bg-main text-white w-100 py-2'>
                  {loading ? <>Login <i className="fa-solid fa-right-to-bracket"></i></> : <i className='fa fa-spin fa-spinner'></i>}
               </button>
               <p className='my-4 mb-0 fw-normal text-muted'>New to FreshCart? <Link to={'/signup'} className='LogSign'>Signup now!!</Link></p>
            </form>
         </div>
      </>
   )
}
