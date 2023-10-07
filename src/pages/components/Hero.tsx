import React from "react";
import { useDispatch } from "react-redux";
import { updateSearchQuery } from "@/store";
import { LandingPageHeader, LandingPageText } from "@/constant";

const Hero: React.FC = () => {
  const dispatch = useDispatch();
  const handleSearch = (query: any) => {
    dispatch(updateSearchQuery(query));
  };
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-[40px]  md:px-[120px]">
      <p className="text-center font-black text-black md:text-[40px] md:leading-[82px]">
        {LandingPageHeader}
      </p>
      <p className="  mt-4 w-[70%] text-center text-[14px] leading-[15px] text-gray-500 md:w-[85%] md:text-[16px] md:leading-[26px]">
        {LandingPageText}
      </p>
      <div className="my-4 w-full ">
        <input
          type="text"
          className="w-full rounded-sm border border-green-500"
          placeholder="Enter Search term here..."
          onChange={(e) => handleSearch(e.target.value as string)}
        />
      </div>
    </div>
  );
};

export default React.memo(Hero);
