import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { CardContext } from '../../Context/CardContext'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Card() {

    let { getCart, remove, update } = useContext(CardContext)
    const [items, setitems] = useState(0)

    async function getitems() {
        let res = await getCart()
        if (res.data.status === "success") {
            setitems(res.data.data)
        }

    }
    async function delet(id) {
        let res = await remove(id)
        if (res.data.status === "success") {
            setitems(res.data.data)
            toast.success("Product Deleted")
        }

    }

    async function updateQuntity(id, count) {
        let response = await update(id, count)
        if (response.data.status == "success") {
            setitems(response.data.data)
        }
    }

    useEffect(() => {
        getitems()
    }, [])
    return (
        <>


            <Helmet>
                <title>Shop Cart</title>
            </Helmet>
            {
                items ? <motion.div className="bg-main-light px-4" style={{ paddingTop: "5rem" }}
                    animate={{ opacity: 1, transition: { duration: 1, } }}
                    initial={{ opacity: 0 }}
                >
                    <h3>Shop Cart : </h3>
                    <h6 className='text-main'>Total Cart Price : {items.totalCartPrice}</h6>

                    {items.products.map((product) => {
                        return <div key={product.product._id} className="row border-bottom py-2 my-2 align-items-center">
                            <motion.div className="col-md-1"
                                animate={{ opacity: 1, transition: { duration: 1, delay: 1 } }}
                                initial={{ opacity: 0 }}
                            >
                                <img src={product.product.imageCover} className='w-100' alt="" />
                            </motion.div>
                            <div className="col-md-11 d-flex justify-content-between" >

                                <motion.div animate={{ opacity: 1, transition: { duration: 1, delay: 1.2 } }}
                                    initial={{ opacity: 0 }}>
                                    <h6>{product.product.title.split(" ").splice(0, 3).join(" ")}</h6>
                                    <h6 className='text-main'>price : {product.price}</h6>
                                    <button
                                        onClick={() => delet(product.product._id)}
                                        className='btn m-0 p-0'><i className='fa-regular fa-trash-can text-main px-1'></i>Remove</button>
                                </motion.div>
                                <motion.div
                                    animate={{ opacity: 1, transition: { duration: 1, delay: 1.6 } }}
                                    initial={{ opacity: 0 }}>
                                    <button
                                        onClick={() => updateQuntity(product.product._id, product.count + 1)}
                                        className='btn bg-main text-white btn-sm'>+</button>
                                    <span className='mx-2'>{product.count}</span>
                                    <button
                                        onClick={() => updateQuntity(product.product._id, product.count - 1)}
                                        className='btn bg-main text-white btn-sm'>-</button>
                                </motion.div>
                            </div>

                        </div>
                    })}
                    <Link to={"/checkout"} className='btn bg-main text-white my-3 '>chekout</Link>
                </motion.div> : <Loading />
            }
        </>
    )
}
