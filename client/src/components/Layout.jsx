import Footer from "./Footer";
import Navbar from "./Navbar";
import CartList from "./Cart/CartList";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Toaster />
      <Navbar />
      <main>{children}</main>
      <CartList />
      <Footer />
    </div>
  );
};

export default Layout;
