import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import getRoutes from "./router/routes/index";
import { getUser } from "./store/reducers/auth";

const App = () => {
  const [allRoute, setAllRoute] = useState([...publicRoutes]);

  // INVOKE
  const dispatch = useDispatch();

  // GET STORE DATA
  const { token } = useSelector((store) => store.auth);

  // GET ROUTES
  useEffect(() => {
    const routes = getRoutes();
    setAllRoute([...allRoute, routes]);
  }, []);

  // GET USER
  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [token]);

  return <Router allRoute={allRoute} />;
};

export default App;
