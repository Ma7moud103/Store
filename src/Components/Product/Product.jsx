import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CardContext } from '../Context/CardContext'
import { notify } from '../../Utilites/Notify'
export default function Product(items) {

    let { AddToCart, getCardCount } = useContext(CardContext)

    async function AddItem(ProductId) {
        let token = localStorage.getItem("token")
        if (token) {
            let response = await AddToCart(token, ProductId)

            if (response.status === 200) {
                notify("Product added successfully to your cart", "success")
                getCardCount()
            }
            console.log(response);
        } else {
            alert("you have to login first")
        }
    }


    return (
        <>
            {items.Products.map((item) => {
                return <div key={item.id} className="col-lg-2 col-md-3 col-sm-4  my-3">
                    <div className="product">
                        <Link to={`/product-details/${item.id}`}>
                            <img src={item.imageCover} className='w-100' alt="" />
                            <h6 className='text-main'>{item.category.name}</h6>
                            <p className='fw-bolder'>{item.title.split(" ").slice(0, 2).join(" ")}</p>
                            <div className='d-flex justify-content-between align-items-center my-3'>
                                <div>
                                    <span>{item.price} EGP</span>
                                </div>
                                <div>
                                    <i className='fas fa-star rating-color'></i>
                                    {item.ratingsAverage}
                                </div>
                            </div>
                        </Link>
                        <button onClick={() => AddItem(item.id)} className='btn bg-main text-white w-100'>Add to card</button>
                    </div>
                </div>
            })}
        </>
    )
}
