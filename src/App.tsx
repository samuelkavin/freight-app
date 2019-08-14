import React, { Component } from 'react';
import './App.scss';
import Shipment from './components/shipment/Shipment';
import ShipmentDetail from './components/shipmentDetail/ShipmentDetail';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <Router>
        <CssBaseline />
        <Header />
        <Route exact path="/" component={Shipment} />
        <Route exact path="/list" component={Shipment} />
        <Route exact path="/list/:id" component={ShipmentDetail} />
      </Router>
    );
  }
}

export default App;
