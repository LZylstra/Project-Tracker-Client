import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./ProjectList.css";

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedName: "",
      selectedDescription: "",
      selectedDueDate: "",
    };
  }
  formatDate = (duedate) => { 
    if (duedate) { 
        let extraChars = duedate.indexOf("T");
        return duedate.slice(0, extraChars);
    }
  
  }

  showProjectDetail = (id) => {
    const selected = this.props.projects.find((project) => project.id === id);
    this.setState({
      selectedName: selected.project_name,
      selectedDescription: selected.description,
      selectedDueDate: selected.duedate,
    });
  };

  makeProjectsList = (projects) => {
    return projects.map((project) => (
      <li
        onClick={() => this.showProjectDetail(project.id)}
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
        <h1 id="project-title">{this.state.selectedName}</h1>
        <div id="project-description">{this.state.selectedDescription}</div>
        <div id="project-dueDate">Due Date: {this.formatDate(this.state.selectedDueDate)}</div>
      </div>
    </div>
  );
  render() {
    return <>{this.displayProjectListJSX()}</>;
  }
}

export default ProjectList;

