import Task from "./Task";
import React from "react";
import ApiContext from '../ApiContext';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

it("renders without crashing", () => {
  const getIsMobile = jest.fn();
  const getisAdmin = jest.fn();
  const getCompanyId = jest.fn();
  const removeFromTasksSelected = jest.fn();
  const addToTasksSelected = jest.fn();
  const editTask = jest.fn();
  const getEmployees = jest.fn();
  const getUsersByCompanyId = jest.fn();
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ApiContext.Provider value={{
        getIsMobile,
        getisAdmin,
        getCompanyId,
        removeFromTasksSelected,
        addToTasksSelected,
        editTask,
        getEmployees,
        getUsersByCompanyId
      }}>
        <Task />
      </ApiContext.Provider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
