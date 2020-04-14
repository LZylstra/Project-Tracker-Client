import React, { Component } from "react";
import ApiContext from "../ApiContext";
import ProjectList from "../ProjectList/ProjectList";
import TaskList from "../TaskList/TaskList";
import "./CompletedPage.css";

class CompletedPage extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedProject: null,
      completedList: true,

    };
  }

  componentDidMount() {
    this.context.getCompanyInfo();
    const y = 100 - Math.round((25 / window.innerHeight + 0.115) * 10000) / 100;
    document.getElementById("home-completed").style.height = `${y}%`;
    this.context.getProjectsByCompanyId().then((res) => {
      const projects = this.context.getProjects();
      if(projects.length === 0){
        this.setState({
          isLoading: false,
          selectedProject: {},
        });
        return
      }
      const filteredProjects = this.makeCompletedProjectsList(projects);
      this.setState({
        isLoading: false,
        selectedProject: filteredProjects[0],
      });
    });
    
  }


  makeCompletedProjectsList = (projects) => {
    let newList = projects.filter((project) => {
      return project.status === "Closed";
    });
    //this.updateSelected(newList[0]);
    return newList;
  };

  updateSelected = (selected) => {
    this.setState({ selectedProject: selected });
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

      <div id="home-completed">
        {this.state.isLoading ? (
          <p>Loading projects</p>
        ) : (
          <>
            <ProjectList

              projects={this.makeCompletedProjectsList(
                this.context.getProjects()
              )}
              showProjectDetail={this.showProjectDetail}
              selected={this.state.selectedProject}
              type="completed"

            >
              <TaskList
                tasks={this.context.getTasks().filter((task) => {
                  return task.projectid === this.state.selectedProject.id;
                })}
                projectId={this.state.selectedProject.id}
                type="completed"

              />
            </ProjectList>
          </>
        )}
      </div>
    );
  }
}

export default CompletedPage;
