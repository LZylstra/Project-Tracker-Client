import React, { Component } from "react";
import ApiContext from "../ApiContext";
// import config from "../config";
import "./AddProject.css";

class AddProject extends Component {
  static contextType = ApiContext;
  state = {
    name: "",
    description: "",
    priority: "",
    dueDate: "",
    status: "",
    editMode: false,
    error: "",
  };

  componentDidMount() {
    if (this.props.projectId) {
      this.context
        .getProjectById(this.props.projectId)
        .then((res) => {
          const formattedDueDate = res.duedate
            ? this.formatDateFromServer(res.duedate)
            : "";
          this.setState({
            name: res.project_name,
            description: res.description,
            priority: res.priority,
            dueDate: formattedDueDate,
            status: res.status,
            editMode: true,
          });
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  formatDateFromServer = (str) => {
    const end = str.indexOf("T");
    return str.slice(0, end);
  };

  formatDateForAPI = (str) => {
    const [year, month, day] = str.split("-");
    return new Date(year, month - 1, day);
  };

  handleAddProject = () => {
    this.context
      .addProject(
        this.state.name,
        this.state.description,
        this.state.priority,
        this.formatDateForAPI(this.state.dueDate)
      )
      .then((res) => {
        //console.log(res)
        if (this.context.getProjects().length === 0) {
          // console.log(res)
          this.context.setSelectedProject(res);
        }
        this.props.history.push("/");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  handleEditProject = () => {
    this.context
      .editProject(
        this.state.name,
        this.state.description,
        this.state.priority,
        this.formatDateForAPI(this.state.dueDate),
        this.state.status,
        this.props.projectId
      )
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ error: "" });

    let formatname = this.state.name.trim();
    if (formatname === "") {
      this.setState({
        error: "Please enter a valid project name",
        name: "",
      });
      return;
    }

    if (this.state.editMode) {
      this.handleEditProject();
    } else {
      this.handleAddProject();
    }
  };
  render() {
    return (
      <div id="form-container">
        <h2>{this.state.editMode ? "Edit Project" : "Add Project"}</h2>
        {this.state.error && <p className="error">{this.state.error}</p>}

        <form onSubmit={this.handleSubmit}>
          <p className="input-container">
            <label htmlFor="name-input">Project Name:</label>
            <input
              required
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
          {this.props.projectId && (
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
              required
              type="radio"
              onChange={this.handleChange}
              name="priority"
              checked={this.state.priority === "Urgent"}
              value="Urgent"
            />

            <label className="urgent-priority">Urgent</label>
            <input
              required
              type="radio"
              onChange={this.handleChange}
              name="priority"
              checked={this.state.priority === "High"}
              value="High"
            />
            <label className="high-priority">High</label>

            <input
              required
              type="radio"
              onChange={this.handleChange}
              name="priority"
              checked={this.state.priority === "Medium"}
              value="Medium"
            />
            <label className="medium-priority">Medium</label>
            <input
              required
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
              {this.state.editMode ? "Edit Project" : "Add Project"}
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

export default AddProject;
