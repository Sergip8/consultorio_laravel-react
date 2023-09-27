import {Navigate, createBrowserRouter} from "react-router-dom"
import Login from "./views/Login"
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
import Citas from "./views/Citas"
import SpeSelect from "./views/speSelect"
import DoctorSlots from "./views/DoctorSlots"
import DoctorSlotsHeader from "./views/DoctorSlotsHeader"
import Home from "./views/home"
import PatientLayout from "./components/PatientLayout"
import CitasPatient from "./views/CitasPatient"
import DoctorLayout from "./components/DoctorLayout"
import Tratamiento from "./views/Tratamiento"
import DoctorsSchedule from "./views/DoctorsSchedule"
import DoctorScheduleHeader from "./views/DoctorScheduleHeader"




const router = createBrowserRouter([
{path: "/dashboard", element: <DefaultLayout />, children:[
   // {path: "/", element: <Navigate to= "/users" />},
    {path: "/dashboard/users", element: <Users/>},
    {path: "/dashboard/pacientes", element: <Patients />},
    {path: "/dashboard/medicos", element: <Doctors />},


    {path: "/dashboard/consultorios", element: <Consultorio />},
    {path: "/dashboard/consultorios/new/:centroId", element: <ConsultorioForm />},
    {path: "/dashboard/consultorios/:id", element: <ConsultorioForm />},


    {path: "/dashboard/paciente/new/:userId", element: <PatientForm key="PatientCreate"/>},
    {path: "/dashboard/paciente/:id", element: <PatientForm key="PatientUpdate"/>},


    {path: "/dashboard/doctor/new/:userId", element: <DoctorForm key="DoctorCreate"/>},
    {path: "/dashboard/agenda-medicos", element: <DoctorScheduleHeader />},

    {path: "/dashboard/medico/:id", element: <DoctorForm />},



    {path: "/dashboard/user/new", element: <UserForm key="UserCreate"/>},
    {path: "/dashboard/user/:id", element: <UserForm key="UserUpdate"/>},

    {path: "/dashboard/citas", element: <Citas />},


    //{path: "/dashboard", element: <Dashboard />},

]},
{path: "/", element: <GuestLayout />, children:[
    {path: "/login", element: <Login />},
    {path: "/signup", element: <Signup />},
    {path: "/", element: <Home />},

    {path: "/citas/:spe", element: <DoctorSlotsHeader />},

]},
{path: "/paciente", element: <PatientLayout />, children:[

    {path: "/paciente/datos", element: <PatientForm />},
    {path: "/paciente/citas", element: <CitasPatient />},


]},
{path: "/medico", element: <DoctorLayout />, children:[

    {path: "/medico/datos", element: <DoctorForm />},
    {path: "/medico/tratamiento", element: <Tratamiento />},


]},


{path: "*", element: <NotFound />},

])

export default router