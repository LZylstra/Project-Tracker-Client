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

  //add persistance to state by storing state in localStorage
  constructor(props){
    super(props);
    const initialState = {
      tasks: [],
      projects: [],
      loggedIn: !!window.sessionStorage.jwt,
      userId: null,
      userIsAdmin: false,
      companyId: null,
      isModbile: true
    }
    //if state isent present in localStorage use that otherwise use initial state
    this.state = JSON.parse(sessionStorage.getItem('state'))
      ? JSON.parse(sessionStorage.getItem('state'))
      : initialState

    //override this.setState method to save state to local storage with every update
    const orginial = this.setState;     
    this.setState = function() {
      let arguments0 = arguments[0];
      let arguments1 = () => (arguments[1], sessionStorage.setItem('state', JSON.stringify(this.state)));
      orginial.bind(this)(arguments0, arguments1);
    };
  }
  

  //Api call functions

  login = (email, password) => {
    const options = config.getOptions('post')
    options.body = {
      email: email,
      password: password
    }
    fetch(`${config.API}/api/login`, options).then(res => res.json()).then(res => {
      window.sessionStorage.setItem('jwt', res.authToken)
      let payload = res.authToken.split('.')[1];
			payload = Buffer.from(payload, 'base64').toString('ascii');
			payload = JSON.parse(payload)
      this.setState({loggedIn: true, userId: payload.userID, companyId: payload.companyId })
    })
  }

  signUp = () => {

  }

  getCompanyInfo = () => {
    const options = config.getOptions('get')
    if(this.state.loggedIn){
      Promise.all([
        fetch(`${config.API}/projects?company_id=${this.state.companyId}`, options),
        fetch(`${config.API}/tasks?company_id=${this.state.companyId}`, options)
      ])
      .then(res => Promise.all([res[0].json(), res[1].json()]))
      .then(res => this.setState({projects: [...res[0]], tasks: [...res[1]]}))
      .catch(err => console.error(err))
    }
  }

  //Get state functions

  getTasks = () => {
    return this.state.tasks
  }

  getProjects = () => {
    return this.state.projects
  }

  getUserIsAdmin = () => {
    return this.state.userIsAdmin
  }

  //Lifecycle functions

  componentDidMount = () => {
    this.getCompanyInfo()
  }

  renderHome = () => {
    if(window.sessionStorage.jwt){
      return <Route exact path="/" component={Home}/>
    }
    return <Route exact path="/" component={LandingPage}/>
  }

  render(){
    const value = {
      login: this.login,
      getTasks: this.getTasks,
      getUserIsAdmin: this.getUserIsAdmin,
      getProjects: this.getProjects,
      getCompanyInfo: this.getCompanyInfo,
      signUp: this.signUp
    }
    return (
      <ApiContext.Provider value={value}>
         <div className="App">
          <Header/>
          {this.renderHome()}
          <Route exact path="/SignUp" component={SignUp}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/projects/:projectId" component={ProjectPage}/>
          <Route exact path="tasks/:taskId" component={TaskPage}/>
          <Route exact path="/AddTask" component={AddTask}/>
          <Route exact path="/AddProject" component={AddProject}/>
        </div>
      </ApiContext.Provider>
    );
  } 
}

export default App;
