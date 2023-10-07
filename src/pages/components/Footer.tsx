import React from "react";
import UnderlineLink from "@/components/links/UnderlineLink";

import { PersonalGithubLink, Name } from "@/constant";
const Footer: React.FC = () => {
  return (
    <div className=" layout relative bottom-2 flex  flex-col items-center justify-center py-4 text-center ">
      <footer className=" text-gray-700">
        © {new Date().getFullYear()} By{" "}
        <UnderlineLink href={PersonalGithubLink}>{Name}</UnderlineLink>
      </footer>
    </div>
  );
};

export default React.memo(Footer);
