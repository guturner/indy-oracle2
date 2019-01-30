import { SIGN_IN } from "./actionTypes";

export function signIn(payload) {
    return { type: SIGN_IN, payload }
};