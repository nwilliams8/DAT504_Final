import React, { Component } from 'react';
import App from './App'
import styles from './AppStyle.css';

import Menu from './Menu';
import Menu2 from './Menu2';

function validatePassword(password) {
  let error = ''
  if (password.length < 6 ) {
    error = 'Password must be more than 6 letters';
  }
  return error;
}

class Password extends Component {
  state = {
    number: '',
    error: '',
  }

  onChange = (event) => {
    this.setState({
      number: event.target.value,
      error: validatePassword(event.target.value),
    })
  }

  render() {
    return (
<div>
	<h1 className="font-effect-3d-float ">Finance Helper</h1>
	<div className="main">
		<div>
			<div className="Signin-form">
				<h2>Login</h2>
				<div className="login-form">
					<form className="login-form Log" action="/" method="post">
						<input type="text" name="logemail" placeholder="Email" required=""/>
						<input type="password" name="logpassword" placeholder="Password" required=""/>
						<Menu2 />
					</form>
				</div>
			</div>
		</div>
		<div>
			<div className="Reg-form">
				<h2>Register</h2>
				<div className="login-form">
					<form className="login-form Reg" action="/" method="post">
						<input type="text" name="email" placeholder="Email" required=""/>
						<input type="text" name="username" placeholder="Full Name" required=""/>
        <div>
          <input type='password' name="password" onChange={this.onChange} value={this.state.password} placeholder='Password' required=""/>
          {this.state.error ? <p classNameName="erMsg">{this.state.error}</p> : ''}
        </div>
        <div>
          <input type='password' name="passwordConf" placeholder='Password Confirmation' required=""/>
        </div>
        <Menu />
        </form>
				</div>
			</div>
		</div>
	</div>
</div>
    )
  }
}

export default Password;
