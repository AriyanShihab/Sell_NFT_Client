import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-center  bottom-0 w-full py-4 bg-cyan-500">
      This is footer
      <Link to="/dashbord">Dashsbord</Link>
    </div>
  );
};

export default Footer;
