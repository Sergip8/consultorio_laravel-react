import React, { useRef, useState } from 'react'
import DoctorsSchedule from './DoctorsSchedule';
import axiosClient from '../axios-client'
import Calendar from "react-calendar";

export default function DoctorScheduleHeader() {
    
  const [doctor, setDoctor] = useState([]) 
  const [search, setSearch] = useState({})
    
    
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
        axiosClient.get(`/doctor-schedule/`, {params:{...search}})
    .then(({data}) => {
        //console.log(data)
        
        setDoctor(data)
    }).catch((err) =>{
      console.log(err)

    })
      } 
      console.log(doctor)

  return (
    <div className='schedule-header'>
         <select onChange={e => setSearch({...search, spe: e.target.value})}>
         <option hidden defaultValue="">
            Seleccione el tipo de cita
          </option>
          {spe.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Calendar
            defaultValue={new Date()}
          
          required
          onChange={(e) => setSearch({ ...search, date: e })}
          
        />
        <div>
            <button disabled={!(search.date && search.spe)} onClick={submit}>Buscar</button>
        </div>
        {doctor && search.date && <div>
        {doctor.map((d,i) =>( <div className='schedule-table'>
            <div className="doctor-schedule">
            <DoctorsSchedule doctor={d.citas} startDate={search.date} index={i}/>

            </div>
        </div>
        ))}
        </div>
}
    </div>
  )
}
