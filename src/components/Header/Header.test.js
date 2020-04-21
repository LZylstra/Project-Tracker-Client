import Header from './Header';
import React from 'react';
import ApiContext from '../ApiContext';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';


it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
    <BrowserRouter>
      <ApiContext.Provider>
        <Header />
      </ApiContext.Provider>
    </BrowserRouter>,
    div
  );
	ReactDOM.unmountComponentAtNode(div)
})
