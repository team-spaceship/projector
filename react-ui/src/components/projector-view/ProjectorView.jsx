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
    
    // Uncomment for test purpose
    // this.renderActiveApp({ app: "Snek" }, this);
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
          scope.triggerEvent('projectorOnLeftKey');
          break;
        case 'right':
          scope.triggerEvent('projectorOnRightKey');
          break;
        case 'up':
          scope.triggerEvent('projectorOnUpKey');
          break;
        case 'down':
          scope.triggerEvent('projectorOnDownKey');
          break;
        case 'enter':
          scope.triggerEvent('projectorOnEnterKey');
          break;
      }
    }
  }

  triggerEvent(eventName) {
    let event; // The custom event that will be created

    if (document.createEvent) {
      event = document.createEvent("HTMLEvents");
      event.initEvent(eventName, true, true);
    } else {
      event = document.createEventObject();
      event.eventType = eventName;
    }

    event.eventName = eventName;

    if (document.createEvent) {
      document.dispatchEvent(event);
    } else {
      document.fireEvent("on" + event.eventType, event);
    }
  }

  nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
  }

  evalScript(elem) {
    const data = (elem.text || elem.textContent || elem.innerHTML || elem.__html || "");

    /* eslint-disable */
    const head = document.getElementsByTagName("head")[0] || document.documentElement;
    const script = document.createElement("script");    
    
    try {
      eval(data);
    } catch(error) {
      console.log(error);
    }

    setTimeout(function () {
      if (typeof init == "function") {
        init();
      }
    }, 100);

    /* eslint-enable */

    script.type = "text/javascript";
    try {
      // doesn't work on ie...
      script.appendChild(document.createTextNode(data));
    } catch (e) {
      // IE has funky script nodes
      script.text = data;
    }

    /* eslint-enable */

    head.insertBefore(script, head.firstChild);
    head.removeChild(script);
  }

  renderActiveApp(data, scope) {
    this.AppService.getAppView(data.app).then((json) => {
      console.log(json);
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
    const html = renderHTML(this.state.component);

    Object.entries(html).forEach(([key, value]) => {
      if (value && value.type === "script") {
        console.log(key);
        this.evalScript(value.props.dangerouslySetInnerHTML);
      }
    });

    console.log(this.state.component);

    if (this.state.component) {
      return (
        <div>
          {renderHTML(this.state.component)}
        </div>
      );
    }
  }
}

export default ProjectorView;
