import { API } from '../constants/urls';

export default class UserService {
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

//   fetchDataFromMockAPI = async () => {
//     try {
//       const response = await fetch(`${API.BASE_URL}/${API.ENDPOINT_USERS}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       return [];
//     }
//   };
}
