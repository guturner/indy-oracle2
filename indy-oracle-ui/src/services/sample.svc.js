import AuthService from "./auth.svc";
import store from "../store";

import axios from "axios";

class SampleService {
    constructor() {
        this.authService = new AuthService();
    }

    getGreeting = (callback) => {
        const bearerToken = this.authService.getBearerToken();

        axios.get('https://indy-oracle.com/api/1.0/user/', { headers: { "Authorization": bearerToken } })
            .then(response => {
                callback(response.data);
            });
    };
}

export default SampleService;