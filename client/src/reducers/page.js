import { CHANGE_PAGE } from "../actions";

const page = (
  state = {
    currentPage: "/"
  },
  action
) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return Object.assign({}, state, {
        currentPage: action.page
      });
    default:
      return state;
  }
};

export default page;
