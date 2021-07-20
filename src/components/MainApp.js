import React,{useEffect, useState} from 'react'

import {AppRouter} from "./AppRouter"
import { LibraryContext } from './LibraryContext'
import contactPerson from '../services/persons'




export const MainApp = () => {

   const [persons, setPersons] = useState([])
   const [noti, setNoti] = useState(null)

   useEffect(() => {
     contactPerson
     .getAllPersons()
     .then((({personas}) => setPersons(personas)))
   },[])
    

    return (
        <LibraryContext.Provider value={{
            persons,
            setPersons,
            noti,
            setNoti
        }}>
            <AppRouter />
          </LibraryContext.Provider>
    )
}
