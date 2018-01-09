export default class userService {
  getUserInfo() {
    return fetch(`${process.env.REACT_APP_STORE_API}/userInfo`, {
      credentials: 'include',
      mode: 'cors',
    }).then((response) => {
      return response.json();
    }).then((json) => {
      return json;
    }).catch((error) => {
      console.error(error);
    });
  }
}
