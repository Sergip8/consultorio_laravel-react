import React from 'react'
import { useNavigate} from 'react-router-dom'

export default function SpeSelect() {

    const navigate = useNavigate()
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

  return (
    <div>
        <select onChange={(e) => navigate(`/citas/${ e.target.value }`) }>
          <option hidden defaultValue="">
            Seleccione la especialización
          </option>
          {spe.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
    </div>
  )
}
