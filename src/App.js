import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import HomePage from'./components/pagesComponent/homePage';
import ComparePage from './components/pagesComponent/comparePage';
import PortfolioPage from './components/pagesComponent/portfolioPage';
import CoinDataPage from'./components/pagesComponent/coinDataPage';

//includes
import './Assets/css/default.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Route exact path='/' component={HomePage} />
          <Route exact path='/compare' component={ComparePage} />
          <Route exact path='/portfolio' component={PortfolioPage} />
          <Route exact path='/data' component={CoinDataPage} />

          <Footer />
        </div>
      </Router>
    );
  }
}

export default hot(module)(App)
