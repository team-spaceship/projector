import React, { Component } from 'react';
import SettingService from '../../services/settingService';

class SettingForm extends Component {
  constructor(props) {
    super(props);
    this.SettingService = new SettingService();

    this.state = {
      settings: { languages: 'eng', updates: 2 },
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
    const [name] = [target.name];
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const newsettings = Object.assign({}, this.state.settings);
    newsettings[name] = value;

    this.setState({
      settings: newsettings,
    });
  }

  handleSubmit(event) {
    this.postSettings();

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="languages">
          Language:
            <select id="languages" name="languages" value={this.state.settings.languages} onChange={this.handleInputChange}>
              <option value="nl">Dutch</option>
              <option value="eng">English</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
        </label>
        <label htmlFor="updates">
          Updates:
            <select id="updates" name="updates" value={this.state.settings.updates} onChange={this.handleInputChange}>
              <option value="0">Never</option>
              <option value="1">Always</option>
              <option value="2">On Request</option>
            </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SettingForm;
