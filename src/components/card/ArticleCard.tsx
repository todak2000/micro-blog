import React from "react";
import { getFirst150Chars } from "@/utils";
import { FaRegImage } from "react-icons/fa";
import ButtonLink from "../links/ButtonLink";
import { HiBadgeCheck } from "react-icons/hi";
import Image from "next/image";
import parse from "html-react-parser";
import { CardButtonLinkText } from "@/constant";
import { useSelector } from "react-redux";

type CardItem = {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  category: string;
  author: string;
  comments?: any[];
  authorId?: string;
};

const ArticleCard = ({
  id,
  title,
  content,
  category,
  author,
  createdAt,
  comments,
  authorId,
}: CardItem) => {
  const user = useSelector((state: any) => state.user);

  return (
    <div className="relative mb-3 h-[350px] rounded-lg md:w-[1/3]">
      <div className="flex h-[150px] flex-col items-center justify-center rounded-lg bg-gray-100 md:w-[100%]">
        <FaRegImage className="text-6xl" />
      </div>
      <div className="flex flex-row items-center justify-between p-3">
        <p className="flex flex-row items-center justify-between text-[10px] font-normal leading-[12px] md:text-[14px] md:leading-[18px]">
          {author === user.name ? (
            <span className="flex flex-row items-center justify-between">
              <Image
                src={user.photo}
                alt="user picture"
                width={25}
                height={25}
                className="mr-2 rounded-full"
              />
            </span>
          ) : null}

          {author}
        </p>
        <p className="flex flex-row items-center justify-between text-[10px] font-normal leading-[12px] md:text-[14px] md:leading-[16px]">
          {author === user.name ? (
            <span className="flex flex-row items-center justify-between">
              <HiBadgeCheck size={15} className="mr-1 text-green-600" />
              Owner
            </span>
          ) : null}
        </p>
      </div>
      <p className="px-3 text-[12px] font-black leading-[12px] md:text-[16px] md:leading-[7px]">
        {getFirst150Chars(title, 20)}
      </p>

      <p className="m-3 font-primary text-[10px] font-normal leading-[12px] text-[#A1A1A1] md:text-[12px] md:leading-[14px]">
        {content && parse(getFirst150Chars(content))}
      </p>
      <ButtonLink
        className="mx-3 cursor-pointer"
        href={`/article/${id}`}
        variant="light"
      >
        {CardButtonLinkText}
      </ButtonLink>
      <p className="z-100 absolute top-[1%] z-50 m-3 font-primary text-[8px] font-thin leading-[10px] text-black md:text-[10px] md:leading-[12px]">
        {createdAt}
      </p>
    </div>
  );
};

export default React.memo(ArticleCard);
