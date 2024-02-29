import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import Spinner from '../Spinner/Spinner'
import CartProduct from '../CartProduct/CartProduct'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Cart() {

   let { getCart, setCartCounter, updateCart, deleteCart } = useContext(cartContext)
   const [items, setItems] = useState()
   const [loading, setLoading] = useState(true)

   async function removeCartProduct(ID) {
      let data = await deleteCart(ID)
      setCartCounter(data.numOfCartItems)
      toast.error('Product removed successfully your from cart')
      setItems(data.data)
   }

   async function getCartProducts() {
      let { data } = await getCart()
      setCartCounter(data?.numOfCartItems)
      setItems(data?.data)
      setLoading(false)
   }

   async function updateCount(ID, count) {
      let { data } = await updateCart(ID, count)
      setItems(data)
   }

   useEffect(() => {
      getCartProducts()
   }, [])

   if (loading) return <Spinner />

   return (
      <>
         <section className='container my-5'>
            <h4 className='fw-normal'>My Cart</h4>
            <h5 className='border-bottom pb-3'>Total Cart Price : <span className='text-main fw-normal'>{items?.totalCartPrice ? items?.totalCartPrice : 0} EGP</span></h5>
            {
               items?.products.length ?
                  items?.products.map(prod => {
                     return <CartProduct prod={prod} key={prod.product._id} updateCount={updateCount} removeCartProduct={removeCartProduct} />
                  })
                  :
                  <h4 className='text-center my-5 fw-normal'>Your cart is empty <i className="fa-regular fa-face-frown text-main"></i></h4>
            }
            {
               items?.products.length ?
                  <div className='text-center mt-5'>
                     <Link className='bg-main text-white btn px-4 py-2' to={items._id}>Checkout<i className="fa-regular fa-credit-card ms-2"></i></Link>
                  </div>
                  : ""
            }

         </section>
      </>
   )
}
