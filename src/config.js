export default {
  // API: "https://tranquil-mountain-91418.herokuapp.com",
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

  watchRoot: (options, observer) => {
    const htmlNode = document.getElementById("html");
    const projectList = document.getElementById("project-list");
    const taskList = document.getElementById("task-list");
    const formContainer = document.getElementById("form-container");
    const x = (window.innerHeight - 25) * 0.885;
    if (!!projectList && projectList.scrollHeight > x) {
      htmlNode.style.height = "auto";
    } else if (!!taskList && taskList.scrollHeight > x) {
      htmlNode.style.height = "auto";
    } else if (!!formContainer && formContainer.scrollHeight > x) {
      htmlNode.style.height = "auto";
    } else {
      htmlNode.style.height = "100%";
    }
  },
};
