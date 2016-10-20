// @flow
import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import Home from '../Home';
import NotFound from '../../components/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Home} />
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
