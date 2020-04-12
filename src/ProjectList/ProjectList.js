import React, { Component } from "react";
import ApiContext from "../ApiContext";
import Project from "../Project/Project";
import { Link } from "react-router-dom";
import "./ProjectList.css";

class ProjectList extends Component {
  static contextType = ApiContext;

  formatDate = (duedate) => {
    if (duedate) {
      let extraChars = duedate.indexOf("T");
      return duedate.slice(0, extraChars);
    }
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
    const pListHeight = document.getElementById("project-list").scrollHeight;
    const x = 1 - (25 / window.innerHeight + 0.115);
    if (pListHeight > window.innerHeight * x) {
      htmlNode.style.height = "auto";
      //console.log(htmlNode.style.height)
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
            <ul>{this.makeProjectsList(this.props.projects)}</ul>
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
            <ul>{this.makeProjectsList(this.props.projects)}</ul>
          </div>
        </div>
      );
    }
  };

  renderButton = () => {
    if (this.context.getisAdmin()) {
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
            <ul>{this.makeProjectsList(this.props.projects)}</ul>
            {!this.context.getIsMobile() && this.renderButton()}
          </div>
          <div id="expanded-project">
            <h1 id="project-title">{this.props.selected.project_name}</h1>
            <div id="project-description">
              {this.props.selected.description}
            </div>
            <div id="project-dueDate">
              Due Date: {this.formatDate(this.props.selected.duedate)}
            </div>
            {this.props.children}
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
            <ul>{this.makeProjectsList(this.props.projects)}</ul>
            {!this.context.getIsMobile() && this.renderButton()}
          </div>
          <div id="expanded-project">
            <h1 id="project-title">{this.props.selected.project_name}</h1>
            <div id="project-description">
              {this.props.selected.description}
            </div>
            <div id="project-dueDate">
              Due Date: {this.formatDate(this.props.selected.duedate)}
            </div>
            {this.props.children}
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
