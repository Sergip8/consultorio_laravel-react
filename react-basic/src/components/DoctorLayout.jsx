import React, { useEffect } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import axiosClient from '../axios-client'

export default function DoctorLayout() {
    const {user, token, setUser, msg} = useStateContext()
    const navigate = useNavigate();

    useEffect(() =>{
        getCurrentUser()
      }, [])
  
      const getCurrentUser = async () =>{
          await axiosClient.get('/user-doctor')
          .then(({data}) => {
              setUser(data)
              if(data.role[0].role != "DOCTOR")
              navigate("/");
                console.log(data)
          })
        }
        const onLogout = (e) => {
            e.preventDefault()
            axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
        }
  return (
    <div id='patientLayout'>
 <aside>
 
            <Link to="/medico/datos" > Datos Personales</Link>
            <Link to="/medico/tratamiento" > Tratamiento</Link>



        </aside>
        <div className='content'>
            <header>
        
        <div >
            <span className='userName'>Hola {user.name}</span>
           
           <Link to="/" onClick={onLogout} className='btn-logout'>Logout</Link>
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
