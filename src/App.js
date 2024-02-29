import React from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout/MainLayout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import SubCategory from './Components/SubCategory/SubCategory'
import BrandProducts from './Components/BrandProducts/BrandProducts'
import Layout from './Layouts/Layout/Layout'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Wishlist from './Components/Wishlist/Wishlist'
import Cart from './Components/Cart/Cart'
import WishlistContext from './Context/WishlistContext'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import Profile from './Components/Profile/Profile'
import CartContext from './Context/CartContext'
import UpdateData from './Components/UpdateData/UpdateData'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import ResetCode from './Components/ResetCode/ResetCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import NotFound from './Components/NotFound/NotFound'
import Orders from './Components/Orders/Orders'
import Checkout from './Components/Checkout/Checkout'
import Order from './Components/Order/Order'

export default function App() {

   let router = createHashRouter([
      {
         path: '/', element: <MainLayout />, children: [
            { index: true, element: <Home /> },
            {
               path: 'products', element: <Layout />  , children: [
                  { index: true, element: <Products /> },
                  { path: ':id', element: <ProductDetails /> },
               ]
            },
            {
               path: 'categories', element: <Layout />, children: [
                  { index: true, element: <Categories /> },
                  { path: ':name/:id', element: <SubCategory /> },
               ]
            },
            {
               path: 'brands', element: <Layout />, children: [
                  { index: true, element: <Brands /> },
                  { path: ':name/:id', element: <BrandProducts /> }
               ]
            },
            { path: 'wishlist', element: <ProtectedRoutes><Wishlist /></ProtectedRoutes> },
            {
               path: 'cart', element: <ProtectedRoutes><Layout /></ProtectedRoutes>, children: [
                  { index: true, element: <Cart /> },
                  { path: ':id', element: <Checkout /> }
               ]
            },
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Signup /> },
            {
               path: 'profile', element: <ProtectedRoutes><Layout /></ProtectedRoutes>, children: [
                  { index: true, element: <Profile /> },
                  { path: 'update', element: <UpdateData /> },
                  { path: 'change-password', element: <ChangePassword /> },
               ]
            },
            {
               path: 'forget-password', element: <Layout />, children: [
                  { index: true, element: <ForgetPassword /> },
                  { path: 'reset-code', element: <ResetCode /> },
                  { path: 'reset-password', element: <ResetPassword /> }
               ]
            },
            {
               path: 'allorders', element: <Layout />, children: [
                  { index: true, element: <Orders /> },
                  { path: ':id', element: <Order /> }
               ]
            },
            { path: '*', element: <NotFound /> },
         ]
      }
   ])

   return (
      <>
         <ToastContainer
            position="bottom-left"
            autoClose={1500}
            draggable={false}
            pauseOnHover={false}
            theme="colored" />
         <CartContext>
            <WishlistContext>
               <RouterProvider router={router} />
            </WishlistContext>
         </CartContext>
      </>
   )
}
