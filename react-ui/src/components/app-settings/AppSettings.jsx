import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppHeader from './AppHeader';
import AppService from '../../services/appService';
import './appsettings.css';

class AppSettings extends Component {
  constructor(props) {
    super(props);
    this.AppService = new AppService();
    
    this.state = {
      app: null,
    };
  }

  componentDidMount() {
    this.getAppById(this.props.match.params.id);
  }

  async getAppById(id) {
    const app = await this.AppService.getAppById(id);

    this.setState({
      app,
    });
  }

  render() {
    if (this.state.app) {
      return (
        <div>
          <div className="container">
            <AppHeader appId={this.props.match.params.id} name={this.state.app.name} />
          </div>
          <div className="container-light">
            <div className="container">
              <p>
                {this.state.app.description}
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
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
