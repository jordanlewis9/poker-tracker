import React from "react";
import { connect } from "react-redux";
import { getSessions } from "../../actions";
import ResultsBar from "./ResultsBar";
import SessionList from "./SessionList";
import PageButtons from "./PageButtons";

class ViewResults extends React.Component {
  render() {
    return (
      <div>
        <h2>Your Sessions</h2>
        <SessionList
          sessions={this.props.sessions}
          currentUserId={this.props.currentUserId}
          isSignedIn={this.props.isSignedIn}
          page={this.props.page}
        />
        <PageButtons sessions={this.props.sessions} />
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
    isSignedIn: state.auth.isSignedIn,
    page: state.page.page
  };
};

export default connect(
  mapStateToProps,
  { getSessions }
)(ViewResults);
