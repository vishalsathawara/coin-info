import react from "react";
import { Link } from 'react-router-dom'
import CoinItems from './CoinItems'
import "./Coins.css"
import Coin from "../routes/Coin"
import SerchCrypro from "./SerchCrypro"
import Footer from "../Footer"
const Coins = (props) => {
  return (
    <>
      <div>
        <SerchCrypro />
      </div>
      <div className="container">
        <div >
          <h1>All Coin</h1>
          <div className="heading">
            <p>#</p>
            <p className="coin-name">Coin </p>
            <p>Price</p>
            <p>24h</p>
            <p className="hide-mobile">Volume</p>
            <p className="hide-mobile">Mkt Cap</p>
          </div>
          {props.coins.map(coins => {
            return (
              <Link to={`/coin/${coins.id}`} element={<Coin />} key={coins.id}>
                <CoinItems coins={coins} />
              </Link>
            )
          })}
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Coins;