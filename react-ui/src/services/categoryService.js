export default class CategoryService {
  getCategories() {
    return fetch(`${process.env.REACT_APP_STORE_API}/categories`).then((response) => {
      return response.json();
    }).then((json) => {
      if (json.error === 404) {
        console.error("No categories were found.");
        return [];
      }
      return json;
    }).catch((error) => {
      console.error(error);
    });
  }
}
