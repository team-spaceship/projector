import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import AppService from '../../services/appService';
import WebsocketService from '../../services/websocketService';

class ProjectorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: "<h1 style='text-align: center; padding: 100px;'>Please select an app</h1>",
    };

    this.AppService = new AppService();
    this.WebsocketService = new WebsocketService(true);

    // listen to socket events.
    this.WebsocketService.projectorViewInit(this.handleProjectorCommands, this);
    this.renderActiveApp = this.renderActiveApp.bind(this);
    
    this.renderActiveApp("Clock", this);
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
    this.AppService.getAppView(data.app).then( (json) => {
      if (json && json.html) {
        scope.setState({
          component: json.html,
        });
      } else {
        scope.setState({
          component: "<h1 style='text-align: center; padding: 100px;'>App not found</h1>",
        });        
      }
    });
  }
  
  render() {
    console.log(this.state.component);
    
    if (this.state.component) {
      return (<div>
          {renderHTML(this.state.component)}
        </div>
      );
    }
  }
}

export default ProjectorView;
