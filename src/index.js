import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import Root from './Root/Root';




ReactDOM.render(
  <BrowserRouter>
    <Root/>
  </BrowserRouter>,
  document.getElementById('root')
);

