import {
  LOGIN_SUCCES,
  LOGIN_FAILED,
  LOGOUT_SUCCES,
  NO_LOGIN
} from "../actions";
const user = (
  state = {
    front_name: "",
    last_name: "",
    email: "",
    loggedIn: false,
    loginStatus: 0
  },
  action
) => {
  switch (action.type) {
    case LOGIN_SUCCES:
      return Object.assign({}, state, {
        front_name: action.front_name,
        last_name: action.last_name,
        email: action.email,
        loggedIn: true
      });
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        loginStatus: 2
      });
    case LOGOUT_SUCCES:
      return Object.assign({}, state, {
        front_name: "",
        last_name: "",
        email: "",
        loggedIn: false,
        loginStatus: 0
      });
    case NO_LOGIN:
      return Object.assign({}, state, {
        loggedIn: false
      });
    default:
      return state;
  }
};

export default user;
