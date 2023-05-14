import React from 'react'
import "./loading.css"
import { Audio } from 'react-loader-spinner'
export default function Loading() {
    return (
        <>
            <div className="loading">
                <div className="container ">
                    <Audio
                        height="100"
                        width="100"
                        radius="9"
                        color='#0aad0a'
                        ariaLabel='three-dots-loading'
                        wrapperStyle
                        wrapperClass
                    />
                </div>
            </div>
        </>
    )
}
