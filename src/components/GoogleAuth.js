import React from "react";
import { connect } from "react-redux";
import { signIn, signOut, getSessions } from "../actions";

class GoogleAuth extends React.Component {
  componentWillMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_POKER_TRACKER,
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
          this.props.getSessions(this.props.currentUserId);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn && this.auth.currentUser.get().w3.ofa) {
      return (
        <div className="login">
          <button onClick={this.onSignOutClick} className="ui google button">
            <i className="google icon" />
            Sign Out
          </button>
          <div id="name">Welcome, {this.auth.currentUser.get().w3.ofa}</div>
        </div>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { signIn, signOut, getSessions }
)(GoogleAuth);
