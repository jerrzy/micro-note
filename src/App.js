import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import Header from "./component/header/header.component";
import WelcomePage from "./page/welcome/welcome.component";
import HomePage from "./page/homepage/homepage.component";
import NotePage from "./page/notepage/notepage.component";
import SignInAndSignUpPage from "./page/account/account.component";
import ErrorPage from "./page/error/error-page.component";

import { checkUserSession } from "./redux/user/user.actions";

import WithAuthProtection from "./component/with-auth-protection/with-auth-protection.component";

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    const ProtectedHomePage = WithAuthProtection(HomePage);
    const ProtectedNotePage = WithAuthProtection(NotePage);
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/login"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/home" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route
            exact
            path="/"
            render={() => {
              return this.props.currentUser ? (
                <Redirect to="/home" />
              ) : (
                <WelcomePage />
              );
            }}
          />
          <Route exact path="/note" component={ProtectedNotePage} />
          <Route path="/home" component={ProtectedHomePage} />
          <Route render={() => <ErrorPage error="404. Page not found." />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
