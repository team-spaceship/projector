import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AppSettings from './components/app-settings/AppSettings';
import ActiveApp from './components/active-app/ActiveApp'
// import registerServiceWorker from './registerServiceWorker';


/* eslint-disable */
ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/app/:id/settings" component={AppSettings} />
      <Route path="/app/:name/view" component={ActiveApp} />
    </div>
  </Router>
, document.getElementById('root'));
/* eslint-enable */
// registerServiceWorker();
