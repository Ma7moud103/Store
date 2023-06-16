import React, { useContext, useEffect, useState } from 'react'

import Loading from '../Loading/Loading'
import { CardContext } from '../Context/CardContext'
import { notify } from '../../Utilites/Notify'
// import { notify } from '../../Utilites/Notify'
// import { Link } from 'react-router-dom'



export default function Card() {

    let { GetCard, Remove, update } = useContext(CardContext)

    const [items, setitems] = useState([])
    const [TotalPrice, setTotalPrice] = useState(0)



    const GetItems = async () => {
        let token = localStorage.getItem("token")
        if (token) {
            let response = await GetCard()
            setitems(response.data.data.products)
            setTotalPrice(response.data.data.totalCartPrice)
        }
    }
    const delet = async (id) => {
        let response = await Remove(id)
        console.log(response.data.data.products.length);
        setitems(response.data.data.products)
        setTotalPrice(response.data.data.totalCartPrice)
        notify("Product Deleted Successfully", "success")
    }

    const updateCart = async (count, id) => {
        // let response = await update(count, id)
        // setitems(response.data.data.products)
        // setTotalPrice(response.data.data.totalCartPrice)
        // notify("quntity updated", "success")
    }


    useEffect(() => {
        GetItems()
    }, [])


    return (
        <>
            {items !== 0 ? <div className='container'>
                <div className="bg-main-light">
                    <h3>Shop Cart</h3>
                    <h6 className='text-main my-3 fw-bold '>Total Card Price:{TotalPrice} EGP</h6>
                    {items.map((item) => {
                        return <div key={item._id} className="row border-bottom my-3">
                            <div className="col-md-1">
                                <img src={item.product.imageCover} className='w-100' alt="" />

                            </div>
                            <div className="col-md-11 d-flex justify-content-between
">
                                <div>
                                    <h6>{item.product.title}</h6>

                                    <h6 className='text-main mx-2 fw-bolder'>{item.price} EGP</h6>
                                    <button onClick={() => { delet(item._id) }} className='text-danger btn'>Remove <i className="fa-solid fa-trash"></i></button>

                                </div>
                                <div>
                                    <button onClick={() => { updateCart() }} className='text-white btn bg-main '>+</button>
                                    <span className="px-2">{item.count}</span>
                                    <button onClick={() => { updateCart() }}
                                        className='text-white btn bg-main'>-</button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

            </div> : <Loading />}
        </>
    )
}
