"use client";

import { foundItemQuery, foundItemsQuery } from "@/utils/data";
import { useEffect, useMemo, useState } from "react";
import { client } from "../client";
import ItemCard from "@/components/ItemCard";
import Spinner from "@/components/Spinner";
import SearchBar from "@/components/SearchBar";
import debounce from "lodash.debounce";
const FoundItems = () => {
  let [region, setRegion] = useState("");
  let [sortBy, setSortBy] = useState("");
  let [category, setCategory] = useState("");
  let [loading, setLoading] = useState(true);
  let [foundItems, setFoundItems] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  const fetchFoundItems = (query) => {
    setLoading(true);

    client.fetch(query).then((data) => {
      setFoundItems(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (searchTerm == "") {
      const query = `*[_type == "foundItem" ] | order(date desc)`;
      fetchFoundItems(query);
    }
    if (searchTerm) {
      const query = `*[_type == "foundItem" && title match "${searchTerm}*"] | order(date desc)`;
      fetchFoundItems(query);
    }
  }, [searchTerm]);

  useEffect(() => {
    var query = foundItemsQuery;
    setLoading(true);
    if (region == "all" && sortBy && category) {
      query = `*[_type == "foundItem" && category match "${category}"] | order(date ${sortBy})`;
    } else if (region && sortBy && category) {
      query = `*[_type == "foundItem"  && location.region == "${region}" && category match "${category}" ] | order(date ${sortBy})`;
    } 
    else if (!sortBy && category) {
       query = `*[_type == "foundItem" && category match "${category}"] | order(date desc)`;
    }

    else if (region == "all" && sortBy) {
      query = `*[_type == "foundItem"] | order(date ${sortBy})`;
    } else if (region && sortBy) {
      query = `*[_type == "foundItem" && location.region == "${region}"] | order(date ${sortBy})`;
    } else if (!region && sortBy) {
      query = `*[ _type == 'foundItem' ] | order(date ${sortBy}) `;
    } else if (!sortBy && region == "all") {
      query = `*[_type == "foundItem"] | order(date desc)`;
    } else if (!sortBy && region) {
      query = `*[_type == "foundItem" && location.region == "${region}"] | order(date desc)`;
    } else {
      query = foundItemsQuery;
    }
    fetchFoundItems(query);
  }, [sortBy, region,category]);

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
      {foundItems.length == 0 && (
        <div className="w-full h-full flex justify-center items-center font-bold">
          <p>No items found</p>
        </div>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <div className="mx-auto flex flex-col justify-start md:gap-5 lg:flex-row flex-wrap  ">
          {foundItems?.map((item) => {
            return <ItemCard key={item._id} item={item} />;
          })}
        </div>
      )}
    </section>
  );
};

export default FoundItems;
