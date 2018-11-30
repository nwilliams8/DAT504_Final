import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ReactTimeout from 'react-timeout'

class Menu extends Component {
  state = {
    redirect: false
  }

  toggle = () => {
    this.setState({redirect:true})
  }

  handleOnClick = (e) => {
    this.props.setTimeout(this.toggle, 10)
  }

  render() {
    if (this.state.redirect == true) {
      return <Redirect push to="/Profile"/>;
    }
    return (
      <div onClick={this.handleOnClick}>
      <input className="button" type="submit" value="Register"/>
    </div>
    )
  }
}

export default ReactTimeout(Menu);
