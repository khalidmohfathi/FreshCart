import React from 'react'
import notFound from '../../Assets/Images/error.svg'

export default function NotFound() {
   return (
      <div className='container my-5'>
         <img src={notFound} className='w-100' height={500} alt="" />
      </div>
   )
}
