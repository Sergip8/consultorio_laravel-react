import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link, json } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import SearchBar from './SearchBar'


export default function Tratamiento() {
  const [citas, setCitas] = useState([])
  const [loading, setLoading] = useState(false)
  const {setMsg, search, setSearch, user, setPlaceholder} = useStateContext()
  const [links, setLinks] = useState([])
  const [patientSelected, setPatientSelected] = useState({})
  const [medicamento, setMedicamento] = useState([])
  const [tratamientos, setTratamientos] = useState([])
  const [tratamiento, setTratamieto] = useState({
    quantity: 0,
    medicamentoId: 0,
    description: "",
    citasId: 0,
  })
  const qty = [
    10, 20, 30, 40, 50
  ]

  
  useEffect(() => {
    setPlaceholder("Ingrese el numero de identidad")
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

  const onPage = (url) => {
    getcitas(url)
  }
  useEffect(() => {  
    
    console.log(search)
    setCitas(citas => citas.filter(c => c.document.startsWith(search)))
    setSearch("")
  }, [search])



  const pagination = () => {
    return  links.map((l,i) => (
                  

      <button key={i} disabled={!l.url || l.active} onClick={e => onPage(l.url)} className='btn-page'>
        {l.label.replace('&laquo; Previous', 'Atras').replace('Next &raquo;', 'Siguiente')}</button>
      

    ))
  }
  
  const getMedicamentos = () => {
    axiosClient.get(`/medicamentos`)
    .then(({data}) => {
      setMedicamento(data.data)
      console.log(data)
   
    })
    .catch((e) => {
      console.log(e)
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    setTratamientos(t => t.concat({...tratamiento, citasId:patientSelected.citaId}))
 
  }
  const saveTreatment = () => {
    axiosClient.post(`/save-treatment`, {data: tratamientos})
    .then(({data}) => {
     
      console.log(data)
   
    })
    .catch((e) => {
      console.log(e)
    })
  }

  return (
    <div>
      <h1>citas</h1>
      <div>
      {SearchBar()}
      </div>
    <div className='user-table'>
      
    </div>
      <div className='card animated fateInDown'>
        <table>
          <thead>
            <tr>
            <th>ID cita </th>
            <th>ID paciente</th>
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
              <td>{c.patientId}</td>
              <td>{c.name}</td>
              <td>{c.documentType}</td>
              <td>{c.document}</td>
              <td>{new Date(c.date).toLocaleString()}</td>

              <td className='citas-doctor-select'>
                <input type="checkbox" 
                  checked={c.id === patientSelected.citaId}
                  onChange={(e) => {
                  setPatientSelected((prev) => (c.id === prev ? null : {citaId: c.id, patientId: c.patientId}));
                  getMedicamentos()  
                }}
                />
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
  {medicamento.length>0 &&
<div><form onSubmit={onSubmit}>
  <div className='select'>

    <select name="med" onChange={e => setTratamieto({...tratamiento, medicamentoId: e.target.value})}>
                <option  hidden defaultValue="">Seleccione el medicamento</option>
                
                {medicamento.map((med) => (
              <option key={med.id} value={med.id}>{med.name} {med.dosage_grams}</option>
                 ))}
                </select>
                <div></div>
                <select name="med" onChange={e => setTratamieto({...tratamiento, quantity: e.target.value})}>
                <option  hidden defaultValue="">Seleccione la cantidad</option>
                {qty.map((q) => (
              <option key={q} value={q}>{q}</option>
                 ))}
                </select>  
  </div>
                <textarea value={tratamiento.description} onChange={e => setTratamieto({...tratamiento, description: e.target.value})} name="" id="" cols="30" rows="10"></textarea>
                  <div>
                    <button  className='btn-add' disabled={!tratamiento.description && !tratamiento.medicamento} >Agregar</button>
                  </div>
  
</form>
</div>
}
{tratamientos.length>0 && <div className='treatment-list card animated fateInDown'>
  <table>
          <thead>
            <tr>
            <th>Medicamento</th>
            <th>Cantidad</th>
            <th>Descripcion</th>
            <th>Acción</th>

            </tr>

          </thead>
          <tbody>
           {tratamientos.map((t,i) => (
            <tr key={i}>
              <td>{t.medicamentoId}</td>
              <td>{t.quantity}</td>
              <td>{t.description}</td>
              <td><button className='btn-delete' onClick={e => setTratamientos(tt => {tt.splice(i, 1); return tt })}>Quitar</button></td>

            </tr>
           ))}
          </tbody>

        </table>
        <button className='btn-submit' onClick={saveTreatment}>Guardar</button>
</div>
}
    </div>
  )
}
