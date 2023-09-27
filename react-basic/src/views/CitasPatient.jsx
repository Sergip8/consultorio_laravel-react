import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import SearchBar from "./SearchBar";

export default function CitasPatient() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setMsg, search, setSearch, user, setPlaceholder } = useStateContext();
  const [links, setLinks] = useState([]);
  const [tratamiento, setTratamiento] = useState([]);
  const [selected, setSelected] = useState(null);

  const administracion = {
    'ORAL':'Oral',
    'INYECCION': 'injeccion'
  }
  const presentacion = {
    'PASTILLA': 'Pastilla'
  }

  useEffect(() => {
    setPlaceholder("Ingrese el id de cita");
    getcitas();
    console.log(citas);
  }, [user]);
  const getcitas = () => {
    setLoading(true);
    if (user.id) {
      axiosClient
        .get(`/get-cita-by-userid/${user.id}`)
        .then(({ data }) => {
          setCitas(data.data);
          console.log(data);
          setLinks(data.meta.links);
          console.log(links);
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const onCancel = (c) => {
    if (c.status === "CANCELADO") {
      setMsg({ message: "la cita ya esta cancelada", type: "alert" });
      return;
    }
    if (!window.confirm("desea cancelar la cita")) return;
    c.status = "CANCELADO";
    console.log(c);
    axiosClient
      .post(`/citas-change-status`, { id: c.id, status: c.status })
      .then(({ data }) => {
        setMsg({ message: "la cita ha sido cancelada", type: "alert" });
        console.log(data);
        getcitas();
      });
  };
  // const onPage = (url) => {
  //   getcitas(url)
  // }

  useEffect(() => {
    setCitas((c) => c.filter((cf) => cf.id == search));
  }, [search]);

  const pagination = () => {
    return links.map((l, i) => (
      <button
        key={i}
        disabled={!l.url || l.active}
        onClick={(e) => onPage(l.url)}
        className="btn-page"
      >
        {l.label
          .replace("&laquo; Previous", "Atras")
          .replace("Next &raquo;", "Siguiente")}
      </button>
    ));
  };



  return (
    <div>
      <h1>citas</h1>
      <div>{SearchBar()}</div>
      <div className="user-table"></div>
      <div className="card animated fateInDown">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>descripcion</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
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
              {citas.map((c) => (
                <tr key={c.id} className={selected == c.id ? "selected-tratamiento": ""}>
                  
                  <td>{c.id}</td>
                  <td>{c.description}</td>
                  <td>{new Date(c.date).toLocaleString()}</td>
                  <td>{c.status}</td>
                   <td>
                    {c.status == 'ASIGNADO' &&

                    <div>
                    <button className="btn-edit">Cambiar</button>
                    &nbsp;
                    <button onClick={(e) => onCancel(c)} className="btn-delete">
                      Cancelar
                    </button>

                    </div>
}
                    
                    {c.tratamientos.length>0 && 
                    
                    <button onClick={e => {setTratamiento(c.tratamientos); setSelected(c.id)}} className="btn-create">Ver tratamiento</button>
                    
                        }
                  </td>

                </tr>
               
                
              ))}
            </tbody>
          )}
        </table>
          {tratamiento.length>0 &&
        <div className="card animated fateInDown">
        <table>
          <thead>
            <tr>
            <th>Medicamento</th>
            <th>Cantidad</th>
            <th>Gramaje</th>
            <th>Administración</th>
            <th>Presentación</th>
            <th>prescripción</th>
              
            </tr>
          </thead>
          
            <tbody>
              {tratamiento.map(t =>( <tr key={t.id}>
                <td>{t.medicamento.name}</td>
                <td>{t.quantity}</td>
                <td>{t.medicamento.dosage_grams}</td>
                <td>{administracion[t.medicamento.dosage]}</td>
                <td>{presentacion[t.medicamento.dosage_form]}</td>
                <td>{t.description}</td>
                
                
              </tr>
              ))}
            </tbody>
            </table>
          </div>
}
      </div>
      <div>{pagination()}</div>
    </div>
  );
}
