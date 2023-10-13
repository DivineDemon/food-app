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
    <div className="w-screen flex flex-row items-center justify-between px-10 py-3 border">
      <img src={Logo} alt="logo" className="w-14 h-14" />
      <span>&copy; Food App.</span>
      <div className="flex flex-row items-center justify-center space-x-3">
        <AiOutlineInstagram className="w-8 h-8" />
        <AiOutlineWhatsApp className="w-8 h-8" />
        <AiFillGithub className="w-8 h-8" />
        <AiFillLinkedin className="w-8 h-8" />
        <AiOutlineMail className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Footer;
