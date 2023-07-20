import "react-calendar/dist/Calendar.css";
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import SearchBar from "./SearchBar";
import Calendar from "react-calendar";
export default function Citas() {
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setMsg, search, setSearch } = useStateContext();
  const [patientSelected, setPatientSelected] = useState(null);
  const [citaSelected, setCitaSelected] = useState(null);
  const [citaRes, setCitaRes] = useState({
    type: "",
    patientId: "",
    doctorId: "", 
    date: "",
    description: "",
    slot: 20
  });
  
  const [slots, setSlots] = useState([]);
  const [doctorsDisp, setDoctorsDisp] = useState([]);
  const [cita, setCita] = useState({
    patientId: 0,
    type: "",
    date: "",
    time: "",
  });
  const type = [
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

  useEffect(() => {
    slotList();
  }, []);

  if (search) {
    axiosClient
      .get(`/patients-apptment/${search}`)
      .then(({ data }) => {
        setPatient(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setSearch("");
      });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let dateStr =
      cita.date.toISOString().split("T")[0] + " " + cita.time + ":00";
    console.log(dateStr);
    axiosClient
      .post(
        `/doctor-availability`,
        Object.assign({ type: cita.type, date: dateStr, slot: 20})
      )
      .then(({ data }) => {
        console.log(data);
        if (data.data.length == 0)
          setMsg({
            message: "no se encontro citas disponibles",
            type: "alert",
          });
        setDoctorsDisp(data.data);
      })
      .catch((err) => {
        const res = err.response;
        console.log(err);
        if (res && res.status == 422) setErrors(res.data.errors);
      });
  };

  const slotList = (slot = 20, start = 7, end = 22) => {
    let temp = [];
    for (let i = start; i <= end; i++) {
      ["00", 20, 40].forEach((m) => {
        if (i <= 9) temp.push("0" + i + ":" + m + ":" + "00");
        else temp.push("" + i + ":" + m + ":" + "00");
      });
    }
    setSlots(temp);
  };
  const onSubmitAppointment = () =>{
    console.log(cita)
  
    console.log(citaRes)
    axiosClient.post(`/citas`, citaRes)
    
    .then(({ data }) => {
      console.log(data);
      if (data.data.length == 0)
        setMsg({
          message: "cita agendada",
          type: "success",
        });
      setDoctorsDisp(data.data);
    })
    .catch((err) => {
      const res = err.response;
      console.log(err);
      
    });
};
  

  return (
    <div>
      <div>{SearchBar()}</div>
      {patient.length != 0 &&(<div>
      <div className="user-table">
        <h1>Citas</h1>
      </div>
       <div className="card animated fateInDown">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>edad</th>
              <th>Documento</th>
              <th>Tipo de Documento</th>
              <th>Correo</th>
              <th>Seleccionar</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Un momento...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {patient.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>
                    {new Date(Date.now()).getFullYear() -
                      new Date(p.birthDate).getFullYear()}
                  </td>

                  <td>{p.document}</td>
                  <td>{p.documentType}</td>
                  <td>{p.email}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={p.id === patientSelected}
                      value={p.id}
                      onChange={(e) => {
                        setCita({ ...cita, patientId: e.target.value });
                        setPatientSelected((prev) => (p.id === prev ? null : p.id));
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
       
      <form onSubmit={onSubmit}>
        <select onChange={(e) => setCita({ ...cita, type: e.target.value })}>
          <option hidden defaultValue="">
            Seleccione el tipo de cita
          </option>
          {type.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="time"
          required
          list="times"
          onChange={(e) => setCita({ ...cita, time: e.target.value })}
          placeholder="Hora"
        />
        <datalist id="times">
          {slots.map((s, i) => (
            <option key={i} value={s} />
          ))}
        </datalist>
        <Calendar
          minDate={new Date()}
          required
          onChange={(e) => setCita({ ...cita, date: e })}
          
        />
        <button 
        style={{marginTop: "20px"}}
        className="btn">Buscar citas</button>
      </form>
      <div style={{marginTop: "20px"}}>
        {doctorsDisp.length !=0 && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>cita</th>
                  <th>select</th>
                </tr>
              </thead>
              {loading && (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center">
                      Un momento...
                    </td>
                  </tr>
                </tbody>
              )}
              {!loading && (
                <tbody>
                  {doctorsDisp.map((d) => (
                    <tr key={d.id}>
                       <td>
                       <p>cita {d.specialization} con el doctor {d.name} en el centro {d.centerName} consultorio {d.number}</p>
                      </td>
                      <td>
                      <input
                      type="checkbox"
                      checked={d.id === citaSelected}
                      value={d.id}
                      onChange={(e) => {
                        setCitaRes({ ...citaRes, doctorId: e.target.value, type: d.specialization, 
                          description:`${d.specialization} con el doctor ${d.name} 
                          en el centro ${d.centerName} consultorio ${d.number}`, 
                          patientId: cita.patientId,
                          date: cita.date.toISOString().split("T")[0] + " " + cita.time + ":00"});
                        setCitaSelected((prev) => (d.id === prev ? null : d.id));
                      }}
                    />
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          
          <button 
         style={{marginTop: "20px"}}
         className="btn" type="submit"
         onClick={onSubmitAppointment}>Agendar cita</button>
         </div>
          )}
      </div>
      </div>
       )}
    </div>
  );
}
