import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import Feed from "./pages/Feed";
import New from "./pages/New";

const Routes = () => (
  <Switch>
    <Route path="/" element={<Feed />} />
    <Route path="new" element={<New />} />
  </Switch>
);

export default Routes;
