import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

import AuthLayout from "../components/AuthLayout";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        email:"",
        password:""

    });

    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const { data } = await API.post(

            "/auth/login",

            form

        );

        // Save JWT
        localStorage.setItem(

            "token",

            data.token

        );

        // Save logged-in user
        localStorage.setItem(

            "user",

            JSON.stringify(data.user)

        );

        toast.success(

            "Login Successful"

        );

        navigate("/dashboard");

    }

    catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Login Failed"

        );

    }

};
    return(

        <AuthLayout

            title="Welcome Back"

            subtitle="Login to continue."

        >

            <form

                className="login-form"

                onSubmit={handleSubmit}

            >

                <input

                    name="email"

                    placeholder="Email"

                    onChange={handleChange}

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    onChange={handleChange}

                />

                <button>

                    Login

                </button>

            </form>

        </AuthLayout>

    );

}

export default Login;