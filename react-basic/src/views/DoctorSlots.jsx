import React, { useEffect, useRef, useState } from 'react'
import { useStateContext } from '../context/ContextProvider'
import DoctorSlotsHeader from './DoctorSlotsHeader'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../axios-client'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

export default function DoctorSlots({headerDay, slots, doctor}) {


  const [fillDays, setFillDays] = useState([[]])
  const [slice, setSlice] = useState(6)
  const [intervalId, setIntervalId] = useState(null)
  const [btnMsg, setBtnMsg] = useState("mostrar mas")
  const {token, setMsg, user} = useStateContext()
  const navigate = useNavigate()
  
  let fill = []
  const slot = 20
  let size = 0
  const fillList = []
  

  useEffect(() => {
    
    fillSlots()
    
  }, [headerDay])
  
    const fillSlots = () => {
      setFillDays([[]]);
        let mints = 0;
        for (let i = 0; i < headerDay.length; i++) {
         
          const end = new Date(
            headerDay[i].getFullYear(),
            headerDay[i].getMonth(),
            headerDay[i].getDate() + 1,
            0,
            0,
            0
          );
    
          const start = new Date(
            headerDay[i].getFullYear(),
            headerDay[i].getMonth(),
            headerDay[i].getDate(),
            8,
            0,
            0
          );
          if (start.getDate() === new Date(Date.now()).getDate()) {
            console.log("entro");
            start.setHours(
              Math.abs(new Date(Date.now()).getHours()+1)
            );
          }
          fill = [];
        for (
            start;
            start < end;
            start.setMinutes(start.getMinutes() + slot)
          ) {
            // mints +=slot
            //console.log(start)
    
            if (start.getHours() >= 9 && start.getHours() < 18) {
              fill.push(new Date(start));
             for(let s of slots){
               //console.log(start === new Date(s[0], s[1]-1, s[2], s[3], s[4],0))
               //console.log(new Date(start).toISOString())
               //console.log(new Date(s.date).toISOString())
               if(new Date(start).toISOString() === new Date(s.date).toISOString()){
                
                 console.log("slot")
                 fill.pop()
               }
    
             }
             
             
             
            }
          }
          if(fill.length === 0){
    
            fill.push('')
          }
          if(fill.length> size)
          size = fill.length
          //doctor?.appointmentSlots.forEach(s => if(fi))
          //console.log(fill)

          fillList.push(fill)
          fill = [];
        }
        setFillDays(fillList);
        
      }
      const slotSelect = (slot) => {
        console.log(Object.assign({date: slot}, doctor))
        if(token && user.role[0].role == "PATIENT"){

          axiosClient.post(`/citas-patient/`, Object.assign({date: slot}, doctor))
          .then(() => {
              setMsg({message: "la cita ha sido registrada", type: "success"})
  
              //navigate('/medicos')
          })
          .catch( err => {
              const res = err.response
              console.log(err)
              if (res && res.status == 422)
               setErrors(res.data.errors)
          })
        }else{
          setMsg({message: "el usuario no es paciente", type: "alert"})
          return
        }
      }
      
     const showSlots = () => {
  
        if (slice <= 6) {
          console.log(slice)
          setIntervalId(setInterval(() => {
            setSlice(slice => slice+1);
          }, 10));
        
          
        }
        if (slice > 6) {
          console.log(slice)
          setIntervalId(setInterval(() => {
            setSlice(slice => slice-1);
          }, 10));
        }
        
      }
      useEffect(() => {
        if (slice > 27) {
          clearInterval(intervalId);
           setIntervalId(null)
           setBtnMsg("mostrar menos")
           return
        }
        if (slice < 6) {
          clearInterval(intervalId);
           setIntervalId(null)
           setBtnMsg("mostrar mas")
           return
        }
      }, [slice]);

  return (
    <div>
      <div>
      </div>
      {fillDays && <div className='block'>

       {fillDays.map((day, i) => ( <div key={i} className="avaiable">
        
       {day.slice(0,slice).map((slot, j) => ( <div key={j}>
        
        {typeof(slot) === 'object' && <div className='slot' onClick={e => slotSelect(slot)}
        data-tooltip-id={"slot"+i+j}
        data-tooltip-content={slot}
        data-tooltip-place="bottom-start"
        
        >
        


<Tooltip id={"slot"+i+j}
opacity={0.5} />
       { slot.toLocaleTimeString( 'es-CO', {hour: 'numeric', minute: '2-digit',
      hour12: true})}
       </div>
}
      {typeof(slot) === 'string' && <div className="no-available" >No hay <br/> disponible</div>
  
       }
        </div>
        ))}
    
  </div>
  ))}
      </div>
}
<div className="show-btn" onClick={showSlots}>
  <button>{btnMsg}</button>
    </div>
</div>


  )
}
