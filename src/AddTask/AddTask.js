import React, { Component } from "react";
import "./AddTask.css";

class AddTask extends Component {
  state = {
    task_name:"",
    assignedto:"",
    description:"",
    priority:"",
    status:"",
    projectid:this.props.projectId,
    error: "",
    editmode:false
  };

  clearForm = () => {
    this.setState({
      task_name: "",
      description: "",
      assignedto: "",
      priority: "",
      status: "",
      projectid:""
    });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.context.addTask(
    this.state.task_name,
    this.state.assignedto,
    this.state.description,
    this.state.priority,
    this.state.status,
    this.state.projectid,
    )
  };
  render() {
    return (
      <div className="form-container">
        <h2>Add Task</h2>
        <form onSubmit={this.handleSubmit}>
          <p className="input-container">
            <label htmlFor="name-input">Task Name:</label>
            <input
              type="text"
              className="name-input"
              name="task_name"
              value={this.state.task_name}
              onChange={this.handleChange}
            />
          </p>
          <p className="input-container">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              className="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </p>
          <p className="input-container">
            <label htmlFor="assignment">Assign To:</label>
            <select
              onChange={this.handleChange}
              value={this.state.assignedto}
              name="assignedto"
              id="assignment"
            >
              <option>User 1</option>
              <option>User 2</option>
            </select>
          </p>
          {this.props.taskId && (
            <p className="input-container">
              <label htmlFor="status">Status:</label>
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
            </p>
          )}
          <div className="input-container">
            <label htmlFor="priority"> Priority:</label>

            <input
              type="radio"
              onChange={this.handleChange}
              name="priority"
              checked={this.state.priority === "high"}
              value="high"
            />
            <label className="high-priority">High</label>

            <input
              type="radio"
              onChange={this.handleChange}
              name="priority"
              checked={this.state.priority === "medium"}
              value="medium"
            />
            <label className="medium-priority">Medium</label>
            <input
              type="radio"
              onChange={this.handleChange}
              name="priority"
              checked={this.state.priority === "low"}
              value="low"
            />

            <label className="low-priority">Low</label>
          </div>
          <div className="button-container">
            <button className="add-button" type="submit">
              Add Task
            </button>
            <button className="clear-button" onClick={this.clearForm}>
              Clear
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTask;
