// import React, { Component } from 'react';
// import * as d3 from 'd3';

// class AxisX extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     var data = this.props.data;
//     var margin = this.props.margin;
//     var height = this.props.height - margin.top - margin.bottom;
//     var width = this.props.width  - margin.left - margin.right;

//     var x = d3.time.scale()
//     .range([0, width]);

//     var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom");

//     x.domain(d3.extent(data, function(d) { return d.date; }));

//     d3.select(".x").attr("transform", "translate(0," + height + ")").call(xAxis);

//     return(
//       <g className="x axis"></g>
//     );
//   }
// }

// export default AxisX;