import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

const WithAuthProtection = (WrappedComponent) => {
  const protectedComponent = ({ currentUser }) => {
    // if (currentUser) {
    //   console.log("with current user, show the actual component");
    //   return <WrappedComponent />;
    // } else {
    //   console.log("no current user, redirect to root");
    //   return <Redirect to="/" />;
    // }
    return currentUser ? <WrappedComponent /> : <Redirect to="/" />;
  };
  return connect(mapStateToProps)(protectedComponent);
};

export default WithAuthProtection;
