import React, { Component } from 'react';
import AppService from '../../services/appService';
import AppCard from '../app-card/AppCard';
import SearchBar from '../search/SearchBar';
import './Overview.css';

class Overview extends Component {
  constructor(props) {
    super(props);
    
    this.AppService = new AppService();
    this.state = {
      apps: [],
    };
    
    this.searchApps = this.searchApps.bind(this);

    // Retrieve all apps.
    this.getApps();
  }
  
  async getApps() {
    const apps = await this.AppService.getApps();
    
    this.setState({
      apps,
    });
  }

  async searchApps(query) {
    const apps = await this.AppService.searchApps(query);
    
    this.setState({
      apps,
    });
  }
  
  renderApps(apps) {
    if (apps.length > 0) {
      return apps.map(app => (
        <AppCard key={app.id} app={app} />
      ));
    } else return <p className="no-search-result">No apps found.</p>;
  }
  
  render() {
    return (
      <div>
        <p className="App-intro">
          List of applications
        </p>
        <div className="app--overview-search">
          <SearchBar callBack={this.searchApps} />
        </div>
        <div className="app--overview-content">
          {this.renderApps(this.state.apps)}
        </div>
      </div>
    );
  }
}

export default Overview;
