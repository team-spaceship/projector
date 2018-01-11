import fetch from 'isomorphic-fetch';

export default class AppService {
  getApps() {
    return fetch(`${process.env.REACT_APP_STORE_API}/apps`).then((response) => {
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

  getAppView(appName) {
    return fetch(`${process.env.REACT_APP_PROJECTOR_API}/view/${appName}`).then((response) => {
      return response.json();
    }).then((json) => {
      if (json.error === 404) {
        console.error("Could not find app");
        return [];
      }

      if (!json.html) {
        console.error("No HTML code found");
      }
      console.log(json);
      return json;
    }).catch((error) => {
      console.error(error);
    });
  }  

  getInstalledApps() {
    return fetch(`${process.env.REACT_APP_STORE_API}/installed-apps`, {
      credentials: 'include',
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

  searchApps(query) {
    return fetch(`${process.env.REACT_APP_STORE_API}/apps?name=` + query).then((response) => {
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

  download(app) {
    return fetch(`${process.env.REACT_APP_PROJECTOR_API}/sync/start`, {
      headers: {
        'Content-Type': 'text/json',
      },
      method: "POST",
      body: JSON.stringify(app),
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

  getAppById(id) {
    return fetch(`${process.env.REACT_APP_STORE_API}/apps/` + id).then((response) => {
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

  triggerSync(id) {
    return fetch(`${process.env.REACT_APP_PROJECTOR_API}/sync/start?id=${id}`, {
      credentials: 'include',
      mode: 'cors',
    }).then((response) => {
      return response.json();
    }).then((json) => {
      if (json.error === 404) {
        throw new Error("Could not find app to sync.");
      }

      return json;
    }).catch((error) => {
      this.errorToJson(error);
    });
  }

  errorToJson(error) {
    return {
      success: false,
      error: error.message,
    };
  }  
}
