import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../features/user'

const Register = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')

    const handlerFullnameChange = (e)=>{
        setFullname(e.target.value)
    }

    const handlerUsernameChange = (e)=>{
        setUsername(e.target.value)
    }

    const handlerPasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                fullname,
                username,
                password,
            });
            if (response.data.status === 201) {
                // navigate('/', { state: { reqUsername: username, reqPassword: password }});
                navigate('/');
                dispatch(register({ username, fullname, password }))

            } else {
                setAlert(response.data)
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
                    <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <Link to="/" className='btn btn-light btn-lg text-muted fw-bold'>LOGIN</Link>
                        <button className='btn btn-light btn-lg active text-muted fw-bold'>REGISTER</button>
                    </div>

                    <p className="text-danger">{alert}</p>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">
                                Fullname
                            </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder='Fullname' 
                            onChange={handlerFullnameChange}
                            value={fullname}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder='Username' 
                            onChange={handlerUsernameChange}
                            value={username}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder='Password' 
                            onChange={handlerPasswordChange}
                            value={password}
                            />
                        </div>
                        <button 
                        type="button" 
                        className="btn btn-primary w-100"
                        onClick={handleSubmit}
                        >
                        Register
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register