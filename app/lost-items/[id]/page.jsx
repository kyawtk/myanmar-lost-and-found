"use client";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { client, urlFor } from "@/app/client";
import Spinner from "@/components/Spinner";
import { lostItemQuery } from "@/utils/data";
import moment from "moment";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import {
  MdArrowCircleLeft,
  MdArrowDownward,
  MdArrowLeft,
} from "react-icons/md";
import MoreMissing from "@/components/MoreMissing";

// const fetchItem = (id) => {
//   const query = lostItemQuery(params.id);
//   client.fetch(query).then((data) => {
//     console.log(data);
//     return data[0];
//   });
// };
const ItemPage = ({ params }) => {
  const router = useRouter();
  const [item, setItem] = useState(null);
  useEffect(() => {
    const query = lostItemQuery(params.id);
    client.fetch(query).then((data) => {
      console.log(data);
      setItem(data[0]);
    });
  }, [params.id]);
  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner></Spinner>;
      </div>
    );
  }
  return (
    <div className="innerWidth min-h-screen bg-primary ">
      {" "}
      <div
        className="text-3xl md:text-4xl text-blue-500 hover:bg-blue-100 w-fit ml-5 pt-5  rounded-full p-2 "
        onClick={() => router.back()}
      >
        <MdArrowCircleLeft></MdArrowCircleLeft>
      </div>
      <section className="flex flex-col pt-5 mb-5 pb-5 border-b-2">
        <div className="relative   cursor-zoom-in  mx-auto w-full min-w-[300px] md:max-w-[500px] border rounded-lg p-4 bg-gray-200 border-gray-300">
          <div className="absolute z-50 mt-5 ml-5 top-0 left-0 bg-red-500 opacity-90 text-white w-fit p-2 rounded-lg">
            Have been missing for{" "}
            <span className="font-bold text-lg ">
              {moment(item?.date)?.fromNow().slice(0, -4)}
            </span>
          </div>
          <TransformWrapper>
            <TransformComponent>
              <img
                src={urlFor(item?.image)?.url()}
                alt="lost item image"
                className="w-full h-full object-containe rounded-lg"
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div className="flex flex-col gap-5 md:max-w-[700px] mx-auto">
          <div className="flex flex-col gap-3 p-3 md:p-5">
            <h2 className="text-2xl text-white text-center font-bold md:text-4xl inline-block p-2 rounded-lg">
              Lost: {item?.title}
            </h2>
            <p className="text-center text-md md:text-lg font-semibold bg-red-500 rounded-tl-md rounded-tr-md mb-[-20px] p-5 text-white">Description</p>
            <p className="min-h-[200px] bg-white  border-red-500 text-center border-4  p-2  font-semibold text-md md:text-lg break-all">
              {item?.description}
            </p>
            <div className="bg-gray-200 rounded-lg text-gray-700 font-semibold flex flex-col gap-2 p-3">
              <p className="">
                Location:{} {(item?.location?.region).toUpperCase()}
              </p>
              <p className="">
                Date lost: {item?.date} , {moment(item?.date).fromNow()}
              </p>
              <p className="">Category: {item?.category}</p>
            </div>
          </div>
          <div className="">
            <h2 className="text-xl md:text-2xl font-bold bg-red-500 text-white  p-2 rounded-lg flex flex-col gap-3 justify-center items-center">
              Any information ? Contact owner <MdArrowDownward />
            </h2>
            <div className="p-2 my-3 text-center  bg-gray-200 font-bold text-lg">
              <p className="underline decoration-red-500 decoration-2 ">Telephone☎️: {item?.contact?.tel}</p>
              <p className="underline decoration-red-500 decoration-2">Email📧: {item?.contact?.email}</p>
            </div>
          </div>
        </div>
      </section>
      <MoreMissing category={item?.category}></MoreMissing>
    </div>
  );
};

export default ItemPage;
