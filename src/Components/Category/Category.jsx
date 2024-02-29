import React from 'react'
import { Link } from 'react-router-dom'

export default function Category({ categ }) {

   return (
      <>
         <div className="col">
            <Link to={categ.name + '/' + categ._id}>
               <div className="card w-100">
                  <img src={categ.image} className="card-img-top" height={235} alt="..." />
                  <div className="card-body border-top bg-light">
                     <p className="card-text text-center fw-normal">{categ.name}</p>
                  </div>
               </div>
            </Link>
         </div>
      </>
   )
}
