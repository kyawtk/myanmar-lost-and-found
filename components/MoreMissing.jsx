import { client } from "@/app/client";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ItemCard from "./ItemCard";
import Link from "next/link";

const responsive = {
  0: { items: 1 },
  300: { items: 2 },
  1024: { items: 3 },
};
const MoreMissing = ({ category }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const query = `*[ _type == 'lostItem' && category match "${category}"][0...10]`;
    client.fetch(query).then((data) => {
      setItems(data);
      console.log(data);
    });
  }, [category]);

  let carouselItems = items?.map((item) => {
    return <ItemCard item={item}></ItemCard>;
  });
  console.log(category);
  return (
    <div className="w-full flex flex-col gap-5 py-5">
      <Link href={"/lost-items"}>
        <h2 className="text-center underline w-full my-3 mg:my-5 text-xl text-white font-bold">
          More Missing {category}s
        </h2>
      </Link>
      <AliceCarousel
        disableButtonsControls
        disableDotsControls
        touchTracking
        mouseTracking
        infinite
        items={carouselItems}
        responsive={responsive}
        controlsStrategy="alternate"
      />
    </div>
  );
};

export default MoreMissing;
