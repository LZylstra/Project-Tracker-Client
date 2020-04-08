export default {
  // API: process.env.REACT_APP_API_ENDPOINT,
  API: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api",
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
