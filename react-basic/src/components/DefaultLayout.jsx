import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import axiosClient from '../axios-client'

export default function DefaultLayout() {

    const {user, token, setUser, setToken, msg} = useStateContext()

    if(!token)
        return <Navigate to="/login" />

    const onLogout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }
    useEffect(() =>{
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, [])
  return (
    <div id="defaultLayout">
        <aside>
            <Link to="/dashboard" > Dashboard</Link>
            <Link to="/users" > Users</Link>
            <Link to="/pacientes" > Pacientes</Link>
            <Link to="/consultorios" > Consultorios</Link>
            <Link to="/medicos" > Medicos</Link>
            <Link to="/citas" > Citas</Link>




        </aside>
        <div className='content'>
            <header>
        <div>
            Header
        </div>
        <div>
           {user.name}
           <a href="#" onClick={onLogout} className='btn-logout'>Logout</a>
        </div>

            </header>
            <main>

        <Outlet />
            </main>
        {msg && 
        <div className={msg.type === "success" ? "notification_s":msg.type === "error" ? "notification_e" : msg.type === "alert" ? "notification_a":""} >
            {msg.message}
        </div>
        
        } </div>
    </div>
  )
}
