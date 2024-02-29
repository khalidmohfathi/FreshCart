import axios from 'axios';
import React, { useState } from 'react'
import { createContext } from 'react'

export let cartContext = createContext(0)

async function getCart() {
   return await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
         token: localStorage.getItem('token')
      }
   }).then((data) => data).catch(err => err)
}

async function addCart(productId) {
   return await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, {
      headers: {
         token: localStorage.getItem('token')
      }
   }).then(({ data }) => data).catch(err => err)
}

async function updateCart(productId, count) {
   return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, {
      headers: {
         token: localStorage.getItem('token')
      }
   }).then(({ data }) => data).catch(err => err)
}

async function deleteCart(productId) {
   return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: {
         token: localStorage.getItem('token')
      }
   }).then(({ data }) => data).catch(err => err)
}


export default function CartContext({ children }) {

   function initCart(){
      (async()=>{
         let {data} = await getCart()
         setCartCounter(data?.numOfCartItems)
      })()
   }

   const [cartCounter, setCartCounter] = useState(localStorage.getItem('token') ? initCart() : 0)

   return (
      <cartContext.Provider value={{
         cartCounter,
         setCartCounter,
         getCart,
         addCart,
         deleteCart,
         updateCart,
      }}>
         {children}
      </cartContext.Provider>
   )
}
