import React from "react";

const ApiContext = React.createContext({
  login: () => {},
  getProjects: () => {},
  getUserIsAdmin: () => {},
  getTasks: () => {},
  getCompanyId: () => {},
  getCompanyInfo: () => {},
  signUp: () => {},
  showApiError: () => {},
  //project endpoint api calls
  getProjectsByCompanyId: () => {},
  getProjectById: () => {},
  addProject: () => {},
  deleteProject: () => {},
  editProject: () => {},
  //task endpoint api calls
  getTasksByProjectId: () => {},
  getTasksByCompanyId: () => {},
  getTaskById: () => {},
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  getUsersByCompanyId: () => {},
});

export default ApiContext;
