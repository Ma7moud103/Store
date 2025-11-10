import React, { useContext} from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../Utilites/BaseUrl'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading'
import Slider from 'react-slick'
import { CardContext } from '../../Context/CardContext'
import { toast } from 'react-toastify'
export default function ProductDetails() {
        let { addtocart, setnumOfCartItem } = useContext(CardContext)
    
    let { id } = useParams()

    const [Product, setProduct] = useState([])
   

    async function addproduct(productId) {
        let res = await addtocart(productId)
        if (res.data.status === "success") {
            toast.success(res.data.message, { duration: 2000, position: 'bottom-right' })
            setnumOfCartItem(res.data.numOfCartItems)
        } else {
            toast.error("Something Wrong", { duration: 2000, position: "bottom-right" })

        }
    }

    

    useEffect(() => { 
        const getAllProduct = async () => {
            let { data } = await axios.get(`${baseUrl}api/v1/products/${id}`)
            setProduct(data.data)
        }
        getAllProduct()
     }, [getAllProduct])
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
                            <button onClick={() => addproduct(Product.id)} className='btn bg-main text-white w-100'>Add to card</button>

                        </div>
                    </div>
                </div>
                : <Loading />}
        </>
    )
}
