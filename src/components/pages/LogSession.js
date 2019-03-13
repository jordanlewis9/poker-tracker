import React from "react";
import { connect } from "react-redux";
import { createSession } from "../../actions";
import SessionForm from "./SessionForm";

class LogSession extends React.Component {
  onSubmit = (formValues) => {
    this.props.createSession(formValues);
  };

  render() {
    return <SessionForm onSubmit={this.onSubmit} />;
  }
}

export default connect(
  null,
  { createSession }
)(LogSession);
