import React from 'react'
import { Link } from 'react-router-dom';
export default function Product({ Items }) {

    console.log(Items);
    return (
        <>
            {Items.map((item) => {
                return <div key={item.id} className="col-lg-2 col-md-3 col-sm-4  my-3">
                    <div className="product">
                        <Link to={`/product-details/${item.id}`}>
                            <img loading='lazy' src={item.imageCover} className='w-100' alt="" />
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
                        <button className='btn bg-main text-white w-100'>Add to card</button>
                    </div>
                </div>
            })}
        </>
    )
}
