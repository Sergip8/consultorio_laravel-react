import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import SearchBar from './SearchBar'

export default function Users() {
  const [patient, setPatient] = useState([])
  const [loading, setLoading] = useState(false)
  const {setMsg, search, setSearch} = useStateContext()


  useEffect(() => {
    getUsers()
  }, [])
  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/patients')
    .then(({data}) => {
      console.log(data)
        setPatient(data.data)
    })
    .catch(() => {
      
    }).finally(() =>{
      setLoading(false)
    })
  };
  const onDelete = (u) =>{
    if(!window.confirm("desea eliminar este usuario"))
    return

    axiosClient.delete(`/users/${u.id}`)
    .then(() => {
      setMsg("el usuario ha sido eliminado")
      setMsg({message: "el paciente se ha eliminado", type: "alert"})
      getUsers()
    })
  }

  if(search){
    axiosClient.get(`/patients-by-cc/${search}`)
    .then(({data}) => {
      setPatient(data.data)
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
      <div>
      {SearchBar()}
      </div>
    <div className='user-table'>
      <h1>Users</h1>
    
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
           {patient.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.document}</td>
              <td>{p.documentType}</td>
              <td>{p.userId}</td>
              <td>
                <Link to={'/paciente/'+p.id} className='btn-edit'>Edit</Link>
                &nbsp;
                <button onClick={e => onDelete(p)} className='btn-delete'>Eliminar</button>
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
