import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'
export default function Signup() {
    
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const repasswordRef = useRef()
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()

    const {setUser, setToken} = useStateContext()

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: repasswordRef.current.value,
        }
        axiosClient.post('/signup', payload)
        .then(({data}) => {
            setUser(data.user)
            navigate('/login')
        }).catch( err => {
            const res = err.response
            console.log(err)
            if (res && res.status == 422)
             setErrors(res.data.errors)
        })
        
    }
  return (
    <div className='login-signup-form animated fadeInDown'>
    <div className='form'>
        <form onSubmit={onSubmit}>
            <h1 className='title'>Registrarse</h1>
            {errors && <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
                </div>
                }
            <input ref={nameRef} type="text" placeholder='Name'/>
            <input ref={emailRef} type="text" placeholder='Email'/>
            <input ref={passwordRef} type="password" placeholder='Password'/>
            <input ref={repasswordRef} type="password" placeholder='Confirmar password'/>

            <button className='btn btn-block'>Registrar</button>
            <p>
                Ya esta registrado ? <Link to="/login">Loguearse</Link>
            </p>
        </form>

    </div>
    
</div>
  )
}
