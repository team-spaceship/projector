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
}
