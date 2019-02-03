import { GET_JWT, SIGN_IN } from "./actionTypes";

export function getJwt(payload) {
    return { type: GET_JWT, payload }
};

export function signIn(payload) {
    return { type: SIGN_IN, payload }
};