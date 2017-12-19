import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppService from '../../services/appService';
import AppCard from '../app-card/AppCard';
import SearchBar from '../search/SearchBar';
import './Overview.css'; 
import WebsocketService from '../../services/websocketService';

class Overview extends Component {
  constructor(props) {
    super(props);
    
    this.AppService = new AppService();
    this.state = {
      apps: [],
      activeAppId: null,
    };
    
    this.searchApps = this.searchApps.bind(this);
    this.setActiveApp = this.setActiveApp.bind(this);
    this.triggerSync = this.triggerSync.bind(this);
    this.WebsocketService = new WebsocketService();

    // Retrieve all apps.
    this.getApps();

    this.onAppSelect = (id) => {
      this.props.history.push('/app/' + id + '/settings');
    };
  }
  
  async getApps() {
    const apps = await this.AppService.getInstalledApps();
    
    this.setState({
      apps,
    });
  }

  async triggerSync() {
    const synced_apps = await this.AppService.triggerSync();

    console.log(synced_apps);
  }

  setActiveApp(name, id) {
    this.setState({
      activeAppId: id,
    });
    this.WebsocketService.setActiveApp(name);
  }
  async searchApps(query) {
    const apps = await this.AppService.searchApps(query);
    
    this.setState({
      apps,
    });
  }
  
  renderApps(apps) {
    if (apps && apps.length > 0) {
      return apps.map(app => (
        <AppCard key={app._id} app={app} activeAppId={this.state.activeAppId} onAppSelect={this.onAppSelect} setActiveApp={this.setActiveApp} />
      ));
    } else return <p className="no-search-result">No apps found.</p>;
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <p className="App-intro col-md-7">
            List of applications
          </p>
          <div className="col-md-5">
            <button className="btn btn-sync" onClick={this.triggerSync} >
              Trigger Sync
            </button>
          </div>
          <div className="app--overview-search col-md-12">
            <SearchBar callBack={this.searchApps} />
          </div>
        </div>
        <div className="app--overview-content row">
          {this.renderApps(this.state.apps)}
        </div>
      </div>
    );
  }
}

const OverviewWithRouter = withRouter(Overview);
export default OverviewWithRouter;
