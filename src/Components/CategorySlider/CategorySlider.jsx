import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../Utilites/BaseUrl'
import Slider from 'react-slick'


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
            <div className="my-5 container">
                <h3>Shop Popular Categories</h3>
                <Slider {...settings} autoplaySpeed={3000}>

                    {Categories.map((item, index) => {
                        return <div key={index}>
                            <img className="w-100" height={250} src={item.image} alt="" />
                            <h6 >{item.name}</h6>
                        </div>
                    })}

                </Slider>
            </div>
        </>
    )
}
