import react, {
  useState, useEffect
} from "react"
import axios from "axios"
import { Link, NavLink } from "react-router-dom"
import Coin from "../routes/Coin"

const SerchCrypro = () => {

  const [serchApi, setSerchApi] = useState({})
  const [serch, setSerch] = useState("bitcoin")
  const [error, setError] = useState(false)
  const url = `https://api.coingecko.com/api/v3/coins/${serch}`

  const getdata = () => {
    axios.get(url).then((res) => {
      setSerchApi(res.data);
      //  console.log(res.data[0])

    }).catch((error) => {
      setError(true)
      alert("No Data Found ! Plese Entre Valid Coin Name ")
      console.log(error)
    })
  }
  useEffect(() => {

    getdata()

  }, [])
  //  console.log(serchApi.id)
  //console.log(serch)
  return (
    <>

      <div>
        <div className="containerData">
          <div className="formSty">
            <input type="text" value={serch} onChange={(e) => setSerch(e.target.value)} placeholder="Serch Coin" className="formSty-input" />
            <button onClick={getdata}> Serch </button>
          </div>
        </div>
      </div>
      <div>
        <div className="heading">
          <p>#</p>
          <p className="coin-name">Coin </p>
          <p className="hide-mobile">Price</p>
          <p className="hide-mobile">24h</p>
          <p className="hide-mobile">24h low</p>
          <p className="hide-mobile">24hr high</p>

        </div>
        <NavLink to={`/coin/${serchApi.id}`} element={<Coin />}>
          <div className="coin-row">

            <NavLink to={`/coin/${serchApi.id}`} element={<Coin />}>


              <h5 className="rank-btn">rank # {serchApi.market_cap_rank}</h5>
            </NavLink>
            <div className='img-symbol'>
              <NavLink to={`/coin/${serchApi.id}`} element={<Coin />}>
                {serchApi.image ? <img src={serchApi.image.small} alt='' /> : null}

              </NavLink>
              < p>{serchApi.name}</p>
            </div>
            <div className="hide-mobile">
              <NavLink to={`/coin/${serchApi.id}`} element={<Coin />}>
                {serchApi.market_data?.current_price ? <h2>₹{serchApi.market_data.current_price.inr.toLocaleString()}</h2> : null}
              </NavLink>
            </div>
            <div className='hide-mobile'>
              <NavLink to={`/coin/${serchApi.id}`} element={<Coin />}>
                {serchApi.market_data?.price_change_percentage_24h_in_currency ? <h5>{serchApi.market_data.price_change_percentage_24h_in_currency.inr.toFixed(1)}%</h5> : null}
              </NavLink>
            </div>

            <div className='hide-mobile'>
              <NavLink to={`/coin/${serchApi.id}`} element={<Coin />}>
                {serchApi.market_data?.low_24h ? <h5>₹{serchApi.market_data.low_24h.inr.toLocaleString()}</h5> : null}
              </NavLink>
            </div>
            <div className='hide-mobile'>
              <NavLink to={`/coin/${serchApi.id}`} element={<Coin />}>
                {serchApi.market_data?.high_24h ? <h5>₹{serchApi.market_data.high_24h.inr.toLocaleString()}</h5> : null}  </NavLink>
            </div>


          </div>
        </NavLink>
      </div>


    </>
  )
}

export default SerchCrypro;