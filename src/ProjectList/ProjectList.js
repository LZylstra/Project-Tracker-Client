import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./ProjectList.css";

class ProjectList extends Component {

  formatDate = (duedate) => { 
    if (duedate) { 
        let extraChars = duedate.indexOf("T");
        return duedate.slice(0, extraChars);
    }
  
  }

  makeProjectsList = (projects) => {
    return projects.map((project) => (
      <li
        onClick={() => this.props.showProjectDetail(project.id)}
        key={project.id}
        className="project-list-item"
      >
        <span className="project-item-title">{project.project_name}</span>
        <span className="project-priority">{project.priority}</span>
      </li>
    ));
  };
  displayProjectListJSX = () => (
    <div className="project-info">
      <div id="project-list">
        <Link to="/AddProject">
          <button id="add-project-button">
            <h1>
              Add Project<i class="add-project-plus fas fa-plus"></i>
            </h1>
          </button>
        </Link>
        <h2 id="project-list-title">Your Projects</h2>
        <ul>{this.makeProjectsList(this.props.projects)}</ul>
        <div className="button-container">
          <button>Completed</button>
          <button>Edit</button>
        </div>
        <button>Delete Selected</button>
      </div>
      <div id="expanded-project">
        <h1 id="project-title">{this.props.selected.project_name}</h1>
        <div id="project-description">{this.props.selected.description}</div>
        <div id="project-dueDate">Due Date: {this.formatDate(this.props.selected.duedate)}</div>
      </div>
    </div>
  );
  render() {
    return <>{this.displayProjectListJSX()}</>;
  }
}

export default ProjectList;

