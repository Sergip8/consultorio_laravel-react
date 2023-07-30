import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import DoctorSlots from "./DoctorSlots";
import DoctorCard from "./DoctorCard";
import { useParams } from "react-router-dom";
import axiosClient from '../axios-client'

export default function DoctorSlotsHeader() {
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
  let flag = true;
  const date = new Date(Date.now());
  const [headerDay, setHeaderDay] = useState([]);
  const dateNow = new Date(Date.now());
  const [dates, setDates] = useState(new Date(Date.now()));
  const [btnDisable, setBtnDisable] = useState(true)
  const [doctor, setDoctor] = useState({}) 
  const {spe} = useParams()

  const days = 3;
  const width = 0;

  //  @HostListener('window:resize', ['$event'])
  //  onResize() {
  //   if(window.innerWidth < 1600)
  //     days = 4
  //     if(window.innerWidth < 1200)
  //     days = 3
  //    dateRange()

  //  }

  useEffect(() => {
    dateRangePlus();
    console.log(headerDay);
  }, []);
  useEffect(() =>{
    
    axiosClient.get(`/doctorSpe/${spe}`)
    .then(({data}) => {
        console.log(data)
        
        setDoctor(data)
    }).catch((err) =>{
      console.log(err)

    })
}, [])


  const timeBefore = () => {
    const date = new Date(Date.now())
    if(dates <= date.setDate(date.getDate()+days)){
      setBtnDisable(true)
      return
    }

    dateRangeMinus();
    console.log(dates);
  };
  const timeAfter = () => {
    setBtnDisable(false)
    dateRangePlus();
  };
  const dateRangePlus = () => {
    setHeaderDay([]);
    const dayList = [];

    for (let i = 0; i < days; i++) {
      let nextDate = new Date(dates);
      nextDate.setDate(nextDate.getDate() + i);
      setDates(nextDate);
      dayList.push(new Date(nextDate));
    }
    setHeaderDay(dayList);
  };
  const dateRangeMinus = () => {
    setHeaderDay([]);
    const dayList = [];

    for (let i = days; i > 0; i--) {
      let nextDate = new Date(dates);
      nextDate.setDate(nextDate.getDate() - i - 1);
      setDates(nextDate);
      dayList.push(new Date(nextDate));
    }
    setHeaderDay(dayList);
  };
  return (
    <div className="container-slots">
      <div className="header-container">
        <div>
          <button disabled={btnDisable} onClick={timeBefore}>&#8249;</button>
        </div>

        {headerDay && (
          <div className="header">
            {headerDay.map((day, i) => (
              <div key={i} className={"header" + i}>
                <div className="day">
                  {dateNow.getFullYear() == day.getFullYear() &&
                  dateNow.getMonth() == day.getMonth() &&
                  dateNow.getDate() == day.getDate()
                    ? "Hoy"
                    : dateNow.getFullYear() == day.getFullYear() &&
                      dateNow.getMonth() == day.getMonth() &&
                      dateNow.getDate() + 1 == day.getDate()
                    ? "Mañana"
                    : daysOfWeek[day.getDay()]}
                </div>

                <div className="day">
                  {day.getDate()} {months[day.getMonth()].slice(0, 3)}
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
          <button onClick={timeAfter}>&#8250;</button>
        </div>
      </div>
      {doctor.length > 0  && <div>
      {doctor.map((d,i) =>  <div  key={i} className="doctor-slots-container">
      <div className="doctor-card">
        <DoctorCard doctor= {d}/>
      </div>
      <div  key={d.telephone} className="doctor-slots">

      <DoctorSlots headerDay={headerDay} slots={d.citas} doctor={Object.assign({id: d.id, specialization: d.specialization})}  />
      </div>

      </div>
      )}
      </div>
}
    </div>
  );
}
<div className="0"></div>;
