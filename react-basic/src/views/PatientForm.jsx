import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'

export default function UserForm() {
    const {id, userId} = useParams()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const {setMsg} = useStateContext()
    const navigate = useNavigate()
   

    const documentType = [
        {
            label: "Cedula de ciudadania",
            value: "CC"
        },
        {
            label: "Cedula de Extranjeria",
            value: "CE"
        },
        {
            label: "Tarjeta de identidad",
            value: "TI"
        }
        
    ]
    const gender = [
        {
            label: "Mujer",
            value: "Mujer"
        },
        {
            label: "Hombre",
            value: "Hombre"
        },
        {
            label: "Helicoptero apache",
            value: "heli"
        }
        
    ]

    const [patient, setPatient] = useState({
        id: null,
        document: '',
        documentType: '',
        telephone: '',
        address: '',
        gender: '',
        birthDate: null,
        userId: userId
    })

    if(id){
        useEffect(() =>{
            setLoading(true)
            axiosClient.get(`/patients/${id}`)
            .then(({data}) => {
                console.log(data)
                setLoading(false)
                setPatient(data.data)
            }).catch(() =>{
                setLoading(false)

            })
        }, [])

    }
    const onSubmit = (e) =>{
        e.preventDefault()
        if(patient.id){
            axiosClient.put(`/patients/${patient.id}`, patient)
            .then(() => {
                setMsg({message: "el paciente se ha actualizado correctamente", type: "success"})
                navigate('/pacientes')
            })
            .catch( err => {
                const res = err.response
                if (res && res.status == 422)
                 setErrors(res.data.errors)
            })
        }if(userId){
            console.log(patient)
            axiosClient.post(`/patients/`, patient)
            .then(() => {
                setMsg({message: "el paciente se ha creado correctamente", type: "success"})
                navigate('/pacientes')
            })
            .catch( err => {
                const res = err.response
                setMsg({message: "el paciente no pudo registrarse", type: "error"})

                console.log(err)
                if (res && res.status == 422)
                 setErrors(res.data.errors)
            })
        }

    }

  return (
    <div>
        {patient.id && <h1>Editar Paciente: </h1>}
        {!patient.id && <h1>Nuevo Paciente</h1>}
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
                <input type="text" value={patient.document}  onChange={e => setPatient({...patient, document: e.target.value})} placeholder='Documento'/>
                <select  value={patient.documentType} onChange={e => setPatient({...patient, documentType: e.target.value})}>
                <option selected hidden defaultValue="">Seleccione el tipo de documento</option>
                {documentType.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
                 ))}
                </select>
                <select name="gender" value={patient.gender} onChange={e => setPatient({...patient, gender: e.target.value})}>
                <option selected hidden defaultValue="">Seleccione el sexo</option>
                
                {gender.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
                 ))}
                </select>
                <input type="text" value={patient.telephone} onChange={e => setPatient({...patient, telephone: e.target.value})} placeholder='Telefono'/>
                <input type="text" value={patient.address} onChange={e => setPatient({...patient, address: e.target.value})} placeholder='Dirección'/>
                <input type="date" defaultValue={patient.birthDate} onChange={e => setPatient({...patient, birthDate: e.target.value})} />
                
                <button className='btn'>Guardar</button>
            </form>
            } 
        </div>

    </div>
  )
}
