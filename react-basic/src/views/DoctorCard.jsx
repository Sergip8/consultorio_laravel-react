import React from 'react'
import user from '../assets/img/user.jpg'

export default function DoctorCard({doctor}) {
  return (
    <div>
        <div className='doctor-card'>

            <div className='doctor-card-header'>
          <div>
            <img src={user} width={80} height={80} alt="" />
          </div>
          <div>
            {doctor.name}
            <p>especializacion: { doctor.specialization}</p>

          </div>
            </div>
            <div className='doctor-card-body'>
            
            <p>telefono: { doctor.telephone}</p> 
            </div>
            <div className='doctor-card-footer'>

            </div>
        </div>
    </div>
  )
}
