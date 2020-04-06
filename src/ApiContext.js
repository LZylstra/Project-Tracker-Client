import React from 'react'

export default React.createContext({
    login: () => {},
    getProjects: () => {},
    getUserIsAdmin: () =>{},
    getTasks: () => {},
    getCompanyInfo: ()=> {},
    signUp: () => { },
    showApiError: () => {},
    //project endpoint api calls
    getProjectsByCompanyId: () => { },
    getProjectById: () => { },
    addProject: () => {},
    deleteProject: () => {},
    editProject: () => { },
    //task endpoint api calls
    getTasksByProjectId: () => { },
    getTasksByCompanyId: () => { },
    getTaskById: () => { },
    addTask: () => { },
    editTask: () => { },
    deleteTask: () => { }
    

    
})

