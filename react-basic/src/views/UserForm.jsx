import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'

export default function UserForm() {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const {setMsg} = useStateContext()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: ''
    })
    const role = [
        {
            label: "Paciente",
            value: "PATIENT"
        },
        {
            label: "Medico",
            value: "DOCTOR"
        },
        
    ]

    if(id){
        useEffect(() =>{
            setLoading(true)
            axiosClient.get(`/users/${id}`)
            .then(({data}) => {
                setLoading(false)
                setUser(data)
            }).catch(() =>{
                setLoading(false)

            })
        }, [])

    }
    
    const onSubmit = (e) =>{
        e.preventDefault()
        if(user.id){
            console.log(user)
            axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
                setMsg({message: "el usuario se ha actualizado correctamente", type: "success"})
                navigate('/users')
            })
            .catch( err => {
                const res = err.response
                console.log(err)
                if (res && res.status == 422)
                 setErrors(res.data.errors)
            })
        }else{
            console.log(user)
            axiosClient.post(`/users`, user)
            .then(() => {
                
                setMsg({message: "el usuario se ha creado correctamente", type: "success"})
                
                navigate('/users')
            })
            .catch( err => {
                const res = err.response
                console.log(err)
                if (res && res.status == 422)
                 setErrors(res.data.errors)
            })
        }

    }

  return (
    <div>
        {user.id && <h1>Editar Usuario: {user.name}</h1>}
        {!user.id && <h1>Nuevo Usuario</h1>}
        <div className='card animated fadeInDown'>
            {loading && (
                <div className='text-center'>Un momento...</div>
            )}
             {errors && <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
                </div>
                }
            {!loading && <form onSubmit={onSubmit}>
                <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} placeholder='Nombre'/>
                <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} placeholder='Email'/>
                <input type="password" onChange={e => setUser({...user, password: e.target.value})} placeholder='Password'/>
                <input type="password" onChange={e => setUser({...user, password_confirmation: e.target.value})} placeholder='Confirmar Password'/>
                <select  value={user.role} onChange={e => setUser({...user, role: e.target.value})}>
                <option hidden >Seleccione el rol</option>
                {role.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
                 ))}
                </select>
                <button className='btn'>Guardar</button>
            </form>
            } 
        </div>

    </div>
  )
}
