import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo">
          <Link to="/">Crypto-Track</Link>
        </div>

        <nav>
          <ul>
            <li className="first-nav-item">
              <Link to="/compare">Compare</Link>
            </li>
            <li>
              <Link to="/data">Coin-Data</Link>
            </li>
             <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li className="last-nav-item">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>

    );
  }
}

export default Header;
