import React, { Component } from 'react';
import AppService from '../../services/appService';
import CategoryService from '../../services/categoryService';
import AppCard from '../app-card/AppCard';
import SearchBar from '../search/SearchBar';
import Dropdown from '../dropdown/Dropdown';

import './Overview.css';

class Overview extends Component {
  constructor(props) {
    super(props);
    
    this.AppService = new AppService();
    this.CategoryService = new CategoryService();
    this.state = {
      apps: [],
      categories: [],
      currentCategory: '',
      search: '',
    };
    
    this.searchApps = this.searchApps.bind(this);

    // Retrieve all apps and categories.
    this.getData();
  }
  
  async getData() {
    const apps = await this.AppService.getApps();
    const categories = await this.CategoryService.getCategories();

    this.setState({
      apps,
      categories,
    });
  }

  async searchApps(query, searchType) {
    // Check the origin of the search event.
    if (searchType === 'category') {
      this.state.currentCategory = query;
    } else {
      this.state.search = query;
    }

    const apps = await this.AppService.searchApps(this.state.search, this.state.currentCategory);

    this.setState({
      apps,
    });
  }
  
  renderApps(apps) {
    if (apps.length > 0) {
      return apps.map(app => (
        <AppCard key={app.id} app={app} />
      ));
    } else return <p className="no-search-result">No apps found.</p>;
  }
  
  render() {
    return (
      <div>
        <p className="App-intro">
          List of applications
        </p>
        <div className="app--overview-search">
          <SearchBar callBack={this.searchApps} />
          <Dropdown callBack={this.searchApps} items={this.state.categories} />
        </div>
        <div className="app--overview-content">
          {this.renderApps(this.state.apps)}
        </div>
      </div>
    );
  }
}

export default Overview;
