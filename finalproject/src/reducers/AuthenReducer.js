const AuthenReducers = (state = false, action)=> {
    if(action.type === "CHANGE_AUTHEN") {
        return action.value;
    }
    else {
        return state;
    }
}
export default AuthenReducers;