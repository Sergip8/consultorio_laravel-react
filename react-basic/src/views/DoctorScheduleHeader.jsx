import React, { useRef, useState } from 'react'
import DoctorsSchedule from './DoctorsSchedule';
import axiosClient from '../axios-client'
import Calendar from "react-calendar";
import SearchBar from './SearchBar';

export default function DoctorScheduleHeader() {
    
  const [doctor, setDoctor] = useState([]) 
  const [doctorSchedule, setDoctorSchedule] = useState([])
  const [search, setSearch] = useState("")
  const [doctorSelected, setDoctorSelected] = useState([]);
  const [searchTypeSelect, setSearchTypeSelect] = useState(false)
  const [date, setDate] = useState(null)
    
    
    const spe = [
        {
          label: "General",
          value: "general",
        },
        {
          label: "Medicina Interna",
          value: "medicina_interna",
        },
        {
          label: "Psiquiatria",
          value: "psiqiatria",
        },
        {
          label: "Dermatologia",
          value: "dermatologia",
        },
      ];

      const submit = () =>{
        setDoctorSchedule([])
        setDoctorSelected([])
        document.querySelectorAll(".check").forEach(el => el.checked = false)
        if(searchTypeSelect)
        axiosClient.get(`/doctor-schedule/`, {params:{spe: search}})
    .then(({data}) => {
        //console.log(data)
        
        setDoctor(data)
    }).catch((err) =>{
      console.log(err)

    })
    
    else{
      axiosClient.get(`/doctor-schedule-cc/`, {params:{spe: search}})
      .then(({data}) => {
          //console.log(data)
          
          setDoctor(data)
      }).catch((err) =>{
        console.log(err)
  
      })
    }
      } 
      console.log(doctor)
      console.log(doctorSelected)

    const searchCalendar = (e) =>{
      
      setDate(e)
      if(doctorSelected.length>0){
        axiosClient.get(`/doctor-dates/`, {params:{dateC: e.toISOString().split("T")[0], doctorsId: doctorSelected}})
        .then(({data}) => {
            console.log(data)
            setDoctorSchedule(data)
           
        }).catch((err) =>{
          console.log(err)
    
        })
      }
    }
  return (
    <div className='schedule-header'>
      <div className='schedule-search'>
        {searchTypeSelect && <select onChange={e => setSearch(e.target.value)}>
         <option hidden defaultValue="">
            Seleccione la especialidad
          </option>
          {spe.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
          }
        {!searchTypeSelect &&<div>
          <input placeholder='Ingrese el numero de documento'  type="text" onChange={e => setSearch(e.target.value)}/>
        </div>
}
        <div className='checkbox'>
          <input type="checkbox" onChange={e => setSearchTypeSelect(s => s = e.target.checked)}/>
          {searchTypeSelect && <span>buscar por especialidad</span> }
          {!searchTypeSelect && <span>buscar por numero de documento</span> }
        </div>
      </div>
      <div>
            <button className='btn-submit my-3' disabled={!search} onClick={submit}>Buscar</button>
        </div>
     {doctor.length>0 && <div>
      <table className="card animated fateInDown">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Seleccionar</th>
            </tr>
          </thead>
       
           
            <tbody>
              {doctor.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.specialization}</td>
                  <td className="checkbox-doctor">
                    <input
                      type="checkbox"
                     className='check'
                      onChange={(e) => {
                        setDoctorSelected(ds => e.target.checked? ds.concat(d.id): ds.filter(dd => dd != d.id));
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          
        </table>
      </div>
}
      <div className='calendar'>
        <Calendar defaultValue={new Date()} required
          onChange={(e) => searchCalendar(e)}
        />

      </div>
       
        {doctorSchedule && date && <div>
        {doctorSchedule.map((d,i) =>( <div className='schedule-table'>
            <div key={i} className="doctor-schedule">
              <div className={'d-names'+i}>
            <span className='d-names'>{d.name}</span>

              </div>
              <div className='schedule-table'>
            <DoctorsSchedule doctor={d.citas} startDate={date} index={i}/>

              </div>

            </div>
        </div>
        ))}
        </div>
}
    </div>
  )
}
