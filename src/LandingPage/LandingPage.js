import React, {Component} from 'react';
import './LandingPage.css';

class LandingPage extends Component {

	onLogin = () => {
		this.props.history.push('/Login')
	}

	onRegister = () => {
		this.props.history('/SignUp')
	}


	render(){
		return (
			<div className="landing-page">
				<p className="greeting">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<div className="button-wrapper">
					<button onClick={this.onLogin}>Login</button>
					<button onClick={this.onRegister}>Register</button>
				</div>
			</div>
		)
	}
}

export default LandingPage;
