export default {
  API: "http://localhost:8000",
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
