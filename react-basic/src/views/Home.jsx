import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axiosClient from '../axios-client'
import Login from "./login";
import Signup from "./Signup";
import userImg from "../assets/img/login.png";
import carrusel1 from "../assets/img/carrusel1.jpg";
import carrusel2 from "../assets/img/carrusel2.jpg";
import carrusel3 from "../assets/img/carrusel3.webp";
import faceIcon from "../assets/img/facebook.png";
import googleIcon from "../assets/img/google.png";
import cardServices from "../assets/img/card.jpg";
import newsImg from "../assets/img/news.jpg";
import menuIcon from "../assets/img/menu.svg";




import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import { useStateContext } from "../context/ContextProvider";
import SpeSelect from "./speSelect";
import { Link } from "react-router-dom";

export default function Home() {
  const { showLogin, setShowLogin, showReg, setShowReg, user } = useStateContext();
  const [showFaq, setShowFaq] = useState(null)

  const logClose = () => setShowLogin(false);
  const logShow = () => {
    setShowLogin(true);
    setShowReg(false);
  };

  const regClose = () => setShowReg(false);
  const regShow = () => {
    setShowReg(true);
    setShowLogin(false);
  };



  const services = [
    {
      title: "titulo1",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur, ad dolorem a sint maxime non nesciunt labore hic rerum nisi tenetur fugit, ullam quos ratione? Molestiae ipsa magnam unde?",
    },
    {
        title: "titulo2",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur, ad dolorem a sint maxime non nesciunt labore hic rerum nisi tenetur fugit, ullam quos ratione? Molestiae ipsa magnam unde?",

    },
    {
        title: "titulo3",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur, ad dolorem a sint maxime non nesciunt labore hic rerum nisi tenetur fugit, ullam quos ratione? Molestiae ipsa magnam unde?",

    },
    {
        title: "titulo4",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur, ad dolorem a sint maxime non nesciunt labore hic rerum nisi tenetur fugit, ullam quos ratione? Molestiae ipsa magnam unde?",

    },
  ];
  const faq = [
    {
        title: "pregunta1",
        res: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur, ad dolorem a sint maxime non nesciunt labore hic rerum nisi tenetur fugit, ullam quos ratione? Molestiae ipsa magnam unde?",
      },
      {
          title: "pregunta2",
          res: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur, ad dolorem a sint maxime non nesciunt labore hic rerum nisi tenetur fugit, ullam quos ratione? Molestiae ipsa magnam unde?",
  
      },
      {
          title: "pregunta3",
          res: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur, ad dolorem a sint maxime non nesciunt labore hic rerum nisi tenetur fugit, ullam quos ratione? Molestiae ipsa magnam unde?",
  
      },
      {
          title: "pregunta4",
          res: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur, ad dolorem a sint maxime non nesciunt labore hic rerum nisi tenetur fugit, ullam quos ratione? Molestiae ipsa magnam unde?",
  
      },
    ];
    const news = [
        {
            title: "Noticia1",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Laudantium modi rem autem",
          },
          {
              title: "Noticia2",
              content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Laudantium modi rem autem",
      
          },
          {
              title: "Noticia3",
              content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Laudantium modi rem autem",
      
          },
          {
              title: "Noticia4",
              content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Laudantium modi rem autem",
      
          },
        ];
  

  return (
    <div>
      
        <div>
          <link
            rel="icon"
            type="image/x-icon"
            href="./assets/img/favicon.svg"
          />
          
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,600&family=Roboto:ital,wght@0,400;0,500;0,700;1,300;1,400&family=Source+Sans+Pro:wght@300;400&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
            crossOrigin="anonymous"
          />
          <title>Colmedicare</title>
        </div>
        <header className=" d-sm-flex py-3 ">
          <div className="col-md-3 logo">
            <a href="/" className="mb-2 mb-md-0 text-decoration-none">
              <span>
                <svg
                  version="1.1"
                  id="logo-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="-3.2 -3.2 38.40 38.40"
                  xmlSpace="preserve"
                  width="40px"
                  height="40px"
                  fill="#7881f7"
                  stroke="#7881f7"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <style type="text/css"></style>
                    <g>
                      <path d="M23,28L23,28c-1.1,0-2.1-0.7-2.5-1.8c0-0.1,0-0.2-0.1-0.2h-8.9c0,0.1,0,0.2-0.1,0.2C11.1,27.3,10.1,28,9,28h0 c-0.6,0-1,0.4-1,1s0.4,1,1,1h14c0.6,0,1-0.4,1-1S23.6,28,23,28z" />
                    </g>
                    <path d="M27,3H5C3.3,3,2,4.3,2,6v15c0,1.7,1.3,3,3,3h6.9h8.1H27c1.7,0,3-1.3,3-3V6C30,4.3,28.7,3,27,3z M25,15h-5 c-0.3,0-0.6-0.2-0.8-0.4l-0.9-1.4l-1.3,3.2C16.8,16.7,16.4,17,16,17c0,0,0,0,0,0c-0.4,0-0.7-0.2-0.9-0.6l-1.4-2.8l-1,1 C12.5,14.9,12.3,15,12,15H7c-0.6,0-1-0.4-1-1s0.4-1,1-1h4.6l1.7-1.7c0.2-0.2,0.6-0.3,0.9-0.3c0.3,0.1,0.6,0.3,0.7,0.5l1,2l1.2-2.9 c0.1-0.3,0.5-0.6,0.8-0.6c0.4,0,0.7,0.1,0.9,0.4l1.7,2.6H25c0.6,0,1,0.4,1,1S25.6,15,25,15z" />
                  </g>
                </svg>
              </span>
              Colmedicare
            </a>
          </div>

          <ul
            className="nav col col-md-6 col-lg-5 col-xl-5 col-xxl-4 mb-2 mb-md-0"
            id="nav-header"
          >
            <li>
              <a href="#" className="nav-link ">
                Servicios Medicos
              </a>
            </li>
            <div id="services">
              <ul>
                <li>
                  <a href="#">Medico Genenral</a>
                </li>
                <li>
                  <a href="#">Psicología</a>
                </li>
                <li>
                  <a href="#">Urología</a>
                </li>
                <li>
                  <a href="#">Dermatología</a>
                </li>
              </ul>
            </div>
            <li>
              <a href="#" className="nav-link ">
                Ayuda
              </a>
            </li>
            <li>
              <a href="#" className="nav-link ">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="nav-link ">
                Contacto
              </a>
            </li>
          </ul>

          <div className="col-md-3 d-md-flex justify-content-end align-items-center">
          {user.name &&  <div className="me-3">
            Hola {user.name}
          </div>
            }
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              onClick={logShow}
              >
              Login
            </button>
            <button type="button" className="btn btn-warning" onClick={regShow}>
              Registrarse
            </button>
            {user.name && <div className="ms-3 menu">
        <img src={menuIcon}/>
<div  className="user-menu">

  {user.role && <div>
{user.role[0].role === 'ADMIN' &&
<Link to="/dashboard/users" > Panel</Link>
}
{user.role[0].role === 'PATIENT' &&
<Link to="/paciente" > Panel</Link>
}
{user.role[0].role === 'DOCTOR' &&
<Link to="/medico" > Panel</Link>
}
  </div>
}
</div>
      </div>
}
          </div>
        </header>
        <div className="container">
          <div className="carousel">
            <Carousel
              interval={10000}
              infiniteLoop={true}
              showThumbs={false}
              autoPlay={true}
            >
              <div>
                <img src={carrusel1} />
                {/* <p className="legend">Legend 1</p> */}
              </div>
              <div>
                <img src={carrusel2} />
                {/* <p className="legend">Legend 2</p> */}
              </div>
              <div>
                <img src={carrusel3} />
                {/* <p className="legend">Legend 3</p> */}
              </div>
            </Carousel>
          </div>

          <Modal show={showLogin} onHide={logClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <img src={userImg} />
              <Login />
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-footer">
              <div>
                <button className="btn btn-light">
                  <img src={googleIcon} width={30} height={30}/>
                  Entrar con Google
                </button>
              </div>
              <div>
                <button className="btn btn-primary">
                  <img src={faceIcon} width={30} height={30}/>
                  Entrar con facebook
                </button>
              </div>

              <div>
                <label className="my-1">
                  <a href="#">Olvido la contraseña</a>
                </label>
              </div>
              <div>
                
                  No tiene cuenta? &nbsp;
                  <a href="#" type="button" onClick={regShow}>
                   Registrarse
                  </a>
                
              </div>

                </div>
            </Modal.Footer>
          </Modal>

          <Modal show={showReg} onHide={regClose}>
            <Modal.Header closeButton>
              <Modal.Title>Registrarse</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <img src={userImg} />
              <Signup />
            </Modal.Body>
            <Modal.Footer>
              <label className="mt-3">
                Ya esta registrado? &nbsp;
                <a href="#" type="button" onClick={logShow}>
                  Ingresar
                </a>
              </label>
            </Modal.Footer>
          </Modal>
          <div>
            <SpeSelect />
          </div>

          <div className="container mt-5 ">
            <div className="text-center mb-4">
              <h2>Nuestros servicios</h2>
            </div>
             <div className="cards row ">
              {services.map((s,i) => ( <div key={i} className="card col-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
                <img
                  src={cardServices}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{s.title}</h5>
                  <p className="card-text">
                    {s.desc}
                  </p>
                </div>

                <div className="card-body">
                  <a href="#" className="card-link">
                    Card link
                  </a>
                  <a href="#" className="card-link">
                    Another link
                  </a>
                </div>
              </div>
))}
            </div>
            <div>
              
                <h3>Preguntas Frecuentes</h3>
                {faq.map((f,i) =>(<div key={i}  onClick={e => setShowFaq("faq"+i) }> 
                  <h6>{f.title}</h6>
                  <p className={showFaq === "faq"+i ? "show-faq": "hide-faq"}>
                    {f.res}
                  </p>
                </div>
                ))} 
             
            </div>
            <div className="row my-5 d-flex cards-news">
              <div className="text-center mb-3">
                <h2>Noticias</h2>
              </div>

              <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                {news.map((n,i) =>(<div key={i} className="card card-news col-12  mb-3 ">
                    

                  <img
                    src={newsImg}
                    className="card-img-top img-news"
                    alt="..."
                  />

                  <div className="card-img-overlay p-3">
                    <h5 className="card-title title-news">{n.title}</h5>
                    <p className="card-text text-news">
                      {n.content}
                    </p>
                    <a href="#" className="btn btn-primary btn-news">
                      Leer Mas
                    </a>
                  </div>
                </div>
                    
                ))}
             </div>
              <div className="col-12 col-md-6 col-lg-5 col-xl-4 mt-5 mt-lg-1">
                <div className="card card-news col-12 mb-3 ">
                  <div>
                    <h5>Article title</h5>
                    <p className="card-text mb-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laudantium modi rem autem, perspiciatis aperiam ipsam ipsa
                      excepturi{" "}
                    </p>
                    <a href="#" className="">
                      Leer Mas
                    </a>
                  </div>
                  <div className="my-3">
                    <h5>Article title</h5>
                    <p className="card-text mb-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laudantium modi rem autem, perspiciatis aperiam ipsam ipsa
                      excepturi{" "}
                    </p>
                    <a href="#" className="">
                      Leer Mas
                    </a>
                  </div>
                  <div>
                    <h5 className="">Article title</h5>
                    <p className="card-text mb-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laudantium modi rem autem, perspiciatis aperiam ipsam ipsa
                      excepturi{" "}
                    </p>
                    <a href="#" className="">
                      Leer Mas
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top justify-content-center">
              <div className="col mb-3">
                <h6>Pacientes</h6>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Especialistas
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Medicamentos
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Servicios
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Preguntas Frecuentes
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col mb-3">
                <h6>Servicio</h6>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Quienes somos
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Contacto
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      Terminos y condiciones
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col mb-3">
                <h6>Redes sociales</h6>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      <img
                        src="https://d2cpzkmebgc9om.cloudfront.net/public/assets/img/svg/logowhatsapp.svg"
                        height="30"
                        width="30"
                      />
                      WhatsApp
                    </a>
                  </li>

                 
                  
                </ul>
              </div>
            </footer>
          </div>
        </div>
      
    </div>
  );
}
