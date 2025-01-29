import { baseURL } from "../../helpers/api-config";
import NetworkManager from "../../helpers/network-manager";
import UpdateUserModel from "../../models/user/update-user-model";
import CreateUserModel from "../../models/user/create-user-model";

class UserService {
  constructor() {
    this.URL = `${baseURL}/user`;
  }

  // Crear usuario (POST /user)
  async createUser(user) {
    const newURL = `${this.URL}`;
    const userData = new CreateUserModel(user.username, user.email);
    try {
      const data = await NetworkManager.requestWithBody(newURL, "POST", userData);
      return data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  // Buscar usuario por Email (GET)
  async getUserByEmail(email) {
    const emailEncoded = encodeURIComponent(email);
    const newURL = `${this.URL}/email?email=${emailEncoded}`;

    try {
      const data = await NetworkManager.request(newURL, "GET");
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener usuario por ID (GET)
  async getUserByID(userID) {
    const newURL = `${this.URL}/${userID}`;

    try {
      const data = await NetworkManager.request(newURL, "GET");
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar usuario (PATCH)
  async updateUser(userID, user) {
    const newURL = `${this.URL}/${userID}`;
    const userData = new UpdateUserModel(user.username, user.name, user.email, user.mobile);
    try {
      const data = await NetworkManager.requestWithBody(newURL, "PATCH", userData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar usuario (DELETE)
  async deleteUser(userID) {
    const newURL = `${this.URL}/${userID}`;

    try {
      await NetworkManager.request(newURL, "DELETE");
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
