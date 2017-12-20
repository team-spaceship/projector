import React, { Component } from 'react';
import AppService from '../../services/appService';

class AppCard extends Component {
  constructor(props) {
    super(props);
    this.AppService = new AppService();
    this.state = {};
  }

  async downloadApp(app) {
    const download_response = await this.AppService.download(app);

    return download_response;
  }

  render() {
    const { app } = this.props;

    const latest_version = app.versions[app.versions.length - 1];

    function appDescription() {
      if (latest_version.description.length > 140) {
        return latest_version.description.slice(0, 140) + "...";
      } else {
        return latest_version.description;
      }
    }

    return (
      <div key={app._id} className="app--card col-lg-3 col-md-6 col-sm-12">
        <div className="app--card-header"> 
          <img className="app--card-image" src="https://picsum.photos/280/200/?random" alt="app-logo" />
          <p className="app--card-description">
            {appDescription()}
          </p>
        </div>
        <div className="app--card-body">
          <h4>{app.name}</h4>
          {/* Is er een application type/category of iets in die richting? Die kan dan hier ingevuld worden. */}
          <span className="app--card-type">Application Type</span>

          <button className="button" href="#" onClick={() => { this.props.onAppSelect(this.props.app._id); }}>
            Settings
          </button>
          <button className="button" href="#" onClick={() => { this.props.setActiveApp(this.props.app.name, this.props.app._id); }}>
            { this.props.activeAppId === this.props.app._id ? "Activated" : "Activate" }
          </button>
        </div>
      </div>
    );
  }
}

export default AppCard;
