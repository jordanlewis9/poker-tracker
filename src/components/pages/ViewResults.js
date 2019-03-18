import React from "react";
import { connect } from "react-redux";
import { getSessions } from "../../actions";
import ResultsBar from "./ResultsBar";
import SessionList from "./SessionList";

class ViewResults extends React.Component {
  componentDidMount() {
    this.props.getSessions();
  }

  render() {
    return (
      <div>
        <h2>Your Sessions</h2>
        <SessionList
          sessions={this.props.sessions}
          currentUserId={this.props.currentUserId}
          isSignedIn={this.props.isSignedIn}
        />
        <ResultsBar
          sessions={this.props.sessions}
          currentUserId={this.props.currentUserId}
          isSignedIn={this.props.isSignedIn}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessions: Object.values(state.sessions),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { getSessions }
)(ViewResults);
