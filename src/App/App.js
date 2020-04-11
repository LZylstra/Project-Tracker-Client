import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import ApiContext from "../ApiContext";
import LandingPage from "../LandingPage/LandingPage";
import Home from "../Home/Home";
import Header from "../Header/Header";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import ProjectPage from "../ProjectPage/ProjectPage";
import AddProject from "../AddProject/AddProject";
import CompletedPage from "../CompletedPage/CompletedPage";
import AddTask from "../AddTask/AddTask";
import config from "../config";
import PageNotFound from "../PageNotFound/PageNotFound";
import PrivateRoute from "../utils/PrivateRoute";
import PublicOnlyRoute from "../utils/PublicOnlyRoute";

class App extends Component {
  //add persistance to state by storing state in sessionStorage
  constructor(props) {
    super(props);
    const initialState = {
      tasks: [],
      projects: [],
      employees: [],
      loggedIn: !!window.sessionStorage.jwt,
      userId: null,
      isAdmin: false,
      companyId: null,
      isMobile: window.innerWidth < 1000,
      apiError: "",
      showPopUp: false,
      selectedProjects: [],
      selectedTasks: [],
    };
    //if state isnt present in sessionStorage use that otherwise use initial state
    this.state = JSON.parse(sessionStorage.getItem("state"))
      ? JSON.parse(sessionStorage.getItem("state"))
      : initialState;

    //override this.setState method to save state to sessionStorage with every update
    const original = this.setState;
    this.setState = function () {
      let arguments0 = arguments[0];
      let arguments1 = () => (
        // eslint-disable-next-line
        arguments[1],
        sessionStorage.setItem("state", JSON.stringify(this.state))
      );
      original.bind(this)(arguments0, arguments1);
    };
  }

  addToProjectsSelected = (id) => {
    const newSelectedProjects = JSON.parse(
      JSON.stringify(this.state.selectedProjects)
    );
    newSelectedProjects.push(id);
    this.setState({ selectedProjects: [...newSelectedProjects] });
  };

  removeFromProjectsSelected = (id) => {
    const newSelectedProjects = this.state.selectedProjects.filter(
      (project) => project !== id
    );
    this.setState({ selectedProjects: [...newSelectedProjects] });
  };

  addToTasksSelected = (id) => {
    const newSelectedTasks = JSON.parse(
      JSON.stringify(this.state.selectedTasks)
    );
    newSelectedTasks.push(id);
    this.setState({ selectedTasks: [...newSelectedTasks] });
  };

  removeFromTasksSelected = (id) => {
    const newSelectedTasks = this.state.selectedTasks.filter(
      (task) => task !== id
    );
    this.setState({ selectedTasks: [...newSelectedTasks] });
  };

  //Api call functions

  login = (email, password) => {
    const options = config.getOptions("post");
    options.body = JSON.stringify({
      email: email,
      password: password,
    });

    return fetch(`${config.API}/api/auth/login`, options)
      .then((res) => res.json())
      .then((res) => {
        if (!!res.error) {
          return res;
        }
        this.extractPayload(res);
        return res;
      })
      .catch((err) => console.error(err));
  };

  extractPayload = (res) => {
    window.sessionStorage.setItem("jwt", res.authToken);
    let payload = res.authToken.split(".")[1];
    payload = Buffer.from(payload, "base64").toString("ascii");
    payload = JSON.parse(payload);
    //console.log(payload);
    this.setState({
      loggedIn: true,
      userId: payload.user_id,
      companyId: payload.companyid,
      isAdmin: payload.isadmin,
    });
  };

  signUp = (newUser) => {
    const options = config.getOptions("post");
    options.body = JSON.stringify(newUser);
    return fetch(`${config.API}/api/users`, options)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };

  addCompany = (companyName) => {
    const options = config.getOptions("post");
    options.body = JSON.stringify({
      company_name: companyName,
    });
    return fetch(`${config.API}/api/company`, options)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };

