const LoginReducer = ( state, action ) => {
    switch(action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload, // success return payload
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true, // update error
            };
        case "UPDATE_START":
            return {
                ...state,
                isFetching:true
            };
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,  // update payload
                isFetching: false,
                error: false,
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true, // set error
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};
  
export default LoginReducer;