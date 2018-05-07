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
import WatchListPage from './components/pagesComponent/watchListPage';
import RegisterPage from'./components/pagesComponent/registerPage';
import BitcoinData from './components/bitcoinDataComponent/bitcoinData';
import AltcoinData from './components/altcoinDataComponent/altcoinData';


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
          <Route exact path='/watch' component={WatchListPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route path='/currency/bitcoin' component={BitcoinData} />
          <Route path='/alt/:altcoin' component={AltcoinData} />

          <Footer />
        </div>
      </Router>
    );
  }
}

export default hot(module)(App)
