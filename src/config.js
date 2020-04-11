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

  watchRoot: (options, observer) => {
    const htmlNode = document.getElementById("html");
    const targetNode = document.getElementById("root");
    if (targetNode.scrollHeight > window.innerHeight) {
      htmlNode.style.height = "auto";
    } else {
      htmlNode.style.height = "100%";
    }
  },
};
