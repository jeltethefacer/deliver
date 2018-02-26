import axios from "axios";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAILED = "LOGIN_FAILED";
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
        } else {
          loginFailed();
        }
      });
  };
}

export function checkIfLoggedIn() {
  return function(dispatch) {
    return axios.get("/api/user").then(response => {
      if (response.status === 200) {
        dispatch(
          loginSucces(
            response.data.front_name,
            response.data.last_name,
            response.data.email
          )
        );
      } else {
        loginFailed();
      }
    });
  };
}
