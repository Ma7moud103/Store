import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { baseUrl } from "../Utilites/BaseUrl"

export let CardContext = createContext()

export default function CardContextProvider(props) {


    const [numOfCartItem, setnumOfCartItem] = useState(0)
    const [cartId, setcartId] = useState(0)

    let headers = {
        token: localStorage.getItem("token")
    }

    function addtocart(productId) {
        return axios.post(`${baseUrl}api/v1/cart`,
            { productId },
            {
                headers: headers
            }
        ).then(data => data).catch(err => err)
    }

    function getCart() {
        return axios.get(`${baseUrl}api/v1/cart`,
            {
                headers: headers
            }
        ).then(data => data).catch(err => err)
    }

    function remove(id) {
        return axios.delete(`${baseUrl}api/v1/cart/${id}`,
            {
                headers: headers
            }
        ).then(data => data).catch(err => err)
    }

    function update(id, count) {
        return axios.put(`${baseUrl}api/v1/cart/${id}`, { count },
            {
                headers: headers
            }
        ).then(data => data).catch(err => err)
    }

    function Checkout(id, shippingAddress) {
        return axios.post(`${baseUrl}api/v1/orders/checkout-session/${id}?url=http://localhost:3000
`, {
            shippingAddress
        }
            ,
            { headers: headers }).then((data) => data).catch((err => err))
    }

    async function getintialValues() {
        let { data } = await getCart()
        if (data.status === "success")
            setnumOfCartItem(data.numOfCartItems)
        setcartId(data.data._id)
    }
    useEffect(() => {
        getintialValues()
    }, [])
    return <CardContext.Provider value={{ addtocart, getCart, remove, update, Checkout, numOfCartItem, cartId, setnumOfCartItem }}>
        {props.children}
    </CardContext.Provider>
}