import { getJwt } from "../actions";
import store from "../store";

import axios from "axios";

class AuthService {
    getJwt = () => {
        axios.post('https://indy-oracle.com/api/auth/', {},
            {
                auth: { username: process.env.REACT_APP_SERVICE_USERNAME, password: process.env.REACT_APP_SERVICE_PASSWORD } 
            })
            .then(response => {
                const jwtResponse = {
                    prefix: response.data.prefix,
                    token: response.data.token,
                    expiresIn: response.data.expiresIn,
                    requested: new Date().getTime()
                };
                store.dispatch(getJwt(jwtResponse));
            })
            .catch(error => {
                console.log(error);  
            });
    };

    isJwtExpired = (requested, expiresIn) => {

        if (requested === undefined || expiresIn === undefined) {
            return true;
        } else {
            const now = new Date().getTime();

            return now < requested + (expiresIn * 1000);
        }
    };

    getBearerToken = () => {
        const jwt = store.getState().jwt;

        if (jwt === '' || this.isJwtExpired(jwt.requested, jwt.expiresIn)) {
            this.getJwt();
        }

        return store.getState().jwt.prefix + store.getState().jwt.token;
    };
}

export default AuthService;