  configUrl = (endpoint) => {
    return `${config.API}/api/${endpoint}/c/${this.state.companyId}/`;
  };

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < 1000 });
    const x = 100 - Math.round((25 / window.innerHeight + 0.115) * 10000) / 100;
    if (!!document.getElementById("home")) {
      document.getElementById("home").style.height = `${x}%`;
    }
  };

  //Api calls to projects endpoint

  getCompanyInfo = () => {
    const options = config.getOptions("get");
    if (this.state.loggedIn) {
      Promise.all([
        fetch(this.configUrl("projects"), options),
        fetch(this.configUrl("tasks"), options),
      ])
        .then((res) => Promise.all([res[0].json(), res[1].json()]))
        .then((res) =>
          this.setState({
            projects: [...res[0]],
            tasks: [...res[1]],
            selectedProjects: [],
            selectedTasks: [],
          })
        )
        .catch((err) => console.error(err));
    }
  };

  getProjectsByCompanyId = () => {
    const options = config.getOptions("get");
    const url = `${config.API}/api/projects/c/${this.state.companyId}`;
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((projectsResponse) =>
        this.setState({
          projects: projectsResponse,
        })
      )
      .catch((res) => this.setState({ apiError: res.error }));
  };
  addProject = (project_name, description, priority, duedate) => {
    const options = config.getOptions("post");
    const url = `${config.API}/api/projects/c/${this.state.companyId}`;
    options.body = JSON.stringify({
      project_name,
      description,
      priority,
      dateadded: new Date(),
      duedate,
    });
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((project) =>
        this.setState({
          projects: [...this.state.projects, project],
        })
      );
  };
  getProjectById = (id) => {
    const options = config.getOptions("get");
    const url = `${config.API}/api/projects/${id}`;
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }
      return res.json();
    });
  };

  editProject = (project_name, description, priority, duedate, status, id) => {
    const options = config.getOptions("patch");
    const url = `${config.API}/api/projects/${id}`;
    options.body = JSON.stringify({
      project_name,
      description,
      priority,
      duedate,
      status,
    });
    // console.log(options.body);
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((project) =>
        this.setState({
          projects: [...this.state.projects, project],
        })
      );
  };

  deleteProject = (id) => {
    const options = config.getOptions("delete");
    const url = `${config.API}/api/projects/${id}`;
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }
      const otherProjects = this.state.projects.filter(
        (project) => project.id !== id
      );
      this.setState({
        projects: otherProjects,
      });
    });
  };

  deleteTask = (id) => {
    const options = config.getOptions("delete");
    const url = `${config.API}/api/tasks/${id}`;
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }
      const otherTasks = this.state.tasks.filter((tasks) => tasks.id !== id);
      this.setState({
        projects: otherTasks,
      });
    });
  };

  deleteSelectedProjects = () => {
    const ids = this.state.selectedProjects.map((id) => parseInt(id));
    this.setState({ showPopUp: false });
    Promise.all(ids.map((id) => this.deleteProject(id)));
  };

  deleteSelectedTasks = () => {
    const ids = this.state.selectedTasks.map((id) => parseInt(id));
    this.setState({ showPopUp: false });
    Promise.all(ids.map((id) => this.deleteTask(id)));
  };

  handleDeleteSelected = (nameOfSelectedArray) => {
    this.setState({ showPopUp: true });
    this.renderPopUp(nameOfSelectedArray);
  };

  popup = "";

  renderPopUp = (nameOfSelectedArray) => {
    const name = nameOfSelectedArray.toLowerCase().split("ted")[1];
    //console.log(name);
    const deleteSelector =
      "deleteSelected" + name.replace(name[0], name[0].toUpperCase());
    this.popup = (
      <div id="popUp">
        <p>
          Are you sure you want to <strong id="warning">delete</strong> {name}:{" "}
          {this.state[nameOfSelectedArray]
            .map((id) => {
              return this.state[name].find((item) => id === item.id)[
                name.substring(0, name.length - 1) + "_name"
              ];
            })
            .join(", ")}
        </p>
        <button onClick={this[deleteSelector]}>Yes</button>
        <button
          onClick={() => {
            this.setState({ showPopUp: false });
          }}
        >
          Cancel
        </button>
      </div>
    );
  };

  getUsersByCompanyId = (companyId) => {
    const options = config.getOptions("get");
    const url = `${config.API}/api/users/c/${companyId}`;
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((employees) => {
        this.setState({
          employees,
        });
      });
  };

  addTask = (task, projectid) => {
    const options = config.getOptions("post");
    const url = `${config.API}/api/tasks/p/${projectid}`;
    options.body = JSON.stringify(task);
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((task) =>
        this.setState({
          tasks: [...this.state.tasks, task],
        })
      );
  };
  getTaskById = (id) => {
    const options = config.getOptions("get");
    const url = `${config.API}/api/tasks/${id}`;
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }
      return res.json();
    });
  };

  editTask = (task, id) => {
    const options = config.getOptions("patch");
    const url = `${config.API}/api/tasks/${id}`;
    //console.log(task);
    options.body = JSON.stringify(task);
    //console.log(options.body);
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }

      const taskToUpdate = this.state.tasks.find((task) => task.id === id);

      const updatedTask = { ...taskToUpdate, ...task };

      const indexToUpdate = this.state.tasks.findIndex(
        (task) => task.id === id
      );
      let tasksCopy = [...this.state.tasks];
      tasksCopy[indexToUpdate] = updatedTask;

      this.setState({
        tasks: tasksCopy,
      });
      return res.json();
    });
  };

  deleteTask = (id) => {
    const options = config.getOptions("delete");
    const url = `${config.API}/api/tasks/${id}`;
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }
      const otherTasks = this.state.tasks.filter((task) => task.id !== id);
      this.setState({
        tasks: otherTasks,
      });
    });
  };

  //Lifecycle functions

  componentDidMount = () => {
    window.addEventListener("resize", this.handleResize);
    const observer = new MutationObserver(config.watchRoot);
    const targetNode = document.getElementById("root");
    const options = { attributes: true, childList: true, subtree: true };
    observer.observe(targetNode, options);
    this.getCompanyInfo();
  };

  renderHome = () => {
    if (window.sessionStorage.jwt) {
      return <Route exact path="/" component={Home} />;
    }
    return <Route exact path="/" component={LandingPage} />;
  };

  render() {
    const value = {
      login: this.login,
      getTasks: () => this.state.tasks,
      getisAdmin: () => this.state.isAdmin,
      getProjects: () => this.state.projects,
      getCompanyId: () => this.state.companyId,
      getEmployees: () => this.state.employees,
      getCompanyInfo: this.getCompanyInfo,
      signUp: this.signUp,
      addCompany: this.addCompany,
      extractPayload: this.extractPayload,
      getProjectsByCompanyId: this.getProjectsByCompanyId,
      getUsersByCompanyId: this.getUsersByCompanyId,
      addProject: this.addProject,
      getProjectById: this.getProjectById,
      editProject: this.editProject,
      showApiError: () => this.state.apiError,
      getIsMobile: () => this.state.isMobile,
      addTask: this.addTask,
      getTaskById: this.getTaskById,
      editTask: this.editTask,
      deleteTask: this.deleteTask,
      addToProjectsSelected: this.addToProjectsSelected,
      removeFromProjectsSelected: this.removeFromProjectsSelected,
      deleteSelectedProjects: this.deleteSelectedProjects,
      addToTasksSelected: this.addToTasksSelected,
      removeFromTasksSelected: this.removeFromTasksSelected,
      deleteSelectedTasks: this.deleteSelectedTasks,
      handleDeleteSelected: this.handleDeleteSelected,
    };

    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          {this.state.showPopUp && this.popup}
          <Header />

          <Switch>
            {this.renderHome()}
            <PublicOnlyRoute exact path="/SignUp" component={SignUp} />
            <PublicOnlyRoute exact path="/Login" component={Login} />
            <PrivateRoute
              exact
              path="/completed-projects"
              component={CompletedPage}
            />
            <PrivateRoute
              exact
              path="/projects/:projectId"
              component={ProjectPage}
            />
            <PrivateRoute exact path="/AddProject" component={AddProject} />

            {this.state.loggedIn ? (
              <Route
                path="/edit/project/:project_id"
                render={({ match, history }) => (
                  <AddProject
                    history={history}
                    projectId={match.params.project_id}
                  />
                )}
              />
            ) : (
              <PublicOnlyRoute exact path="/Login" component={Login} />
            )}

            {this.state.loggedIn ? (
              <Route
                path="/addtask/:project_id"
                render={({ match, history }) => (
                  <AddTask
                    history={history}
                    projectId={match.params.project_id}
                  />
                )}
              />
            ) : (
              <PublicOnlyRoute exact path="/Login" component={Login} />
            )}

            {this.state.loggedIn ? (
              <Route
                path="/edit/task/:task_id"
                render={({ match, history }) => (
                  <AddTask history={history} taskId={match.params.task_id} />
                )}
              />
            ) : (
              <PublicOnlyRoute exact path="/Login" component={Login} />
            )}
            <Route component={PageNotFound} />
          </Switch>
          <footer />
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
