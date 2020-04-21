import React, { Component } from "react";
import ApiContext from "../../context/ApiContext";
import ProjectList from "../../components/ProjectList/ProjectList";
//import TaskList from "../TaskList/TaskList";
import "./Home.css";
import ProjectApiService from "../../services/projects-api-service";

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
    ProjectApiService.getProjectsByCompanyId().then((res) => {
      const projects = ProjectApiService.getProjects();
      const filteredList = this.makeOpenProjectsList(projects);
      this.setState({
        isLoading: false,
        selectedProject: filteredList[0],
      });
    });
    ProjectApiService.getCompanyInfo();
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
    this.context.setSelectedProject(selected);
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
              selected={this.context.getSelectedProject()}
              type="normal"
            >
              {/* {
                this.context.getProjects().length > 0 ?
                  <TaskList
                  tasks={this.context.getTasks().filter((task) => {
                    return task.projectid === this.context.getSelectedProject().id;
                  })}
                  projectId={this.context.getSelectedProject().id}
                  type="normal"
                /> :
                <h1>No projects to display</h1>
              } */}
            </ProjectList>
          </>
        )}
      </div>
    );
  }
}

export default Home;
