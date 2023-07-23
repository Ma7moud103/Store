import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CardContext } from '../../Context/CardContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function Product() {


    let { addtocart, setnumOfCartItem, Products } = useContext(CardContext)

    async function addproduct(productId) {
        let res = await addtocart(productId)
        if (res.data.status === "success") {
            toast.success(res.data.message, { duration: 2000, position: 'bottom-right' })
            setnumOfCartItem(res.data.numOfCartItems)
        } else {
            toast.error("Something Wrong", { duration: 2000, position: "bottom-right" })

        }
    }
    return (
        <>
            {Products.map((item) => {
                return <motion.div key={item.id} className="col-md-3 my-4 product"

                    animate={{ opacity: 1, transition: { duration: 1 } }}
                    initial={{ opacity: 0 }}
                    whileHover={{
                        scale: 1.1,
                        transition: { duration: .8 },

                    }}

                >
                    <motion.div animate={{ opacity: 1, transition: { duration: 1, } }}
                        initial={{ opacity: 0 }} className="product border p-3">
                        <Link to={`/product-details/${item.id}`}>
                            <motion.img animate={{ opacity: 1, transition: { duration: 1, delay: .7 } }}
                                initial={{ opacity: 0 }} loading='lazy' src={item.imageCover} className='w-100' alt="" />
                            <motion.div
                                animate={{ opacity: 1, transition: { duration: 1, delay: 1.4 } }}
                                initial={{ opacity: 0 }}>
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
                            </motion.div>

                        </Link>
                        <button className='btn bg-main text-white w-100'
                            onClick={() => addproduct(item.id)}
                        >Add to card</button>
                    </motion.div>
                </motion.div>
            })}
        </>
    )
}
