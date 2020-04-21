import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import ApiContext from "../../context/ApiContext";
import LandingPage from "../../routes/LandingPage/LandingPage";
import Home from "../../routes/Home/Home";
import Header from "../Header/Header";
import SignUp from "../../routes/SignUp/SignUp";
import Login from "../../routes/Login/Login";
import ProjectPage from "../ProjectPage/ProjectPage";
import AddProject from "../../routes/AddProject/AddProject";
import CompletedPage from "../../routes/CompletedPage/CompletedPage";
import AddTask from "../../routes/AddTask/AddTask";
import config from "../../config";
import PageNotFound from "../../routes/PageNotFound/PageNotFound";
import PrivateRoute from "../../utils/PrivateRoute";
import PublicOnlyRoute from "../../utils/PublicOnlyRoute";
import ProjectApiService from "../../services/projects-api-service";

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
      completedList: false,
      selectedProject: {},
      manageUsers: false,
      mobileMenu: false,
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

  static defaultProps = {
    history: {
      listen: () => {},
    },
  };

  handleMobileMenu = () => {
    this.setState({ mobileMenu: !this.state.mobileMenu });
  };

  handleLogout = () => {
    if (this.state.mobileMenu) {
      this.setState({ mobileMenu: false });
    }
    window.sessionStorage.removeItem("jwt");
    window.sessionStorage.removeItem("state");
  };

  renderMobileMenu = () => {
    return (
      <ul className="no-bullet" id="menu-list">
        <li className="menu-list-item">
          <Link
            to="/"
            onClick={this.handleLogout}
            id="logout-mobile"
            className="menu-list-item"
          >
            Logout
          </Link>
        </li>
        <li className="menu-list-item">
          <Link to="/" id="home-nav-mobile" className="menu-list-item">
            Home
          </Link>
        </li>
        <li className="menu-list-item">
          <Link
            to="/completed-projects"
            className="menu-list-item"
            id="completed-nav-mobile"
          >
            Completed
          </Link>
        </li>
        {this.state.isAdmin && (
          <li className="menu-list-item">
            <Link
              to="/"
              className="menu-list-item"
              onClick={this.handleManageUsers}
              id="manage-users-mobile"
            >
              Manage Users
            </Link>
          </li>
        )}
      </ul>
    );
  };

  handleManageUsers = () => {
    this.getUsersByCompanyId(this.state.companyId);
    this.setState({ manageUsers: !this.state.manageUsers });
  };

  updateUserRole = (event) => {
    const options = config.getOptions("patch");
    const user = this.state.employees.find(
      (user) => user.id === parseInt(event.target.id.split("-")[0])
    );
    user.isadmin = event.target.value;
    options.body = JSON.stringify(user);
    fetch(`${config.API}/api/users/${user.id}`, options)
      .then((res) => {
        if (!res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        if (!!res) {
          console.log(res);
        }
        this.getCompanyInfo();
      });
  };

  manageUsers = () => {
    return (
      <div id="manage-users-popup">
        {this.state.employees.map((user, i) => {
          return (
            <div className="user-wrapper" key={i}>
              <label htmlFor={`${user.id}-role`}>{user.full_name}:</label>
              <select
                id={`${user.id}-role`}
                value={user.isadmin}
                onChange={this.updateUserRole}
              >
                <option value={true}>Administrator</option>
                <option value={false}>Standard</option>
              </select>
            </div>
          );
        })}
        <button onClick={this.handleManageUsers}>Done</button>
      </div>
    );
  };

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
    let payload = window.sessionStorage.jwt.split(".")[1];
    payload = Buffer.from(payload, "base64").toString("ascii");
    payload = JSON.parse(payload);
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

  setSelectedProject = (project) => {
    this.setState({ selectedProject: project });
  };

  configUrl = (endpoint) => {
    return `${config.API}/api/${endpoint}/c/${this.state.companyId}/`;
  };

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < 1000 });
    if (!this.state.isMobile) {
      this.setState({ mobileMenu: false });
    }
    const x = 100 - Math.round((25 / window.innerHeight + 0.115) * 10000) / 100;
    if (!!document.getElementById("home")) {
      document.getElementById("home").style.height = `${x}%`;
    }
  };

  // //Api calls to projects endpoint

  // getCompanyInfo = () => {
  //   const options = config.getOptions("get");
  //   if (!!window.sessionStorage.jwt) {
  //     Promise.all([
  //       fetch(this.configUrl("projects"), options),
  //       fetch(this.configUrl("tasks"), options),
  //     ])
  //       .then((res) => Promise.all([res[0].json(), res[1].json()]))
  //       .then((res) => {
  //         if (this.state.selectedProject) {
  //           if (JSON.stringify(this.state.selectedProject).length === 2) {
  //             this.setState({ selectedProject: res[0][0] });
  //           }
  //         }
  //         this.setState({
  //           projects: [...res[0]],
  //           tasks: [...res[1]],
  //           selectedProjects: [],
  //           selectedTasks: [],
  //         });
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // };

  // getProjectsByCompanyId = () => {
  //   const options = config.getOptions("get");
  //   const url = `${config.API}/api/projects/c/${this.state.companyId}`;
  //   return fetch(url, options)
  //     .then((res) => {
  //       if (!res.ok) {
  //         return res.json().then((e) => Promise.reject(e));
  //       }
  //       return res.json();
  //     })
  //     .then((projectsResponse) =>
  //       this.setState({
  //         projects: projectsResponse,
  //       })
  //     )
  //     .catch((res) => this.setState({ apiError: res.error }));
  // };
  // addProject = (project_name, description, priority, duedate) => {
  //   const options = config.getOptions("post");
  //   const url = `${config.API}/api/projects/c/${this.state.companyId}`;
  //   options.body = JSON.stringify({
  //     project_name,
  //     description,
  //     priority,
  //     dateadded: new Date(),
  //     duedate,
  //   });
  //   return fetch(url, options)
  //     .then((res) => {
  //       if (!res.ok) {
  //         return res.json().then((e) => Promise.reject(e));
  //       }
  //       return res.json();
  //     })
  //     .then((project) => {
  //       this.setState({
  //         projects: [...this.state.projects, project],
  //       });
  //       if (this.state.projects.length === 1) {
  //         this.setSelectedProject(project);
  //       }
  //       return project;
  //     });
  // };
  // getProjectById = (id) => {
  //   const options = config.getOptions("get");
  //   const url = `${config.API}/api/projects/${id}`;
  //   return fetch(url, options).then((res) => {
  //     if (!res.ok) {
  //       return res.json().then((e) => Promise.reject(e));
  //     }
  //     return res.json();
  //   });
  // };

  // editProject = (status, id) => {
  //   const options = config.getOptions("patch");
  //   const url = `${config.API}/api/projects/${id}`;
  //   options.body = JSON.stringify(status);
  //   return fetch(url, options).then((res) => {
  //     if (!res.ok) {
  //       return res.json().then((e) => Promise.reject(e));
  //     }
  //     const projectToUpdate = this.state.projects.find(
  //       (project) => project.id === id
  //     );

  //     const updatedProject = { ...projectToUpdate, ...status };

  //     const indexToUpdate = this.state.projects.findIndex(
  //       (project) => project.id === id
  //     );
  //     let projectsCopy = [...this.state.projects];
  //     projectsCopy[indexToUpdate] = updatedProject;

  //     this.setState({
  //       projects: projectsCopy,
  //       selectedProject: updatedProject,
  //     });
  //   });
  // };

  // deleteProject = (id) => {
  //   const options = config.getOptions("delete");
  //   const url = `${config.API}/api/projects/${id}`;
  //   return fetch(url, options).then((res) => {
  //     if (!res.ok) {
  //       return res.json().then((e) => Promise.reject(e));
  //     }
  //     const otherProjects = this.state.projects.filter(
  //       (project) => project.id !== id
  //     );
  //     this.setState({
  //       projects: otherProjects,
  //     });
  //   });
  // };

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

  // deleteSelectedProjects = () => {
  //   const ids = this.state.selectedProjects.map((id) => parseInt(id));
  //   if (ids.length === this.state.projects.length) {
  //     this.setState({ selectedProject: {} });
  //   }
  //   this.setState({ showPopUp: false });
  //   Promise.all(ids.map((id) => this.deleteProject(id))).then((res) =>
  //     this.setState({ selectedProjects: [] })
  //   );
  // };

  deleteSelectedTasks = () => {
    const ids = this.state.selectedTasks.map((id) => parseInt(id));
    this.setState({ showPopUp: false });
    Promise.all(ids.map((id) => this.deleteTask(id))).then((res) =>
      this.setState({ selectedTasks: [] })
    );
  };

  handleDeleteSelected = (nameOfSelectedArray) => {
    this.setState({ showPopUp: true });
    this.renderPopUp(nameOfSelectedArray);
  };

  popup = "";

  renderPopUp = (nameOfSelectedArray) => {
    const name = nameOfSelectedArray.toLowerCase().split("ted")[1];
    const deleteSelector =
      "deleteSelected" + name.replace(name[0], name[0].toUpperCase());
    this.popup = (
      <div id="popUp">
        <p>
          Are you sure you want to <strong id="warning">DELETE</strong> {name}:{" "}
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
      .then((task) => {
        const project = this.state.projects.find(
          (project) => project.id === parseInt(projectid)
        );
        this.setState({
          tasks: [...this.state.tasks, task],
          selectedProject: project,
        });
      });
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
    options.body = JSON.stringify(task);
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
      const project = this.state.projects.find(
        (project) => project.id === parseInt(taskToUpdate.projectid)
      );
      this.setState({
        tasks: tasksCopy,
        selectedProject: project,
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
    this.props.history.listen(() => {
      if (this.state.manageUsers) {
        this.setState({ manageUsers: false });
      }
    });
    window.addEventListener("resize", this.handleResize);
    const observer = new MutationObserver(config.watchRoot);
    const targetNode = document.getElementById("root");
    const options = { attributes: true, childList: true, subtree: true };
    observer.observe(targetNode, options);
    const htmlNode = document.getElementById("html");
    const projectList = document.getElementById("project-list");
    const taskList = document.getElementById("task-list");
    const formContainer = document.getElementById("form-container");
    const x = (window.innerHeight - 25) * 0.885;
    if (!!projectList && projectList.scrollHeight > window.innerHeight * x) {
      htmlNode.style.height = "auto";
    } else if (!!taskList && taskList.scrollHeight > window.innerHeight * x) {
      htmlNode.style.height = "auto";
    } else if (!!formContainer && formContainer.scrollHeight > x) {
      htmlNode.style.height = "auto";
      formContainer.style.height =
        100 - Math.round((25 / window.innerHeight + 0.115) * 10000) / 100;
    } else {
      htmlNode.style.height = "100%";
    }
    const y = 100 - Math.round((25 / window.innerHeight + 0.115) * 10000) / 100;
    if (!!document.getElementById("home")) {
      document.getElementById("home").style.height = `${y}%`;
    }
    if (!!document.getElementById("home-completed")) {
      document.getElementById("home-completed").style.height = `${y}%`;
    }

    ProjectApiService.getCompanyInfo();
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
      getSelectedProject: () => this.state.selectedProject,
      setSelectedProject: this.setSelectedProject,
      handleManageUsers: this.handleManageUsers,
      handleMobileMenu: this.handleMobileMenu,
      getMobileMenu: () => this.state.mobileMenu,
    };
    const manageUsers = this.state.manageUsers && this.state.isAdmin;
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          {this.state.showPopUp && this.popup}
          {manageUsers && this.manageUsers()}
          <Header />
          {this.state.mobileMenu && this.renderMobileMenu()}
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
