import React, { Component } from "react";
import Task from "../Task/Task";
import { Link } from "react-router-dom";
import ApiContext from '../ApiContext';
import "./TaskList.css";

class TaskList extends Component {
  static defaultProps = { tasks: [] };
  static contextType =ApiContext;

  formatDate = (duedate) => {
    if (duedate) {
      let extraChars = duedate.indexOf("T");
      return duedate.slice(0, extraChars);
    }
  };

  renderTaskList = () => {
    const tasksForProject = this.props.tasks;
    const taskList = tasksForProject.map((task) => (
      <Task
        key={task.id}
        taskId={task.id}
        task_name={task.task_name}
        assignedto={task.assignedto}
        description={task.description}
        priority={task.priority}
        status={task.status}
        datecreated={this.formatDate(task.datecreated)}
        datemodified={this.formatDate(task.datemodified)}
      />
    ));
    return taskList;
  };

  render() {
    return (
      <div className="task-list">
        {this.renderTaskList()}
        <Link to={`/addtask/${this.props.projectId}`}>
          <button>+ Add Task</button>
        </Link>
        {!this.context.getIsMobile() && <button onClick={() => this.context.handleDeleteSelected('selectedTasks')}>Delete Selected</button>}
      </div>
    );
  }
}

export default TaskList;
