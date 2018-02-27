import { REGISTER_SUCCES, REGISTER_FAILED } from "../actions";

const register = (
  state = {
    registerStatus: 0
  },
  action
) => {
  switch (action.type) {
    case REGISTER_SUCCES:
      return Object.assign({}, state, {
        registerStatus: 1
      });
    case REGISTER_FAILED:
      return Object.assign({}, state, {
        registerStatus: 2
      });
    default:
      return state;
  }
};

export default register;
