import React, { Component } from "react";
import ApiContext from "../../context/ApiContext";
import ProjectList from "../../components/ProjectList/ProjectList";
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
      const filteredList = this.makeOpenProjectsList(projects);
      this.setState({
        isLoading: false,
        selectedProject: filteredList[0],
      });
    });
    this.context.getCompanyInfo();
  }

  // Filter list of projects to only show only when status is not completed
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
            ></ProjectList>
          </>
        )}
      </div>
    );
  }
}

export default Home;
