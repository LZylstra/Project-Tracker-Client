import React, { Component } from "react";
import Task from "../Task/Task";
import "./TaskList.css";

class TaskPage extends Component {
  static defaultProps = { tasks: [] };

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
        task_name={task.task_name}
        assignedTo={task.assignedTo}
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
    return <div className="task-list">{this.renderTaskList()}
    </div>;
  }
}

export default TaskPage;
