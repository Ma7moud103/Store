import React, { useEffect, useState } from 'react'
import $ from "jquery"
export default function UpBtn() {
    const [BackToTopButton, setBackToTopButton] = useState(false)

    useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY > 300) {
                setBackToTopButton(true)
            } else { setBackToTopButton(false) }
        }
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <>
            {BackToTopButton && (<div onClick={scrollUp} style={{ bottom: "40px", zIndex: 70, right: "40px", padding: "5px" }} className="btn bg-main position-fixed text-white">Up</div>)}
        </>
    )
}
