import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone'
import { convertToCurrency } from '../../Helpers'

class BitcoinData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      currentBtcData: {
        time: null,
        price: 0
      }
    }
  }

  getHistoricalPrice() {
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json")
      .then((response) => {
        let res = response.data.bpi;
        let data30d = [];
        let count = 0;
        for(let dayPrice in res) {
          data30d.push({
            price: res[dayPrice].toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
            date: moment(dayPrice).format('MMM DD'),
            x: count,
            y: res[dayPrice]
          })
          count++
        }

        this.setState({
          data: data30d,
          loading: false
        })
      })
  }

  getCurrentPrice() {
    axios.get("https://api.coinmarketcap.com/v1/ticker/bitcoin/")
      .then((response) => {
        console.log(response)
        let res = response.data[0];
        let price = "$" + convertToCurrency(res.price_usd);
        let pdt = new Date(Number(res.last_updated * 1000))
        let pst = moment.tz(pdt, 'America/Los_Angeles').format('MM/DD/YYYY h:mm a')
    

        this.setState({
          currentBtcData: {
            time: pst,
            price: price
          }
        })
      })
  }

  componentDidMount() {
    this.getCurrentPrice();
  }

  render() {
    console.log(this.state);
    return (
      <div className='bitcoin-data'>
        <h1>Bitcoin</h1>
        <div className='coin-data'>
          <p>Current Price: {this.state.currentBtcData.price}</p>
          <p> Last Updated: {this.state.currentBtcData.time} PST</p>
        </div>

      </div>
    )
  }
}

export default BitcoinData;
// <div id="coindesk">Powered by <a href="http://www.coindesk.com/price/">CoinDesk</a></div>




