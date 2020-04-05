import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import ApiContext from '../ApiContext';
import LandingPage from '../LandingPage/LandingPage';
import Home from '../Home/Home';
import Header from '../Header/Header';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import ProjectList from '../ProjectList/ProjectList';
import ProjectPage from '../ProjectPage/ProjectPage';
import TaskPage from '../TaskPage/TaskPage';
import AddProject from '../AddProject/AddProject';
import AddTask from '../AddTask/AddTask';
import config from '../config';

class App extends Component {
  //add persistance to state by storing state in sessionStorage
  constructor(props) {
    super(props);
    const initialState = {
      tasks: [],
      projects: [],
      loggedIn: !!window.sessionStorage.jwt,
      userId: null,
      isAdmin: false,
      companyId: null,
      isMobile: window.innerWidth < 800,
      apiError: "",
    };
    //if state isent present in sessionStorage use that otherwise use initial state
    this.state = JSON.parse(sessionStorage.getItem("state"))
      ? JSON.parse(sessionStorage.getItem("state"))
      : initialState;

    //override this.setState method to save state to sessionStorage with every update
    const original = this.setState;
    this.setState = function () {
      let arguments0 = arguments[0];
      let arguments1 = () => (
        arguments[1],
        sessionStorage.setItem("state", JSON.stringify(this.state))
      );
      original.bind(this)(arguments0, arguments1);
    };
  }

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
    console.log(payload);
    this.setState({
      loggedIn: true,
      userId: payload.user_id,
      companyId: payload.companyid,
      userIsAdmin: payload.isadmin,
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
    return `${config.API}/api/${endpoint}?company_id=${this.state.companyId}`;
  };

  getCompanyInfo = () => {
    // const options = config.getOptions('get')
    // if(this.state.loggedIn){
    //   Promise.all([fetch(this.configUrl('projects'), options), fetch(this.configUrl('tasks'), options)])
    //   .then(res => Promise.all([res[0].json(), res[1].json()]))
    //   .then(res => this.setState({projects: [...res[0]], tasks: [...res[1]]}))
    //   .catch(err => console.error(err))
    // }
  };

  //Api calls to projects endpoint

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
       duedate

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
       )
       .catch((res) => this.setState({ apiError: res.error }));
  }

  //Get state functions

  getTasks = () => {
    return this.state.tasks;
  };

  getProjects = () => {
    return this.state.projects;
  };

  getIsAdmin = () => {
    return this.state.isAdmin;
  };

  showApiError = () => {
    return this.state.apiError;
  };

  //Lifecycle functions

  componentDidMount = () => {
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
      getTasks: this.getTasks,
      getisAdmin: this.getIsAdmin,
      getProjects: this.getProjects,
      getCompanyInfo: this.getCompanyInfo,
      signUp: this.signUp,
      addCompany: this.addCompany,
      extractPayload: this.extractPayload,
      getProjectsByCompanyId: this.getProjectsByCompanyId,
      addProject:this.addProject,
      showApiError:this.showApiError
    };

    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <Header />
          {this.renderHome()}
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/projects/:projectId" component={ProjectPage} />
          <Route exact path="tasks/:taskId" component={TaskPage} />
          <Route exact path="/AddTask" component={AddTask} />
          <Route exact path="/AddProject" component={AddProject} />
          <footer />
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
