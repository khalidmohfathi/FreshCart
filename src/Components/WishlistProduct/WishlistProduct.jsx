import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'
import { wishContext } from '../../Context/WishlistContext'

export default function WishlistProduct(props) {

   let { deleteWishlist, setCounter } = useContext(wishContext)
   const [removeLoading, setRemoveLoading] = useState(true)

   async function remove(ID) {
      setRemoveLoading(false)
      let { data } = await deleteWishlist(ID)
      await props.getWish()
      localStorage.setItem('WishList', JSON.stringify(data))
      setCounter(data.length)
      toast.error('Product removed successfully from your wishlist ')
      setRemoveLoading(true)
   }

   let { addCart, setCartCounter } = useContext(cartContext)
   const [cartLoading, setCartLoading] = useState(true)

   async function addToCart(ID) {
      setCartLoading(false)
      let data = await addCart(ID)
      setCartCounter(data.numOfCartItems)
      toast.success(data.message)
      setCartLoading(true)
   }

   return (
      <div className="row align-items-center border-bottom" >
         <Link to={'/products/' + props.prod._id} className="col-md-2 text-center">
            <img src={props.prod?.imageCover} className='w-75' alt="" />
         </Link>
         <div className="col-md-8 fw-normal">
            <p className='my-2'>{props.prod?.title}</p>
            <p className='text-main my-2'>{props.prod?.price} EGP</p>
         </div>
         <div className="col-md-2">
            <div className='d-flex flex-column'>
               <button className='btn border-0 bg-main text-white my-1 wishCartbtn' disabled={!cartLoading} onClick={() => addToCart(props.prod?._id)}>
                  {
                     cartLoading ? <><i className="fa-solid fa-cart-plus"></i> Add to Cart</> : <i className='fa fa-spin fa-spinner'></i>
                  }
               </button>
               <button className={'btn border-0 text-white my-1 wishbtn ' + (removeLoading ? 'bg-main' : 'bg-danger')} onClick={() => remove(props.prod._id)} disabled={!removeLoading}>
                  {
                     removeLoading ? <><i className="fa-solid fa-heart-broken"></i> Remove</> : <i className='fa fa-spin fa-spinner'></i>
                  }
               </button>
            </div>
         </div>
      </div>
   )
}
