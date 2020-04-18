import React, { Component } from "react";
import ApiContext from "../ApiContext";
import Project from "../Project/Project";
import { Link } from "react-router-dom";
import "./ProjectList.css";

class ProjectList extends Component {
  static contextType = ApiContext;

  static defaultProps = { task: {} };
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
    };
  }

  formatDate = (duedate) => {
    if (duedate) {
      let extraChars = duedate.indexOf("T");
      return duedate.slice(0, extraChars);
    }
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const id = this.props.selected.id;


    //make patch request to api to update task
    this.context
      .editProject({
        [name]: value,
      }, id)

      .catch((res) => this.setState({ error: res.error }));
  };

  makeProjectsList = (projects) => {
    return projects.map((project) => (
      <Project
        showProjectDetail={this.props.showProjectDetail}
        project={project}
        children={this.props.children}
        key={project.id}
        type={this.props.type}
      />
    ));
  };

  componentDidMount = () => {
  
  
    const htmlNode = document.getElementById("html");
    const projectList = document.getElementById("project-list");
    const formContainer = document.getElementById("form-container");
    const taskList = document.getElementById("task-list");
    const x = 1 - (25 / window.innerHeight + 0.115);
    if (!!projectList && projectList.scrollHeight > x) {
      htmlNode.style.height = "auto";
    } else if (!!taskList && taskList.scrollHeight > x) {
      htmlNode.style.height = "auto";
    } else if (!!formContainer && formContainer.scrollHeight > x) {
      htmlNode.style.height = "auto";
    } else {
      htmlNode.style.height = "100%";
    }
  };
  

  displayProjectListJSXMobile = () => {
    let listType = this.props.type;
    if (listType === "completed") {
      return (
        <div className="project-info">
          <div id="project-list">
            <h2 id="project-list-title">Completed Projects</h2>
            <ul className="no-bullet">{this.makeProjectsList(this.props.projects)}</ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="project-info">
          <div id="project-list">
            <Link to="/AddProject" id="add-project-link">
              <button id="add-project-button">
                <h1>
                  Add Project<i className="add-project-plus fas fa-plus"></i>
                </h1>
              </button>
            </Link>
            <h2 id="project-list-title">Your Projects</h2>
            <ul className="no-bullet">{this.makeProjectsList(this.props.projects)}</ul>
          </div>
        </div>
      );
    }
  };

  renderButton = () => {
    if (this.context.getisAdmin() && this.context.getProjects().length > 0) {
      return (
        <button
          onClick={() => this.context.handleDeleteSelected("selectedProjects")}
        >
          Delete Selected
        </button>
      );
    }
    return;
  };

  displayProjectListJSX = () => {
    let listType = this.props.type;
    if (listType === "completed") {
      return (
        <div className="project-info">
          <div id="project-list">
            <h2 id="project-list-title">Completed Projects</h2>
            <ul className="no-bullet">{this.makeProjectsList(this.props.projects)}</ul>
            {!this.context.getIsMobile() && this.renderButton()}
          </div>
          <div id="expanded-project">
            {!this.context.getSelectedProject() ? (
              <h1>No completed projects to display</h1>
            ) : (
              <>
                <h1 id="project-title">{this.props.selected.project_name}</h1>
                <div id="project-description">
                  {this.props.selected.description}
                </div>
                <div id="project-dueDate">
                  <p>
                    Due Date: {this.formatDate(this.props.selected.duedate)}
                  </p>
                </div>
                {this.props.children}
              </>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="project-info">
          <div id="project-list">
            <Link to="/AddProject" id="add-project-link">
              <button id="add-project-button">
                <h1>
                  Add Project<i className="add-project-plus fas fa-plus"></i>
                </h1>
              </button>
            </Link>
            <h2 id="project-list-title">Your Projects</h2>
            <ul className="no-bullet">{this.makeProjectsList(this.props.projects)}</ul>
            {!this.context.getIsMobile() && this.renderButton()}
          </div>
          <div id="expanded-project">
            {!this.context.getSelectedProject() ? (
              <h1>No projects to display</h1>
            ) : (
              <>
                <h1 id="project-title">
                  {this.context.getSelectedProject().project_name}
                </h1>
                <div id="project-description">
                  {this.props.selected.description}
                </div>
                <div id="project-dueDate">
                  <p>
                    {!!this.context.getSelectedProject().duedate && "Due Date: "}{this.formatDate(this.context.getSelectedProject().duedate)}
                  </p>
                </div>
                <div className="input-container">
                  <label htmlFor="Status">Status: </label>
                  <select
                    onChange={this.handleChange}
                      value={this.context.getSelectedProject().status}
                    name="status"
                    id="status"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                {this.props.children}
              </>
            )}
          </div>
        </div>
      );
    }
  };
  render() {

    return this.context.getIsMobile()
      ? this.displayProjectListJSXMobile()
      : this.displayProjectListJSX();
  }
}

export default ProjectList;
