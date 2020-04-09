import React, { Component } from "react";
import ApiContext from '../ApiContext';
import "./AddTask.css";

class AddTask extends Component {
  static contextType = ApiContext;

  state = {
    task_name: "",
    assignedto: 1,
    description: "",
    priority: "",
    status: "",
    projectid: 1,
    error: "",
    editmode: false,
 
    
  };
  componentDidMount() {
  
    const companyId = this.context.getCompanyId();
   
        this.context.getUsersByCompanyId(companyId)
         
  
          .catch((res) => this.setState({ error: res.error }))
  
  }

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
  createAssigneeList = (employees) => { 
    return employees.map((employee,index) => <option key={index} value={employee.id}>{employee.full_name}</option>)
  }

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
    this.context.addTask(
    this.state.task_name,
    this.state.assignedto,
    this.state.description,
    this.state.priority,
    this.state.status,
    1,
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
              {this.createAssigneeList(this.context.getEmployees())}
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
