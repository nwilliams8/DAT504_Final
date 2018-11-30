import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Profile from './App2'
import Password from './form';


class App extends Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Password} />
          <Route path='/Profile' component={Profile} />
          </Switch>
      </div>
    )

  }
}

export default App;
