import React, { Component } from 'react';
import AppService from '../../services/appService';
import WebsocketService from '../../services/websocketService';

class ProjectorView extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.AppService = new AppService();
    this.WebsocketService = new WebsocketService(true);

    // listen to socket events.
    this.WebsocketService.projectorViewInit(this.handleProjectorCommands, this);
    this.renderActiveApp = this.renderActiveApp.bind(this);
  }
  
  componentDidMount() {

  }
  
  handleProjectorCommands(action, command, scope) {
    if (action === 'render') {
      scope.renderActiveApp(command, scope);
    } else if (action === 'action' && scope.state.component) {
      switch (command.key) {
        default: 
          console.log('Not a valid command.');
          break;
        case 'left':
          try { scope.state.component.onLeftKeyPress(); } catch (e) { console.log("Left key is not implemented."); }
          break;
        case 'right':
          try { scope.state.component.onRightKeyPress(); } catch (e) { console.log("Right key is not implemented."); }
          break;
        case 'up':
          try { scope.state.component.onUpKeyPress(); } catch (e) { console.log("Up key is not implemented."); }
          break;
        case 'down':
          try { scope.state.component.onDownKeyPress(); } catch (e) { console.log("Down key is not implemented."); }
          break;
        case 'enter':
          try { scope.state.component.onEnterKeyPress(); } catch (e) { console.log("Enter key is not implemented."); }
          break;
      }
    }
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
        <this.state.component ref={instance => { this.state.component = instance; }} />
      );
    } else {
      return <p>You haven't opened any app yet. Go to your mobile app and select your desired app.</p>;
    }
  }
}

export default ProjectorView;
