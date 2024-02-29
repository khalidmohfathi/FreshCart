import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { toast } from 'react-toastify';

export default function ChangePassword() {

   let navigate = useNavigate()

   const [loading, setLoading] = useState(true)

   async function updateToApi(values) {
      setLoading(false)
      axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', values, {
         headers: {
            token: localStorage.getItem('token')
         }
      }).then(
         ({ data }) => {
            if (data.message == 'success') {
               navigate('/')
               toast.success('Password Changed Successfully')
            }
         }
      ).catch((err) => {
         toast.error(err.response.data.errors.msg)
         setLoading(true)
      })
   }

   function validationSchema() {
      let schema = new Yup.object({
         currentPassword: Yup.string().matches(/^[0-9A-Za-z]{8,}$/, 'Password must be at least 8 characters').required(),
         password: Yup.string().matches(/^[a-zA-Z0-9]{8,}$/, 'Password must be at least 8 characters').required(),
         rePassword: Yup.string().oneOf([Yup.ref('password')], 'RePassword must match your password').required(),
      })
      return schema
   }

   let register = useFormik({
      initialValues: {
         currentPassword: '',
         password: '',
         rePassword: '',
      },
      validationSchema,
      onSubmit: (values) => {
         updateToApi(values)
      }
   })

   return (
      <>
         <div className='my-5 mx-auto bg-light shadow-lg p-5 rounded-5 w-50'>
            <h4 className='fw-normal text-center text-main'>Change your password</h4>
            <form className='mt-4' onSubmit={register.handleSubmit}>
               <div className='position-relative'>
                  <label htmlFor="currentPassword" className='fw-normal my-2'>Current Password:</label>
                  <input type="password" name='currentPassword' id='currentPassword' className={(register.errors.currentPassword && register.touched.currentPassword ? 'is-invalid' : '') + ' form-control'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.currentPassword}
                  </div>
               </div>
               <div className="position-relative">
                  <label htmlFor="password" className='fw-normal my-2 mt-3'>New Password:</label>
                  <input type="password" name='password' id='password' className={(register.errors.password && register.touched.password ? 'is-invalid' : '') + ' form-control'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.password}
                  </div>
               </div>
               <div className="position-relative">
                  <label htmlFor="rePassword" className='fw-normal my-2 mt-3'>New RePassword:</label>
                  <input type="password" name='rePassword' id='rePassword' className={(register.errors.rePassword && register.touched.rePassword ? 'is-invalid' : '') + ' form-control'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.rePassword}
                  </div>
               </div>
               <p className='my-3 fw-normal'><Link to={'/forget-password'} className='LogSign'>Forgot Password ?</Link></p>
               <button disabled={!(register.dirty && register.isValid) || !loading} type='submit' className='btn bg-main text-white w-100 py-2'>
                  {loading ? <>Update <i className="fa-solid fa-upload ms-1"></i></> : <i className='fa fa-spin fa-spinner'></i>}
               </button>
            </form>
         </div>
      </>
   )
}

