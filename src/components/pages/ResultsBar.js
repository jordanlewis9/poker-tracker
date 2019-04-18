import React from "react";
import { sessionResults, hours } from "./resultsfunctions/functions";

const ResultsBar = (props) => {
  // const userSessions = () => {
  //   let instances = props.sessions.filter((session) => {
  //     if (session.userId === props.currentUserId) {
  //       return session;
  //     } else {
  //       return null;
  //     }
  //   });
  //   if (!instances) {
  //     return userSessions();
  //   } else {
  //     return instances.sort((a, b) => {
  //       a = new Date(a.date);
  //       b = new Date(b.date);
  //       return a > b ? -1 : a < b ? 1 : 0;
  //     });
  //   }
  // };

  const totalResults = () => {
    const { sessions, isSignedIn, currentUserId } = props;
    if (sessions === null && currentUserId === null) {
      return <div>Loading...</div>;
    }
    if (isSignedIn === null) {
      return <div>Loading...</div>;
    } else if (isSignedIn === false) {
      return (
        <div className="ineligible">
          <h1>You must sign in to be able to use this feature.</h1>
        </div>
      );
    }
    return sessions
      .map((i) => {
        return sessionResults(i.cashout, i.buyin);
      })
      .reduce((acc, curv) => {
        return acc + curv;
      }, 0);
  };

  const winPercentage = () => {
    const { sessions, isSignedIn, currentUserId } = props;
    if (sessions === null && currentUserId === null) {
      return <div>Loading...</div>;
    }
    if (isSignedIn === null) {
      return <div>Loading...</div>;
    } else if (isSignedIn === false) {
      return (
        <div className="ineligible">
          <h1>You must sign in to be able to use this feature.</h1>
        </div>
      );
    } else {
      let wins = [];
      let losses = [];
      sessions
        .map((i) => {
          return sessionResults(i.cashout, i.buyin);
        })
        .forEach((session) => {
          if (session >= 0) {
            wins.push(session);
          } else {
            losses.push(session);
          }
        });

      return ((wins.length / (wins.length + losses.length)) * 100).toFixed(2);
    }
  };

  const totalHours = () => {
    const { isSignedIn, sessions, currentUserId } = props;
    if (isSignedIn === null && currentUserId === null) {
      return <div>Loading...</div>;
    } else if (isSignedIn === false) {
      return (
        <div className="ineligible">
          <h1>You must sign in to be able to use this feature.</h1>
        </div>
      );
    } else {
      return hours(sessions).reduce((acc, curv) => {
        return acc + curv;
      }, 0);
    }
    // let arr = userSessions();
  };

  const renderList = () => {
    const { sessions, isSignedIn, currentUserId } = props;
    if (sessions === null && currentUserId === null) {
      return <div>Loading...</div>;
    }
    if (isSignedIn === null) {
      return <div>Loading...</div>;
    } else if (isSignedIn === false) {
      return null;
    }

    return (
      <div className="ui horizontal segments grey results">
        <div className="ui segment">Hours Played: {totalHours()}</div>
        <div className="ui segment">Net Profit: ${totalResults()}</div>
        <div className="ui segment">
          Hourly Winrate: $
          {typeof totalHours() === "number" &&
          typeof totalResults() === "number"
            ? (totalResults() / totalHours()).toFixed(2)
            : "Loading..."}
          /hr
        </div>
        <div className="ui segment">Win Percentage: {winPercentage()}%</div>
      </div>
    );
  };

  return <div>{renderList()}</div>;
};

export default ResultsBar;
