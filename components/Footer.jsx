import Link from "next/link";
import React from "react";

const Footer = () => (
  <footer className="bg-primary text-white p-3 md:p-5 pt-5 z-50">
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-between">
      <div className="">
        <h1 className="text-2xl md:text-4xl font-bold">
          Myanmar Lost and Found
        </h1>
        <p>Recoupe your precious belongings here.</p>
      </div>
   
    <div className="flex gap-6 ">
      <Link href="/"> Home</Link>
      <Link href="/post-item">Post Item</Link>
      <Link href="/lost-items"> Lost Items</Link>
      <Link href="/found-items"> Found Items</Link>
      <Link href="/about"> About</Link>
    </div> </div>
    <div className="mt-5">
        <p className="text-sm md:text-base text-center w-full">
            
          © 2022 <span className="text-secondary">Myanmar Lost and Found</span>. All rights reserved.
        </p>
       
    </div>
  </footer>
);
export default Footer;
