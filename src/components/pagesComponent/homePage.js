import React, { Component } from 'react';
import BitcoinData from '../bitcoinDataComponent/bitcoinData'

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daily: true,
      monthly: false
    }
  }

  render() {
    return (
      <div>
        <h1>Crypto-Track</h1>
        <h2>Cryptocurrency Data and Tools</h2>

        <p>
          Crypto-Track offers searching for all
          your cryptocurrency information.
        </p>

        

        <BitcoinData />
        
      </div>
    );
  }
}

export default HomePage;
