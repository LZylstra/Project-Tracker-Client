import React, { Component } from "react";
import "./AddTask.css";

class AddTask extends Component {
  state = {
    name: "",
    description: "",
    priority: "",
	  assignment: "",
	projectName:""
  };

  clearForm = () => {
    this.setState({
      name: "",
      description: "",
      priority: "",
      assignment: "",
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
    console.log(this.state);
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
            <label htmlFor="assignment">Assign To:</label>
            <select
              onChange={this.handleChange}
              value={this.state.assignment}
              name="assignment"
              id="assignment"
            >
              <option>User 1</option>
              <option>User 2</option>
            </select>
          </p>
          <p className="input-container">
            <label htmlFor="projectName">For Project:</label>
            <select
              onChange={this.handleChange}
              value={this.state.projectName}
              name="projectName"
              id="projectName"
            >
              <option>Capstone</option>
              <option>no covid news</option>
            </select>
          </p>

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
