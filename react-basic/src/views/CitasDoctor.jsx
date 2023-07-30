import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import SearchBar from './SearchBar'

export default function CitasDoctor() {
  const [citas, setCitas] = useState([])
  const [loading, setLoading] = useState(false)
  const {setMsg, search, setSearch, user} = useStateContext()
  const [links, setLinks] = useState([])
  
  useEffect(() => {
    getcitas()
    console.log(citas)
  }, [user])
  const getcitas = () => {
    setLoading(true)
    if(user.id){
    axiosClient.get(`/get-cita-by-doctor-userid/${user.id}`)
    .then(({data}) => {
      setCitas(data.data)
      console.log(data)
      setLinks(data.meta.links)
      console.log(links)
   
    })
    .catch(() => {
      
    }).finally(() =>{
      setLoading(false)
    })
}
  };
  const onCancel = (c) =>{
    if(c.status === 'CANCELADO'){
      setMsg({message: "la cita ya esta cancelada", type: "alert"})
      return
    }
      if(!window.confirm("desea eliminar este usuario"))
      return
      c.status = 'CANCELADO'
      console.log(c)
    axiosClient.post(`/citas-change-status`, {id: c.id, status: c.status})
    .then(({data}) => {
      setMsg({message: "la cita ha sido cancelada", type: "alert"})
        console.log(data)
      getcitas()
    })
  }
  const onPage = (url) => {
    getcitas(url)
  }

 
    
      if(search){

      axiosClient.get(`/get-cita-by-doctor-userid/${user.id}`)
      .then(({data}) => {
        setCitas(data.data)
        console.log(data)
        setLinks(data.meta.links)
      })
      .catch((err) => {
        console.log(err)
      }).finally(() =>{
        setLoading(false)
        setSearch("")
      })
    }
    

  const pagination = () => {
    return  links.map((l,i) => (
                  

      <button key={i} disabled={!l.url || l.active} onClick={e => onPage(l.url)} className='btn-page'>
        {l.label.replace('&laquo; Previous', 'Atras').replace('Next &raquo;', 'Siguiente')}</button>
      

    ))
  }

  return (
    <div>
      <div>
      {SearchBar()}
      </div>
    <div className='user-table'>
      <h1>citas</h1>
      
    </div>
      <div className='card animated fateInDown'>
        <table>
          <thead>
            <tr>
            <th>Id</th>
            <th>Nombre Paciente</th>
            <th>Tipo de documento</th>
            <th>No Documento</th>
            <th>Fecha</th>


            <th>Seleccionar</th>
            

            
            </tr>

          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan="5" className='text-center'>
                Un momento...
              </td>
            </tr>
          </tbody>
}
{!loading && <tbody>
           {citas.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>

              <td>{c.name}</td>
              <td>{c.documentType}</td>
              <td>{c.document}</td>
              <td>{new Date(c.date).toLocaleString()}</td>

              <td>
                <input type="checkbox" />
               
                
                
               
              </td>

            </tr>
           ))}
          </tbody>
}
          
        </table>
      </div>
     <div>
      {pagination()}
     </div>
    </div>
  )
}
