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
      <div key={app._id} className="app--card">
        <div className="app--card-header">
          <h3>{app.name}</h3>
        </div>
        <div className="app--card-body">
          <p>{app.description}</p>
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
