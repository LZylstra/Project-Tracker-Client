export default {
  API: process.env.REACT_APP_API_ENDPOINT,
  getOptions: (method) => {
    return JSON.parse(
      JSON.stringify({
        method: method.toUpperCase(),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${window.sessionStorage.jwt}`,
        },
      })
    );
  },

  checkForAuth: (history) => {
    if (!window.sessionStorage.jwt) {
      history.push("/Login");
    }
  },
};
<<<<<<< HEAD
=======

>>>>>>> f74cc0f3b0df6caef9f387d1b436989b14798f39
