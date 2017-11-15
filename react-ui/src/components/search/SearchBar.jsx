import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component { 
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.callBack(e.target.value);
    }
  }
  render() {
    return <input type="search" placeholder="Search for apps" onKeyPress={this.handleKeyPress} />;
  }
}

SearchBar.propTypes = {
  callBack: PropTypes.func.isRequired,
};

export default SearchBar;
