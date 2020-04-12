import Project from "./Project";
import React from "react";
import ApiContext from "../ApiContext";
import App from "../App/App";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ApiContext.Provider>
        <App>
          <Project />
        </App>
      </ApiContext.Provider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
