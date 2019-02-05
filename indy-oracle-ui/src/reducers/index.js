import { GET_JWT, SIGN_IN, SIGN_OUT } from "../actions/actionTypes";

const initialState = {
    jwt: '',
    user: ''
};

function rootReducer(state = initialState, action) {
    if (action.type === GET_JWT) {
        return { ...state, jwt: action.payload };
    }
    else if (action.type === SIGN_IN) {
        return { ...state, user: action.payload };
    }
    else if (action.type === SIGN_OUT) {
        return { ...state, user: '' };
    }

    return state;
};

export default rootReducer;