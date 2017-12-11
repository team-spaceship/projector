import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppService from '../../services/appService';

class ProjectorView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      component: null,
    };

    this.AppService = new AppService();
  }
  
  componentDidMount() {
    this.renderActiveApp(this.props.match.params.id);
  }
  
  renderActiveApp(name) {
    const html = this.AppService.generateComponent(name);
    console.log(html);
    this.setState({
      component: html,
    });
    console.log(html);
  }
  
  render() {
    if (this.state.component) {
      return (
        <div>Hoi</div>
      );
    } else {
      return null;
    }
  }
}

ProjectorView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,   
  }).isRequired,
};

export default ProjectorView;
