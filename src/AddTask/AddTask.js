import React, { Component } from "react";
import ApiContext from "../ApiContext";
import "./AddTask.css";

class AddTask extends Component {
  static contextType = ApiContext;
  
  state = {
    task_name: "",
    assignedto: 1,
    description: "",
    priority: "",
    status: "",
    projectid: this.props.projectId,
    error: "",
    editmode: false,
  };
  componentDidMount() {
    
    const companyId = this.context.getCompanyId();
    this.context
      .getUsersByCompanyId(companyId)
      .catch((res) => this.setState({ error: res.error }));

    if (this.props.taskId) {
      this.context
        .getTaskById(this.props.taskId)
        .then((res) => {
          this.setState({
            task_name: res.task_name,
            description: res.description,
            assignedto: res.assignedto,
            priority: res.priority,
            status: res.status,
            editMode: true,
          });
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }
  }

  createAssigneeList = (employees) => {
    return employees.map((employee, index) => (
      <option key={index} value={employee.id}>
        {employee.full_name}
      </option>
    ));
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleAddTask = () => {
    this.context
      .addTask({
        task_name: this.state.task_name,
        assignedto: this.state.assignedto,
        description: this.state.description,
        priority: this.state.priority,
        status: this.state.status
      },
      this.state.projectid
      )
      .catch((res) => this.setState({ error: res.error }));
  };
  handleEditTask = () => {
    this.context
      .editTask(
        {
          task_name: this.state.task_name,
          assignedto: this.state.assignedto,
          description: this.state.description,
          priority: this.state.priority,
          status: this.state.status,
        },
        this.props.taskId
      )
      .catch((res) => this.setState({ error: res.error }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ error: "" });

    if (this.props.taskId) {
      this.handleEditTask();
    } else {
      this.handleAddTask();
    }
    this.props.history.push("/")
   
  };

  render() {
    return (
      <div className="form-container">
        <h2>{this.state.editMode ? "Edit Task" : "Add Task"}</h2>
        {/* {this.state.error && <p className="error">{this.state.error}</p>} */}

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
            <button type="submit">
              {this.state.editMode ? "Edit Task" : "Add Task"}
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => this.props.history.push("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTask;
