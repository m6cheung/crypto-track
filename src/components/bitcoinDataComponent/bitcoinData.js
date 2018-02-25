import React, { Component } from 'react';
import axios from 'axios';

class BitcoinData extends Component {
  constructor() {
    super();
    this.state = {
      price: '',
      vol24h: '',
      mrktCap: '',
      circulating: '',
      max: '',
      percentChange24h: ''
    }
  }

  componentDidMount() {
    axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
      .then((response) => {
        let res = response.data[0]
        this.setState({
          price: res["price_usd"],
          vol24h: res["24h_volume_usd"],
          mrktCap: res["market_cap_usd"],
          circulating: res["available_supply"],
          max: res["max_supply"],
          percentChange24h: res["percent_change_24h"]

        })
      })
  }

  render() {
    return (
      <div className='bitcoin-data'>
        <h1>Bitcoin</h1>

        <p>

          Price: {parseInt(this.state.price, 10).toLocaleString()}$ <br></br><br></br>
          Market Cap: {parseInt(this.state.mrktCap, 10).toLocaleString()}$ <br></br><br></br>
          Cirulating Supply: {parseInt(this.state.circulating, 10).toLocaleString()} <br></br><br></br>
          Total Supply: {parseInt(this.state.max, 10).toLocaleString()} <br></br><br></br>
          24Hr Volume: {parseInt(this.state.vol24h, 10).toLocaleString()}$ <br></br><br></br>
          24Hr Percent Change: {this.state.percentChange24h}% <br></br><br></br>

        </p>
      </div>
    );
  }
}

export default BitcoinData;
