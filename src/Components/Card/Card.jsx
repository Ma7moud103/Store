import React, { useContext, useEffect, useState } from 'react'

import Loading from '../Loading/Loading'
import { CardContext } from '../Context/CardContext'
import { notify } from '../../Utilites/Notify'
import { Link } from 'react-router-dom'

export default function Card() {

    let { GetUserCard, DeletCard, getCardCount } = useContext(CardContext)


    const [card, setcard] = useState([])
    const [totalPrice, settotalPrice] = useState([])



    async function GetCard() {
        let token = localStorage.getItem("token")
        if (token) {
            let response = await GetUserCard(token)
            setcard(response.data.data.products)
            settotalPrice(response.data.data.totalCartPrice)
        }
    }

    async function remove(productId) {
        let token = localStorage.getItem("token")
        let response = await DeletCard(token, productId)

        setcard(response.data.data.products)
        settotalPrice(response.data.data.totalCartPrice)
        notify("the item is deletd", "success")
        getCardCount()
    }


    useEffect(() => {
        GetCard()
    }, [])

    return (
        <>
            {
                card.length !== 0 ? <div className="container">
                    <div className="bg-main-light p-3 my-4 ">
                        <h3>Shop Card</h3>
                        <h6 className='text-main my-3 fw-bold'>Total Card Price:{totalPrice} EGP</h6>
                        {card.map((item) => {
                            return <div key={item._id} className="row border-bottom my-3">
                                <div className="col-md-1">
                                    <img src={item.product.imageCover} className='w-100' alt="" />

                                </div>
                                <div className="col-md-11 d-flex justify-content-between
">
                                    <div>
                                        <h6>{item.product.title}</h6>

                                        <h6 className='text-main mx-2 fw-bolder'>{item.price} EGP</h6>
                                        <button onClick={() => remove(item.product._id)} className='text-danger btn'>Remove <i className="fa-solid fa-trash"></i></button>

                                    </div>
                                    <div>
                                        <button className='text-white btn bg-main '>+</button>
                                        <span className="px-2">{item.count}</span>
                                        <button className='text-white btn bg-main'>-</button>
                                    </div>
                                </div>
                            </div>
                        })}

                        <Link to="/checkout" className="btn bg-main text-white">
                            ChekOut
                        </Link>
                        <button className='btn m-auto bg-warning text-white mx-5'>Clear All</button>
                    </div>
                </div> : <h1><Loading /> </h1>
            }
        </>
    )
}
