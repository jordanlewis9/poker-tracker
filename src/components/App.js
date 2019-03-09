import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/sessions/new" exact component={LogRecords} />
              <Route path="/sessions/edit/:id" exact component={EditSession} />
              <Route
                path="/sessions/delete/:id"
                exact
                component={DeleteSession}
              />
              <Route path="/sessions/:id" exact component={ViewResults} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
