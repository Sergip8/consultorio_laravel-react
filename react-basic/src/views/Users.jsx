import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import SearchBar from './SearchBar'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const {setMsg, search, setSearch} = useStateContext()
  const [links, setLinks] = useState([])
  
  useEffect(() => {
    getUsers()
  }, [])
  const getUsers = (url = null) => {
    setLoading(true)
    
    axiosClient.get( url?  "/" +url.split("/")[4]: "/users")
    .then(({data}) => {
      setUsers(data.data)
      console.log(data)
      setLinks(data.meta.links)
      console.log(links)
   
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
      setMsg({message: "el usuario se ha eliminado", type: "alert"})

      getUsers()
    })
  }
  const onPage = (url) => {
    getUsers(url)
  }

 
    
      if(search){
      axiosClient.get(`/users-by-email/${search}`)
      .then(({data}) => {
        setUsers(data.data)
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
    return  links.map(l => (
                  

      <button disabled={!l.url || l.active} onClick={e => onPage(l.url)} className='btn-page'>
        {l.label.replace('&laquo; Previous', 'Atras').replace('Next &raquo;', 'Siguiente')}</button>
      

    ))
  }

  return (
    <div>
      <div>
      {SearchBar()}
      </div>
    <div className='user-table'>
      <h1>Users</h1>
      <Link to="/user/new" className='btn-add'>Nuevo </Link>
    </div>
      <div className='card animated fateInDown'>
        <table>
          <thead>
            <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha de registro</th>
            <th>Rol</th>

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
           {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.created_at}</td>
              <td>{u.role}</td>

              <td>
                <Link to={'/user/'+u.id} className='btn-edit'>Edit</Link>
                &nbsp;
                <button onClick={e => onDelete(u)} className='btn-delete'>Eliminar</button>
                &nbsp;
                <Link to={u.role === 'PATIENT' ? '/paciente/new/'+u.id: u.role === 'DOCTOR' ? '/doctor/new/'+u.id: '/user/'+u.id} className='btn-create'>Crear usuario</Link>

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
