import logo from "./logo.svg";
import "./App.css";
import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { Login } from "./screens/login/root";
import SignUp from "./screens/signup/root";
import DashBoard from "./screens/dashboard/root";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/sign-up">
              <SignUp></SignUp>
            </Route>
            <Route exact path="/dashboard">
              {/* {store.getState().loggedInUserId ? ( */}
              <DashBoard></DashBoard>
              {/* ) : ( */}
              {/* <Redirect to="/login" /> */}
              {/* )} */}
            </Route>

            <Route exact key="*" path="*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
