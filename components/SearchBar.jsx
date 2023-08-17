"use client";
import { lostItemCategories, regions } from "@/utils/data";
import React, { useMemo } from "react";

import { DebounceInput } from "react-debounce-input";
import { MdSearch } from "react-icons/md";

const SearchBar = ({
  category,
  setCategory,
  sortBy,
  setSortBy,
  region,
  setRegion,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="flex flex-row flex-wrap gap-3">
      <label className="search-bar-input">
        <select
          name="sortby"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="asc">Oldest</option>
          <option value="desc">Newest</option>
        </select>
      </label>
      <label className="search-bar-input">
        <select
          onChange={(e) => {
            setRegion(e.target.value);
          }}
          value={region}
          name="region"
        >
          <option value="all">All Regions</option>
          {regions.map((region) => {
            return (
              <option key={region} value={region.toLowerCase()}>
                {region.toUpperCase()}
              </option>
            );
          })}
        </select>
      </label>
      <label className="search-bar-input">
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
          name="category"
        >
          
          {lostItemCategories.map((cg) => {
            return (
              <option key={cg} value={cg.toLowerCase()}>
                {cg}
              </option>
            );
          })}
        </select>
      </label>
      <label className="search-bar-input relative">
        <div className="absolute right-[13px] top-[13px] font-bold">
          <MdSearch></MdSearch>
        </div>
        <DebounceInput
          placeholder={"Search lost items"}
          debounceTimeout={700}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></DebounceInput>
      </label>
    </div>
  );
};

export default SearchBar;
