import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import SearchBar from './SearchBar'

export default function Doctors() {
  const [doctor, setDoctor] = useState([])
  const [loading, setLoading] = useState(false)
  const {setMsg, search, setSearch, setPlaceholder} = useStateContext()
  

  useEffect(() => {
    setPlaceholder("Ingrese el numero de identidad del doctor")
    getUsers()
  }, [])
  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/doctors')
    .then(({data}) => {
      console.log(data)
      setDoctor(data.data)
    })
    .catch((err) => {
      console.log(err)
    }).finally(() =>{
      setLoading(false)
    })
  };
  const onDelete = (u) =>{
    if(!window.confirm("desea eliminar este doctor"))
    return

    axiosClient.delete(`/doctor/${u.id}`)
    .then(() => {
      setMsg({message: "el medico se ha eliminado", type: "alert"})
      getUsers()
    })
  }
  
  if(search){
    axiosClient.get(`/doctors-by-cc/${search}`)
    .then(({data}) => {
      setDoctor(data.data)
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


  return (
    <div>
      <h1>Medicos</h1>
        <div>
      {SearchBar()}
      </div>
    <div className='user-table'>
    
    </div>
      <div className='card animated fateInDown'>
        <table>
          <thead>
            <tr>
            <th>Id</th>
            <th>Documento</th>
            <th>Tipo de Documento</th>
            <th>Id de usuario</th>
            <th>Acciones</th>

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
           {doctor.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.document}</td>
              <td>{d.documentType}</td>
              <td>{d.userId}</td>
              <td>
                <Link to={'/dashboard/medico/'+d.id} className='btn-edit'>Edit</Link>
                &nbsp;
                <button onClick={e => onDelete(d)} className='btn-delete'>Eliminar</button>
              </td>

            </tr>
           ))}
          </tbody>
}
        </table>
      </div>
    </div>
  )
}
