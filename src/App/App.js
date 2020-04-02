import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import ApiContext from '../ApiContext';

class App extends Component { 

  render(){
    const value = {

    }
    return (
      <ApiContext.Provider value={value}>
         <div className="App">
    
        </div>
      </ApiContext.Provider>
    );
  } 
}

export default App;
