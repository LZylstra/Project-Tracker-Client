export default {
  API: process.env.REACT_APP_API_ENDPOINT,
  //API: https://tranquil-mountain-91418.herokuapp.com/
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
