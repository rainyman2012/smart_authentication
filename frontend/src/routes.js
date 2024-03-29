import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import SignUpForm from "./containers/signup";
import ExerciseForm from "./containers/create";
import HomepageLayout from "./containers/Home";

const BaseRouter = () => (
  <Hoc>
    <Route path="/create" component={ExerciseForm} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUpForm} />
    <Route exact path="/" component={HomepageLayout} />
    <Route exact path="/su/$uuid" component={HomepageLayout} />
  </Hoc>
);

export default BaseRouter;
