import { API } from '../constants/url';

export default class UserService {
  getAllUser = async () => {
    try {
      const res = await fetch(`${API.BASE_URL}/${API.ENDPOINT_USERS}`, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      throw new Error(`Get data fail ${error.message}`);
    }
  };

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
}


