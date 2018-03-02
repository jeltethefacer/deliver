import { GET_ORDERS_SUCCES, GET_ORDERS_FAILED } from "../actions";

const orders = (
  state = {
    ordersStatus: 0,
    orders: []
  },
  action
) => {
  switch (action.type) {
    case GET_ORDERS_SUCCES:
      return Object.assign({}, state, {
        ordersStatus: 1,
        orders: action.orders
      });
    case GET_ORDERS_FAILED:
      return Object.assign({}, state, {
        ordersStatus: 2
      });
    default:
      return state;
  }
};

export default orders;
