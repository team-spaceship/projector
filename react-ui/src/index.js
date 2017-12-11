import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AppSettings from './components/app-settings/AppSettings';
import ProjectorView from './components/projector-view/ProjectorView';
// import registerServiceWorker from './registerServiceWorker';


/* eslint-disable */
ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/app/:id/settings" component={AppSettings} />
      <Route path="/projector/:id" component={ProjectorView} />
    </div>
  </Router>
, document.getElementById('root'));
/* eslint-enable */
// registerServiceWorker();
