import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import axiosClient from '../axios-client'
export default function GuestLayout() {
    const {token, setUser, msg, user} = useStateContext()
    const navigate = useNavigate()
    // if(token){
    //     return <Navigate to="/home" />
    // }
    useEffect(() =>{
      if(token){
    getCurrentUser()
    }
  }, [token])
  const getCurrentUser = async () =>{
    await axiosClient.get('/user')
    .then(({data}) => {
        setUser(data)
       
    })
}


  return (
    <div>
        <main>
        <Outlet />

        </main>
        {msg && 
        <div className={msg.type === "success" ? "notification_s":msg.type === "error" ? "notification_e" : msg.type === "alert" ? "notification_a":""} >
            {msg.message}
        </div>
}
    </div>
  )
}
