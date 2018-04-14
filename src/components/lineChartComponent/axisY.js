// import React, { Component } from 'react';
// import * as d3 from 'd3';

// class AxisY extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     var data = this.props.data;
//     var margin = this.props.margin;
//     var height = this.props.height - margin.top - margin.bottom;
//     var width = this.props.width  - margin.left - margin.right;

//     var y = d3.scale.linear()
//     .range([height, 0]);

//     var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left");

//     y.domain(d3.extent(data, function(d) { return d.close; }));

//     d3.select(".y").call(yAxis)
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 6)
//     .attr("dy", ".71em")
//     .style("text-anchor", "end")
//     .text("Price ($)");

//     return(
//       <g className="y axis"></g>
//     );
//   }

// }

// export default AxisY;