import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-center   py-8 bg-gray-900 border-t border-slate-100">
      <footer className="p-4  md:flex md:items-center md:justify-between md:p-6 max-w-6xl mx-auto">
        <span className="text-sm text-gray-100 sm:text-center">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Sell NFT™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-100 sm:mt-0">
          <li>
            <Link className="mr-4 hover:underline md:mr-6 ">About</Link>
          </li>
          <li>
            <Link className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
          </li>
          <li>
            <Link className="mr-4 hover:underline md:mr-6">Licensing</Link>
          </li>
          <li>
            <Link className="hover:underline">Contact</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
