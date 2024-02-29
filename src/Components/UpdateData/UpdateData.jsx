import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { toast } from 'react-toastify';

export default function UpdateData() {

   let navigate = useNavigate()

   const [loading, setLoading] = useState(true)

   async function updateToApi(values) {
      setLoading(false)
      axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', values, {
         headers: {
            token: localStorage.getItem('token')
         }
      }).then(
         ({ data }) => {
            if (data.message == 'success') {
               navigate('/')
               toast.success('Account Updated Successfully')
            }
         }
      ).catch((err) => {
         toast.error(err.response.data.errors.msg)
         setLoading(true)
      })
   }

   function validationSchema() {
      let schema = new Yup.object({
         name: Yup.string().min(3).max(22).required(),
         email: Yup.string().email().required(),
         phone: Yup.string().matches(/^[0-9]{11}$/, 'Enter a valid phone number')
      })
      return schema
   }

   let register = useFormik({
      initialValues: {
         name: '',
         email: '',
         phone: '',
      },
      validationSchema,
      onSubmit: (values) => {
         updateToApi(values)
      }
   })

   return (
      <>
         <div className='mx-auto my-5 bg-light shadow-lg p-5 rounded-5 w-50'>
            <h4 className='fw-normal text-center text-main'>Update your data</h4>
            <form onSubmit={register.handleSubmit}>
               <div className='position-relative'>
                  <label htmlFor="name" className='fw-normal my-2 mt-3'>Name:</label>
                  <input type="text" name='name' id='name' className={(register.errors.name && register.touched.name ? 'is-invalid' : '') + ' form-control'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.name}
                  </div>
               </div>
               <div className="position-relative">
                  <label htmlFor="email" className='fw-normal my-2 mt-3'>Email:</label>
                  <input type="email" name='email' id='email' className={(register.errors.email && register.touched.email ? 'is-invalid' : '') + ' form-control'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.email}
                  </div>
               </div>
               <div className="position-relative">
                  <label htmlFor="phone" className='fw-normal my-2 mt-3'>Phone:</label>
                  <input type="tel" name='phone' id='phone' className={(register.errors.phone && register.touched.phone ? 'is-invalid' : '') + ' form-control'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.phone}
                  </div>
               </div>
               <div className='mt-4'>
                  <button disabled={!(register.dirty && register.isValid) || !loading} type='submit' className='btn bg-main text-white py-2 w-100'>
                     {loading ? <>Update <i className="fa-solid fa-upload ms-1"></i></> : <i className='fa fa-spin fa-spinner'></i>}
                  </button>
               </div>
            </form>
         </div>
      </>
   )
}

