import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { toast } from 'react-toastify';

export default function ForgetPassword() {

   let navigate = useNavigate()

   const [loading, setLoading] = useState(true)

   async function updateToApi(values) {
      setLoading(false)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values).then(
         ({ data }) => {
            if (data.statusMsg == 'success') {
               navigate('reset-code')
               toast.success(data.message)
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
      })
      return schema
   }

   let register = useFormik({
      initialValues: {
         email: '',
      },
      validationSchema,
      onSubmit: (values) => {
         updateToApi(values)
      }
   })

   return (
      <>
         <div className='my-5 mx-auto bg-light shadow-lg p-5 rounded-5 w-50'>
            <h4 className='fw-normal text-center text-main'>Account Recovery</h4>
            <form onSubmit={register.handleSubmit}>
               <div className="position-relative">
                  <label htmlFor="email" className='fw-normal my-2 mt-3'>Email:</label>
                  <input type="email" name='email' id='email' className={(register.errors.email && register.touched.email ? 'is-invalid' : '') + ' form-control'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.email}
                  </div>
               </div>
               <button disabled={!(register.dirty && register.isValid) || !loading} type='submit' className='btn bg-main text-white mt-4 w-100 py-2'>
                  {loading ? <>Send Reset Code <i className="fa-solid fa-upload ms-1"></i></> : <i className='fa fa-spin fa-spinner'></i>}
               </button>
            </form>
         </div>
      </>
   )
}

