import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppHeader from './AppHeader';
import './appsettings.css';

class AppSettings extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="container">
          <AppHeader appId={this.props.match.params.id} />
        </div>
        <div className="container-light">
          <div className="container">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore modi quo molestiae enim sed perspiciatis facilis aliquam harum rem laudantium maxime corrupti iusto voluptatum voluptates perferendis, quisquam nemo eveniet!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

AppSettings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,   
  }).isRequired,
};

export default AppSettings;
