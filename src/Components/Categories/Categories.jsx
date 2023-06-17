import React from 'react'
import styles from './Categories.module.css';
import { motion, useAnimation } from "framer-motion"

export default function Categories() {

    const control = useAnimation()

    return (
        <>
            <div className={styles.box_container}>
                <button onClick={() => {
                    control.start({
                        x: 1000,
                        transition: { duration: 2 }
                    })
                }} className="btn bg-main my-3 mx-2 text-white">move right</button>
                <button onClick={() => {
                    control.start({
                        x: 0,
                        transition: { duration: 2 }
                    })
                }} className="btn bg-main my-3 mx-2 text-white">move left</button>
                <button onClick={() => {
                    control.start({
                        borderRadius: "50%",
                        transition: { duration: 1 }
                    })
                }} className="btn bg-main my-3 mx-2 text-white">circle</button>
                <button onClick={() => {
                    control.start({
                        borderRadius: 0,
                        transition: { duration: 2 }
                    })
                }} className="btn bg-main my-3 mx-2 text-white">back</button>
                <button onClick={() => control.stop()} className="btn bg-main my-3 mx-2 text-white">stop</button>
                <motion.div
                    className={styles.box}

                    animate={control}

                >
                </motion.div>
            </div>
        </>
    )
}
