import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Protected from "./components/Protected";
import PageNotFound from "./pages/PageNotFound";
import { isAuthenticated } from "./utils/helpers";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(isAuthenticated());
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
