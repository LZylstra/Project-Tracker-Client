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
  constructor(props){
    super(props);
    const initialState = {
      tasks: [],
      projects: [],
      loggedIn: !!window.sessionStorage.jwt,
      userId: null,
      isAdmin: false,
      companyId: null,
      isMobile: window.innerWidth < 800
    }
    //if state isent present in sessionStorage use that otherwise use initial state
    this.state = JSON.parse(sessionStorage.getItem('state'))
      ? JSON.parse(sessionStorage.getItem('state'))
      : initialState

    //override this.setState method to save state to sessionStorage with every update
    const original = this.setState;     
    this.setState = function() {
      let arguments0 = arguments[0];
      let arguments1 = () => (arguments[1], sessionStorage.setItem('state', JSON.stringify(this.state)));
      original.bind(this)(arguments0, arguments1);
    };
  }
  

  //Api call functions

  login = (email, password) => {
    const options = config.getOptions('post')
    options.body = JSON.stringify({
      email: email,
      password: password
    })
    return fetch(`${config.API}/api/auth/login`, options).then(res => res.json()).then(res => {
      if(!!res.error){
        return res
      }
      this.extractPayload(res)
      return res
    }).catch(err => console.error(err))
  }

  extractPayload = res => {
    window.sessionStorage.setItem('jwt', res.authToken)
    let payload = res.authToken.split('.')[1];
    payload = Buffer.from(payload, 'base64').toString('ascii');
    payload = JSON.parse(payload)
    this.setState({loggedIn: true, userId: payload.userID, companyId: payload.companyId , userIsAdmin: payload.userIsAdmin})
  }

  signUp = newUser => {
    const options = config.getOptions('post')
    options.body = JSON.stringify(newUser)
    return fetch(`${config.API}/api/users`, options).then(res => res.json()).then(res => {
      return res
    })
  }

  addCompany = companyName => {
    const options = config.getOptions('post')
    options.body = JSON.stringify({
      company_name: companyName
    })
    return fetch(`${config.API}/api/company`, options).then(res => res.json()).then(res => {
      return res
    })
  }

  configUrl = endpoint => {
    return `${config.API}/api/${endpoint}?company_id=${this.state.companyId}`
  }

  getCompanyInfo = () => {
    // const options = config.getOptions('get')
    // if(this.state.loggedIn){
    //   Promise.all([fetch(this.configUrl('projects'), options), fetch(this.configUrl('tasks'), options)])
    //   .then(res => Promise.all([res[0].json(), res[1].json()]))
    //   .then(res => this.setState({projects: [...res[0]], tasks: [...res[1]]}))
    //   .catch(err => console.error(err))
    // }
  }

  //Get state functions

  getTasks = () => {
    return this.state.tasks
  }

  getProjects = () => {
    return this.state.projects
  }

  getIsAdmin = () => {
    return this.state.isAdmin
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
      getisAdmin: this.getIsAdmin,
      getProjects: this.getProjects,
      getCompanyInfo: this.getCompanyInfo,
      signUp: this.signUp,
      addCompany: this.addCompany,
      extractPayload: this.extractPayload
    }
    return (
      <ApiContext.Provider value={value}>
         <div className="App">
          <Header/>
          {this.renderHome()}
          <Route exact path="/SignUp" component={SignUp}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/projects/:projectId" component={ProjectPage}/>
          <Route exact path="/tasks/:taskId" component={TaskPage}/>
          <Route exact path="/AddTask" component={AddTask}/>
          <Route exact path="/AddProject" component={AddProject}/>
          <footer/>
        </div>
      </ApiContext.Provider>
    );
  } 
}

export default App;
