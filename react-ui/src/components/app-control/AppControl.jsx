import React, { Component } from 'react';
import AppService from '../../services/appService';
import WebsocketService from '../../services/websocketService';
import './AppControl.css';

class AppControl extends Component {
  constructor(props) {
    super(props);
    this.AppService = new AppService();
    this.WebsocketService = new WebsocketService();

    this.state = {
      app: null,
    };

    this.homepageRedirect = this.homepageRedirect.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getAppById(this.props.match.params.id);      
    }
  }

  onKeyDown(input) {
    this.WebsocketService.commandProjector(input);  
  }

  async getAppById(id) {
    const app = await this.AppService.getAppById(id);

    this.setState({
      app,
    });
  }

  homepageRedirect() {
    this.props.history.push('/');    
  }

  render() {
    return (
      <div>
        <div className="container">
          <button onClick={this.homepageRedirect}>Back</button>
          <button onClick={() => this.onKeyDown('refresh')} >Refresh Projector View</button>
        </div>
        <div id="control-container">
          <button className="left--key" onClick={() => this.onKeyDown('left')} >Left</button>
          <button className="right--key" onClick={() => this.onKeyDown('right')} >Right</button>
          <button className="up--key" onClick={() => this.onKeyDown('up')} >Up</button>
          <button className="down--key" onClick={() => this.onKeyDown('down')} >Down</button>
          <button className="enter--key" onClick={() => this.onKeyDown('enter')} >OK</button>
        </div>
      </div>
    );
  }
}

export default AppControl;
