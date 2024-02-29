import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { toast } from 'react-toastify';

export default function ResetCode() {

   let navigate = useNavigate()

   const [loading, setLoading] = useState(true)

   async function reset(values) {
      setLoading(false)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values).then(
         ({ data }) => {
            if (data.status == 'Success') {
               navigate('/forget-password/reset-password')
               toast.success('Correct Reset Code')
            }
         }
      ).catch((err) => {
         toast.error(err.response.data.message)
         setLoading(true)
      })
   }

   function validationSchema() {
      let schema = new Yup.object({
         resetCode: Yup.string().required(),
      })
      return schema
   }

   let register = useFormik({
      initialValues: {
         resetCode: '',
      },
      validationSchema,
      onSubmit: (values) => {
         reset(values)
      }
   })

   return (
      <>
         <div className='my-5 mx-auto bg-light shadow-lg p-5 rounded-5 w-50'>
            <h4 className='fw-normal text-center text-main'>Account Recovery</h4>
            <form onSubmit={register.handleSubmit}>
               <div className="position-relative">
                  <label htmlFor="resetCode" className='fw-normal my-2 mt-3'>Reset Code:</label>
                  <input type="text" name='resetCode' id='resetCode' className={(register.errors.resetCode && register.touched.resetCode ? 'is-invalid' : '') + ' form-control'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.resetCode}
                  </div>
               </div>
               <div className='text-center'>
                  <button disabled={!(register.dirty && register.isValid) || !loading} type='submit' className='btn bg-main text-white mt-4 w-100 py-2'>
                     {loading ? <>Confirm Reset Code <i className="fa-solid fa-upload ms-1"></i></> : <i className='fa fa-spin fa-spinner'></i>}
                  </button>
               </div>
            </form>
         </div>
      </>
   )
}

