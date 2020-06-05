import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import Dashboard from './dashboard/Dashboard';
import MapPage from './map/MapPage';
import QrCodePage from './qrCode/QrCodePage';

class App extends React.Component {
  render() {
    return (
      <HashRouter basename='/'>
      <Route path="/" exact component={LoginPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/navigation" exact component={MapPage} />
      <Route path="/generateQRCode" exact component={QrCodePage} />
  </HashRouter>
    );
  }
}

export default App;
