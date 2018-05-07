
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import { convertToCurrency } from '../../Helpers';
import Toolbar from '../toolbarComponent/toolbar';
import Line from '../lineChartComponent/line';

class BitcoinData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBtcData: {
        intPrice: 0,
        changePercent: 0,
        percentageOfPrice: 0,
        date: null,
        time: null,
        price: 0,
      },
      janFirstPrice: 0,
      endingPath: null,
      pastData: null
    }

  }

  accessExistingData(res, context) {
    const _this = context;

    let price = "$" + convertToCurrency(res.price_usd);
    let pdt = new Date(Number(res.last_updated * 1000));
    let pst = moment.tz(pdt, 'America/Los_Angeles').format('h:mm a');
    let date = moment.tz(pdt, 'America/Los_Angeles').format('LL');
    let dayChange = parseFloat(res.percent_change_24h);
    let diff = ((Math.abs(dayChange) / 100) * convertToCurrency(res.price_usd)).toFixed(2);

    _this.setState({
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

  getCurrentInfoFromApi() {
    axios.get("https://api.coinmarketcap.com/v1/ticker/bitcoin/")
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

  getFirstDayPrice() {
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-01-01&end=2018-01-01")
      .then(response => {
        //closing price of btc on Jan 1st, 2018
        let res = response.data.bpi['2018-01-01']
        this.setState({ janFirstPrice: res })
      });
  }

  get30DayData = (endingPath) => {
    let dataHistorical = [];
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json")
      .then(response => {
        let dataSet = response.data.bpi;
        for(let key in dataSet) {

          let splitDate = key.split("-");
          let formattedDate = [splitDate[1], splitDate[2], splitDate[0]].join("-");
          dataHistorical.push( {day: formattedDate, price: dataSet[key].toFixed(2) } );
          
        }
        this.setState({ pastData: dataHistorical });
      });
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
    this.getFirstDayPrice();
    let res = this.props.location.info;
    this.getInfo(res);

    let ending = this.props.location.pathname.split('/').reverse()[0];
    if(ending === 'charts') {
      this.get30DayData();
    }
    this.setState({endingPath: ending})
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.location.endingPath != null? {endingPath: nextProps.location.endingPath} : null;
  }

  render() {
    const ending = this.props.location.pathname.split('/').reverse()[0];
    if(ending === 'charts') {
      this.get30DayData();
    }

    let changeStatus = this.setSignAndColor(this.state.currentBtcData.changePercent);
    let ytd = (((this.state.currentBtcData.intPrice - this.state.janFirstPrice) / this.state.janFirstPrice) * 100).toFixed(2);
    let ytdChangeStatus = this.setSignAndColor(ytd);

    return (
      <div className='bitcoin-data'>
        <p onClick={() => window.location.replace(`/currency/bitcoin/charts`)} className='coin-title' id='btc-title'>Bitcoin </p>
        <p onClick={() => window.location.replace(`/currency/bitcoin/charts`)} className='btc-ticker coin-title'>(BTC)</p>
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

        <Toolbar coin={this.props.coin} type="currency" />

        {this.state.pastData && this.state.endingPath === 'charts'? <Line dataSet={this.state.pastData}/> : <div></div>}

      </div>
    )
  }
}

BitcoinData.defaultProps = {
  coin: 'bitcoin'
}

export default BitcoinData;