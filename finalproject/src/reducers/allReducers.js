import { combineReducers } from "redux";
import AuthenReducers from '../reducers/AuthenReducer'

 const AllReducers = combineReducers({
    AuthenReducers,
})

export default AllReducers;