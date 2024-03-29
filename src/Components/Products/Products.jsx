import React, { useContext } from 'react'
import Product from "../Product/Product.jsx"

import Loading from '../Loading/Loading.jsx'
import { CardContext } from '../../Context/CardContext.js'

export default function Products() {


    let { Products } = useContext(CardContext)

    return (
        <>

            <div className="products" style={{ paddingTop: "6rem" }}>
                <div className="container">
                    <div className="row">
                        {Products.length !== 0 ? <Product /> : <Loading />}
                    </div>
                </div>
            </div>
        </>
    )
}
