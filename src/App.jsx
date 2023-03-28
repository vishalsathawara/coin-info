import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Coins from "./components/Coins"
import Navbar from "./components/Navbar"
import Coin from './routes/Coin'


export default function App() {

  const [coins, setCoin] = useState([]);
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  useEffect(() => {

    axios.get(url).then((res) => {
      setCoin(res.data);
      

    }).catch((error) => {
      console.log(error)
    })

  }, [])



  return (
    <>
      <Navbar />



      <Routes>
        <Route path='/' element={<Coins coins={coins} />} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element={<Coin />} />
        </Route>
     </Routes>



    </>
  )
}
