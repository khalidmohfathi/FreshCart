import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../Assets/Images/freshcart-logo.svg'
import { wishContext } from '../../Context/WishlistContext'
import { jwtDecode } from 'jwt-decode'
import { cartContext } from '../../Context/CartContext'
import axios from 'axios'

export default function MainNav() {

   let navigate = useNavigate()
   let { counter, setCounter } = useContext(wishContext)
   let { cartCounter, setCartCounter } = useContext(cartContext)

   function signOut() {
      localStorage.clear()
      setCounter(0)
      setCartCounter(0)
      navigate('/')
   }

   // async function test() {
   //    let {data} = await axios.post('', val, {
   //       headers: {
   //          token: localStorage.getItem('token')
   //       }
   //    })
   //    window.location.href = data.session.url
   //    console.log(data);
   // }



   return (
      <>
         <nav className="navbar navbar-expand-lg shadow-sm bg-light-subtle">
            <div className="container my-2">
               <Link className="navbar-brand" to={'/'}><img src={logo} alt='Site-Logo'></img></Link>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto">
                     <li className="nav-item">
                        <NavLink className="nav-link" to={'/'}>Home</NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink className="nav-link" to={'/products'}>Products</NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink className="nav-link" to={'/categories'}>Categories</NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink className="nav-link" to={'/brands'}>Brands</NavLink>
                     </li>
                  </ul>
                  <ul className="navbar-nav ms-auto">
                     <li className="nav-item border-end pe-2 me-2">
                        <NavLink className="nav-link" to={'/wishlist'}>
                           Wishlist
                           <div className='position-relative d-inline'>
                              <i className="fa-solid fa-heart ms-2 me-1"></i>
                              {counter ?
                                 <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-main fw-normal">
                                    {counter}
                                 </span>
                                 : ''
                              }
                           </div>
                        </NavLink>
                     </li>
                     <li className="nav-item border-end pe-2 me-2">
                        <NavLink className="nav-link" to={'/cart'}>
                           Cart
                           <div className='position-relative d-inline'>
                              <i className="fa-solid fa-cart-shopping ms-2 me-1"></i>
                              {cartCounter ?
                                 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main fw-normal">
                                    {cartCounter}
                                 </span>
                                 : ''
                              }
                           </div>
                        </NavLink>
                     </li>
                     {(localStorage.getItem('token')) ?
                        <li className="nav-item dropdown">
                           <button className='btn border-0 p-0 m-0' data-bs-toggle="dropdown">
                              <div className='profile'>
                                 <NavLink className="nav-link" to={'/profile'}>{jwtDecode(localStorage.getItem('token')).name[0]}</NavLink>
                              </div>
                           </button>
                           <ul className="dropdown-menu">
                              <li><Link className="dropdown-item my-1" to={'/profile'}>Profile <i className="fa-solid fa-user ms-1 text-main"></i></Link></li>
                              <li><Link className="dropdown-item my-1" to={'/allorders'}>Orders <i className="fa-solid fa-truck-fast ms-1 text-main"></i></Link></li>
                              {/* <li><Link className="dropdown-item my-1" to={'/profile'}>Addresses <i className="fa-solid fa-map-location-dot ms-1 text-main"></i></Link></li> */}
                              <li><hr className="dropdown-divider" /></li>
                              <li><button className="dropdown-item" onClick={signOut}>Sign Out <i className="fa-solid fa-right-to-bracket ms-1 text-main"></i></button></li>
                           </ul>
                        </li>
                        :
                        <li className="nav-item">
                           <NavLink className="nav-link" to={'/login'}>Login <i className="fa-solid fa-right-to-bracket ms-1"></i></NavLink>
                        </li>
                     }
                  </ul>
               </div>
            </div>
         </nav>
      </>
   )
}
