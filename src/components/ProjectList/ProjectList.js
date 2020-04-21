import React, { Component } from "react";
import ApiContext from "../../context/ApiContext";
import Project from "../Project/Project";
import { Link } from "react-router-dom";
import ExpandedProject from "../ExpandedProject/ExpandedProject";
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

  // Map list of projects into Project component
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
    // formatting for mobile vs desktop
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

  // Display minimal functionality components if mobile
  displayProjectListJSXMobile = () => {
    let listType = this.props.type;
    if (listType === "completed") {
      return (
        <div className="project-info">
          <div id="project-list">
            <h2 id="project-list-title">Completed Projects</h2>
            <ul className="no-bullet">
              {this.makeProjectsList(this.props.projects)}
            </ul>
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
            <ul className="no-bullet">
              {this.makeProjectsList(this.props.projects)}
            </ul>
          </div>
        </div>
      );
    }
  };

  renderButton = () => {
    // Displays delete buttons and check boxes only if user is admin
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

  // Display full functionality if desktop
  displayProjectListJSX = () => {
    let listType = this.props.type;
    if (listType === "completed") {
      return (
        <div className="project-info">
          <div id="project-list">
            <h2 id="project-list-title">Completed Projects</h2>
            <ul className="no-bullet">
              {this.makeProjectsList(this.props.projects)}
            </ul>
            {!this.context.getIsMobile() && this.renderButton()}
          </div>
          <ExpandedProject type="completed" selected={this.props.selected} />
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
            <ul className="no-bullet">
              {this.makeProjectsList(this.props.projects)}
            </ul>
            {!this.context.getIsMobile() && this.renderButton()}
          </div>
          <ExpandedProject type="normal" selected={this.props.selected} />
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
