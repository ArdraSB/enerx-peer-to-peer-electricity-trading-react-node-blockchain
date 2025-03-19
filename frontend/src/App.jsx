import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register'
import {Offers} from './components/Offers'
import Navbar from './components/Navbar'
import Transactions from './components/Transactions'
import Profile from './components/Profile'
import { Route,Routes} from "react-router-dom";//new package for routing

// import Register from './components/offer'

function App() {

  
  return (
   <>
   <Navbar/>
   <div className="container">
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/Profile' element={<Profile/>} />
      <Route path='/Transactions' element={<Transactions/>} />
      <Route path='/Offers' element={<Offers/>} />
    </Routes>
   </div>
   
   
   </>
  )
}

export default App
