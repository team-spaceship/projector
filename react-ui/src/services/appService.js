export default class AppService {
  getApps() {
    // ${process.env.REACT_APP_STORE_API} werkt nog steeds niet bij mij (Sven).  Undefined.
    return fetch(`http://localhost:3002/v1/apps`).then((response) => {
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
    // ${process.env.REACT_APP_STORE_API} werkt nog steeds niet bij mij (Sven).  Undefined.
    return fetch(`http://localhost:3002/v1/apps?name=` + query).then((response) => {
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
