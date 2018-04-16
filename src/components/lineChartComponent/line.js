import React, { Component } from 'react';
import * as d3 from 'd3';

class Line extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineData: this.props.lineData,
      width: this.props.width,
      urlContainsChart: this.props.urlContainsChart
    }
  }

  render() {
    var data = [
      {day:'02-11-2016',count:180},
      {day:'02-12-2016',count:250},
      {day:'02-13-2016',count:150},
      {day:'02-14-2016',count:496},
      {day:'02-15-2016',count:140},
      {day:'02-16-2016',count:380},
      {day:'02-17-2016',count:100},
      {day:'02-18-2016',count:150}
    ];

    var margin = {top: 5, right: 50, bottom: 20, left: 50},
      w = this.state.width - (margin.left + margin.right),
      h = this.props.height - (margin.top + margin.bottom);
 
    var parseDate = d3.timeParse("%m-%d-%Y");

    data.forEach((d) => {
      d.date = parseDate(d.day);
    });

    var x = d3.scaleTime()
      .domain(d3.extent(data, (d) => {
        return d.date;
      }))
      .rangeRound([0, w]);
 
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => {
        return d.count + 100;
      })])
      .range([h, 0]);
 
    var line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.count))
      .curve(d3.curveBasis);
 
    var transform='translate(' + margin.left + ',' + margin.top + ')';

    return(
      <div>
        {this.state.urlContainsChart?
          <svg id={this.props.lineId} width={this.state.width} height={this.props.height}>
            <g transform={transform}>
              <path className="line shadow" d={line(data)} strokeLinecap="round" />
            </g>
          </svg>
            :
          <div></div>
        }
      </div>
    );
  }

}

Line.defaultProps = {
  width: 600,
  height: 300,
  lineId: 'v1_chart',
  urlContainsChart: -1
}

export default Line;