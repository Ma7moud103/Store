import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'

export default function MainLayout({ userData }) {

    return (
        <>
            <Navbar userData={userData} />
            <div className="py-3"> <Outlet /></div>
        </>
    )
}
