import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component { 
  constructor(props) {
    super(props);
    
    this.state = {
      text: '',
    };

    this.searchTimeOut = null;
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  handleKeyPress(e) { 
    // Save input value in state, to get the latest value.
    this.setState({
      text: e.target.value,
    });

    // Clear previous timeout.
    clearTimeout(this.searchTimeOut);

    // Start new timeout.
    this.searchTimeOut = setTimeout(() => {
      this.props.callBack(this.state.text);
    }, 500);
  }
  render() {
    return <input key="app-search-field" type="search" placeholder="Search for apps" onChange={this.handleKeyPress} />;
  }
}

SearchBar.propTypes = {
  callBack: PropTypes.func.isRequired,
};

export default SearchBar;
