import config from "../config";

//Api calls to projects endpoint
const ProjectApiService = {
  getCompanyInfo() {
    const options = config.getOptions("get");
    if (!!window.sessionStorage.jwt) {
      Promise.all([
        fetch(this.configUrl("projects"), options),
        fetch(this.configUrl("tasks"), options),
      ])
        .then((res) => Promise.all([res[0].json(), res[1].json()]))
        .then((res) => {
          if (this.state.selectedProject) {
            if (JSON.stringify(this.state.selectedProject).length === 2) {
              this.setState({ selectedProject: res[0][0] });
            }
          }
          this.setState({
            projects: [...res[0]],
            tasks: [...res[1]],
            selectedProjects: [],
            selectedTasks: [],
          });
        })
        .catch((err) => console.error(err));
    }
  },

  getProjectsByCompanyId() {
    const options = config.getOptions("get");
    const url = `${config.API}/api/projects/c/${this.state.companyId}`;
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((projectsResponse) =>
        this.setState({
          projects: projectsResponse,
        })
      )
      .catch((res) => this.setState({ apiError: res.error }));
  },
  addProject(project_name, description, priority, duedate) {
    const options = config.getOptions("post");
    const url = `${config.API}/api/projects/c/${this.state.companyId}`;
    options.body = JSON.stringify({
      project_name,
      description,
      priority,
      dateadded: new Date(),
      duedate,
    });
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((project) => {
        this.setState({
          projects: [...this.state.projects, project],
        });
        if (this.state.projects.length === 1) {
          this.setSelectedProject(project);
        }
        return project;
      });
  },
  getProjectById(id) {
    const options = config.getOptions("get");
    const url = `${config.API}/api/projects/${id}`;
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }
      return res.json();
    });
  },

  editProject(status, id) {
    const options = config.getOptions("patch");
    const url = `${config.API}/api/projects/${id}`;
    options.body = JSON.stringify(status);
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }
      const projectToUpdate = this.state.projects.find(
        (project) => project.id === id
      );

      const updatedProject = { ...projectToUpdate, ...status };

      const indexToUpdate = this.state.projects.findIndex(
        (project) => project.id === id
      );
      let projectsCopy = [...this.state.projects];
      projectsCopy[indexToUpdate] = updatedProject;

      this.setState({
        projects: projectsCopy,
        selectedProject: updatedProject,
      });
    });
  },

  deleteProject(id) {
    const options = config.getOptions("delete");
    const url = `${config.API}/api/projects/${id}`;
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }
      const otherProjects = this.state.projects.filter(
        (project) => project.id !== id
      );
      this.setState({
        projects: otherProjects,
      });
    });
  },

  deleteSelectedProjects() {
    const ids = this.state.selectedProjects.map((id) => parseInt(id));
    if (ids.length === this.state.projects.length) {
      this.setState({ selectedProject: {} });
    }
    this.setState({ showPopUp: false });
    Promise.all(ids.map((id) => this.deleteProject(id))).then((res) =>
      this.setState({ selectedProjects: [] })
    );
  },
};

export default ProjectApiService;
