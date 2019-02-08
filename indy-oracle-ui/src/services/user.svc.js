import AuthService from "./auth.svc";
import store from "../store";

import axios from "axios";

class UserService {
    constructor() {
        this.authService = new AuthService();
        this.baseUrl = process.env.REACT_APP_API_BASE_URL;
    }

    getUsers = async (callback) => {
        const bearerToken = await this.authService.getBearerToken();

        axios.get(`${this.baseUrl}/1.0/users/`, { headers: { "Authorization": bearerToken } })
            .then(response => {
                callback(response.data);
            });
    };
}

export default UserService;