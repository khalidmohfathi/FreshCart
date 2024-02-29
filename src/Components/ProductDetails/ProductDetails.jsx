import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import { wishContext } from '../../Context/WishlistContext'
import { toast } from 'react-toastify'
import { cartContext } from '../../Context/CartContext'

export default function ProductDetails() {

   let details = useParams()
   const [prod, setProd] = useState({})
   const [loading, setLoading] = useState(true);
   const [src, setSrc] = useState('')

   async function getProductDetails() {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${details.id}`)
      setSrc(data.data.imageCover)
      setProd(data.data)
      setLoading(false)
   }

   function changeImg(e) {
      setSrc(e.target.src)
   }

   useEffect(() => {
      getProductDetails()
   }, [])

   let token = localStorage.getItem('token')
   let { addWishlist, deleteWishlist, wish, setWish, setCounter } = useContext(wishContext)
   let arr = token ? JSON.parse(localStorage.getItem('WishList')) : []
   wish = arr?.includes(prod._id)
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
   const [cartLoading, setCartLoading] = useState(true)

   async function addToCart(ID) {
      if (token) {
         setCartLoading(false)
         let data = await addCart(ID)
         setCartCounter(data.numOfCartItems)
         toast.success(data.message)
         setCartLoading(true)
      } else {
         nav('/login')
      }
   }

   if (loading) return <Spinner />

   return (
      <>
         <section className="container my-5">
            <div className="card bg-light-subtle shadow-lg">
               <div className="row g-0">
                  <div className="col-md-6 border-end bg-white">
                     <div className="d-flex flex-column">
                        <div className="main_image position-relative">
                           <button className='wishlist bg-white shadow-lg rounded-circle btn border-0 opacity-100'
                              onClick={() => add_remove(prod._id)}>
                              <i className={"fa-solid " + (wish ? "fa-heart text-main" : "fa-heart-crack")}></i>
                           </button>
                           <img src={src} id="main_product_image" width={350} />
                        </div>
                        <div className="thumbnail_images bg-light-subtle">
                           <ul>
                              {prod.images.map((img , index) => {
                                 return <li key={index}><img src={img} width={50} height={50} onClick={(e) => changeImg(e)} /></li>
                              })}
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="p-3">
                        <h4 className='fw-normal'>{prod.title}</h4>
                        <div className="my-4 content">
                           <p>{prod.description}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                           <h4 className='m-0 fw-normal'>{prod.price} EGP</h4>
                           <p className='fs-5 m-0'>{prod.ratingsAverage} <i className="fa-solid fa-star rating-color"></i></p>
                        </div>
                        <div className="buttons my-4">
                           <button disabled={!cartLoading} onClick={() => addToCart(prod._id)} className="btn">
                              {
                                 cartLoading ? <>Add To Cart</> : <i className='fa fa-spin fa-spinner'></i>
                              }
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

      </>
   )
}
