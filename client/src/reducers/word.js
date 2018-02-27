import { LOGIN_SUCCES } from "../actions";
const user = (
  state = {
    front_name: "",
    last_name: "",
    email: "",
    loggedIn: false
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
    default:
      return state;
  }
};

export default user;
