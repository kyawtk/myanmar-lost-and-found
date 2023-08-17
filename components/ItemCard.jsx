import { urlFor } from "@/app/client";
import Link from "next/link";
import React from "react";
import moment from "moment";
const ItemCard = ({ item }) => {
  const { image, title, description, category, location, date, _id, _type } =
    item
  return (
    <div className=" cursor-pointer p-5 flex-1 bg-[rgba(255,255,255,0.45)] backdrop-blur-[20px] md:min-w-[400px] md:max-w-[500px] rounded-lg  shadow-lg hover:scale-105 transition-all">
      <div className="flex flex-col md:flex-row items-start gap-5 h-full">
        <div className="w-full md:w-1/3">
          <img
            src={urlFor(image).url()}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full flex flex-col justify-between   h-full  gap-3">
          <div className="h-full flex flex-col justify-between">
            <div className="">
              <h2 className="text-2xl font-bold ">{_type == 'foundItem'? "Found":"Lost"}: {title}</h2>
              <p className="text-gray-700  break-all">
                <span className="font-semibold">Description:</span>{" "}
                {description.slice(0, 100)}
                <span className="read-blue">...read more</span>{" "}
              </p>
            </div>
            <div className="rounded-sm p-2 font-semibold bg-white">
              <p className="">Location: {location.region}</p>
              {_type == "foundItem" ? null : (
                <span className="font-bold text-lg text-red-500 ">
                  Missing for {moment(date)?.fromNow().slice(0, -4)}
                </span>
              )}

              <p className="">Category : {category}</p>
            </div>
          </div>

          <Link
            href={`/${_type== "lostItem"?"lost":"found"}-items/${_id}`}
            className={`p-3 my-auto inline-block flex-1 bg-${_type=='lostItem'?'red':'green'}-500 hover:bg-blue-700 rounded-sm font-semibold text-white `}
          >
            View Details 📰
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
