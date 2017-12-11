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

  generateComponent(name) {
    return fetch(`${process.env.REACT_APP_STORE_API}/render/${name}`).then((response) => {
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
}
