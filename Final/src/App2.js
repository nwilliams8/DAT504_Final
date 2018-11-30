import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FinanceApp from "./App3"
import styles from './AppStyle.css';

class Profile extends Component {
  state = {
    username: undefined,
    redirect: false
  }
  componentDidMount() {
    let url ="http://localhost:8080/getUsername";
    fetch(url)
      .then(res => res.json())
      .then((out) => {
        console.log(out.username);
        this.setState({username : out.username})
      }).catch(err => console.error(err));
  }
    toggle = () => {
      this.setState({redirect:true, username:undefined})
    }
  render() {
    if (this.state.redirect == true){
      return <Redirect push to="/"/>
    }
    return (
      <div>
        <h2 className="intro">{this.state.username}</h2>
        <div className="sitecontent">
        <FinanceApp />
        <a href="/logout">
          <div className="button" onClick={this.toggle}>
            <p>Logout</p>
        </div>
        </a>
        </div>
      </div>
    )
  }
}

export default Profile;
