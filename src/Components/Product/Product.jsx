import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { wishContext } from '../../Context/WishlistContext'
import { cartContext } from '../../Context/CartContext'

export default function Product({ data }) {

   let token = localStorage.getItem('token')
   let { addWishlist, deleteWishlist, wish, setWish, setCounter } = useContext(wishContext)
   let arr = token ? JSON.parse(localStorage.getItem('WishList')) : []
   wish = arr?.includes(data._id)
   let nav = useNavigate()

   async function add_remove(ID) {
      let item;
      if (token) {
         if (wish) {
            item = await deleteWishlist(ID)
            setWish(false)
            toast.error('Product removed successfully from your wishlist')
         } else {
            item = await addWishlist(ID)
            setWish(true)
            toast.success('Product added successfully to your wishlist')
         }
         localStorage.setItem('WishList', JSON.stringify(item.data))
         setCounter(item.data.length)
      } else {
         nav('/login')
      }
   }

   let { addCart, setCartCounter } = useContext(cartContext)
   const [loading, setLoading] = useState(true)

   async function addToCart(ID) {
      if (token) {
         setLoading(false)
         let data = await addCart(ID)
         setCartCounter(data.numOfCartItems)
         toast.success(data.message)
         setLoading(true)
      } else {
         nav('/login')
      }
   }

   return (
      <>
         <div className="col">
            <div className="product p-2 rounded-3 position-relative">
               <button className='wishlist bg-white shadow-lg rounded-circle btn border-0'
                  onClick={() => add_remove(data._id)}>
                  <i className={"fa-solid " + (wish ? "fa-heart text-main" : "fa-heart-crack")}></i>
               </button>
               <Link to={'/products/' + data._id}>
                  <img src={data.imageCover} className='w-100' alt="" />
                  <h6 className='text-main fw-normal my-2'>{data.category.name}</h6>
                  <h5>{data.title.split(' ').slice(0, 4).join(' ')}</h5>
                  <div className='d-flex justify-content-between my-2 fw-normal'>
                     <div>
                        <span>{data.price} EGP</span>
                     </div>
                     <div>
                        {data.ratingsAverage} <i className="fa-solid fa-star rating-color"></i>
                     </div>
                  </div>
               </Link>
               <button disabled={!loading} onClick={() => addToCart(data._id)} className='btn bg-main text-white w-100'>
                  {
                     loading ? <>Add To Cart <i className="fa-solid fa-cart-plus"></i></> : <i className='fa fa-spin fa-spinner'></i>
                  }
               </button>
            </div>
         </div>
      </>
   )
}
