import React from 'react'
import MainNav from '../../Components/MainNav/MainNav'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

export default function MainLayout() {
   return (
      <>
         <MainNav />
         <Outlet />
         <Footer />
      </>
   )
}
