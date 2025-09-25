import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen flex relative">
      <HashLoader color="#008fcd" className="absolute top-[40%] left-1/2" />
    </div>
  );
};

export default Loading;
