import { getJwt } from "../actions";
import store from "../store";

import axios from "axios";

class AuthService {
    getJwt = () => {
        return axios.post('https://indy-oracle.com/api/auth/', {},
            {
                auth: { username: process.env.REACT_APP_SERVICE_USERNAME, password: process.env.REACT_APP_SERVICE_PASSWORD } 
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

    getBearerTokenFromJwt = async () => {
        const result = await this.getJwt();

        const jwtResponse = {
            prefix: result.data.prefix,
            token: result.data.token,
            expiresIn: result.data.expiresIn,
            requested: new Date().getTime()
        };

        await store.dispatch(getJwt(jwtResponse));
        return `${jwtResponse.prefix}${jwtResponse.token}`;
    };

    getBearerToken = async () => {
        const jwt = store.getState().jwt;

        var bearerToken;
        if (jwt === '' || this.isJwtExpired(jwt.requested, jwt.expiresIn)) {
            bearerToken = await this.getBearerTokenFromJwt();
        } else {
            bearerToken = `${jwt.prefix}${jwt.token}`;
        }
 
        return bearerToken;
    };
}

export default AuthService;