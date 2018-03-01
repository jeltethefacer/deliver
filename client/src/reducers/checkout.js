import {
  ISSUERS_GET_SUCCES,
  ISSUERS_GET_FAILED,
  CREATE_ORDER_SUCCES,
  CREATE_ORDER_FAILED
} from "../actions";
const checkout = (
  state = { issuers: [], issuersStatus: 0, order: {}, orderStatus: 0 },
  action
) => {
  switch (action.type) {
    case ISSUERS_GET_SUCCES:
      return Object.assign({}, state, {
        issuers: action.data,
        issuersStatus: 1
      });
    case CREATE_ORDER_SUCCES:
      return Object.assign({}, state, {
        order: action.data,
        orderStatus: 1
      });
    case ISSUERS_GET_FAILED:
      return Object.assign({}, state, {
        issuersStatus: 2
      });
    case CREATE_ORDER_FAILED:
      return Object.assign({}, state, {
        orderStatus: 2
      });
    default:
      return state;
  }
};

export default checkout;
