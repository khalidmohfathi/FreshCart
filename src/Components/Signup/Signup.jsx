import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { toast } from 'react-toastify';

export default function Signup() {

   let navigate = useNavigate()

   const [loading, setLoading] = useState(true)

   async function signUptoApi(values) {
      setLoading(false)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(
         ({ data }) => {
            if (data.message == 'success') {
               navigate('/login')
               toast.success('Account Created Successfully')
            }
         }
      ).catch((err) => {
         toast.error(err.response.data.message)
         setLoading(true)
      })
   }

   function validationSchema() {
      let schema = new Yup.object({
         name: Yup.string().min(3).max(22).required(),
         email: Yup.string().email().required(),
         password: Yup.string().matches(/^[a-zA-Z0-9]{8,}$/ , 'Password must be at least 8 characters').required(),
         rePassword: Yup.string().oneOf([Yup.ref('password')] , 'RePassword must match your password').required(),
         phone: Yup.string().matches(/^[0-9]{11}$/ , 'Enter a valid phone number').required()
      })
      return schema
   }

   let register = useFormik({
      initialValues: {
         name: '',
         email: '',
         password: '',
         rePassword: '',
         phone: '',
      },
      validationSchema,
      onSubmit: (values) => {
         signUptoApi(values)
      }
   })

   return (
      <>
         <div className='w-50 mx-auto my-5 bg-light-subtle shadow-lg p-5 rounded-5'>
            <h4 className='fw-normal mb-3'>Welcome to FreshCart <i className="fa-regular fa-face-smile-beam text-main"></i>, Signup here:</h4>
            <form onSubmit={register.handleSubmit}>
               <div className='position-relative'>
                  <label htmlFor="name" className='fw-normal my-2'>Name:</label>
                  <input type="text" name='name' id='name' className={(register.errors.name && register.touched.name  ? 'is-invalid' : '') + ' form-control form-control-sm'} onChange={register.handleChange} onKeyUp={register.handleBlur}/>
                  <div className="invalid-tooltip end-0">
                     {register.errors.name}
                  </div>
               </div>
               <div className="position-relative">
                  <label htmlFor="email" className='fw-normal my-2 mt-3'>Email:</label>
                  <input type="text" name='email' id='email' className={(register.errors.email && register.touched.email ? 'is-invalid' : '') + ' form-control form-control-sm'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.email}
                  </div>
               </div>
               <div className="position-relative">
                  <label htmlFor="password" className='fw-normal my-2 mt-3'>Password:</label>
                  <input type="password" name='password' id='password' className={(register.errors.password && register.touched.password ? 'is-invalid' : '') + ' form-control form-control-sm'} onChange={register.handleChange} onKeyUp={register.handleBlur}/>
                  <div className="invalid-tooltip end-0">
                     {register.errors.password}
                  </div>
               </div>
               <div className='position-relative'>
                  <label htmlFor="rePassword" className='fw-normal my-2 mt-3'>RePassword:</label>
                  <input type="password" name='rePassword' id='rePassword' className={(register.errors.rePassword && register.touched.rePassword ? 'is-invalid' : '') + ' form-control form-control-sm'} onChange={register.handleChange} onKeyUp={register.handleBlur}/>
                  <div className="invalid-tooltip end-0">
                     {register.errors.rePassword}
                  </div>
               </div>
               <div className="position-relative">
                  <label htmlFor="phone" className='fw-normal my-2 mt-3'>Phone:</label>
                  <input type="tel" name='phone' id='phone' className={(register.errors.phone && register.touched.phone ? 'is-invalid' : '') + ' form-control form-control-sm'} onChange={register.handleChange} onKeyUp={register.handleBlur}/>
                  <div className="invalid-tooltip end-0">
                     {register.errors.phone}
                  </div>
               </div>
               <p className='my-3 fw-normal text-muted'>Already have an account? <Link to={'/login'} className='LogSign'>Login here!!</Link></p>
               <button disabled={!(register.dirty && register.isValid) || !loading} type='submit' className='btn bg-main text-white w-100 py-2'>
                  {loading ? <>Signup <i className="fa-solid fa-user-plus"></i></> : <i className='fa fa-spin fa-spinner'></i>}
               </button>
            </form>
         </div>
      </>
   )
}
