import React from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../Utilites/BaseUrl'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading'
import Slider from 'react-slick'
export default function ProductDetails() {
    let { id } = useParams()

    const [Product, setProduct] = useState([])
    const getAllProduct = async () => {
        let { data } = await axios.get(`${baseUrl}api/v1/products/${id}`)
        setProduct(data.data)
    }


    useEffect(() => { getAllProduct() }, [])
    var settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 2,
        arrows: false,
        autoplay: true
    };


    return (
        <>
            {Product.length !== 0 ?
                <div className="container" style={{ paddingTop: "6rem" }}>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <Slider {...settings} autoplaySpeed={3000}>

                                {Product.images.map((item, index) => {
                                    return <div key={index}>
                                        <img className="w-100" src={item} alt="" />
                                    </div>
                                })}

                            </Slider>
                        </div>
                        <div className="col-md-8">
                            <h1>{Product.title}</h1>
                            <p>{Product.description}</p>
                            <div className='d-flex justify-content-between align-items-center my-3'>
                                <div>
                                    <span>{Product.price} EGP</span>
                                </div>
                                <div>
                                    <i className='fas fa-star rating-color'></i>
                                    {Product.ratingsAverage}
                                </div>
                            </div>
                            <button className='btn bg-main text-white w-100'>Add to card</button>

                        </div>
                    </div>
                </div>
                : <Loading />}
        </>
    )
}
