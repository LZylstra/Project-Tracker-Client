import Project from "./Project";
import React from "react";
import ApiContext from '../ApiContext';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

it("renders without crashing", () => {
  const getIsMobile  = jest.fn();
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <ApiContext.Provider value={{ getIsMobile }}>
        <Project />
      </ApiContext.Provider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div)
});
