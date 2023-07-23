import React from 'react'
import styles from './Notfound.module.css';
import img from "../../images/error.svg"
export default function Notfound() {
    return (
        <div className={`container w-50 ${styles.ptop}`}>
            <img src={img} className='w-100' alt="" />
        </div>
    )
}
