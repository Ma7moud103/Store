import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected(props) {
    if (localStorage.getItem("token") == null) {
        return <Navigate to={"/login"} />
    } else {
        return props.children
    }
}

export default Protected