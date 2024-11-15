import React from 'react';

type FilterOption = {
  label: string;
  iconSrc: string;
};

type FilterOptionsProps = {
  options: FilterOption[];
  onFilter: () => void;
};

const FilterOptions: React.FC<FilterOptionsProps> = ({ options, onFilter }) => {
  return (
    <div className="flex flex-wrap gap-5 justify-between mt-40 w-full text-xl font-medium whitespace-nowrap max-w-[1148px] max-md:mt-10 max-md:max-w-full">
      {options.map((option, index) => (
        <div key={index} className="flex overflow-hidden gap-10 items-start pt-3 pr-2 pb-5 pl-9 rounded border border-white border-solid max-md:pl-5">
          <div className="my-auto">{option.label}</div>
          <img loading="lazy" src={option.iconSrc} alt="" className="object-contain shrink-0 self-start aspect-square w-[50px]" />
        </div>
      ))}
      <button
        onClick={onFilter}
        className="overflow-hidden px-16 py-6 text-3xl font-bold bg-green-500 rounded max-md:px-5"
      >
        Filter
      </button>
    </div>
  );
};

export default FilterOptions;