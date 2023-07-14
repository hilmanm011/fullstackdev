import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Detail from './components/Detail'
import Login from './components/Login'
import Register from './components/Register'


const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/home" element={<App/>} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detail/:id" element={<Detail />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter