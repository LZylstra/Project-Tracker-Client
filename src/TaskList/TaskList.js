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

  componentDidMount = () => {
    const htmlNode = document.getElementById("html");
	  const projectList = document.getElementById("project-list");
	  const taskList = document.getElementById('task-list')
    const x = 1 - (25/window.innerHeight +0.115);
    if(!!projectList && projectList.scrollHeight > window.innerHeight*x){
      htmlNode.style.height = "auto"
    } else if(!!taskList && taskList.scrollHeight > window.innerHeight*x){
		  htmlNode.style.height = "auto"
  	} else {
	  	htmlNode.style.height = "100%"
	  }

  }

  renderButton = () => {
    if(this.context.getisAdmin()){
      return <button onClick={() => this.context.handleDeleteSelected('selectedTasks')}>Delete Selected</button>
    }
    return;
  }

  render() {
    return (
      <div className="task-list" id="task-list">
        {this.renderTaskList()}
        <Link to={`/addtask/${this.props.projectId}`}>
          <button>+ Add Task</button>
        </Link>
        {!this.context.getIsMobile() && this.renderButton()}
      </div>
    );
  }
}

export default TaskList;
