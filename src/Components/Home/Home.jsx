import React from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategSlider from '../CategSlider/CategSlider'
import Products from '../Products/Products'

export default function Home() {
   return (
      <>
         <MainSlider />
         <CategSlider />
         <Products home={true} />
      </>
   )
}
