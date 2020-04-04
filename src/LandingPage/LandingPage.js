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
				<p className="greeting">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				<div className="button-wrapper">
					<button onClick={this.onLogin}>Login</button>
					<button onClick={this.onRegister}>Register</button>
				</div>
			</div>
		)
	}
}

export default LandingPage;
