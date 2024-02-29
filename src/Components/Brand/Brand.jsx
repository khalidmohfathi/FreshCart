import React from 'react'
import { Link } from 'react-router-dom'

export default function Brand({ brand }) {

   return (
      <>
         <div className="col">
            <Link to={brand.name + '/' + brand._id}>
               <div className="card w-100">
                  <img src={brand.image} className="card-img-top" alt="..." />
                  <div className="card-body border-top bg-light">
                     <p className="card-text text-center fw-normal">{brand.name}</p>
                  </div>
               </div>
            </Link>
         </div>
      </>
   )
}