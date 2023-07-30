import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'

export default function UserForm() {
    const {id, userId} = useParams()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [consults, setConsults] = useState([])

    const {setMsg, user} = useStateContext()
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
    const spe = [
        {
            label: "General",
            value: "general"
        },
        {
            label: "Medicina Interna",
            value: "medicina_interna"
        },
        {
            label: "Psiquiatria",
            value: "psiqiatria"
        },
        {
            label: "Dermatologia",
            value: "dermatologia"
        },
        
    ]

    const [doctor, setDoctor] = useState({
        id: null,
        document: '',
        documentType: '',
        telephone: '',
        address: '',
        specialization: '',
        professionalCard: '',
        consultorioId: 0,
        userId: userId
    })

    useEffect(() =>{
        if(user.doctor){
            setDoctor(user.doctor)
        }
        
    }, [user])

    useEffect(() =>{
        axiosClient.get(`/get-select-consult`)
        .then(({data}) => {
            console.log(data)
            setConsults(data.data)
            
        })
        .catch( err => {
            console.log(err)
            const res = err.response
            if (res && res.status == 422)
             setErrors(res.data.errors)
        })
    },[])
    
    if(id){
        useEffect(() =>{
            
            setLoading(true)
            axiosClient.get(`/doctors/${id}`)
            .then(({data}) => {
                console.log(data)
                setLoading(false)
                setDoctor(data.data)
            }).catch(() =>{
                setLoading(false)

            })
        }, [])

    }
    
    const onSubmit = (e) =>{
        e.preventDefault()
        if(doctor.id){
            updateDoctor(doctor.id)
        }if(userId){
            createDoctor()
        }

    }
const updateDoctor = (doctorId) => {
    axiosClient.put(`/doctors/${doctorId}`, doctor)
    .then(() => {
    
        setMsg({message: "el medico se ha actualizado correctamente", type: "success"})
        navigate('/medicos')
    })
    .catch( err => {
        const res = err.response
        if (res && res.status == 422)
         setErrors(res.data.errors)
    })
}
const createDoctor = () => {
       
    axiosClient.post(`/doctors/`, doctor)
    .then(() => {
        setMsg({message: "el medico se ha creado correctamente", type: "success"})

        navigate('/medicos')
    })
    .catch( err => {
        const res = err.response
        console.log(err)
        if (res && res.status == 422)
         setErrors(res.data.errors)
    })
}
   

  return (
    <div>
        
        {doctor.id && <h1>Editar Medico: </h1>}
        {!doctor.id && <h1>Nuevo Medico</h1>}
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
                <input type="text" value={doctor.document}  onChange={e => setDoctor({...doctor, document: e.target.value})} placeholder='Documento'/>
                <select  value={doctor.documentType} onChange={e => setDoctor({...doctor, documentType: e.target.value})}>
                <option  hidden defaultValue="">Seleccione el tipo de documento</option>
                {documentType.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
                 ))}
                </select>
                <input type="text" value={doctor.telephone} onChange={e => setDoctor({...doctor, telephone: e.target.value})} placeholder='Telefono'/>
                <input type="text" value={doctor.address} onChange={e => setDoctor({...doctor, address: e.target.value})} placeholder='Dirección'/>
                <select  value={doctor.specialization} onChange={e => setDoctor({...doctor, specialization: e.target.value})}>
                <option hidden defaultValue="">Seleccione la especialización</option>
                {spe.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
                 ))}
                </select>
                <select  value={doctor.consultorioId} onChange={e => setDoctor({...doctor, consultorioId: e.target.value})}>
                <option  hidden defaultValue="">Seleccione el consultorio a asignar</option>
                {consults.map((option) => (
              <option key={option.id} value={option.id}>{option.number} {option.type} {option.name}</option>
                 ))}
                </select>
                <input type="text" value={doctor.professionalCard} onChange={e => setDoctor({...doctor, professionalCard: e.target.value})} placeholder='Tarjeta profesional'/>
                
                
                <button className='btn-submit'>Guardar</button>
            </form>
            } 
        </div>

    </div>
  )
}
