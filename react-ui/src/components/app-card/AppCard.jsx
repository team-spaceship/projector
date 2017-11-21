import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppService from '../../services/appService';
class AppCard extends Component {
  constructor(props) {
    super(props);
    this.AppService = new AppService();
    this.state = {};
  }

  async downloadApp(app, event) {
    const download_response = await this.AppService.download(app);
    console.log(download_response);
    console.log(event);
  }
  
  render() {
    const { app } = this.props;
    return (
      <div key={app._id} className="app--card">
        <div className="app--card-header">
          <h3>{app.name}</h3>
        </div>
        <div className="app--card-body">
          <p>{app.description}</p>
          <button onClick={(e) => this.downloadApp(app, e)}>
            Download
          </button>
        </div>
      </div>
    );
  }
}

AppCard.propTypes = {
  app: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    app_icon: PropTypes.string.isRequired,
    app_banner: PropTypes.string.isRequired,
    min_os_version: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,    
  }).isRequired,
};

export default AppCard;
