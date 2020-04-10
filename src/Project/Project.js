import React, {Component} from 'react';
import ApiContext from '../ApiContext';
import TaskList from "../TaskList/TaskList";
import './Project.css';

class Project extends Component {
	static contextType = ApiContext;
	state = {
		isExpanded: false
	}

	handleProjectClick = () => {
		const expanded = !this.state.isExpanded
		this.setState({isExpanded: expanded})
	}

	formatDate = (duedate) => { 
		if (duedate) { 
			let extraChars = duedate.indexOf("T");
			return duedate.slice(0, extraChars);
		}
	  
	}

	expandedProject = () => {
		return (
			<div id="expanded-project">
				{
					!this.context.getIsMobile() && 
						<h1 id="project-title">{this.props.project.project_name}</h1>
				}
				<div id="project-description">{this.props.project.description}</div>
				<div id="project-dueDate">Due Date: {this.formatDate(this.props.project.duedate)}</div>
				{
					!this.context.getIsMobile() &&
						(
							<div className="button-container">
								<button>Completed</button>
								<button>Edit</button>
        					</div>
						)
				}
				<TaskList tasks={this.context.getTasks().filter(task => task.projectid === this.props.project.id)}/>
			</div>
		)
	}

	makeProjectPc = project => {
		return (
		 	 <li onClick={() => this.props.showProjectDetail(project.id)} key={project.id} className="project-list-item">
				<span className="project-item-title">{project.project_name}</span>
				<span className="project-priority">{project.priority}</span>
		  	</li>
		  )
	  }

	  makeProjectMobile = project => {
		return (
			<li  key={project.id} className="project-list-item">
				<span className="project-item-title" onClick={this.handleProjectClick}>{project.project_name}</span>
				<span className="project-priority">{project.priority}</span>
				{
					this.state.isExpanded && this.expandedProject()
				}
		  	</li>
		)
	  }

	render(){
		if(this.state.isExpanded){
			document.getElementById('root').style.height = "auto"
		} else {
			document.getElementById('root').style.height = "100%"
		}
		return this.context.getIsMobile() ?
			this.makeProjectMobile(this.props.project) :
			this.makeProjectPc(this.props.project)
	}
}

export default Project;
