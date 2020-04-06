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
		projects: [],
		tasks:[]
		
    };
  }

  componentDidMount() {
    this.context.getProjectsByCompanyId().then((res) => {
      const projects = this.context.getProjects();
      this.setState({
        isLoading: false,
        projects: projects,
      });
    });
	}
	
	render() {
		return <div>{ this.state.isLoading?<p>Loading projects</p> : <ProjectList projects={this.state.projects} />
	}</div>;
  }
}

export default Home;
