import React, { Component } from 'react';

class ChartData extends Component {
  
  render() {
    return (
      <div>
        <ul>
          {this.props.data.map((day, index) => {
            return (
              <li key={index}>{day.date + '---> ' + day.price}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default ChartData;
