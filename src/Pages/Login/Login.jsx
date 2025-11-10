import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import * as Yup from "yup"
import { baseUrl } from '../../Utilites/BaseUrl'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { CardContext } from '../../Context/CardContext'
export default function Login() {

    let { saveUserData } = useContext(CardContext)

    let [loading, setloading] = useState(false)


    let navigate = useNavigate()

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),

        password: Yup.string()
            .required("Password is required")
            .matches(
                /^[A-Z][a-z0-9]{5,10}$/,
                "Password must start with an uppercase letter and contain 6–11 characters total (only lowercase letters and digits)"
            ),
    });


    let registerFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            setloading(true)
            axios.post(`${baseUrl}api/v1/auth/signin`, values).then((data) => {
                if (data.data.message === "success") {

                    localStorage.setItem("token", data.data.token)
                    saveUserData()
                    toast.success("success", { duration: 1000, position: "bottom-right" })
                    navigate("/")
                }


            }).catch((err) => {
                if (err.response.status === 401) {
                    setloading(false)
                    toast.error(err.response.data.message, { duration: 1000, position: "bottom-right" })
                }

            })
        }
    })
    return (
        <>
            <div className="w-md-50  px-4  m-auto" style={{ paddingTop: "8rem" }}>

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


