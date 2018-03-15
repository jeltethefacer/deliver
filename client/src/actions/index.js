import axios from "axios";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const NO_LOGIN = "NO_LOGIN";
export const AWAITING_LOGIN = "AWAITING_LOGIN";
export const LOGOUT_SUCCES = "LOGOUT_SUCCES";
export const REGISTER_SUCCES = "REGISTER_SUCCES";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const ITEMS_GET_SUCCES = "ITEMS_GET_SUCCES";
export const ITEMS_GET_FAILED = "ITEMS_GET_FAILED";
export const ADD_ITEM_BASKET = "ADD_ITEM_BASKET";
export const ISSUERS_GET_SUCCES = "ISSUERS_GET_SUCCES";
export const ISSUERS_GET_FAILED = "ISSUERS_GET_FAILED";
export const CREATE_ORDER_SUCCES = "CREATE_ORDER_SUCCES";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";
export const GET_ORDERS_FAILED = "GET_ORDERS_FAILED";
export const GET_ORDERS_SUCCES = "GET_ORDERS_SUCCES";
export const CHANGE_PAGE = "CHANGE_PAGE";

export function loginSucces(user_id, front_name, last_name, email, role) {
  return {
    type: LOGIN_SUCCES,
    user_id,
    front_name,
    last_name,
    email,
    role
  };
}

export function loginFailed() {
  return {
    type: LOGIN_FAILED
  };
}

export function noLogin() {
  return {
    type: NO_LOGIN
  };
}

export function awaitingLogin() {
  return {
    type: AWAITING_LOGIN
  };
}

export function registerSucces() {
  return {
    type: REGISTER_SUCCES
  };
}

export function registerFailed() {
  return {
    type: REGISTER_FAILED
  };
}

export function logoutSucces() {
  return {
    type: LOGOUT_SUCCES
  };
}

export function itemsGetSucces(items) {
  return {
    type: ITEMS_GET_SUCCES,
    items
  };
}

export function itemsGetFailed() {
  return {
    type: ITEMS_GET_FAILED
  };
}

export function addItemBasket(id, price) {
  return {
    type: ADD_ITEM_BASKET,
    id,
    price
  };
}

export function issuersGetSucces(data) {
  return {
    type: ISSUERS_GET_SUCCES,
    data
  };
}

export function issuersGetFailed() {
  return {
    type: ISSUERS_GET_FAILED
  };
}

export function createOrderSucces(data) {
  return {
    type: CREATE_ORDER_SUCCES,
    data
  };
}

export function CreateOrderFailed() {
  return {
    type: CREATE_ORDER_FAILED
  };
}

export function getOrdersFailed() {
  return {
    type: GET_ORDERS_FAILED
  };
}

export function getOrdersSucces(orders) {
  return {
    type: GET_ORDERS_SUCCES,
    orders
  };
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page
  };
}

export function login(email, password) {
  return function(dispatch) {
    dispatch(awaitingLogin());
    return axios
      .post(
        "/api/login",
        {
          email: email,
          password: password
        },
        {
          auth: {
            username: "geheim",
            password: ""
          }
        }
      )
      .then(response => {
        if (response.status === 200) {
          dispatch(
            loginSucces(
              response.data.user_id,
              response.data.front_name,
              response.data.last_name,
              response.data.email,
              response.data.role
            )
          );
        }
      })
      .catch(error => dispatch(loginFailed()));
  };
}

export function register(frontName, lastName, email, password) {
  return function(dispatch) {
    return axios
      .post(
        "/api/register",
        {
          frontName: frontName,
          lastName: lastName,
          email: email,
          password: password
        },
        {
          auth: {
            username: "geheim",
            password: ""
          }
        }
      )
      .then(response => {
        if (response.status === 200) {
          dispatch(registerSucces());
        } else {
          dispatch(registerFailed());
        }
      })
      .catch(error => {
        dispatch(registerFailed());
      });
  };
}

export function checkIfLoggedIn() {
  return function(dispatch) {
    dispatch(awaitingLogin());
    return axios
      .get("/api/user", {
        auth: {
          username: "geheim",
          password: ""
        }
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(
            loginSucces(
              response.data.user_id,
              response.data.front_name,
              response.data.last_name,
              response.data.email,
              response.data.role
            )
          );
        }
      })
      .catch(error => {
        dispatch(noLogin());
      });
  };
}

export function logout() {
  return function(dispatch) {
    return axios
      .get("/api/logout", {
        auth: {
          username: "geheim",
          password: ""
        }
      })
      .then(response => {
        dispatch(logoutSucces());
      });
  };
}

export function getItems() {
  return function(dispatch) {
    return axios
      .get("/api/items", {
        auth: {
          username: "geheim",
          password: ""
        }
      })
      .then(response => {
        dispatch(itemsGetSucces(response.data.items));
      })
      .catch(error => {
        dispatch(itemsGetFailed());
      });
  };
}

export function getIssuers() {
  return function(dispatch) {
    return axios
      .get("/api/issuers", {
        auth: {
          username: "geheim"
        }
      })
      .then(response => {
        dispatch(issuersGetSucces(response.data));
      })
      .catch(error => {
        dispatch(issuersGetFailed());
      });
  };
}

export function createOrder(amount, issuer, user_id, basket) {
  return function(dispatch) {
    return axios
      .post(
        "/api/payment",
        {
          amount: amount,
          issuer: issuer,
          user_id: user_id,
          basket: basket
        },
        {
          auth: {
            username: "geheim"
          }
        }
      )
      .then(response => {
        dispatch(createOrderSucces(response.data));
      })
      .catch(error => {
        dispatch(CreateOrderFailed());
      });
  };
}

export function getOrders(user_id) {
  return function(dispatch) {
    return axios
      .get("/api/orders", {
        params: {
          user_id: user_id
        },
        auth: {
          username: "geheim"
        }
      })
      .then(response => {
        dispatch(getOrdersSucces(response.data));
      })
      .catch(error => {
        dispatch(getOrdersFailed());
      });
  };
}
