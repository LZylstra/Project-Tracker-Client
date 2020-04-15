import React, { Component } from "react";
import ApiContext from "../ApiContext";
import TaskList from "../TaskList/TaskList";
import "./Project.css";

class Project extends Component {
  static contextType = ApiContext;
  state = {
    isExpanded: false,
    isSelected: false,
  };

  handleProjectClick = () => {
	const expanded = !this.state.isExpanded;
	this.context.setSelectedProject(this.props.project)
    this.setState({ isExpanded: expanded });
  };

  formatDate = (duedate) => {
    if (duedate) {
      let extraChars = duedate.indexOf("T");
      return duedate.slice(0, extraChars);
    }
  };

  handleCheckBox = () => {
    const isSelected = !this.state.isSelected;
    if (this.state.isSelected) {
      this.context.removeFromProjectsSelected(this.props.project.id);
    } else {
      this.context.addToProjectsSelected(this.props.project.id);
    }
    this.setState({ isSelected: isSelected });
  };

  expandedProject = () => {
    return (
      <div id="expanded-project">
        <div id="project-description">{this.props.project.description}</div>
        <div id="project-dueDate">
          {!!this.context.getSelectedProject().duedate && "Due Date: "}{this.formatDate(this.props.project.duedate)}
        </div>
        {!this.context.getIsMobile() && (
          <div className="button-container">
            <button>Completed</button>
            <button>Edit</button>
          </div>
        )}
        <TaskList
          tasks={this.context
            .getTasks()
            .filter((task) => task.projectid === this.props.project.id)}
            projectId={this.props.project.id}
        />
      </div>
    );
  };

  renderCheckboxes = (project) => {
    if(project.project_name === "Demo Project"){
      return;
    }
    return (
      <>
        <label
          htmlFor={`select-project-${project.id}`}
          className="hidden-label"
        >
          Select project {project.project_name}
        </label>
        <input
          type="checkbox"
          id={`select-project-${project.id}`}
          onChange={this.handleCheckBox}
        />
      </>
    );
  };

  makeProjectPc = (project) => {
    return (
      <li
        onClick={() => this.props.showProjectDetail(project.id)}
        key={project.id}
        className="project-list-item"
      >
        {this.context.getisAdmin() && this.renderCheckboxes(project)}
        <span className="project-item-title">{project.project_name}</span>
        <span className="project-priority">{project.priority}</span>
      </li>
    );
  };

  makeProjectMobile = (project) => {
    return (
      <li key={project.id} className="project-list-item">
        <span className="project-item-title" onClick={this.handleProjectClick}>
          {project.project_name}
        </span>
        <span className="project-priority">{project.priority}</span>
        {this.state.isExpanded && this.expandedProject()}
      </li>
    );
  };

  render() {
    return this.context.getIsMobile()
      ? this.makeProjectMobile(this.props.project)
      : this.makeProjectPc(this.props.project);
  }
}

export default Project;
