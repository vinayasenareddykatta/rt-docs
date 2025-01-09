import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <Image
        src="/assets/icons/loader.svg"
        alt=""
        width={32}
        height={32}
        className="animate-spin duration-1000 ease-in-out"
      />
      Loading...
    </div>
  );
};

export default Loader;
