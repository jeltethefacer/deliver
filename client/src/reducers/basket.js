import { ADD_ITEM_BASKET } from "../actions";
import _ from "lodash";
const basket = (state = { items: [], totalPrice: 0 }, action) => {
  switch (action.type) {
    case ADD_ITEM_BASKET:
      var tempState = _.clone(state.items);
      var alreadyInList = false;
      // eslint-disable-next-line
      tempState.map(itemInBasket => {
        if (itemInBasket.id === action.id) {
          alreadyInList = true;
          return Object.assign({}, itemInBasket, {
            amount: itemInBasket.amount++
          });
        }
      });

      if (!alreadyInList) {
        tempState = [...tempState, { id: action.id, amount: 1 }];
      }
      console.log(state.totalPrice, action.price, action.id);
      return Object.assign({}, state, {
        items: tempState,
        totalPrice: state.totalPrice + action.price
      });

    default:
      return state;
  }
};

export default basket;
