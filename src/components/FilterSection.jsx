import React from "react";
import FilterItem from "./FilterItem";

function FilterSection() {
  const filterItems = [
    { label: "Rapid", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/12195c45f221fe1fe1cfbc177a04fffcd13d8e64d0f662bd8ca6fd6444aedb97?placeholderIfAbsent=true&apiKey=6d35f1e4a4de483c8e715d4491c01e28" },
    { label: "Date", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/12195c45f221fe1fe1cfbc177a04fffcd13d8e64d0f662bd8ca6fd6444aedb97?placeholderIfAbsent=true&apiKey=6d35f1e4a4de483c8e715d4491c01e28" },
  ];

  return (
    <section className="flex flex-wrap gap-5 justify-between self-stretch mt-40 w-full text-xl font-medium whitespace-nowrap max-md:mt-10 max-md:max-w-full">
      {filterItems.map((item, index) => (
        <FilterItem key={index} label={item.label} imageSrc={item.imageSrc} />
      ))}
      <button className="overflow-hidden px-16 py-6 text-3xl font-bold bg-green-500 rounded max-md:px-5">
        Filter
      </button>
    </section>
  );
}

export default FilterSection;