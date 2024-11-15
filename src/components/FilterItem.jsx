import React from "react";

function FilterItem({ label, imageSrc }) {
  return (
    <div className="flex overflow-hidden gap-10 items-start pt-3 pr-2 pb-5 pl-9 rounded border border-white border-solid max-md:pl-5">
      <div className="my-auto">{label}</div>
      <img loading="lazy" src={imageSrc} alt="" className="object-contain shrink-0 self-start aspect-square w-[50px]" />
    </div>
  );
}

export default FilterItem;