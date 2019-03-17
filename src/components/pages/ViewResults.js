import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSessions } from "../../actions";
import { sessionResults, hours } from "./resultsfunctions/functions";

class ViewResults extends React.Component {
  componentDidMount() {
    this.props.getSessions();
  }

  userSessions = () => {
    let instances = this.props.sessions.filter((session) => {
      if (session.userId === this.props.currentUserId) {
        return session;
      }
    });
    return instances.sort((a, b) => {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });
  };

  totalResults = () => {
    if (this.props.isSignedIn === null) {
      return <div>Loading...</div>;
    } else if (this.props.isSignedIn === false) {
      return (
        <div className="ineligible">
          <h1>You must sign in to be able to use this feature.</h1>
        </div>
      );
    }
    return this.userSessions()
      .map((i) => {
        return sessionResults(i.cashout, i.buyin);
      })
      .reduce((acc, curv) => {
        return acc + curv;
      });
  };

  totalHours = () => {
    if (this.props.isSignedIn === null) {
      return <div>Loading...</div>;
    } else if (this.props.isSignedIn === false) {
      return (
        <div className="ineligible">
          <h1>You must sign in to be able to use this feature.</h1>
        </div>
      );
    }
    let arr = this.userSessions();
    return hours(arr).reduce((acc, curv) => {
      return acc + curv;
    });
  };

  renderList = () => {
    if (this.props.isSignedIn === null) {
      return <div>Loading...</div>;
    } else if (this.props.isSignedIn === false) {
      return (
        <div className="ineligible">
          <h1>You must sign in to be able to use this feature.</h1>
        </div>
      );
    }

    return this.userSessions().map((session) => {
      return (
        <div className="item list" key={session.id}>
          <div className="right floated content adjust">
            <div
              className={`outcome ${
                sessionResults(session.cashout, session.buyin) >= 0
                  ? "positive"
                  : "negative"
              }`}
            >
              ${sessionResults(session.cashout, session.buyin)}
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

  renderResults = () => {};

  render() {
    return (
      <div>
        <h2>Your Sessions</h2>
        <div className="ui celled list">{this.renderList()}</div>
        <div className="ui horizontal segments grey results">
          <div className="ui segment">{this.totalHours()}</div>
          <div className="ui segment">{this.totalResults()}</div>
          <div className="ui segment">
            {typeof this.totalHours() === "number" &&
            typeof this.totalResults() === "number"
              ? Math.round(this.totalResults() / this.totalHours())
              : "Loading..."}
          </div>
        </div>
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
