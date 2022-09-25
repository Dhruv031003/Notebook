import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "f" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //save auth-token and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/")
            props.showAlert("Sign Up Successful.", "success")
        }
        else {
            props.showAlert("Invalid Credentials.", "danger")
        }
    }
    return (
        <>
            <h2 className='my-3'>Sign Up to Use NoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" onChange={onChange} name="name" className="form-control" id="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} name="email" className="form-control" id="email" required aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} name="password" className="form-control" required minLength={5} id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" onChange={onChange} name="cpassword" className="form-control" required minLength={5} id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default SignUp
