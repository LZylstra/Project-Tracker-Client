import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import ProjectList from '../ProjectList/ProjectList';
import './Home.css';

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
		  selectedProject:projects[0]
      });
    });
	}
	
	showProjectDetail = (id) => {
	const projects = this.context.getProjects();
    const selected = projects.find((project) => project.id === id);
    this.setState({
      selectedProject:selected
    });
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <p>Loading projects</p>
        ) : (
					<ProjectList projects={this.context.getProjects()}
						showProjectDetail={this.showProjectDetail}
						selected={this.state.selectedProject}/>
        )}
      </div>
    );
  }
}

export default Home;
