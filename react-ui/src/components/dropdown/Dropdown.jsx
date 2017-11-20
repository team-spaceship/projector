import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component { 
  constructor(props) {
    super(props);
    
    console.log(props.items);

    this.state = {
      text: '',
      items: props.items,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.items });  
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
    }, () => {
      this.props.callBack(this.state.text, 'category');
    });
  }

  generateOptions() {
    if (this.state.items.length > 0) {
      return this.state.items.map(item => (
        <option value={item.name}>{item.name}</option>
      ));
    } else return null;
  }

  render() {
    return (
      <select key="app-category-select" onChange={this.handleChange}>
        <option value="" selected>No category</option>
        {this.generateOptions()}
      </select>
    );
  }
}

Dropdown.propTypes = {
  callBack: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Dropdown;
