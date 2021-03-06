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
    return (
      <div>
        <h2>Cryptocurrency Data and Tools</h2>

        <p>
          Crypto-Track offers information for all
          your cryptocurrency needs.
        </p>

        {this.state.loading?
          <div style={{'textAlign': 'center'}}> Loading Data. Please Wait... </div>
            :
          <ul>
            {this.state.currencies.map((coin, ind) => {
              return (
                <li id={'coin-' + coin.id} key={ind}>
                  <Link to={{
                      pathname: "/currency/" + coin.id + "/charts",
                      info: coin,
                      endingPath: "charts"
                    }}
                  >
                    {coin.id}
                  </Link>
                </li>
              )
            })}
          </ul>
        }
      </div>
    );
  }
}

export default HomePage;
