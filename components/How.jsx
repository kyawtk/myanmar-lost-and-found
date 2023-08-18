'use client'
import { fadeIn, staggerContainer } from "@/utils/variants";
import { motion, stagger } from "framer-motion";
import Link from "next/link";
import React from "react";
import { MdContactPhone, MdHandshake, MdNewspaper, MdVerifiedUser } from "react-icons/md";

const How = () => {
  return (
    <motion.section
    variants={staggerContainer(0,0)}
    initial='hidden'
    whileInView={'show'}
    className="innerWidth flex flex-col justify-center pt-10 items-center gap-10 ">
      <motion.h1
      variants={fadeIn('down','tween',0.2,0.3)}
      className="text-[#3a3737]   tracking-wide text-2xl lg:text-4xl font-bold uppercase">How we help you</motion.h1>
      <small>How the process works</small>
      <div className="flex lg:max-w-[80%]  flex-col lg:flex-row justify-center items-center gap-10 text-center">
        <div className="flex flex-col gap-8 max-w-[400px] ">
          <div className="flex justify-center items-center p-5 rounded-xl mx-auto text-primary hover:text-gray-700 hover:scale-105 hover:rotate-6 transition-all duration-200 shadow-lg shadow-primary text-3xl w-fit h-fit">
            <MdNewspaper />
          </div>
          <h2 className="text-xl tracking-tight font-semibold text-gray-700">Report a lost or found item</h2>
          <p className="text-base text-gray-500">
            Fill the declaration and give as much detail as possible (the
            location of loss, the type of item, the description) to help the
            algorithm to identify it quickly
          </p>
        </div>

        <div className="flex flex-col gap-8 max-w-[400px]">
        <div className="flex justify-center items-center p-5 rounded-xl mx-auto text-primary hover:text-gray-700 hover:scale-105 hover:rotate-6 transition-all duration-200 shadow-lg shadow-primary text-3xl w-fit h-fit">
            <MdContactPhone />
          </div>
          <h2 className="text-xl tracking-tight font-semibold text-gray-700">Contact who found it</h2>
          <p className="text-base text-gray-500">
            Someone who found your item will contact you with your provided
            information. Or if you post a found item, someone will contact you.
          </p>
        </div>
        <div className="flex flex-col gap-8 max-w-[400px]">
        <div className="flex justify-center items-center p-5 rounded-xl mx-auto text-primary hover:text-gray-700 hover:scale-105 hover:rotate-6 transition-all duration-200 shadow-lg shadow-primary text-3xl w-fit h-fit">
            <MdHandshake />
          </div>
          <h2 className="text-xl tracking-tight font-semibold text-gray-700">Get it back</h2>
          <p className="text-base text-gray-500">
            As soon as you've proved ownership, you receive the information to
            pick it up or have it delivered. Remember to be ethical and help
            your fellows.
          </p>
        </div>
      </div>
      <div className=" mx-5 border-gray-200 gap-10 max-w-[700px] mt-10 border-2 flex justify-evenly items-center p-10">
        <div className="h-[100px] hover:animate-pulse">
                <img src='/bulb.png' className="w-full h-full object-contain" alt="light bulg image" />
        </div>
        <div className="flex flex-col gap-5">
            <h2 className="font-bold text-gray-600 text-xl">You shoul know</h2>
            <p>If you add a photo to your report, you increase <span className="font-bold text-primary">by more than 50%</span>  your chances of finding your lost item</p>
        </div>
      </div>

      <div className="min-h-[60vh] flex flex-col gap-10 justify-center items-center">
        <h1 className="text-[#3a3737]   tracking-wide text-2xl lg:text-3xl font-bold uppercase">Report your item!</h1>
        <div className="flex gap-5 mx-auto  tracking-wider">
          <Link href="/post-item" className="btn-link bg-primary text-white">
            I've Lost
          </Link>
          <Link href="/post-item" className="btn-link bg-secondary text-offblack">
            I've Found
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default How;
