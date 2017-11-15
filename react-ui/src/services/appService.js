export default class AppService {
  getApps() {
    // console.log(process.env.MONGODB_URI); env variabelen zijn allemaal undefined.
    // Poort nummer veranderen naar de poort waarop jij de node js server hebt draaien van het "App Store" project.
    return fetch(`http://localhost:3002/v1/apps`).then((response) => {
      return response.json();
    }).then((json) => {
      if (json.error === 404) {
        console.error("No apps were found.");
        return [];
      }
    
      console.log(json);
      return json;   
    }).catch((error) => {
      console.error(error);
    });
  }

  searchApps(query) {
    // console.log(process.env.MONGODB_URI); env variabelen zijn allemaal undefined.
    // Poort nummer veranderen naar de poort waarop jij de node js server hebt draaien van het "App Store" project.
    return fetch(`http://localhost:3002/v1/apps?name=` + query).then((response) => {
      return response.json();
    }).then((json) => {
      if (json.error === 404) {
        console.error("No apps were found.");
        return [];
      }
    
      console.log(json);
      return json;   
    }).catch((error) => {
      console.error(error);
    });
  }
}
