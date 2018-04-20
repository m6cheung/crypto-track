import React, { Component } from 'react';
import * as d3 from 'd3';
import Axis from './axis';
import Grid from './grid';

class Line extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineData: this.props.lineData,
      width: this.props.width,
      dataSet: this.props.dataSet
    }
  }

  componentDidMount() {
  }

  render() {
    var data = this.state.dataSet;

    var margin = {top: 2, right: 50, bottom: 70, left: 50},
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
        return d.price + 100;
      })])
      .range([h, 0]);
 
    var line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.price))
      .curve(d3.curveBasis);
 
    var transform = 'translate(' + margin.left + ',' + margin.top + ')';
    console.log(transform);

    var yAxis = d3.axisLeft(y)
      .ticks(5);
 
    var xAxis = d3.axisBottom(x)
     .tickValues(data.map(function(d,i) {
      if(i % 4 === 0) return d.date;
     }).splice(1))
     .ticks(4);
     
    var yGrid = d3.axisLeft(y)
     .ticks(5)
     .tickSize(-w, 0, 0)
     .tickFormat("");

    return (
      <div className="svg-container">
        {data.length > 0?
          <svg className="svg-el" height={this.props.height} width={this.state.width}>
            <g transform={transform}>
              <Grid h={h} grid={yGrid} gridType="y" />
              <Axis h={h} axis={xAxis} axisType="x" />
              <Axis h={h} axis={yAxis} axisType="y" />
              <path className="line shadow" d={line(data)} strokeLinecap="round" />
            </g>
          </svg>
            :
          <h2>Loading Data...</h2>
        }
      </div>
    );
  }

}

Line.defaultProps = {
  width: 600,
  height: 400,
}

export default Line;