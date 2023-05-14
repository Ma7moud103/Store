import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../../Utilites/BaseUrl";
// import jwtDecode from "jwt-decode";
export let CardContext = createContext(0)


export default function CardContextProvider({ children }) {
    const [count, setcount] = useState(0)


//       const [userdata, setuserdata] = useState(null)
//     function saveUserData() {
//     let token = localStorage.getItem("token")
//     let data  = jwtDecode(token)
//     setuserdata(data)
//   }



    function AddToCart(token, productId) {
        
       return axios.post(`${baseUrl}api/v1/cart`,{productId},{headers:{token}}).then((data) => {
            return data
        }).catch((err) => {
            return err
        })
    }
     
    function GetUserCard(token) {
        return axios.get(`${baseUrl}api/v1/cart`,
            { headers: { token } }).then((data) => {
            return data
        }).catch((err) => {
            return err
        })
    }

    function DeletCard(token, productId) {
        return axios.delete(`${baseUrl}api/v1/cart/${productId}`,
            { headers: { token } }).then((data) => {
            return data
        }).catch((err) => {
            return err
        })
    }
    
    function getCardCount() {
        let token = localStorage.getItem("token")
        return axios.get(`${baseUrl}api/v1/cart`,
            { headers: { token } }).then((data) => {
            setcount(data.data.numOfCartItems)
            }).catch((err) => {
            console.log(err);
        })
    }
// 642e5663fc6ec80008fc40bf
        function onlinePayment(cartId,shippingAddress) {
            let token = localStorage.getItem("token")
            let url = `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/643bdf5b9c1cd20008875670?url=http://localhost:3000`
        return axios.post(url,
            {
                shippingAddress:shippingAddress
            },{ headers: { token } }).then((data) => {
            setcount(data.data.numOfCartItems)
            }).catch((err) => {
            console.log(err);
        })
    }




    useEffect(() => {
        GetUserCard()
    },[])

  return (
      <>
          <CardContext.Provider value={{AddToCart,GetUserCard ,DeletCard , count,getCardCount,onlinePayment  }}>
              {children}
          </CardContext.Provider>
      </> 
  )
}

