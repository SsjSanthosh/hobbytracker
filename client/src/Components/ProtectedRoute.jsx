import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
function ProtectedRoute({ Component, isAuthenticated, ...rest }) {
  if (!isAuthenticated) return <Redirect to="/login" />;
  return (
    <div>
      <Route {...rest} component={Component} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProps)(ProtectedRoute);
