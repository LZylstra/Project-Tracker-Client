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

    makeCompletedProjectsList = projects => {
        return projects.map(project => (
          <Project showProjectDetail={this.props.showProjectDetail} project={project} children={this.props.children} key={project.id}/>
        ));
      };
  }

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
              projects={this.context.getProjects()}
              showProjectDetail={this.showProjectDetail}
              selected={this.state.selectedProject}
            >
              <TaskList
                tasks={this.context.getTasks().filter((task) => {
                  return task.projectid === this.state.selectedProject.id;
                })}
                projectId={this.state.selectedProject.id}
              />
            </ProjectList>
          </>
        )}
      </div>
    );
  }
}

export default CompletedPage;
