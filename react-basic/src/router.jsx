import {Navigate, createBrowserRouter} from "react-router-dom"
import Login from "./views/login"
import Signup from "./views/Signup"
import Users from "./views/users"
import NotFound from "./views/NotFound"
import DefaultLayout from "./components/DefaultLayout"
import GuestLayout from "./components/GuestLayout"
import Dashboard from "./views/Dashboard"
import UserForm from "./views/UserForm"
import Patients from "./views/Patients"
import PatientForm from "./views/PatientForm"
import DoctorForm from "./views/DoctorForm"
import Consultorio from "./views/Consultorios"
import ConsultorioForm from "./views/consultorioForm"
import Doctors from "./views/Doctor"
import Citas from "./views/citas"




const router = createBrowserRouter([
{path: "/", element: <DefaultLayout />, children:[
    {path: "/", element: <Navigate to= "/users" />},
    {path: "/users", element: <Users/>},
    {path: "/pacientes", element: <Patients />},
    {path: "/medicos", element: <Doctors />},


    {path: "/consultorios", element: <Consultorio />},
    {path: "/consultorios/new/:centroId", element: <ConsultorioForm />},
    {path: "/consultorios/:id", element: <ConsultorioForm />},


    {path: "/paciente/new/:userId", element: <PatientForm key="PatientCreate"/>},
    {path: "/paciente/:id", element: <PatientForm key="PatientUpdate"/>},


    {path: "/doctor/new/:userId", element: <DoctorForm key="DoctorCreate"/>},
    {path: "/medico/:id", element: <DoctorForm />},



    {path: "/user/new", element: <UserForm key="UserCreate"/>},
    {path: "/user/:id", element: <UserForm key="UserUpdate"/>},

    {path: "/citas", element: <Citas />},


    {path: "/dashboard", element: <Dashboard />},

]},
{path: "/", element: <GuestLayout />, children:[
    {path: "/login", element: <Login />},
    {path: "/signup", element: <Signup />},
]},



{path: "*", element: <NotFound />},

])

export default router