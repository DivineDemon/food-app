import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Invoice from "./pages/Invoice";
import Layout from "./components/Layout";
import PageNotFound from "./pages/PageNotFound";
import RecentOrders from "./pages/RecentOrders";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <RecentOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice/:order_id"
            element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
