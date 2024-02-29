import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import { cartContext } from '../../Context/CartContext';

export default function Checkout() {

   let { id } = useParams()
   let nav = useNavigate()
   let { setCartCounter } = useContext(cartContext)

   const [loading, setLoading] = useState(true)

   async function checkOut(values) {
      setLoading(false)
      axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${(values.radio == 'credit' ? `checkout-session/${id}?url=http://khalidmohfathi.github.io/FreshCart/%23` : `${id}`)}`, { shippingAddress: values }, {
         headers: {
            token: localStorage.getItem('token')
         }
      }).then(
         ({ data }) => {
            if (values.radio == 'credit')
               window.location.href = data.session.url
            else {
               toast.success('Thank you! Your order is on its way')
               setCartCounter(0)
               nav('/allorders')
            }
         }
      ).catch((err) => {
         toast.error(err.response.data.message)
         setLoading(true)
      })
   }

   function validationSchema() {
      let schema = new Yup.object({
         phone: Yup.string().matches(/^[0-9]{11}$/, 'Enter a valid phone number'),
         radio: Yup.string().required()
      })
      return schema
   }

   let register = useFormik({
      initialValues: {
         details: '',
         phone: '',
         city: '',
         radio: '',
      },
      validationSchema,
      onSubmit: (values) => {
         checkOut(values)
      }
   })

   return (
      <>
         <div className='w-50 mx-auto my-5 bg-light shadow-lg p-5 rounded-5'>
            <h4 className='fw-normal text-center text-main'>Checkout</h4>
            <form onSubmit={register.handleSubmit}>
               <div>
                  <label htmlFor="details" className='fw-normal my-2 mt-3'>Address Details:</label>
                  <textarea type="text" name='details' id='details' className='form-control' onChange={register.handleChange} />
               </div>
               <div>
                  <label htmlFor="city" className='fw-normal my-2 mt-3'>City:</label>
                  <input type="text" name='city' id='city' className='form-control' onChange={register.handleChange} />
               </div>
               <div className="position-relative">
                  <label htmlFor="phone" className='fw-normal my-2 mt-3'>Phone:</label>
                  <input type="tel" name='phone' id='phone' className={(register.errors.phone && register.touched.phone ? 'is-invalid' : '') + ' form-control'} onChange={register.handleChange} onKeyUp={register.handleBlur} />
                  <div className="invalid-tooltip end-0">
                     {register.errors.phone}
                  </div>
               </div>
               <div className='my-3 fw-normal'>
                  <div className="form-check form-check-inline">
                     <input className="form-check-input" name="radio" type="radio" id="cash" onChange={register.handleChange} value='cash' />
                     <label className="form-check-label" htmlFor="cash">
                        Cash
                     </label>
                  </div>
                  <div className="form-check form-check-inline">
                     <input className="form-check-input" name="radio" type="radio" id="creditCard" onChange={register.handleChange} value='credit' />
                     <label className="form-check-label" htmlFor="creditCard">
                        Credit Card
                     </label>
                  </div>
               </div>
               <div className='text-center'>
                  <button disabled={!(register.values.details && register.values.phone && register.values.city && register.isValid) || !loading} type='submit' className='btn bg-main text-white w-100 py-2'>
                     {loading ? <>Place Order <i className="fa-solid fa-dolly"></i></> : <i className='fa fa-spin fa-spinner'></i>}
                  </button>
               </div>
            </form>
         </div>
      </>
   )
}

