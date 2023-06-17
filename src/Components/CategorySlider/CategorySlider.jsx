import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../Utilites/BaseUrl'
import Slider from 'react-slick'
import { motion } from 'framer-motion'


export default function CategorySlider() {
    const [Categories, setCategories] = useState([])
    const getAllCategories = async () => {
        let { data } = await axios.get(`${baseUrl}api/v1/categories`)
        setCategories(data.data)
    }
    useEffect(() => {
        getAllCategories()
    }, [])
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false,
        autoplay: true
    };
    return (
        <>
            <motion.div className="my-5 container"

                animate={{ opacity: 1, transition: { duration: 1, delay: .9 } }}
                initial={{ opacity: 0 }}
            >
                <h3>Shop Popular Categories</h3>
                <Slider {...settings} autoplaySpeed={3000}>

                    {Categories.map((item, index) => {
                        return <div key={index} className='cursor-pointer'>
                            <img className="w-100" height={250} src={item.image} alt="" />
                            <h6 className='text-center'>{item.name}</h6>
                        </div>
                    })}

                </Slider>
            </motion.div>
        </>
    )
}
