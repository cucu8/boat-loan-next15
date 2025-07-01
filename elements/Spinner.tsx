import React from "react";
import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Loader className="animate-spin w-6 h-6 text-white-500" />
    </div>
  );
};

export default Spinner;
