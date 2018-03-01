import { ITEMS_GET_FAILED, ITEMS_GET_SUCCES } from "../actions";

const items = (
  state = {
    itemsStatus: 0,
    items: []
  },
  action
) => {
  switch (action.type) {
    case ITEMS_GET_SUCCES:
      return Object.assign({}, state, {
        itemsStatus: 1,
        items: action.items
      });
    case ITEMS_GET_FAILED:
      return Object.assign({}, state, {
        itemsStatus: 2
      });
    default:
      return state;
  }
};

export default items;
