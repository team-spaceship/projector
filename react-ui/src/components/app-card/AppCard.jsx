import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppService from '../../services/appService';

class AppCard extends Component {
  constructor(props) {
    super(props);
    this.AppService = new AppService();
    this.state = {
      appState: 'Activate',
    };
  }

  onAppActivate() {
    this.props.setActiveApp(this.props.app.name);
    this.setState({
      appState: (this.state.appState === 'Activate') ? 'Activated' : 'Activate',
    });
  }

  async downloadApp(app) {
    const download_response = await this.AppService.download(app);

    return download_response;
  }

  render() {
    const { app } = this.props;

    function appDescription() {
      if (app.description.length > 140) {
        return app.description.slice(0, 140) + "...";
      } else {
        return app.description;
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
          <button className="button" href="#" onClick={() => { this.onAppActivate(); }}>
            {this.state.appState}
          </button>
        </div>
      </div>
    );
  }
}

AppCard.propTypes = {
  onAppSelect: PropTypes.func.isRequired,
  setActiveApp: PropTypes.func.isRequired,
  app: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    app_icon: PropTypes.string.isRequired,
    app_banner: PropTypes.string.isRequired,
    min_os_version: PropTypes.string.isRequired,
    version: PropTypes.string,    
  }).isRequired,
};

export default AppCard;
