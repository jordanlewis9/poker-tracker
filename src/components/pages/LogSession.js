import React from "react";
import { connect } from "react-redux";
import { createSession } from "../../actions";
import SessionForm from "./SessionForm";

class LogSession extends React.Component {
  onSubmit = (formValues) => {
    this.props.createSession(formValues);
  };

  render() {
    if (this.props.isSignedIn === null) {
      return <div>Loading...</div>;
    } else if (this.props.isSignedIn === false) {
      return (
        <div className="ineligible">
          <h1>You must sign in to be able to use this feature.</h1>
        </div>
      );
    }

    return (
      <div>
        <h1 className="heading">Record Your Session</h1>
        <SessionForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { createSession }
)(LogSession);
