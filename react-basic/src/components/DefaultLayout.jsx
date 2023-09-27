import React, { useEffect } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import axiosClient from '../axios-client'

export default function DefaultLayout() {

    const {user, token, setUser, setToken, msg} = useStateContext()
    const navigate = useNavigate();

    if(!token)
        return <Navigate to="/login" />

    const onLogout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
            //Navigate ({to: "/"}) 
        })
        
    }
    useEffect(() =>{
      if(token)  
      getCurrentUser()
    }, [])

    const getCurrentUser = async () =>{
        await axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
            if(data.role[0].role != "ADMIN")
            navigate("/");
        
        })
    }
  return (
    <div id="defaultLayout">
        <aside>
            <Link to="/dashboard" > Dashboard</Link>
            <Link to="/dashboard/users" > Users</Link>
            <Link to="/dashboard/pacientes" > Pacientes</Link>
            <Link to="/dashboard/medicos" > Medicos</Link>
            <Link to="/dashboard/consultorios" > Consultorios</Link>
            <Link to="/dashboard/citas" > Citas</Link>
            <Link to="/dashboard/agenda-medicos" > Agenda medicos</Link>
            <Link to="/" > Inicio</Link>

        </aside>
        <div className='content'>
            <header>
      
        <div >
            <span className='userName'>Hola {user.name}</span>
           
           <a href="/" onClick={onLogout} className='btn-logout'>Logout</a>
        </div>

            </header>
            <main className='dashboard-content'>

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
