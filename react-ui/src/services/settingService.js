import fetch from 'isomorphic-fetch';

export default class SettingService {
  getAppSettings(name) {
    return fetch(`${process.env.REACT_APP_PROJECTOR_API}/settings/${name}`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    }).then((response) => {
      return response.json();
    }).then((json) => {
      if (json.error === 404) {
        console.error("No settings were found.");
        return [];
      }
      return json;
    }).catch((error) => {
      console.error(error);
    });
  }

  postAppSettings(name, state) {
    return fetch(`${process.env.REACT_APP_PROJECTOR_API}/settings/` + name, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: "POST",
      body: JSON.stringify(state),
      mode: 'cors',
    }).then((response) => {
      return response.json();
    }).then((json) => {
      if (json.error === 404) {
        console.error("No apps were found.");
        return [];
      }
    
      return json;   
    }).catch((error) => {
      console.error(error);
    });
  }
}
