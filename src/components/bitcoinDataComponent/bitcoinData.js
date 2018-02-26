import React, { Component } from 'react';
import axios from 'axios';
import ChartData from './chartData';
import moment from 'moment';

class BitcoinData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      percentChange: '',
      fiatChange: '',
      data: [],
      count: 0
    }
  }

  componentDidMount() {
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json")
      .then((response) => {
        let res = response.data.bpi
        let data30d = []
        for(let dayPrice in res) {
          data30d.push({
            price: res[dayPrice].toLocaleString(),
            date: moment(dayPrice).format('MMM DD'),
            x: this.state.count,
            y: res[dayPrice]
          })
        }

        this.setState({
          data: data30d,
        })
      })
  }

  render() {
    return (
      <div className='bitcoin-data'>
       <h1>Bitcoin</h1>
       <ChartData data={this.state.data} />
      </div>
    )
  }
}

export default BitcoinData;


//"BINANCE_SPOT_BTC_USDT"

//SYMBOLS ARE "EXCHANGE_SPOT_TICKER_PAIR"
