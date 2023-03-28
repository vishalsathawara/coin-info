import { useParams } from "react-router-dom";
import react, { useState, useEffect } from "react"
import axios from "axios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';






ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


const HistoryChart = () => {
  const [response, setResponse] = useState(null)

  const params = useParams()
  //const url ="https://api.coingecko.com/api/v3/coins/gala/market_chart?vs_currency=usd&days=365"
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=inr&days=7`
  const getdata = () => {
    axios.get(url).then((res) => {
      setResponse(res.data);


    }).catch((error) => {

      alert("No Data Responce ! please wait Or Check Your Internet Connection ")
      console.log(error)
    })
  }
  useEffect(() => {

    getdata()

  }, [])

  if (!response) {
    return (
      <div>
        <h1><CircularProgress /> </h1>
      </div>
    )
  }
  const coinChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));

  const options = {
    responsive: true
  }

  const data = {
    labels: coinChartData.map(value => moment(value.x).format('MMM DD ')),
    datasets: [
      {
        fill: true,
        label: params.coinId,
        data: coinChartData.map(val => val.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }

  return (
    <div className="content-chart">
      <Line  options={options} data={data} />
      <h3 className="chartDetail">{params.coinId} Chart</h3>
    </div>
  )
}

export default HistoryChart;