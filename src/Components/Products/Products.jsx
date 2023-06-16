import React, { useContext } from 'react'
import axios from 'axios'
import Product from "../Product/Product.jsx"
import {
    useState, useEffect
} from 'react'
import { baseUrl } from '../../Utilites/BaseUrl'
import Loading from '../Loading/Loading.jsx'
import { CardContext } from '../Context/CardContext.js'

export default function Products() {

    const [Products, setProducts] = useState([])

    const getAllProducts = async () => {
        let { data } = await axios.get(`${baseUrl}api/v1/products`)
        setProducts(data.data)

    }



    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>

            <div className="container">
                <div className="row">
                    {Products.length != 0 ? <Product Items={Products} /> : <Loading />}
                </div>
            </div>
        </>
    )
}
