import React, {useRef} from 'react'
import { useStateContext } from '../context/ContextProvider'

export default function SearchBar() {

    const searchRef = useRef()
    const {setSearch, placeholder} = useStateContext()

    const onSubmit = (e) =>{
        e.preventDefault()
        setSearch(searchRef.current.value)
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
        <input placeholder={placeholder} ref={searchRef} type="text" />
        <button className='btn-search'>Buscar</button>
        </form>
    </div>
  )
}
