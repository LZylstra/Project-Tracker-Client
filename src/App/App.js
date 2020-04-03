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

class App extends Component { 
  state ={
    tasks: [],
    projects: [],
    userId: null,
    userIsAdmin: false
  }

  renderHome = () => {
    if(window.sessionStorage.jwt){
      return <Route exact path="/" component={Home}/>
    }
    return <Route exact path="/" component={LandingPage}/>
  }

  render(){
    const value = {

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
