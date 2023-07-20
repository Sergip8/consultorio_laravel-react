import { createContext, useContext, useState } from "react";


const StateContext = createContext({
    user: null,
    token: null,
    msg: null,
    search: null,
    setUser: () => {},
    setToken: () => {},
    setMsg: () => {},
    setSearch: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] =useState({})
    const [msg, _setMsg] = useState({
        message: '',
        type: ''
    })
    const [search, setSearch] = useState('')
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
            setSearch
        }}>
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)