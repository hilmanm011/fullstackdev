import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
    const location = useLocation();
    const {reqUsername, reqPassword } = location.state || {};
    
    const navigate = useNavigate()
    const [username, setUsername]= useState('')
    const [password, setPassword]= useState('')
    
    useEffect(() => {
        if (reqUsername && reqPassword) {
        setUsername(reqUsername);
        setPassword(reqPassword);
        }
    }, [reqUsername, reqPassword]);

    const [alert, setAlert] = useState('')

    const changeUsername = (e)=>{
        setUsername(e.target.value)
    }

    const changePassword = (e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                username,
                password,
            });
            if (response.data.token) {
                localStorage.setItem('auth-token', response.data.token)
                navigate('/home');
            }
            
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);
            const msg = error.response.data.message
            setAlert(msg)
        }
    };

    return (
        <div className='container'>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card col-6">
                    {reqUsername ? (
                        <h6 className='text-success text-center m-2 mb-3'>Hi, {reqUsername} successfully registered. Please login!</h6>
                    ) : (
                        ''
                    )}
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <button className='btn btn-light btn-lg active text-muted fw-bold'>LOGIN</button>
                            <Link to="/register" className='btn btn-light btn-lg text-muted fw-bold'>REGISTER</Link>
                        </div>
                        <p className="text-danger">{alert}</p>
                        <form>
                            <div className="mb-3">
                            <label htmlFor="username" className="form-label" >
                                Username
                            </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder='Username' 
                                onChange={changeUsername} 
                                value={username} 
                            />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder='******' 
                                onChange={changePassword} 
                                value={password} 
                            />
                            </div>
                            <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>
                            Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login