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

  triggerSync() {
    return fetch(`${process.env.REACT_APP_PROJECTOR_API}/sync/start`, {
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
