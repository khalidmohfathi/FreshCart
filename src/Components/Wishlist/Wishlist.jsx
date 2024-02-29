import React, { useContext, useEffect, useState } from 'react'
import { wishContext } from '../../Context/WishlistContext'
import WishlistProduct from '../WishlistProduct/WishlistProduct'
import Spinner from '../Spinner/Spinner'

export default function Wishlist() {

   let { getWishlist, setCounter } = useContext(wishContext)
   const [items, setItems] = useState([])
   const [loading, setLoading] = useState(true)

   async function getWish() {
      let { data } = await getWishlist()
      setCounter(data.data.length)
      setItems(data.data)
      setLoading(false)
   }

   useEffect(() => {
      getWish()
   }, [])

   if (loading) return <Spinner />

   return (
      <>
         <section className='container my-5'>
            <h4 className='fw-normal border-bottom pb-3'>My Wishlist</h4>
            {
               items.length ?
                  items.map(prod => {
                     return <WishlistProduct prod={prod} getWish={getWish} key={prod._id} />
                  })
                  : <h4 className='text-center my-5 fw-normal'>Your wishlist is empty <i className="fa-regular fa-face-frown text-main"></i></h4>
            }
         </section>
      </>
   )
}
