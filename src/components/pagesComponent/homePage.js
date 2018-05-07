import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: null,
      loading: true
    }
  }

  componentDidMount() {

    axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
      .then((response) => {
        this.setState({
          currencies: response.data, 
          loading: false
        })
      })
      
  }

  render() {
    console.log(this.state.currencies)
    return (
      <div>
        <h3 style={{'textAlign': 'center'}}>
          Top Cryptocurrencies by Market Cap
        </h3>

        {this.state.loading?
          <div style={{'textAlign': 'center'}}> Loading Data. Please Wait... </div>
            :
          <ol>
            {this.state.currencies.map((coin, ind) => {
              if(coin.id !== 'bitcoin') {
                return (
                  <li id={'coin-' + coin.id} key={ind}>
                    <Link to={{
                        pathname: "/alt/" + coin.id,
                        info: coin,
                        endingPath: "charts"
                      }}
                    >
                      {coin.name}
                    </Link>
                  </li>
                ) 
              } else {
                return (
                  <li id={'coin-' + coin.id} key={ind}>
                    <Link to={{
                        pathname: "/currency/" + coin.id + "/charts",
                        info: coin,
                        endingPath: "charts"
                      }}
                    >
                      {coin.name}
                    </Link>
                  </li>
                )
              }
            })}
          </ol>
        }
      </div>
    );
  }
}

export default HomePage;
