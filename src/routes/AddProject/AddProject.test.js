import AddProject from './AddProject';
import React from 'react';
import ApiContext from "../../context/ApiContext";
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';


it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
    <BrowserRouter>
      <ApiContext.Provider>
        <AddProject />
      </ApiContext.Provider>
    </BrowserRouter>,
    div
  );
	ReactDOM.unmountComponentAtNode(div)
})
