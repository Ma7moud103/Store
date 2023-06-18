import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import { CardContext } from '../../Context/CardContext'

export default function MainLayout() {

    let navigate = useNavigate()

    let { userData, setuserData } = useContext(CardContext)

    function Logout() {
        localStorage.removeItem("token")
        setuserData(null)
        navigate("/login")
    }

    return (
        <>
            <Navbar logout={Logout} />
            <div className="py-3"> <Outlet /></div>
        </>
    )
}
