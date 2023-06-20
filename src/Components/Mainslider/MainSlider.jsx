import React from 'react'
import Slider from 'react-slick'
import slide1 from "../../images/slider/grocery-banner-2.jpeg"
import slide2 from "../../images/slider/grocery-banner.png"
import slide3 from "../../images/slider/slider-2.jpeg"
import { motion } from 'framer-motion'



export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,

    };
    return (
        <>
            <motion.div

                animate={{ opacity: 1, transition: { duration: 1, } }}
                initial={{ opacity: 0 }}
                className="" style={{ paddingTop: "5rem", }}>
                <Slider {...settings} >
                    <img src={slide1} alt="" />
                    <img src={slide2} alt="" />
                    <img src={slide3} alt="" />
                </Slider>
            </motion.div>
        </>
    )
}
