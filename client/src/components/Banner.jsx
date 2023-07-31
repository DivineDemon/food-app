import React from "react";
import BannerImage from "../assets/banner.jpg";

const Banner = () => {
  return (
    <div className="bg-black">
      <img
        src={BannerImage}
        alt="banner"
        className="w-full h-[500px] opacity-50 object-cover"
      />
    </div>
  );
};

export default Banner;
