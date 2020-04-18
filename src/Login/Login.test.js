import Login from './Login';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';


it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<BrowserRouter>
			<Login/>
		</BrowserRouter>,
		div
	)
	ReactDOM.unmountComponentAtNode(div)
})
