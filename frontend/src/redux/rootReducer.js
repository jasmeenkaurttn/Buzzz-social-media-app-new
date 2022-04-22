import { combineReducers } from "redux";

import loginReducer from "./Login/loginReducer";
import postReducer from "./Post/postReducer";

const rootReducer = combineReducers({
  login:loginReducer,
  post:postReducer
});

const mainReducer = (state, action) => {
  if(action.type === 'LOGOUT_SUCCESS') state = undefined;
  return rootReducer(state, action)
}

export default mainReducer;