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
				<p id="description">Lorem ipsum dolor sit amet, consectetur adipiscing <br></br>elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

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
