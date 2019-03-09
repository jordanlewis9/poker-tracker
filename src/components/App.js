import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import LogSession from "./pages/LogSession";
import EditSession from "./pages/EditSession";
import DeleteSession from "./pages/DeleteSession";
import ViewResults from "./pages/ViewResults";
import history from "../history";

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/sessions/new" exact component={LogSession} />
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
