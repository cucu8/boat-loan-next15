import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  extraClasses?: string;
}

const Container = ({ children, extraClasses }: ContainerProps) => {
  return (
    <div
      className={`flex flex-wrap gap-4 w-full p-4 lg:px[200px] ${extraClasses} justify-center align-center`}
    >
      {children}
    </div>
  );
};

export default Container;
