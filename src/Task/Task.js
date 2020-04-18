import React, { Component } from "react";

import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import "./Task.css";

class Task extends Component {
  static contextType = ApiContext;

  static defaultProps = { task: {} };
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      status: this.props.status,
      assignedto: this.props.assignedto,
      arrowDirection: "fas fa-chevron-right",
      isSelected: false,
    };
  }
  componentDidMount() {
    const companyId = this.context.getCompanyId();
    this.context
      .getUsersByCompanyId(companyId)
      .catch((res) => this.setState({ error: res.error }));
  }

  createAssigneeList = (employees) => {
    return employees.map((employee, index) => (
      <option key={index} value={employee.id}>
        {employee.full_name}
      </option>
    ));
  };

  checkStatus = () => {
    if (this.props.status === "Closed") {
      return <i className="fas fa-check"></i>;
    }
  };

  toggleExpandTask = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
      arrowDirection:
        this.state.arrowDirection === "fas fa-chevron-right"
          ? "fas fa-chevron-down"
          : "fas fa-chevron-right",
    });
  };
  renderCheckboxes = () => {
    if (this.context.getisAdmin()) {
      return (
        <>
          <label
            htmlFor={`select-task-${this.props.taskId}`}
            className="hidden-label"
          >
            Select task {this.props.task_name}
          </label>
          <input
            type="checkbox"
            id={`select-task-${this.props.taskId}`}
            onChange={this.handleCheckBox}
          />
        </>
      );
    }
    return;
  };

  handleCheckBox = () => {
    const isSelected = !this.state.isSelected;
    if (this.state.isSelected) {
      this.context.removeFromTasksSelected(this.props.taskId);
    } else {
      this.context.addToTasksSelected(this.props.taskId);
    }
    this.setState({ isSelected: isSelected });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
    //make patch request to api to update task
    this.context
      .editTask(
        {
          [name]: value,
        },
        this.props.taskId
      )
      .catch((res) => this.setState({ error: res.error }));
  };

  renderPriority = (priority) => {
    let priorityColor;
    switch (priority) {
      case "High":
        priorityColor = "red";
        break;
      case "Medium":
        priorityColor = "orange";
        break;
      case "Low":
        priorityColor = "lightgreen";
        break;
      case "Urgent":
        priorityColor = "darkred";
        break;
      default:
        priorityColor = "lightgreen";
        break;
    }
    return priorityColor;
  };

  render() {
    let listType = this.props.type;
    if (listType === "completed") {
      return (
        <div className="task">
          <div className="task-title-bar">
            {this.checkStatus()}
            {!this.context.getIsMobile() && this.renderCheckboxes()}

            <h2 className="task-title" onClick={() => this.toggleExpandTask()}>
              {this.props.task_name}
              <span
                className="priority"
                style={{ color: `${this.renderPriority(this.props.priority)}` }}
              >
                {this.props.priority}
              </span>
              <span className="task-arrow">
                <i className={this.state.arrowDirection}></i>
              </span>
            </h2>
          </div>
          {this.state.isExpanded && (
            <div className="hidden-task-info">
              <div className="task-details">
                <div className="task-details-sidebar">
                  <p>
                    Date Created:
                    <span className="date-created">
                      {" "}
                      {this.props.datecreated}
                    </span>
                  </p>
                  <p>
                    Date Modified:
                    <span className="modified"> {this.props.datemodified}</span>
                  </p>

                  <div className="input-container">
                    <p>Status: {this.state.status} </p>
                  </div>
                </div>
                <div className="task-description" style={{ width: "60%" }}>
                  <p>{this.props.description}</p>
                </div>
              </div>

              {!this.context.getIsMobile() && (
                <div className="admin-button-container">
                  <Link to={`/edit/task/${this.props.taskId}`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => this.context.deleteTask(this.props.taskId)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="task">
        <div className="task-title-bar">
          {this.checkStatus()}
          {!this.context.getIsMobile() && this.renderCheckboxes()}
          <h2 className="task-title" onClick={() => this.toggleExpandTask()}>
            {this.props.task_name}
            <span
              className="priority"
              style={{ color: `${this.renderPriority(this.props.priority)}` }}
            >
              {this.props.priority}
            </span>
            <span className="task-arrow">
              <i className={this.state.arrowDirection}></i>
            </span>
          </h2>
        </div>
        {this.state.isExpanded && (
          <div className="hidden-task-info">
            <div className="task-details">
              <div className="task-details-sidebar">
                <p>
                  Date Created:
                  <span className="date-created">
                    {" "}
                    {this.props.datecreated}
                  </span>
                </p>
                <p>
                  Date Modified:
                  <span className="modified"> {this.props.datemodified}</span>
                </p>

                <div className="input-container">
                  <label htmlFor="assignment">Assign To: </label>
                  <select
                    onChange={this.handleChange}
                    value={this.state.assignedto}
                    name="assignedto"
                    id="assignedto"
                  >
                    {this.createAssigneeList(this.context.getEmployees())}
                  </select>
                </div>

                <div className="input-container">
                  <label htmlFor="Status">Status: </label>
                  <select
                    onChange={this.handleChange}
                    value={this.state.status}
                    name="status"
                    id="status"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="task-description" style={{ width: "60%" }}>
                <p>{this.props.description}</p>
              </div>
            </div>
            <div className="admin-button-container">
              <Link to={`/edit/task/${this.props.taskId}`}>
                <button className="edit-button">Edit</button>
              </Link>
              <button
                className="delete-button"
                onClick={() => this.context.deleteTask(this.props.taskId)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Task;
