import React, {Component} from 'react';
import './LandingPage.css';

class LandingPage extends Component {

	onLogin = () => {
		this.props.history.push('/Login')
	}

	onRegister = () => {
		this.props.history.push('/SignUp')
	}


	render(){
		return (
			<div className="landing-page">
				<div className="greeting">
				<p id="greeting-header" className="greeting-header">
					Welcome to Project Tracker
				</p>
				<p id="description">This app is a collaborative project traking app. Everyone whose account was created with the same company name will see the same data.  Admins will have certain abilities that standard users do have such as project deletion. As of right now the only admin is the person who created the company when registering.</p>

				<div className="button-wrapper">
					<button  onClick={this.onLogin}>Login</button>
					<button  onClick={this.onRegister}>Register</button>
				</div>
				</div>
			</div>
		)
	}
}

export default LandingPage;
