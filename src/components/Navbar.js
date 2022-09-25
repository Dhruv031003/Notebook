import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
    }, [location])

    const userLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
        props.showAlert("Log Out Successful.", "success")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    <form className="d-flex">
                        {!localStorage.getItem('token') && <div className="d-flex">
                            <Link className="btn fw-bold btn-outline-warning mx-3 px-3" to="/login" role="button">Login</Link>
                            <Link className="btn fw-bold btn-outline-warning mx-3 px-3" to="/signup" role="button">Sign Up</Link>
                        </div>}
                        {localStorage.getItem('token') &&
                            <>
                                <Link className="btn fw-bold btn-outline-warning mx-3 px-3" to="/userDetails" role="button">Profile</Link>
                                <button type="button" onClick={userLogout} className="btn fw-bold btn-outline-warning mx-3 px-3">Log Out</button>
                            </>
                        }
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar



