import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import * as d3 from 'd3';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate() {
    this.renderGrid();
  }

  componentDidMount() {
    this.renderGrid();
  }

  renderGrid() {
    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.grid);
  }

  render() {
    var translate = "translate(0," + (this.props.h) + ")";

    return (
      <g className="y-grid" transform={this.props.gridType ==='x'?translate : ""}></g>
    );
  }

}

export default Grid;