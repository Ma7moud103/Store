import React from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../Utilites/BaseUrl'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading'
export default function ProductDetails() {
    let id = useParams()

    console.log(id);
    const [Product, setProduct] = useState([])
    const getAllProduct = async () => {
        let { data } = await axios.get(`${baseUrl}api/v1/products/${id}`)
        console.log(data.data);
        setProduct(data.data)
    }


    useEffect(() => { getAllProduct() }, [])


    return (
        <>
            {Product.length !== 0 ? <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <img className='w-100' src={Product.imageCover} alt="" />
                    </div>
                    <div className="col-md-9">
                        <h3>{Product.title}</h3>
                        <p>{Product.description}</p>
                    </div>
                </div>
            </div> : <Loading />}
        </>
    )
}
