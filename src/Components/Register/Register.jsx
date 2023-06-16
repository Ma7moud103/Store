import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"

import { baseUrl } from '../../Utilites/BaseUrl'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
export default function Register() {

    const notify = (message, type) => { toast[type](message) }


    let [loading, setloading] = useState(false)


    let navigate = useNavigate()

    let validationSchema = Yup.object({
        name: Yup.string().min(3).max(15).required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start width uppercase..."),
        rePassword: Yup.string().oneOf([Yup.ref("password")], "password and repassword are not match").required()
    })

    let registerFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            setloading(true)
            await axios.post(`${baseUrl}api/v1/auth/signup`, values).then((respose) => {
                if (respose.status === 201) {
                    localStorage.setItem("token", respose.data.token)
                    notify("success", "success")
                    navigate("/login")
                    setloading(false)

                }
            }).catch((err) => {
                notify(err.response.data.message, "warning")
            })

        }
    })

    return (
        <>
            <div className="w-50 m-auto my-5">

                <h2>Register Now</h2>

                <form onSubmit={registerFormik.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        onBlur={registerFormik.handleBlur}
                        value={registerFormik.values.name}
                        onChange={registerFormik.handleChange}
                        type="text" name="name" id="name"
                        className='form-control my-3' />

                    {registerFormik.errors.name && registerFormik.touched.name ? <div className="alert alert-danger">
                        {registerFormik.errors.name}
                    </div> : ""}


                    <label htmlFor="email">Email</label>
                    <input onBlur={registerFormik.handleBlur}
                        value={registerFormik.values.email}
                        onChange={registerFormik.handleChange}
                        type="email" name="email" id="email"
                        className='form-control my-3' />

                    {registerFormik.errors.email && registerFormik.touched.email ? <div className="alert alert-danger">
                        {registerFormik.errors.email}
                    </div> : ""}


                    <label htmlFor="password">Password</label>
                    <input onBlur={registerFormik.handleBlur}
                        value={registerFormik.values.password}
                        onChange={registerFormik.handleChange}
                        type="password" name="password" id="password"
                        className='form-control my-3' />

                    {registerFormik.errors.password && registerFormik.touched.password ? <div className="alert alert-danger">
                        {registerFormik.errors.password}
                    </div> : ""}


                    <label htmlFor="rePassword">RePassword</label>
                    <input onBlur={registerFormik.handleBlur}
                        value={registerFormik.values.repassword}
                        onChange={registerFormik.handleChange}
                        type="password" name="rePassword" id="rePassword"
                        className='form-control my-3' />

                    {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <div className="alert alert-danger">
                        {registerFormik.errors.rePassword}
                    </div> : ""}


                    <button disabled={!(registerFormik.isValid && registerFormik.dirty && !loading)}
                        type='submit' className='btn bg-main text-white'>

                        {!loading ? "Register" : <i className='fas fa-spinner fa-spin'></i>}
                    </button>
                </form>
            </div>
        </>
    )
}
