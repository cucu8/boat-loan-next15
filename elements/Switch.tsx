import React, { useState } from "react";

interface SwitchProps {
  value: boolean;
  setValue: (value: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ value, setValue }) => {
  const toggleSwitch = () => {
    setValue(!value);
  };
  console.log(value);
  return (
    <button
      className={`relative inline-flex items-center cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
        value ? "bg-green-700" : "bg-red-700"
      } w-12 h-6`}
      onClick={toggleSwitch}
      type="button"
    >
      <span
        className={`inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default Switch;
