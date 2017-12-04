import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ClockApp from '../../../../apps/Klok/index';

class AppSettings extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ActiveApp: 'ClockApp',
    };
  }
  
  componentDidMount() {
    this.setActiveApp(this.props.match.params.name);
  }
  
  setActiveApp(name) {
    // this.setState({
    //   ClockApp: ,
    // });
  }
  
  render() {
    if (this.state.ActiveApp) {
      return (
        <div>Hello</div>
      );
    } else {
      return null;
    }
  }
}

AppSettings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,   
  }).isRequired,
};

export default AppSettings;
