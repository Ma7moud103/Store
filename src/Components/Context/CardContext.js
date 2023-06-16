import axios from "axios";
import { createContext } from "react";
import { baseUrl } from "../../Utilites/BaseUrl";

export let CardContext = createContext(0)


export default function CardContextProvider({ children }) {

    const token = localStorage.getItem("token")
    const headers = {
        token: token
    }

    function GetCard() {
        return axios.get(`${baseUrl}api/v1/cart`,
            { headers: headers }).then((data) => {
                return data
            }).catch((err) => {
                return err
            })
    }


    return (
        <>
            <CardContext.Provider value={{ GetCard }}>
                {children}
            </CardContext.Provider>
        </>
    )
}

