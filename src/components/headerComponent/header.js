import React, { Component } from 'react';

import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo">
          Crypto-Track
        </div>

        <nav>
          <ul>
            <li className="first-nav-item">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
             <li>
              <Link to="/data">Coin Data</Link>
            </li>
            <li className="last-nav-item">
              <Link to="/compare">Compare</Link>
            </li>
          </ul>
        </nav>
      </header>

    );
  }
}

export default Header;
