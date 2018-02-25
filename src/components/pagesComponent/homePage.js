import React, { Component } from 'react';
import BitcoinData from '../bitcoinDataComponent/bitcoinData'

class HomePage extends Component {

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
