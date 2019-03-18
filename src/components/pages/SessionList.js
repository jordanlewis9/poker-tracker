import React from "react";
import { Link } from "react-router-dom";
import { sessionResults } from "./resultsfunctions/functions";

const SessionList = (props) => {
  const userSessions = () => {
    let instances = props.sessions.filter((session) => {
      if (session.userId === props.currentUserId) {
        return session;
      } else {
        return null;
      }
    });
    return instances.sort((a, b) => {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });
  };

  const renderList = () => {
    const { isSignedIn } = props;
    if (isSignedIn === null) {
      return <div>Loading...</div>;
    } else if (isSignedIn === false) {
      return (
        <div className="ineligible">
          <h1>You must sign in to be able to use this feature.</h1>
        </div>
      );
    }

    return userSessions().map((session) => {
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

  return <div className="ui celled list">{renderList()}</div>;
};

export default SessionList;
