import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'

export default function MainLayout({ userData, setuserData }) {

    let navigate = useNavigate()

    function Logout() {
        localStorage.removeItem("token")
        setuserData(null)
        navigate("/login")
    }

    return (
        <>
            <Navbar userData={userData} logout={Logout} />
            <div className="py-3"> <Outlet /></div>
        </>
    )
}
