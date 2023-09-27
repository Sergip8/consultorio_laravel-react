import { createContext, useContext, useState } from "react";


const StateContext = createContext({
    user: null,
    token: null,
    msg: null,
    search: null,
    headerDay: null,
    showReg: null,
    showLogin: null,
    placeholder: null, 
    loading: null,
    setUser: () => {},
    setToken: () => {},
    setMsg: () => {},
    setSearch: () => {},
    setHeaderDay: () => {},
    setShowLogin: () => {},
    setShowReg: () => {},
    setPlaceholder: () => {},
    setLoading: () => {},
})

export const ContextProvider = ({children}) => {
    const [user, setUser] =useState({})
    const [msg, _setMsg] = useState({
        message: '',
        type: ''
    })
     const [showLogin, setShowLogin] = useState(false);
    const [showReg, setShowReg] = useState(false);
    const [search, setSearch] = useState('')
    const [placeholder, setPlaceholder] = useState('Ingrese el numero de identidad')
    const [loading, setLoading] = useState(false)

    const [headerDay, setHeaderDay] = useState([])
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"))
    const setMsg = ({message, type}) => {
        _setMsg({message, type})
        setTimeout(() => {
            _setMsg('')
        }, 3000)
    }

    const setToken = (token) => {
        _setToken(token)
        if(token)
        localStorage.setItem("ACCESS_TOKEN", token)
        else
        localStorage.removeItem("ACCESS_TOKEN")

    }
    return(
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            msg,
            setMsg,
            search,
            setSearch,
            headerDay,
            setHeaderDay,
            showLogin,
            showReg,
            setShowLogin,
            setShowReg,
            setPlaceholder,
            placeholder
        }}>
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)