import React, { Component } from 'react';
import AppService from '../../services/appService';
import AppCard from '../app-card/AppCard';

class Overview extends Component {
  constructor(props) {
    super(props);
    
    this.AppService = new AppService();
    this.state = {
      apps: [],
    };
    
    // Retrieve all apps.
    this.getApps();
  }
  
  async getApps() {
    const apps = await this.AppService.getApps();
    
    this.setState({
      apps,
    });
  }
  
  renderApps(apps) {
    if (apps.length > 0) {
      return apps.map(app => (
        <AppCard key={app.id} app={app} />
      ));
    } else return [];
  }
  
  render() {
    return (
      <div>
        <p className="App-intro">
          List of applications
        </p>
        <div className="App-body-text">
          {this.renderApps(this.state.apps)}
        </div>
      </div>
    );
  }
}

export default Overview;
