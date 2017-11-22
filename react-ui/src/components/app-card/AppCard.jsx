import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { app } = this.props;

    return (
      <div key={app._id} className="app--card col-lg-3 col-md-6 col-sm-12">
        <div className="app--card-header">
          {/* Hier moet een application image gevuld worden. Deze is er volgens mij nog niet? Of is dit app_icon of app_banner? */}
          <img className="app--card-image" src="https://picsum.photos/280/200/?random" alt="app-logo" />
          <p className="app--card-description">{app.description}</p>
        </div>
        <div className="app--card-body">
          <h4>{app.name}</h4>
          {/* Is er een application type/category of iets in die richting? Die kan dan hier ingevuld worden. */}
          <span className="app--card-type">Application Type</span>
          <button className="button" href="#" onClick={() => { this.props.onAppSelect(this.props.app._id); }}>
            Settings
          </button>
        </div>
      </div>
    );
  }
}

AppCard.propTypes = {
  onAppSelect: PropTypes.func.isRequired,
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
