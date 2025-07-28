import React from 'react'
import Slider from '../components/sections/Slider'
import Category from '../components/sections/Category'
import ClothesSlider from '../components/sections/ClothesSlider'
import TrendingCategory from '../components/sections/TrendingCategory'
import OfferSlider from '../components/sections/OfferSlider'

export const Home = () => {
  return (
    <>
      <div className="slider-container" style={{ position: 'relative' }}>
        <Slider />
        <Category />
      </div>

       <section className='priv-padding'>
        <ClothesSlider/>
       </section>
       
        <TrendingCategory />
        <OfferSlider />
    </>
  )
}
