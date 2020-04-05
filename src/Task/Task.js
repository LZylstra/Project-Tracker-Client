import React, {Component} from 'react';
import './Task.css';

class Task extends Component {

  dummyTask = {
    task_name: "clean house",
    assignedTo: "John",
    description:
      "I'm baby kitsch austin farm-to-table enamel pin, quinoa raclette juice biodiesel blog master cleanse quinoa fanny pack literally salvia kitsch synth listicle. Gastropub intelligentsia bicycle rights lyft lumbersexual helvetica cold-pressed iceland.",
    priority: "low",
    status: "in progress",
    datecreated: "10-22-19",
    datemodified: "1-4-20",
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      status: this.dummyTask.status,
	  assignedTo: this.dummyTask.assignedTo,
	  arrowDirection: "fas fa-chevron-right"
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

  render() {
    return (
      <div className="task">
        <div className="task-title-bar">
          <h2 className="task-title" onClick={() => this.toggleExpandTask()}>
            {this.dummyTask.task_name}
            <span className="status">{this.dummyTask.priority}</span>
            <span className="task-arrow">
			<i class={this.state.arrowDirection}></i>
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
                    {this.dummyTask.datecreated}
                  </span>
                </p>
                <p>
                  Date Modified:
                  <span className="modified">
                    {this.dummyTask.datemodified}
                  </span>
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
                <p>{this.dummyTask.description}</p>
              </div>
            </div>
            <div className="admin-button-container">
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Task;
