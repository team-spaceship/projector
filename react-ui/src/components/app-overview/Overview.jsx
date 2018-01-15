import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppService from '../../services/appService';
import AppCard from '../app-card/AppCard';
import SearchBar from '../search/SearchBar';
import './Overview.css';
import WebsocketService from '../../services/websocketService';
import UserService from "../../services/userService";

class Overview extends Component {
  constructor(props) {
    super(props);

    this.AppService = new AppService();
    this.UserService = new UserService();

    this.state = {
      apps: [],
      loggedIn: false,
      activeAppId: null,
      user: {},
      syncButtonDisabled: false,
      triggerSyncText: "Trigger Sync",
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

  componentDidMount() {
    this.checkUserLogin();
  }

  async getApps() {
    const apps = await this.AppService.getInstalledApps();

    this.setState({
      apps,
    });
  }

  setActiveApp(name, id) {
    this.setState({
      activeAppId: id,
    });
    this.WebsocketService.setActiveApp(name);

    this.props.history.push('/app/' + id + '/controls');
  }

  async searchApps(query) {
    const apps = await this.AppService.searchApps(query);

    this.setState({
      apps,
    });
  }

  async triggerSync() {
    if (this.state.user) {
      const oldSyncText = this.state.triggerSyncText;
      
      this.setState({
        syncButtonDisabled: true,
        triggerSyncText: "Syncing..",
      });

      const synced_apps = await this.AppService.triggerSync(this.state.user._id);

      this.setState({
        syncButtonDisabled: false,
        triggerSyncText: oldSyncText,
      });

      // @TODO: show user syncing is complete?
      console.log(synced_apps);
    }
  }

  async checkUserLogin() {
    const account_info = await this.UserService.getUserInfo();

    console.log(account_info);

    if (!account_info) {
      return;
    }

    this.setState({
      loggedIn: account_info.loggedIn,
      user: account_info.user,
    });
  }

  showProfile() {
    if (this.state.loggedIn) {
      return (
        <button className="btn btn-sync" onClick={this.triggerSync} disabled={this.state.syncButtonDisabled}>
          {this.state.triggerSyncText}
        </button>
      );
    } else {
      return (
        <a
          className="nav-link"
          href={process.env.REACT_APP_PROJECTOR_API + "/v1/sync"}
        >
          Login / Register
        </a>
      );
    }
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
            {this.showProfile()}
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
