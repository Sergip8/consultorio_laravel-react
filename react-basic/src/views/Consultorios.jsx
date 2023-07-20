import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'

export default function Consultorio() {
  const [consultorios, setConsultorios] = useState([])
  const [loading, setLoading] = useState(false)
  const {setMsg} = useStateContext()
  const [links, setLinks] = useState([])
  
  useEffect(() => {
    getUsers()
  }, [])
  const getUsers = (url = null) => {
    setLoading(true)
    
    axiosClient.get( url?  "/" +url.split("/")[4]: "/consultorios")
    .then(({data}) => {
      setConsultorios(data.data)
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
    if(!window.confirm("desea eliminar este consultorio"))
    return

    axiosClient.delete(`/users/${u.id}`)
    .then(() => {
      setMsg("el consultorio ha sido eliminado")

      getUsers()
    })
  }
  const onPage = (url) => {
    getUsers(url)
  }

  const pagination = () => {
    return  links.map((l,i) => (
                  

      <button key={i} disabled={!l.url || l.active} onClick={e => onPage(l.url)} className='btn-page'>
        {l.label.replace('&laquo; Previous', 'Atras').replace('Next &raquo;', 'Siguiente')}</button>
      

    ))
  }

  return (
    <div>
    <div className='user-table'>
      <h1>Users</h1>
      <Link to="/consultorios/new/1" className='btn-add'>Nuevo </Link>
    </div>
      <div className='card animated fateInDown'>
        <table>
          <thead>
            <tr>
            <th>Id</th>
            <th>Numero</th>
            <th>Tipo</th>
            <th>Habilitado</th>

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
           {consultorios.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>

              <td>{c.number}</td>
              <td>{c.type}</td>
              <td>{c.enable ? "Habilitado":"Deshabilitado"}</td>
             

              <td>
                <Link to={'/consultorios/'+c.id} className='btn-edit'>Edit</Link>
                &nbsp;
                <button onClick={e => onDelete(c)} className='btn-delete'>Eliminar</button>
                
                

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
