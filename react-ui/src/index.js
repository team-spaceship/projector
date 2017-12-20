import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import AppSettings from './components/app-settings/AppSettings';
import ProjectorView from './components/projector-view/ProjectorView';

import NoMatch from "./components/no-match/FourOFour";
// import registerServiceWorker from './registerServiceWorker';


/* eslint-disable */
ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/app/:id/settings" component={AppSettings} />
        <Route path="/projector" component={ProjectorView} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
, document.getElementById('root'));
/* eslint-enable */
// registerServiceWorker();
