// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session';
import SignupForm from '../../components/SignupForm';
import Navbar from '../../components/Navbar';

type Props = {
  signup: () => void,
  errors: Array<string>,
}

class Signup extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleSignup = (data) => this.props.signup(data, this.context.router);

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <SignupForm onSubmit={this.handleSignup} errors={this.props.errors} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    errors: state.session.signupErrors,
  }),
  { signup }
)(Signup);
