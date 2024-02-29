import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
   return (
      <>
         <footer className='bg-light border-top border-bottom'>
            <div className="container">
               <div className='d-flex justify-content-evenly align-items-center py-2 flex-wrap'>
                  <h5 className='m-0'>Made by <span className='fw-normal text-main'>Khalid Mohammed Fathi</span></h5>
                  <div style={{fontSize:'24px'}}>
                     <Link to={'https://github.com/khalidmohfathi'} target='_blank' className='mx-2'><i className="fa-brands fa-github"></i></Link>
                     <Link to={'https://www.linkedin.com/in/khalid-mohammed117/'} target='_blank' className='mx-2'><i className="fa-brands fa-linkedin"></i></Link>
                     <Link to={'https://www.facebook.com/khalidmohammed117/'} target='_blank' className='mx-2'><i className="fa-brands fa-facebook"></i></Link>
                     <Link to={'mailto:khalidmohfathi@gmail.com'}><i className='fa-solid fa-envelope mx-2'></i></Link>
                  </div>
               </div>
            </div>
         </footer>
      </>
   )
}
