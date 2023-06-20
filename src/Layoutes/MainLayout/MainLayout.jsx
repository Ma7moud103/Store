import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import { CardContext } from '../../Context/CardContext'
import UpBtn from '../../Components/UpBtn/UpBtn'

export default function MainLayout() {

    let navigate = useNavigate()

    let { setuserData } = useContext(CardContext)

    function Logout() {
        localStorage.removeItem("token")
        setuserData(null)
        navigate("/login")
    }

    return (
        <>
            <Navbar logout={Logout} />
            <UpBtn />
            <div className=""> <Outlet /></div>
        </>
    )
}
