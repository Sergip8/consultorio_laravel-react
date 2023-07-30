import React, { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip';

export default function DoctorsSchedule({doctor, startDate, index}) {
//     @Input() daySelected!: Calendar;
//   @Input() doctorSlots!: DoctorSlots;
//   @Input() index!: number
//   @Input() num!: number

 const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
 const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const days = [];
  const slots = [];
 
  

 // const scheduleDay!: CalendarDays;
  const daysWeek = [];
  const flag = true
  const response ="";

const [showSchedule, setSchedule] = useState([])
const [showSlots, setSlots] = useState([])
const [dayWeek, setDayWeek] = useState([])

 const scale = 20;
 const duration = 20;
 const numberOfDays = 3;
 const start = 6
 const end = 18
 const slot = 20
  useEffect(() => {
    scheduleTable()
  }, [startDate])

  const scheduleTable =() => {
    let schedule = [];
    let daysWeek = [];
    let slots = [];
    
    var tStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), start, 0, 0);
    var tTemp = new Date(tStart);
    let scheduleDay = { }
    var tEnd = new Date(tTemp.setDate(tTemp.getDate() + numberOfDays));
   // console.log(tStart);
    let counter = 0;

    //for(var t = new Date(year, month, day, start, 0, 0); t <= new Date(t.setHours(t.getHours()+end)); t.setMinutes(t.getMinutes()+slot) )

    while (
      counter <=
      Math.abs((60 / slot) * slot * (end - start) - numberOfDays)
    ) {
      while (tStart < tEnd) {
         scheduleDay = {
          date: new Date(tStart),
          description: "",
          isOccuped: false,
          duration: slot,
        };
        doctor.map((d) => {
          //console.log(new Date(d.date).toISOString())
          //console.log(scheduleDay.date.toISOString())
         if (
           scheduleDay.date.toISOString() ===
           new Date(d.date).toISOString()
          ) {
           scheduleDay = {
              date: new Date(d.date),
              description:  `${d.description} a las ${new Date(d.date).toLocaleTimeString("es-CO", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}`,
              isOccuped: true,
              duration: slot,
            };
           
            console.log("--------------------------entro");
          }
        });

        schedule.push(scheduleDay);
        //console.log(schedule)
        tStart = new Date(tStart.setDate(tStart.getDate() + 1));
        if (daysWeek.length < numberOfDays)
          daysWeek.push(scheduleDay);

      }
      if(index === 0)
      slots.push(
        schedule[schedule.length-1].date.toLocaleTimeString("es-CO", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
      );

      counter += slot;
      tStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), start, 0, 0);
      tStart.setMinutes(tStart.getMinutes() + counter);
    }
    //console.log(schedule)
    //console.log(slots)
    setDayWeek(daysWeek)
    setSchedule(schedule)
    setSlots(slots)
    //console.log(this.schedule);
    //return this.schedule;
  }

//   ngOnChanges(changes: SimpleChanges) {
//     //this.numberOfDays = this.num
//     console.log(changes)
//     if(changes.hasOwnProperty('num')){
//       this.numberOfDays = changes['num'].currentValue
//       this.scheduleTable(
//         this.daySelected.year,
//         this.daySelected.month ,
//         this.daySelected.day,
//         8,
//         17,
//         this.scale
//       );
//     }

//     if(changes.hasOwnProperty('daySelected')){
//     let date = changes['daySelected'].currentValue
    
//     console.log(date)
//         this.scheduleTable(
//           date.year,
//           date.month ,
//           date.day,
//           8,
//           17,
//           this.scale
//         );
//       }

// }
//  const openDialog = (day) => {
//     let res = day.date.toLocaleTimeString("es-CO", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });
//     response = `desea la cita para el ${
//       daysOfWeek[day.date.getDay()]
//     } 
//     ${day.date.getDate()} de ${months[day.date.getMonth()]} a las ${res}`;
//   }
  const setDays = {
    
      gridTemplateColumns: `repeat(${numberOfDays}, 1fr)`,
      justifyItems: "center",
      width: `${numberOfDays*100}px`
    
  }
  return (
   


<div id="schedule" >
  
  <div className="day-week"></div>

  {index === 0 &&<div className="slots" style={{marginTop: `${scale*2.5}px` }}>
    {showSlots.map((s,i) => ( <div key={i} className="days-side" style={{height: `${scale}px`}}>
      <div>{s}</div>
    </div>
    ))}
  </div>
}

  <div className="days" style={setDays}>
   {dayWeek.map((d,i) => (
    <div key={i} className="days-header" scope="col">
      <div >{daysOfWeek[d.date.getDay()]} {d.date.getDate()}</div>
    </div>
    ))}
    {showSchedule.map((s,i) => ( <div key={i}
    className='table'
    >
        {s.isOccuped &&  <div
        
        className="ocupado"
        style={{paddingTop: `${scale}px`, paddingBottom: `${scale}px`}}
        onClick={e => console.log(s.date)}
        data-tooltip-id={"slot"+i}
        data-tooltip-content={s.description}
        data-tooltip-place="bottom-start"
        >
          <Tooltip id={"slot"+i}/>
  </div>
    }
       
      {!s.isOccuped &&  <div
        
        className="free-slot"
        style={{paddingTop: `${scale}px`, paddingBottom: `${scale}px`}}
        
        
       
        >
    </div>
    }
       
        {/* <div
        matTooltipClass="tooltip-className"
        matTooltipPosition="right"
        matTooltipHideDelay=""
        type="button"
        
        style={{'padding-top.px': s.duration, 'padding-bottom.px': s.duration}}
        
        className="event"
        *ngIf="day.isOccuped"
        [matTooltip]="day.description"
        ></div> */}
      </div>
      ))} 
    </div>


{/* <div
  className="modal fade"
  id="citaModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
> */}
  {/* <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-body text-center" *ngIf="scheduleDay">
        {{response}}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary">Aceptar</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
          Cancelar
        </button>
      </div>
    </div>
  </div> */}
</div>

  )
}
