import React, { Component } from "react";
import ApiContext from '../ApiContext';
import Project from '../Project/Project';
import { Link } from 'react-router-dom';
import "./ProjectList.css";

class ProjectList extends Component {
  static contextType = ApiContext
  formatDate = (duedate) => { 
    if (duedate) { 
        let extraChars = duedate.indexOf("T");
        return duedate.slice(0, extraChars);
    }
  
  }

  makeProjectsList = projects => {
    return projects.map(project => (
      <Project showProjectDetail={this.props.showProjectDetail} project={project} children={this.props.children} key={project.id}/>
    ));
  };



  displayProjectListJSXMobile = () => {
    return (
      <div className="project-info">
        <div id="project-list">
          <Link to="/AddProject">
            <button id="add-project-button">
              <h1>
                Add Project<i className="add-project-plus fas fa-plus"></i>
              </h1>
            </button>
          </Link>
          <h2 id="project-list-title">Your Projects</h2>
          <ul>{this.makeProjectsList(this.props.projects)}</ul>
        </div>
      </div>
    )
  }

  displayProjectListJSX = () => (
    <div className="project-info">
      <div id="project-list">
        <Link to="/AddProject">
          <button id="add-project-button">
            <h1>
              Add Project<i className="add-project-plus fas fa-plus"></i>
            </h1>
          </button>
        </Link>
        <h2 id="project-list-title">Your Projects</h2>
        <ul>{this.makeProjectsList(this.props.projects)}</ul>
        <button>Delete Selected</button>
      </div>
      <div id="expanded-project">
        <h1 id="project-title">{this.props.selected.project_name}</h1>
        <div id="project-description">{this.props.selected.description}</div>
        <div id="project-dueDate">Due Date: {this.formatDate(this.props.selected.duedate)}</div>
        <div className="button-container">
          <button>Completed</button>
          <button>Edit</button>
        </div>
        {this.props.children}
      </div>
    </div>
  );
  render() {
    return this.context.getIsMobile() ?
      this.displayProjectListJSXMobile():
      this.displayProjectListJSX()
  }
}

export default ProjectList;

