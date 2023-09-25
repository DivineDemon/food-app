import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
