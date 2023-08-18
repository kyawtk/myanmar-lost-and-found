"use client";

import { lostItemQueryWithFilters, lostItemsQuery } from "@/utils/data";
import { useEffect, useMemo, useState } from "react";
import { client } from "../client";
import ItemCard from "@/components/ItemCard";
import Spinner from "@/components/Spinner";
import SearchBar from "@/components/SearchBar";
import debounce from "lodash.debounce";
const LostItems = () => {
  let [region, setRegion] = useState("");
  let [sortBy, setSortBy] = useState("");
  let [category, setCategory] = useState("");
  let [loading, setLoading] = useState(true);
  let [lostItems, setLostItems] = useState(null);
  let [searchTerm, setSearchTerm] = useState("");
  const fetchLostItems = (query) => {
    setLoading(true);

    client.fetch(query).then((data) => {
      setLostItems(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (searchTerm == "") {
      const query = `*[_type == "lostItem" ] | order(date desc)`;
      fetchLostItems(query);
    }
    if (searchTerm) {
      const query = `*[_type == "lostItem" && title match "${searchTerm}*"] | order(date desc)`;
      fetchLostItems(query);
    }
  }, [searchTerm]);

  useEffect(() => {
    var query = lostItemsQuery;
    setLoading(true);
    if (region == "all" && sortBy && category) {
      query = `*[_type == "lostItem" && category match "${category}"] | order(date ${sortBy})`;
    } else if (region && sortBy && category) {
      query = `*[_type == "lostItem"  && location.region == "${region}" && category match "${category}" ] | order(date ${sortBy})`;
    } 
    else if (!sortBy && category) {
       query = `*[_type == "lostItem" && category match "${category}"] | order(date desc)`;
    }

    else if (region == "all" && sortBy) {
      query = `*[_type == "lostItem"] | order(date ${sortBy})`;
    } else if (region && sortBy) {
      query = `*[_type == "lostItem" && location.region == "${region}"] | order(date ${sortBy})`;
    } else if (!region && sortBy) {
      query = `*[ _type == 'lostItem' ] | order(date ${sortBy}) `;
    } else if (!sortBy && region == "all") {
      query = `*[_type == "lostItem"] | order(date desc)`;
    } else if (!sortBy && region) {
      query = `*[_type == "lostItem" && location.region == "${region}"] | order(date desc)`;
    } else {
      query = lostItemsQuery;
    }
    fetchLostItems(query);
  }, [sortBy, region,category]);
console.log(lostItems)
  return (
    <section className="flex flex-col min-h-screen bg-primary  gap-4 p-4 innerWidth">
      <SearchBar
        sortBy={sortBy}
        setSortBy={setSortBy}
        region={region}
        setRegion={setRegion}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
      ></SearchBar>
      {lostItems?.length == 0 && (
        <div className="w-full h-full flex justify-center items-center font-bold">
          <p>No items found</p>
        </div>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <div className="mx-auto flex flex-col justify-start md:gap-5 lg:flex-row flex-wrap  ">
          {lostItems?.map((item) => {
            return <ItemCard key={item._id} item={item} />;
          })}
        </div>
      )}
    </section>
  );
};

export default LostItems;
