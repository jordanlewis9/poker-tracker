import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "../../history";
import { getSession, deleteSession } from "../../actions";
import Modal from "../Modal";

class DeleteSession extends React.Component {
  componentDidMount() {
    this.props.getSession(this.props.match.params.id);
  }

  renderActions() {
    const id = this.props.match.params.id;
    if (!this.props.session || !this.props.currentUserId) {
      return "Loading...";
    }

    if (this.props.currentUserId !== this.props.session.userId) {
      history.push("/");
    }
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteSession(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.session || !this.props.currentUserId) {
      return "Loading...";
    }

    if (this.props.currentUserId !== this.props.session.userId) {
      history.push("/");
    }

    return `Are you sure you want to delete the session on ${
      this.props.session.date
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete Session"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    session: state.sessions[ownProps.match.params.id],
    currentUserId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { getSession, deleteSession }
)(DeleteSession);
