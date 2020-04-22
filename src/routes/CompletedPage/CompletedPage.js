import React, { Component } from "react";
import ApiContext from "../../context/ApiContext";
import ProjectList from "../../components/ProjectList/ProjectList";
import "./CompletedPage.css";

class CompletedPage extends Component {
  static contextType = ApiContext;

  state = {
    isLoading: true,
    selectedProject: {},
    completedList: true,
  };

  componentDidMount() {
    // Handle mobile view and desktop view

    this.context.getCompanyInfo();
    const y = 100 - Math.round((25 / window.innerHeight + 0.115) * 10000) / 100;
    document.getElementById("home-completed").style.height = `${y}%`;
    this.context.getProjectsByCompanyId().then((res) => {
      const projects = this.context.getProjects();
      const filteredProjects = this.makeCompletedProjectsList(projects);
      if (projects.length === 0 || filteredProjects.length === 0) {
        this.setState({
          isLoading: false,
        });
        this.context.setSelectedProject({})
        return;
      }
      this.setState({
        isLoading: false,
      });
      this.context.setSelectedProject(filteredProjects[0])
    });
  }

  makeCompletedProjectsList = (projects) => {
    let newList = projects.filter((project) => {
      return project.status === "Closed";
    });
    return newList;
  };

  updateSelected = (selected) => {
    this.setState({ selectedProject: selected });
  };

  // Display the details for a project
  showProjectDetail = (id) => {
    const projects = this.context.getProjects();
    const selected = projects.find((project) => project.id === id);
    this.context.setSelectedProject(selected)
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
              selected={this.context.getSelectedProject()}
              type="completed"
            ></ProjectList>
          </>
        )}
      </div>
    );
  }
}

export default CompletedPage;
