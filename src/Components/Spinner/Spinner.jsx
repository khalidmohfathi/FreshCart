import React from 'react'
import loader from './Spinner.module.css'

export default function Spinner() {
   return (
      <>
         <div className={loader.spinner} >
            <div className={loader.bounce1}></div>
            <div className={loader.bounce2}></div>
            <div className={loader.bounce3}></div>
         </div>
      </>
   )
}
