
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/user'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem('auth-token')
        navigate('/')
        dispatch(logout)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between px-3">
            <h2 className='text-primary'><span className='fw-bold'>Github</span> Jobs</h2>
            <button className='btn btn-light text-bold' onClick={handleLogout}>LOGOUT</button>
        </nav>
    )
}

export default Navbar