import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Chart from '../lineChartComponent/chart';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: this.props.coin
    }
  }

  render() {
    return(
      <div className="row toolbar-container">
        <ul>
          <li className='first-tab'> 
            <Link 
              to={{ 
                pathname: `/currency/${this.state.coin.toLowerCase()}/charts`,
                endingPath: "charts"
              }}
            > 
              30-Day Chart 
            </Link> 
          </li>

          <li> 
            <Link to={ `/currency/${this.state.coin.toLowerCase()}/historical` }> Historical </Link> 
          </li>

          <li className='last-tab'> 
            <Link to={ `/currency/${this.state.coin.toLowerCase()}/news` }> News </Link> 
          </li> 
        </ul>
      </div>
    )
  }
}

Toolbar.defaultProps = {

}

export default Toolbar;