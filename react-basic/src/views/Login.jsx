
import React, { useRef, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'
export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [errors, setErrors] = useState(null)
    const {setUser, setToken, setShowLogin} = useStateContext()
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
           
        }
        axiosClient.post('/login', payload)
        .then(({data}) => {
            setUser(data.user)
            setShowLogin(false)
            console.log(data)
            setToken(data.authorisation.token)
            navigate("/")
        }).catch( err => {
            const res = err.response
            console.log(err)
            if (res && res.status == 422){

                if(res.data.errors){
                    setErrors(res.data.errors)
                }
                else{
                    setErrors({email: [res.data.message]})
                }
            }
        })
    }
  return (
    <div className='login-signup-form animated fadeInDown'>
        <div className='form'>
            <form onSubmit={onSubmit}>
                
                {errors && <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
                </div>
                }
                <input ref={emailRef} type="text" placeholder='Email'/>
                <input ref={passwordRef} type="password" placeholder='Password'/>
                <button className='btn btn-block'>Login</button>
               
            </form>

        </div>
        
    </div>
  )
}
