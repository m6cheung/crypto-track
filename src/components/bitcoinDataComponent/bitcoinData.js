import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone'
import { convertToCurrency } from '../../Helpers'
import Toolbar from '../toolbarComponent/toolbar'
import Line from '../lineChartComponent/line'

class BitcoinData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentBtcData: {
        intPrice: 0,
        changePercent: 0,
        percentageOfPrice: 0,
        date: null,
        time: null,
        price: 0,
      },
      janFirstPrice: 0,
      endingPath: null
    }
  }

  getCurrentInfo() {
    axios.get("https://api.coinmarketcap.com/v1/ticker/bitcoin/")
      .then((response) => {
        let res = response.data[0];
        let price = "$" + convertToCurrency(res.price_usd);
        let pdt = new Date(Number(res.last_updated * 1000));
        let pst = moment.tz(pdt, 'America/Los_Angeles').format('h:mm a');
        let date = moment.tz(pdt, 'America/Los_Angeles').format('LL');
        let dayChange = parseFloat(res.percent_change_24h);
        let diff = ((Math.abs(dayChange) / 100) * convertToCurrency(res.price_usd)).toFixed(2);
    
        this.setState({
          currentBtcData: {
            intPrice: res.price_usd,
            changePercent: dayChange,
            percentageOfPrice: diff,
            date: date,
            time: pst,
            price: price,
          }
        })
      })
  }

  getFirstDayPrice() {
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-01-01&end=2018-01-01")
      .then(response => {
        //closing price of btc on Jan 1st, 2018
        let res = response.data.bpi['2018-01-01']
        this.setState({ janFirstPrice: res })
      })
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

  // getCurrentInfoOnRefresh() {} -- abstraction wip

  componentDidMount() {
    this.getFirstDayPrice();
    let res = this.props.location.info;
    
    let ending = this.props.location.pathname.split('/').reverse()[0];
    this.setState({endingPath: ending})

    if(!res) {
      this.getCurrentInfo();
    } else {
      let price = "$" + convertToCurrency(res.price_usd);
      let pdt = new Date(Number(res.last_updated * 1000));
      let pst = moment.tz(pdt, 'America/Los_Angeles').format('h:mm a');
      let date = moment.tz(pdt, 'America/Los_Angeles').format('LL');
      let dayChange = parseFloat(res.percent_change_24h);
      let diff = ((Math.abs(dayChange) / 100) * convertToCurrency(res.price_usd)).toFixed(2);

      this.setState({
        currentBtcData: {
          intPrice: res.price_usd,
          changePercent: dayChange,
          percentageOfPrice: diff,
          date: date,
          time: pst,
          price: price,
        }
      })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.location.endingPath != null? {endingPath: nextProps.location.endingPath} : {endingPath: ''};
  }

  render() {
    let changeStatus = this.setSignAndColor(this.state.currentBtcData.changePercent);
    let ytd = (((this.state.currentBtcData.intPrice - this.state.janFirstPrice) / this.state.janFirstPrice) * 100).toFixed(2);
    let ytdChangeStatus = this.setSignAndColor(ytd);

    return (
      <div className='bitcoin-data'>
        <p className='coin-title' id='btc-title'>Bitcoin </p>
        <p className='btc-ticker coin-title'>(BTC)</p>
        <p className='coin-title current-date'> {this.state.currentBtcData.date}</p>

        <hr/>

        <div className='coin-stats row'>

          <div className="coin-price col-sm-4">
            <p><b>{this.state.currentBtcData.price}</b></p>
            <p className="btc-info">Delayed Data As of {this.state.currentBtcData.time} PST</p>
          </div>

          <div className="col-sm-4">
            <p className={changeStatus.colorClass}> 
              <span className={changeStatus.iconClass + " " + changeStatus.colorClass}></span> 
              {" " + changeStatus.sign + Math.abs(this.state.currentBtcData.percentageOfPrice) + " "} 
              <span style={{color: 'black'}}>/</span> 
              {" " + changeStatus.sign + Math.abs(this.state.currentBtcData.changePercent) + "%"}
            </p>
            <p className="btc-info">Today's Change</p>
          </div>

          <div className="col-sm-4">
            <p className={ytdChangeStatus.colorClass}>{ytdChangeStatus.sign + Math.abs(ytd) + "%"}</p>
            <p className="btc-info">Year-To-Date</p>
          </div>

        </div>

        <Toolbar coin={this.props.coin} />

        {this.state.endingPath === 'charts'? <Line /> : <div></div>}

      </div>
    )
  }
}

BitcoinData.defaultProps = {
  coin: 'bitcoin'
}

export default BitcoinData;