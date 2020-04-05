import React, { Component } from "react";
import ApiContext from '../ApiContext';
import "./AddProject.css";

class AddProject extends Component {
  static contextType = ApiContext;

  state = {
    name: "",
    description: "",
    priority: "",
    dueDate: "",
  };
  clearForm = () => {
    this.setState({
      name: "",
      description: "",
      priority: "",
      dueDate: "",
    });
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  formatDate = (str) => {
    const [year, month, day] = str.split("-");
    return new Date(year, month - 1, day);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);

    this.context.addProject(
      this.state.name,
      this.state.description,
      this.state.priority,
      this.formatDate(this.state.dueDate)
    );
  };
  render() {
    return (
      <div className="form-container">
        <h2>Add Project</h2>
        <form onSubmit={this.handleSubmit}>
          <p className="input-container">
            <label htmlFor="name-input">Project Name:</label>
            <input
              type="text"
              className="name-input"
              name="name"
              value={this.state.name}
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
            <label htmlFor="dueDate">Due date:</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={this.state.dueDate}
              onChange={this.handleChange}
            />
          </p>
          <div className="input-container">
            <label htmlFor="priority"> Priority:</label>
            <input
              type="radio"
              onChange={this.handleChange}
              name="priority"
              checked={this.state.priority === "Urgent"}
              value="Urgent"
            />

            <label className="urgent-priority">Urgent</label>
            <input
              type="radio"
              onChange={this.handleChange}
              name="priority"
              checked={this.state.priority === "High"}
              value="High"
            />
            <label className="high-priority">High</label>

            <input
              type="radio"
              onChange={this.handleChange}
              name="priority"
              checked={this.state.priority === "Medium"}
              value="Medium"
            />
            <label className="medium-priority">Medium</label>
            <input
              type="radio"
              onChange={this.handleChange}
              name="priority"
              checked={this.state.priority === "Low"}
              value="Low"
            />

            <label className="low-priority">Low</label>
          </div>
         
          <div className="button-container">
            <button className="add-button" type="submit">
              Add Project
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

export default AddProject;
