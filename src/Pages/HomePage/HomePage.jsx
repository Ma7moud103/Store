import React from 'react'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import MainSlider from '../../Components/Mainslider/MainSlider'
import Products from '../../Components/Products/Products'

export default function HomePage() {
    return (
        <>
            <MainSlider />
            <CategorySlider />
            <Products />
        </>
    )
}
