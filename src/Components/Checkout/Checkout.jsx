import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CardContext } from '../../Context/CardContext'
export default function Checkout() {

    let { Checkout, cartId } = useContext(CardContext)

    async function handlePayment(values) {
        console.log(values);
        let res = await Checkout(cartId, values)

        if (res.data.status == "success") {
            window.location.href = res.data.session.url
        }
    }
    let Formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: handlePayment
    })

    return (
        <>
            <div className="w-50 m-auto">
                <form onSubmit={Formik.handleSubmit}>
                    <label htmlFor="details">Details</label>
                    <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} type="text" id='details' name='details' className='form-control my-3' />
                    <label htmlFor="phone">Phone</label>
                    <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} type="text" id='phone' name='phone' className='form-control my-3' />
                    <label htmlFor="city">City</label>
                    <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} type="text" id='city' name='city' className='form-control my-3' />

                    <button type='submit' className="btn bg-main text-white w-100">
                        Place Order
                    </button>
                </form>
            </div>
        </>
    )
}
