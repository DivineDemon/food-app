import Logo from "../assets/logo.png";
import {
  AiOutlineInstagram,
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineWhatsApp,
  AiOutlineMail,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="w-screen grid grid-cols-12 border">
      <div className="col-span-2 w-full h-full p-2 flex items-center justify-center">
        <img src={Logo} alt="logo" className="w-24 h-24" />
      </div>
      <span className="col-span-8 w-full h-full flex items-center justify-center">
        &copy; Food App.
      </span>
      <div className="col-span-2 w-full h-full flex flex-row items-center justify-center space-x-3">
        <AiOutlineInstagram className="w-8 h-8 cursor-pointer" />
        <AiOutlineWhatsApp className="w-8 h-8 cursor-pointer" />
        <AiFillGithub className="w-8 h-8 cursor-pointer" />
        <AiFillLinkedin className="w-8 h-8 cursor-pointer" />
        <AiOutlineMail className="w-8 h-8 cursor-pointer" />
      </div>
    </footer>
  );
};

export default Footer;
