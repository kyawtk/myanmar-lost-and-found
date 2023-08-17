"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
const Navbar = () => {
  const [navOpen, toggleNav] = useState(false);
  return (
    <nav className="flex shadow-lg p-3 innerWidth px-10 justify-between  bg-primary text-white">
      <Link href={"/"}>
        <div className="">
          {" "}
          <h1 className="text-2xl font-bold">LostAndFound</h1>
        </div>
      </Link>

      <div
        onClick={() => toggleNav(true)}
        className="md:hidden flex items-center justify-center font-bold text-xl hover:text-white hover:scale-105"
      >
        <AiOutlineBars></AiOutlineBars>
      </div>
      <div className=" gap-6 font-semibold tracking-wide hidden md:flex ">
        <Link href="/"> Home</Link>
        <Link href="/post-item">Post Item</Link>
        <Link href="/lost-items"> Lost Items</Link>
        <Link href="/found-items"> Found Items</Link>
        <Link href="/about"> About</Link>
      </div>
      {navOpen && (
        <div
          onClick={() => toggleNav(false)}
          className="z-[1999] gap-6 font-semibold tracking-wide fixed bg-white text-primary w-full h-full top-0 left-0 p-5 md:hidden flex flex-col "
        >
          <div
            onClick={() => toggleNav(false)}
            className="flex w-fit items-center justify-center p-3 bg-primary text-white font-bold"
          >
            {" "}
            <MdOutlineClose></MdOutlineClose>
          </div>

          <Link href="/"> Home</Link>
          <Link href="/post-item">Post Item</Link>
          <Link href="/lost-items"> Lost Items</Link>
          <Link href="/found-items"> Found Items</Link>
          <Link href="/about"> About</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
