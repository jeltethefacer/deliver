import axios from "axios";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REGISTER_SUCCES = "REGISTER_SUCCES";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const NO_LOGIN = "NO_LOGIN";
export const LOGOUT_SUCCES = "LOGOUT_SUCCES";
export function loginSucces(front_name, last_name, email) {
  return {
    type: LOGIN_SUCCES,
    front_name,
    last_name,
    email
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

export function login(email, password) {
  return function(dispatch) {
    return axios
      .post("/api/login", {
        email: email,
        password: password
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(
            loginSucces(
              response.data.front_name,
              response.data.last_name,
              response.data.email
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
      .post("/api/register", {
        frontName: frontName,
        lastName: lastName,
        email: email,
        password: password
      })
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
    return axios
      .get("/api/user")
      .then(response => {
        if (response.status === 200) {
          dispatch(
            loginSucces(
              response.data.front_name,
              response.data.last_name,
              response.data.email
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
    return axios.get("/api/logout").then(response => {
      dispatch(logoutSucces());
    });
  };
}
