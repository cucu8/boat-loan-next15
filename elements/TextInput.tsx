import React from "react";

interface TextInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  value: string | number;
  type?: string;
  name: string;
  minValue?: number;
  placeholder: string;
}

const TextInput = ({
  handleChange,
  title,
  value,
  type = "text",
  name,
  minValue = 0,
  placeholder,
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="email" className="text-sm">
        {title}
      </label>
      <input
        placeholder={placeholder}
        min={minValue}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required
        className="rounded-md px-3 py-2 bg-neutral-100 text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );
};

export default TextInput;
