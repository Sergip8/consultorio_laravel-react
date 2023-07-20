import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'

export default function ConsultorioForm() {
    const {id, centroId} = useParams()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const {setMsg} = useStateContext()
    const navigate = useNavigate()

    const [consultorio, setConsultorio] = useState({
        id: null,
        number: '',
        enable: true,
        type: '',
        description: '',
        medicalCenterId: centroId
    })
    const type = [
        {
            label: "General",
            value: "General"
        },
        {
            label: "Medicina Interna",
            value: "Medicina Interna"
        },
        {
            label: "Psiquiatria",
            value: "Psiqiatria"
        },
        {
            label: "Dermatologia",
            value: "Dermatologia"
        },
        
    ]

    if(id){
        useEffect(() =>{
            setLoading(true)
            axiosClient.get(`/consultorios/${id}`)
            .then(({data}) => {
                setLoading(false)
                setConsultorio(data)
                console.log(data)

                console.log(consultorio)
            }).catch(() =>{
                setLoading(false)

            })
        }, [])

    }
    const onSubmit = (e) =>{
        e.preventDefault()
        if(consultorio.id){
            
            axiosClient.put(`/consultorios/${consultorio.id}`, consultorio)
            .then(() => {
                
                setMsg({message: "el consultorio se ha actualizado correctamente", type: "success"})
                navigate('/consultorios')
            })
            .catch( err => {
                const res = err.response
                console.log(err)
                if (res && res.status == 422)
                 setErrors(res.data.errors)
            })
        }else{
            
            axiosClient.post(`/consultorios`, consultorio)
            .then(() => {
                
                setMsg({message: "el consultorio se ha creado correctamente", type: "success"})
                navigate('/consultorios')
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
        {consultorio?.id && <h1>Editar Consultorio:</h1>}
        {!consultorio?.id && <h1>Nuevo Consultorio</h1>}
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
                <label>Habilitar</label>
                <input className='checkbox' type="checkbox" checked={consultorio.enable} onChange={e => setConsultorio({...consultorio, enable: e.target.checked})} />
                <input type="text" value={consultorio.number} onChange={e => setConsultorio({...consultorio, number: e.target.value})} placeholder='Numero consultorio'/>
                <select  defaultValue={consultorio.type} onChange={e => setConsultorio({...consultorio, type: e.target.value})}>
                <option hidden >Seleccione el tipo</option>
                {type.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
                 ))}
                </select>
                <textarea  value={consultorio.description} onChange={e => setConsultorio({...consultorio, description: e.target.value})} cols="30" rows="10"></textarea>
                <button className='btn'>Guardar</button>
            </form>
            } 
        </div>

    </div>
  )
}
