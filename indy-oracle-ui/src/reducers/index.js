import { SIGN_IN } from "../actions/actionTypes";

const initialState = {
    user: ''
};

function rootReducer(state = initialState, action) {
    if (action.type === SIGN_IN) {
        return Object.assign( {}, state, { user: action.payload } );
    }

    return state;
};

export default rootReducer;