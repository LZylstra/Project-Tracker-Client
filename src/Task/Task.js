import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import "./Task.css";

class Task extends Component {

  static contextType = ApiContext;

  static defaultProps = { task: {} };


  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      status: this.props.status,
      assignedTo: this.props.assignedTo,
      arrowDirection: "fas fa-chevron-right",
    };
  }

  toggleExpandTask = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
      arrowDirection:
        this.state.arrowDirection === "fas fa-chevron-right"
          ? "fas fa-chevron-down"
          : "fas fa-chevron-right",
    });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
    //make patch request to api to update task
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
    return (
      <div className="task">
        <div className="task-title-bar">
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
                  <span className="date-created">{this.props.datecreated}</span>
                </p>
                <p>
                  Date Modified:
                  <span className="modified">{this.props.datemodified}</span>
                </p>

                <div className="input-container">
                  <label htmlFor="assignment">Assign To:</label>
                  <select
                    onChange={this.handleChange}
                    value={this.state.assignment}
                    name="assignment"
                    id="assignment"
                  >
                    <option value="user1">User 1</option>
                    <option value="user2"> User 2</option>
                  </select>
                </div>

                <div className="input-container">
                  <label htmlFor="Status">Status:</label>
                  <select
                    onChange={this.handleChange}
                    value={this.state.assignment}
                    name="status"
                    id="status"
                  >
                    <option value="new">New</option>
                    <option value="in progress">In Progress</option>
                    <option value="on hold">On Hold</option>
                    <option value="closed">Closed</option>
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
              <button className="delete-button" onClick={()=>this.context.deleteTask(this.props.taskId)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Task;
