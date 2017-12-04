import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
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
      selectedApp: null,
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

  onAppSelect = (id) => {
    this.props.history.push('/app/' + id +'/settings');
  }

  setActiveApp = (name) => {
    this.props.history.push('/app/' + name + '/view')
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
        <AppCard key={app._id} app={app} onAppSelect={this.onAppSelect} setActiveApp={this.setActiveApp} />
      ));
    } else return <p className="no-search-result">No apps found.</p>;
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <p className="App-intro col-md-12">
            List of applications
          </p>
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
