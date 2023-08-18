'use client'
import { fadeIn, staggerContainer } from "@/utils/variants";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <motion.section
    variants={staggerContainer(0.1,0.1)}
    initial='hidden'
    whileInView={'show'}
    className="flex bg-primary text-white justify-evenly items-center min-h-[80vh] innerWidth p-3  flex-col lg:flex-row-reverse ">
      <motion.div variants={fadeIn('left', 'tween', 0.1, 0.4)} className="max-w-[500px]">
        <img
          src="/hero.jpg"
          alt="hero"
          className="w-full rounded-lg h-full object-contain"
        />
      </motion.div>
      <motion.div variants={fadeIn('right', 'tween', 0.1, 0.4)} className="flex flex-col max-w-[500px] text-center lg:text-left gap-5 ">
        <motion.h1 className="text-white  text-2xl lg:text-4xl font-bold uppercase">
          When Recovering your items becomes child's play!
        </motion.h1>
        <div
          className="font-bold text-white text-lg leading-5"
          
        >
          {" "}
          <motion.p>Lost or found something?</motion.p>
          <motion.p>We are here to help you!</motion.p>
        </div>

        <motion.div className="flex gap-5 mx-auto lg:ml-0 tracking-wider">
          <Link href="/post-item" className="btn-link bg-white text-primary">
            I've Lost
          </Link>
          <Link href="/post-item" className="btn-link  border">
            I've Found
          </Link>
        </motion.div>
      </motion.div>
      <div className=""></div>
    </motion.section>
  );
};

export default Hero;
