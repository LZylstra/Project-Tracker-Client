import React, { Component } from "react";
import Task from "../Task/Task";
import "./TaskList.css";

class TaskPage extends Component {
  dummyTasks = [
    {
      id: 1,
      task_name: "make react components",
      assignedTo: "Sarah",
      description:
        "Distillery meditation before they sold out hell of mustache dolore stumptown in deep v ethical iPhone. Church-key aliquip leggings nulla, eiusmod yuccie cornhole selfies typewriter YOLO hexagon",
      priority: "Medium",
      status: "in progress",
      datecreated: "1-9-20",
      datemodified: "2-11-20",
    },
    {
      id: 2,
      task_name: "clean house",
      assignedTo: "John",
      description:
        "trade vinyl godard swag. Vexillologist letterpress dreamcatcher man bun blog aesthetic knausgaard keytar dolore YOLO magna. Cliche yuccie sunt, farm-to-table live-edge vegan organic. Deserunt twee est, raclette YOLO knausgaard viral tumeric locavore laborum sustainable street art edison bulb.",
      priority: "Low",
      status: "in progress",
      datecreated: "3-22-20",
      datemodified: "4-1-20",
    },
    {
      id: 3,
      task_name: "fix the roof",
      assignedTo: "Natalie",
      description:
        "Meh ut chillwave mollit, chartreuse leggings non. Poke mumblecore cliche occupy iceland viral deep v authentic lo-fi tbh pinterest letterpress cillum. Wayfarers distillery ugh skateboard ipsum,",
      priority: "High",
      status: "completed",
      datecreated: "12-22-19",
      datemodified: "1-10-20",
    },
    {
      id: 4,
      task_name: "cook lasagna",
      assignedTo: "James",
      description:
        "swag pinterest. Biodiesel elit DIY plaid knausgaard. Dolore cold-pressed minim, cornhole raw denim fam woke ex slow-carb hella poke lo-fi enim etsy culpa. Messenger bag affogato chambray hexagon tempor keytar.",
      priority: "Low",
      status: "New",
      datecreated: "12-30-19",
      datemodified: "1-6-20",
    },
  ];
  static defaultProps = { tasks: [] };

  renderTaskList = () => {
    const tasksForProject = this.dummyTasks;
    const taskList = tasksForProject.map((task) => (
      <Task
        key={task.id}
        task_name={task.task_name}
        assignedTo={task.assignedTo}
        description={task.description}
        priority={task.priority}
        status={task.status}
        datecreated={task.datecreated}
        datemodified={task.datemodified}
      />
    ));
    return taskList;
  };

  render() {
    return <div className="task-list">{this.renderTaskList()}</div>;
  }
}

export default TaskPage;
