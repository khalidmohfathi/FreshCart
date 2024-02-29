import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { wishContext } from '../../Context/WishlistContext'
import { cartContext } from '../../Context/CartContext'

export default function ResetPassword() {

   let navigate = useNavigate()
   let { setCounter } = useContext(wishContext)
   let { setCartCounter } = useContext(cartContext)
   const [loading, setLoading] = useState(true)

   async function changePassword(values) {
      setLoading(false)
      axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values).then(
         ({ data }) => {
            if (data.token) {
               localStorage.clear()
               setCounter(0)
               setCartCounter(0)
               navigate('/login')
               toast.success('Password Changed Successfully')
            }
         }
      ).catch((err) => {
         toast.error(err.response.data.message)
         setLoading(true)
      })
   }

   function validationSchema() {
      let schema = new Yup.object({
         email: Yup.string().email().required(),
         newPassword: Yup.string().matches(/^[a-zA-Z0-9]{8,}$/, 'Password must be at least 8 characters').required(),
      })
      return schema
   }

   let register = useFormik({
      initialValues: {
         email: '',
         newPassword: '',
      },
      validationSchema,
      onSubmit: (values) => {
         changePassword(values)
      }
   })

   return (
      <>
         <div className='my-5 mx-auto bg-light shadow-lg p-5 rounded-5 w-50'>
            <h4 className='fw-normal text-center text-main'>Reset your password</h4>
            <form className='mt-4' onSubmit={register.handleSubmit}>
               <div className='position-relative'>
                  <label htmlFor="email" className='fw-normal my-2'>Email:</label>
                  <input type="email" name='email' id='email' className={(register.errors.email && register.touched.email ? 'is-invalid' : '') + ' form-control'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.email}
                  </div>
               </div>
               <div className="position-relative">
                  <label htmlFor="newPassword" className='fw-normal my-2 mt-3'>New Password:</label>
                  <input type="password" name='newPassword' id='newPassword' className={(register.errors.newPassword && register.touched.newPassword ? 'is-invalid' : '') + ' form-control'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.newPassword}
                  </div>
               </div>
               <div className='mt-4'>
                  <button disabled={!(register.dirty && register.isValid) || !loading} type='submit' className='btn bg-main text-white w-100 py-2'>
                     {loading ? <>Reset <i className="fa-solid fa-upload ms-1"></i></> : <i className='fa fa-spin fa-spinner'></i>}
                  </button>
               </div>
            </form>
         </div>
      </>
   )
}

