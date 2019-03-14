import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSessions } from "../../actions";

class ViewResults extends React.Component {
  componentDidMount() {
    this.props.getSessions();
  }

  sessionResults = (cashout, buyin) => {
    let cashed = parseInt(cashout);
    let bought = parseInt(buyin);
    return cashed - bought;
  };

  userSessions = () => {
    return this.props.sessions.filter((session) => {
      if (session.userId === this.props.currentUserId) {
        return session;
      }
    });
  };

  renderList = () => {
    return this.userSessions().map((session) => {
      return (
        <div className="item list" key={session.id}>
          <div className="right floated content">
            <div className="black">
              ${this.sessionResults(session.cashout, session.buyin)}
            </div>
            <Link
              to={`/sessions/edit/${session.id}`}
              className="ui button primary"
            >
              Edit
            </Link>
            <Link
              to={`/sessions/delete/${session.id}`}
              className="ui button negative"
            >
              Delete
            </Link>
          </div>
          <div className="content">
            <div className="header">
              {`${session.stakes} ${session.game} ${session.date}`}
            </div>
            <div className="description">
              {`${session.place}`}
              <br />
              {`${session.time}`} hours
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <h2>Your Sessions</h2>
        <div className="ui celled list">{this.renderList()}</div>
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
