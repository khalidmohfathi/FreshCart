import axios from 'axios';
import React, { useState } from 'react'
import { createContext } from 'react'

export let wishContext = createContext(0)

async function getWishlist() {
   return await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: {
         token: localStorage.getItem('token')
      }
   })
}

async function addWishlist(productId) {
   return await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, {
      headers: {
         token: localStorage.getItem('token')
      }
   }).then(({ data }) => data).catch(err => err)
}

async function deleteWishlist(productId) {
   return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      headers: {
         token: localStorage.getItem('token')
      }
   }).then(({ data }) => data).catch(err => err)
}

export default function WishlistContext({ children }) {

   const [counter, setCounter] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('WishList')).length : 0)
   let [wish, setWish] = useState()

   return (
      <wishContext.Provider value={{
         counter,
         setCounter,
         getWishlist,
         addWishlist,
         deleteWishlist,
         wish,
         setWish
      }}>
         {children}
      </wishContext.Provider>
   )
}
