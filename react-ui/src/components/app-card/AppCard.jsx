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

    const latest_version = app.version;

    function appDescription() {
      if (latest_version.description.length > 140) {
        return latest_version.description.slice(0, 140) + "...";
      } else {
        return latest_version.description;
      }
    }

    return (
      <div key={app._id} className="app--card col-lg-3 col-md-6 col-sm-12">

        <div className="app--card-body">
          <img className="app--card-image" src={latest_version.banner_path || "https://cdn.dribbble.com/users/380268/screenshots/1187493/timelapse-2.gif"} alt="app-logo" />
          {/* Is er een application type/category of iets in die richting? Die kan dan hier ingevuld worden. */}
          <h4>{app.version.app.name}</h4>

          <span className="app--card-type">
            <a className="button-controls" href={'/app/' + latest_version.app._id + '/controls'}>
              Controls
            </a>
            <br />
            <br />
          </span>

          <button className="button1" href="#" onClick={() => { this.props.onAppSelect(latest_version.app._id); }}>
            Settings
          </button>

          <button className="button" href="#" onClick={() => { this.props.setActiveApp(latest_version.app.name, latest_version.app._id); }}>
            {this.props.activeAppId === this.props.app._id ? "Activated" : "Activate"}
          </button>
        </div>
      </div>
    );
  }
}

export default AppCard;
