import React from "react";

interface SelectBoxProps {
  selectedCountryId: number;
  handleSelectId: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectData: {
    id: number;
    name: string;
  }[];
  title: string;
  disabled?: boolean;
}

const SelectBox = ({
  selectedCountryId,
  handleSelectId,
  selectData = [],
  title,
  disabled,
}: SelectBoxProps) => {
  const isValidArray = Array.isArray(selectData);
  return (
    <select
      disabled={disabled}
      value={selectedCountryId}
      onChange={handleSelectId}
      className="rounded-md px-3 py-[10px] bg-sky-400 text-navy focus:outline-none focus:ring-2 focus:ring-sky-500"
    >
      <option value="">{title}</option>
      {isValidArray &&
        selectData.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
    </select>
  );
};

export default SelectBox;
