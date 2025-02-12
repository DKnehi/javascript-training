import { API } from '../constants/urls';

export default class UserService {
  /**
   * This function GET requests to the API and process the returned results or catch errors if any.
   * @returns {Promise<Array>} - A promise that resolves to an array of users.
   */
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

  /**
   * Retrieves a user by ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<Object>} - A promise that resolves to the user object.
   */
  getUserById = async (id) => {
    try {
      const response = await fetch(`${API.BASE_URL}/${API.ENDPOINT_USERS}/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      throw new Error('Failed to get user by ID.');
    }
  };

  /**
   * This function provides a convenient way to authenticate users by matching email and password with data from the API.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<Object|null>} - A promise that resolves to the user object if found, otherwise null.
   */
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

  /**
   * This function provides a convenient way to add a new user to the system by sending a POST request to the API with the user's data.
   * @param {Object} user - The user object to be added.
   * @returns {Promise<Object>} - A promise that resolves to the added user object.
   */
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

  /**
   * This function updates an existing user in the system by sending a PUT request to the API with the user's updated data.
   * @param {string} id - The ID of the user to be updated.
   * @param {Object} user - The updated user object.
   * @returns {Promise<Object>} - A promise that resolves to the updated user object.
   */
  updateUser = async (id, user) => {
    try {
      const response = await fetch(
        `${API.BASE_URL}/${API.ENDPOINT_USERS}/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      throw new Error('Failed to update user.');
    }
  };

  /**
   * Deletes a user by sending a DELETE request to the API.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} - A promise that resolves when the user is deleted.
   */
  deleteUser = async (id) => {
    try {
      const response = await fetch(
        `${API.BASE_URL}/${API.ENDPOINT_USERS}/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        return await response.json();
      }
    } catch (error) {
      throw new Error('Failed to delete user.');
    }
  };

  /**
   * Checks if an email exists in the user list, excluding a specific user ID if provided.
   * @param {string} email - The email to check for existence.
   * @param {string|null} excludeUserId - The user ID to exclude from the check.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the email exists.
   */
  isEmailExists = async (email, excludeUserId = null) => {
    try {
      const users = await this.getAllUser();
      const user = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.id !== excludeUserId);

      return !!user;
    } catch (error) {
      throw new Error('Failed to check if email exists.');
    }
  };
}
