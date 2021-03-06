import React, { Component } from 'react';
import SettingService from '../../services/settingService';

class SettingForm extends Component {
  constructor(props) {
    super(props);
    this.SettingService = new SettingService();

    this.state = {
      settings: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getSettings();
  }

  async getSettings() {
    const settings = await this.SettingService.getAppSettings(this.props.name);
    
    if (settings) {
      this.setState({
        settings,
      });
    }
  }

  async postSettings() {
    await this.SettingService.postAppSettings(this.props.name, this.state.settings);
  }

  handleInputChange(event) {
    const [target] = [event.target];
    const id = [target.id];
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const newsettings = Object.assign([], this.state.settings);
    newsettings[id].answer = value;

    this.setState({
      settings: newsettings,
    });
  }

  handleSubmit(event) {
    this.postSettings();

    event.preventDefault();
  }

  renderFormGroups() {
    const data = this.state.settings;

    if (!data) {
      return console.log("No settings found");
    }

    return data.map(group => {
      if (group.htmlControlType === "select") {
        return (
          <div className="form-group" key={group.indexId}>
            <label htmlFor={group.abrvIndexName} className={"col-sm-2 " + group.cssClassName}>
              {group.indexDesc}
            </label>

            <div className="col-sm-8">
              <select className="form-control" name={group.abrvIndexName} value={group.answer} id={group.indexId} onChange={this.handleInputChange}>
                {group.options.map((language, i) => {
                  return <option key={i} value={language}>{language}</option>;
                 })}
              </select>
            </div>
          </div>
        );
      } else {
        return (
          <div className="form-group" key={group.indexId}>
            <label htmlFor={group.abrvIndexName} className={"col-sm-2 " + group.cssClassName}>
              {group.indexDesc}
            </label>
      
            <div className="col-sm-8">
              <input type="text" className="form-control" name={group.abrvIndexName} id={group.indexId} onChange={this.handleInputChange} placeholder="" />
            </div>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderFormGroups()}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SettingForm;
