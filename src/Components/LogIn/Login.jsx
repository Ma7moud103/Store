import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { baseUrl } from '../../Utilites/BaseUrl'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
export default function Login({ Usertoken }) {

    const notify = (message, type) => { toast[type](message) }


    let [loading, setloading] = useState(false)


    let navigate = useNavigate()

    let validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    })


    let registerFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            setloading(true)
            axios.post(`${baseUrl}api/v1/auth/signin`, values).then((data) => {
                console.log(data);
                if (data.status === 200) {
                    localStorage.setItem("token", data.data.token)
                    setloading(false)
                    notify("succuss", "success")
                    navigate("/")
                    console.log(Usertoken());

                }

            }).catch((err) => {
                if (err.response.status === 401) {
                    setloading(false)
                    notify(err.response.data.message, "error")

                }
                console.log(err);
            })
        }
    })
    return (
        <>
            <div className="w-50 m-auto my-5">

                <h2>Login Now</h2>

                <form onSubmit={registerFormik.handleSubmit}>

                    <label htmlFor="email">Email</label>
                    <input onBlur={registerFormik.handleBlur} value={registerFormik.values.email} onChange={registerFormik.handleChange} type="email" name="email" id="email" className='form-control my-3' />
                    {registerFormik.errors.email && registerFormik.touched.email ? <div className="alert alert-danger">
                        {registerFormik.errors.email}
                    </div> : ""}
                    <label htmlFor="password">Password</label>
                    <input onBlur={registerFormik.handleBlur} value={registerFormik.values.password} onChange={registerFormik.handleChange} type="password" name="password" id="password" className='form-control my-3' />
                    {registerFormik.errors.password && registerFormik.touched.password ? <div className="alert alert-danger">
                        {registerFormik.errors.password}
                    </div> : ""}
                    <button disabled={!(registerFormik.isValid && registerFormik.dirty && !loading)} type='submit' className='btn bg-main text-white'>
                        {!loading ? "Login" : <i className='fas fa-spinner fa-spin'></i>}
                    </button>
                </form>
            </div>
        </>
    )
}
