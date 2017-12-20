import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppService from '../../services/appService';
import WebsocketService from '../../services/websocketService';

class ProjectorView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};

    this.AppService = new AppService();
    this.WebsocketService = new WebsocketService(true);

    // listen to renderApp socket event.
    this.WebsocketService.projectorViewInit(this.renderActiveApp, this);
    this.renderActiveApp = this.renderActiveApp.bind(this);
  }
  
  componentDidMount() {

  }
  
  renderActiveApp(data, scope) {
    console.log(data.app);
    /* eslint-disable */
    if (scope.state.component) {
      // Hier moeten we iets slims voor verzinnen.
      document.styleSheets[document.styleSheets.length - 1].disabled = true;
    }
    /* eslint enable */
    
    // Import the component
    const component = require(`../../apps/${data.app}`).default;

    scope.setState({ 
      component,
    });
  }
  
  render() {
    if (this.state.component) {
      return (
        <this.state.component />
      );
    } else {
      return <p>You haven't opened any app yet. Go to your mobile app and select your desired app.</p>;
    }
  }
}

export default ProjectorView;
