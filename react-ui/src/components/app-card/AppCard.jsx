import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppService from '../../services/appService';

class AppCard extends Component {
  constructor(props) {
    super(props);
    this.AppService = new AppService();
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }

  async downloadApp(app, event) {
    const download_response = await this.AppService.download(app);
    console.log(download_response);
    console.log(event);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }
  
  render() {
    const { app } = this.props;

    return (
      <div key={app._id} className="app--card">
        <div className="app--card-header">
          {/* Hier moet een application image gevuld worden. Deze is er volgens mij nog niet? Of is dit app_icon of app_banner? */}
          <img className="app--card-image" src="https://picsum.photos/280/200/?random" alt="app-logo"/>
          <p className="app--card-description">{app.description}</p>
        </div>
        <div className="app--card-body">
          <h4>{app.name}</h4>
          {/* Is er een application type/category of iets in die richting? Die kan dan hier ingevuld worden. */}
          <span className="app--card-type">Application Type</span>

          <button className={"button " + (this.state.isToggleOn ? 'pink' : 'blue')} onClick={(e) => this.downloadApp(app, e)}>
            {this.state.isToggleOn ? 'Install' : 'Installing'}
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
