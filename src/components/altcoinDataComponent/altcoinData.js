import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import { convertToCurrency } from '../../Helpers';

class AltcoinData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentData: {
        intPrice: 0,
        changePercent: 0,
        percentageOfPrice: 0,
        date: null,
        time: null,
        price: 0,
      },
      endingPath: null,
      coinPath: props.location.pathname.split('/')[2],
      name: null,
      symbol: null
    }
  }


  accessExistingData(res, context) {
    const _this = context;

    let currentPrice = "$" + convertToCurrency(res.price_usd);
    let pdt = new Date(Number(res.last_updated * 1000));
    let pst = moment.tz(pdt, 'America/Los_Angeles').format('h:mm a');
    let date = moment.tz(pdt, 'America/Los_Angeles').format('LL');
    let dayChange = parseFloat(res.percent_change_24h);
    let diff = ((Math.abs(dayChange) / 100) * convertToCurrency(res.price_usd));
    if(diff > 0.1) {
      diff = diff.toFixed(2);
    } else {
      diff = diff.toFixed(5);
    }

    _this.setState({
      currentData: {
        intPrice: res.price_usd,
        changePercent: dayChange,
        percentageOfPrice: diff,
        date: date,
        time: pst,
        price: currentPrice,
      },
      name: res.name,
      symbol: res.symbol
    })
  }

  getCurrentInfoFromApi() {
    axios.get(`https://api.coinmarketcap.com/v1/ticker/${this.state.coinPath}/`)
      .then((response) => {
        let res = response.data[0];
        this.accessExistingData(res, this);
      })
  }
  
  getInfo(res) {
    if(!res) {
      this.getCurrentInfoFromApi();
    } else {
      this.accessExistingData(res, this);
    }
  }

  setSignAndColor(percentage) {
    let sign, colorClass, iconClass;
    if(percentage === 0) {
      sign = ""; colorClass = ""; iconClass = "glyphicon glyphicon-transfer"
    } else if(percentage > 0) {
      sign = "+"; colorClass = "price-green"; iconClass = "glyphicon glyphicon-arrow-up";
    } else {
      sign = "-"; colorClass = "price-red"; iconClass = "glyphicon glyphicon-arrow-down";
    }

    return {
      sign: sign,
      colorClass: colorClass,
      iconClass: iconClass
    }
  }

  componentDidMount() {
    let res = this.props.location.info;
    this.getInfo(res);

    let ending = this.props.location.pathname.split('/').reverse()[0];
    this.setState({endingPath: ending})
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.location.endingPath != null? {endingPath: nextProps.location.endingPath} : {endingPath: ''};
  }

  render() {
    const { coinPath, symbol, name } = this.state 
    const changeStatus = this.setSignAndColor(this.state.currentData.changePercent);
    return (
      <div className="alt-data">
        <p onClick={() => window.location.replace(`/alt/${coinPath}`)} className='coin-title' id='alt-title'>{`${name} `}</p>
        <p onClick={() => window.location.replace(`/alt/${coinPath}`)} className='alt-ticker coin-title'>{`(${symbol})`}</p>
        <p className='coin-title current-date'> {this.state.currentData.date}</p>

        <hr/>

        <div className='coin-stats row'>

          <div className="coin-price col-sm-4">
            <p><b>{this.state.currentData.price}</b></p>
            <p className="alt-info">Delayed Data As of {this.state.currentData.time} PST</p>
          </div>

          <div className="col-sm-4">
            <p className={changeStatus.colorClass}> 
              <span className={changeStatus.iconClass + " " + changeStatus.colorClass}></span> 
              {" " + changeStatus.sign + Math.abs(this.state.currentData.percentageOfPrice) + " "} 
              <span style={{color: 'black'}}>/</span> 
              {" " + changeStatus.sign + Math.abs(this.state.currentData.changePercent) + "%"}
            </p>
            <p className="alt-info">Today's Change</p>
          </div>
        </div>
      </div>
    )
  }
}

export default AltcoinData;