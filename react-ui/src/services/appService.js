export default class AppService {
  getApps() {
    console.log(process.env.APP_STORE_URL);
    // Poort nummer veranderen naar de poort waarop jij de node js server hebt draaien van het "App Store" project.
    return fetch(process.env.APP_STORE_URL + `/v1/apps`).then((response) => {
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
