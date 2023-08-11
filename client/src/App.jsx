import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Protected from "./components/Protected";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const user =
      JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user ||
      null;

    console.log(user);

    if (Object.keys(user).length !== 0) {
      setIsSignedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Home />
            </Protected>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
