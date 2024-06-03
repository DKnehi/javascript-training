import { API } from '../constants/urls';

export default class UserService {
  //This function provides a convenient way to send GET requests to the API and process the returned results or catch errors if any.
  getAllUser = async () => {
    try {
      const res = await fetch(`${API.BASE_URL}/${API.ENDPOINT_USERS}`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      throw new Error(`Get data fail ${error.message}`);
    }
  };

  //This function provides a convenient way to authenticate users by matching email and password with data from the API.
  loginUser = async (email, password) => {
    try {
      const data = await this.getAllUser();
      const user = data.find(
        (user) => user.email === email && user.password === password
      );

      return user;
    } catch (error) {
      throw new Error('Failed to get user.');
    }
  };

  //This function provides a convenient way to add a new user to the system by sending a POST request to the API with the user's data.
  addUser = async (user) => {
    try {
      const response = await fetch(`${API.BASE_URL}/${API.ENDPOINT_USERS}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      throw new Error('Failed to add user.');
    }
  };
}
