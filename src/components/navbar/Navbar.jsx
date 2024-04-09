import "./navbar.scss";
import Sidebar from "../sidebar/Sidebar";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="navbar">

        <Sidebar/>

      <div className="wrapper">
        <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Jia Jun
        </motion.span>
        <div className="social">
          <a href="https://www.instagram.com/jiajunkk" target="_blank">
            <img src="/instagram.svg" alt="" />
          </a>

          <a href="https://github.com/JIAJUNKK" target="_blank">
            <img src="/github.svg" alt="" />
          </a>

          <a href="https://www.linkedin.com/in/jiajunkk/" target="_blank">
            <img src="/linkedin.svg" alt="" />
          </a>

        </div>
      </div>
    </div>
  );
};

export default Navbar;