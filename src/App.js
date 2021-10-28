import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/:id">
            <Detail />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
