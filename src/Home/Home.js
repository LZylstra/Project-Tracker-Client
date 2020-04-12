import React, { Component } from "react";
import ApiContext from "../ApiContext";
import ProjectList from "../ProjectList/ProjectList";
import TaskList from "../TaskList/TaskList";
import "./Home.css";

class Home extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedProject: null,
    };
  }

  componentDidMount() {
    this.context.getProjectsByCompanyId().then((res) => {
      const projects = this.context.getProjects();
      this.setState({
        isLoading: false,
        selectedProject: projects[0],
      });
    });
    this.context.getCompanyInfo();
  }
  makeOpenProjectsList = (projects) => {
    let newList = projects.filter((project) => {
      return project.status !== "Closed";
    });

    return newList;
  };

  showProjectDetail = (id) => {
    const projects = this.context.getProjects();
    const selected = projects.find((project) => project.id === id);
    this.setState({
      selectedProject: selected,
    });
  };

  render() {
    return (
      <div id="home">
        {this.state.isLoading ? (
          <p>Loading projects</p>
        ) : (
          <>
            <ProjectList
              projects={this.makeOpenProjectsList(this.context.getProjects())}
              showProjectDetail={this.showProjectDetail}
              selected={this.state.selectedProject}
              type="normal"
            >
              <TaskList
                tasks={this.context.getTasks().filter((task) => {
                  return task.projectid === this.state.selectedProject.id;
                })}
                projectId={this.state.selectedProject.id}
                type="normal"
              />
            </ProjectList>
          </>
        )}
      </div>
    );
  }
}

export default Home;
