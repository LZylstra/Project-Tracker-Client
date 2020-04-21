import React, { Component } from "react";
import ApiContext from "../../context/ApiContext";
import TaskList from "../TaskList/TaskList";
import "./ExpandedProject.css";

class ExpandedProject extends Component {
  static contextType = ApiContext;

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
      .editProject(
        {
          [name]: value,
        },
        id
      )

      .catch((res) => this.setState({ error: res.error }));
  };

  // Creates dropdown with status
  renderStatus = () => {
    return (
      !!this.context.getSelectedProject().status && (
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
      )
    );
  };

  render() {
    return (
      <div id="expanded-project">
        {/* Handles case of no projects */}
        {!this.context.getSelectedProject() ? (
          <h1>No completed projects to display</h1>
        ) : (
          <>
            <h1 id="project-title">{this.props.selected.project_name}</h1>
            <div id="project-description">
              {this.props.selected.description}
            </div>
            <div id="project-dueDate">
              <p>Due Date: {this.formatDate(this.props.selected.duedate)}</p>
            </div>
            {this.props.children}
            {this.props.type === "normal" ? this.renderStatus() : <></>}
          </>
        )}
        {/* Handles case of no projects */}
        {this.context.getProjects().length > 0 ? (
          <TaskList
            tasks={this.context.getTasks().filter((task) => {
              return task.projectid === this.context.getSelectedProject().id;
            })}
            projectId={this.context.getSelectedProject().id}
            type={this.props.type}
          />
        ) : (
          <h1>No projects to display</h1>
        )}
      </div>
    );
  }
}

export default ExpandedProject;
