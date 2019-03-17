import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import SessionForm from "./SessionForm";
import { editSession, getSession } from "../../actions";
import history from "../../history";

class EditSession extends React.Component {
  componentDidMount() {
    this.props.getSession(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editSession(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.sessions || !this.props.auth.userId) {
      return <div>Loading...</div>;
    }

    if (this.props.auth.userId !== this.props.sessions.userId) {
      setTimeout(() => history.push("/"), 1500);
      return <div>You do not have access to this session</div>;
    }

    return (
      <div>
        <h1>Edit Session</h1>
        <SessionForm
          initialValues={_.pick(
            this.props.sessions,
            "game",
            "stakes",
            "place",
            "date",
            "time",
            "buyin",
            "cashout"
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sessions: state.sessions[ownProps.match.params.id],
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { editSession, getSession }
)(EditSession);
