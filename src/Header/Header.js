import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';


class Header extends Component {

	handleLogout = () => {
		window.sessionStorage.removeItem("jwt")
		window.sessionStorage.removeItem("state")
		window.location.reload()
	}

	render(){
		return (
			<header className="header" id="header">
				<span className="logo">PROJECT TRACKER</span>
			
				<div className= 'nav'>
				<Link to='/' onClick={this.handleLogout} id="home-nav">Home</Link>
				<Link to='/' onClick={this.handleLogout} id="completed-nav">Completed</Link>
				{
					!!window.sessionStorage.jwt ?
					
					
						<Link to='/' onClick={this.handleLogout} id="logout">Logout</Link>
						: <Link to='/' onClick={this.handleLogout} className="hidden-logout" id="logout" disable="true"/>
						
				}
		
				</div>

						 
			</header>
		)
	}
}

export default Header;
