import React, { Component } from "react";

import "./ProjectList.css";

class ProjectList extends Component {
  dummyProjects = [
    {
      id: 1,
      project_name: "test project #1",
      priority: "High",
    },
    {
      id: 2,
      project_name: "test project #2",
      priority: "Low",
    },
    {
      id: 3,
      project_name: "test project #3",
      priority: "Medium",
    },
  ];

  renderProjects = (projects) => {
    return projects.map((project) => (
      <li key={project.id} className="project-list-item">
        <span className="project-item-title">{project.project_name}</span>
        <span className="project-priority">{project.priority}</span>
      </li>
    ));
  };

  render() {
    return (
      <div id="project-list">
        <button id="add-project-button">
          <h1>
            Add Project<i class="add-project-plus fas fa-plus"></i>
          </h1>
        </button>
        <h2 id="project-list-title">Your Projects</h2>
        <ul>{this.renderProjects(this.dummyProjects)}</ul>
        <div className="button-container">
          <button>Completed</button>
          <button>Edit</button>
        </div>
        <button>Delete Selected</button>
      </div>
    );
  }
}

export default ProjectList;

