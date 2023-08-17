import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="flex bg-primary text-white justify-evenly items-center min-h-[80vh] innerWidth p-3  flex-col lg:flex-row-reverse ">
      <div className="max-w-[500px]">
        <img
          src="/hero.jpg"
          alt="hero"
          className="w-full rounded-lg h-full object-contain"
        />
      </div>
      <div className="flex flex-col max-w-[500px] text-center lg:text-left gap-5 ">
        <h1 className="text-white  text-2xl lg:text-4xl font-bold uppercase">
          When Recovering your items becomes child's play!
        </h1>
        <div
          className="font-bold text-white text-lg leading-5"
          
        >
          {" "}
          <p>Lost or found something?</p>
          <p>We are here to help you!</p>
        </div>

        <div className="flex gap-5 mx-auto lg:ml-0 tracking-wider">
          <Link href="/post-item" className="btn-link bg-white text-primary">
            I've Lost
          </Link>
          <Link href="/post-item" className="btn-link  border">
            I've Found
          </Link>
        </div>
      </div>
      <div className=""></div>
    </section>
  );
};

export default Hero;
