// import React, { Componenet } from 'react';
// import * as d3 from 'd3';

// class Line extends React.Component {
//     render() {
//         var data = this.props.data;
//         var margin = this.props.margin;
//         var height = this.props.height - margin.top - margin.bottom;
//         var width = this.props.width  - margin.left - margin.right;

//         var x = d3.time.scale()
//         .range([0, width]);

//         var y = d3.scale.linear()
//         .range([height, 0]);

//         var line = d3.svg.line()
//         .x(function(d) { return x(d.date); })
//         .y(function(d) { return y(d.close); });

//         data.forEach(function(d) {
//             x.domain(d3.extent(data, function(d) { return d.date; }));
//             y.domain(d3.extent(data, function(d) { return d.close; }));
//         });

//         var newline = line(data);
//         console.log(newline);

//         return(
//             <path className="line" d={newline}></path>
//         );
//     }

// }

// export default Line;