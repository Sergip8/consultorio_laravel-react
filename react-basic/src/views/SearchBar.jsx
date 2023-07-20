import React, {useRef} from 'react'
import { useStateContext } from '../context/ContextProvider'

export default function SearchBar() {

    const searchRef = useRef()
    const {setSearch} = useStateContext()

    const onSubmit = (e) =>{
        e.preventDefault()
        setSearch(searchRef.current.value)
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
        <input placeholder='Ingrese el numero de cedula' ref={searchRef} type="text" />
        <button>Buscar</button>
        </form>
    </div>
  )
}
