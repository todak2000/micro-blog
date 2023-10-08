// Import React and other dependencies
import React from "react";
import { getFirst150Chars } from "@/utils";
import { FaRegImage } from "react-icons/fa";
import ButtonLink from "../links/ButtonLink";
import parse from "html-react-parser";
import { CardButtonLinkText } from "@/constant";
import { useRouter } from "next/router";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { handleDeleteArticle } from "@/pages/api";
import Swal from "sweetalert2";
import { removeArticle } from "@/store";
import { useDispatch, useSelector } from "react-redux";

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
  const router = useRouter();
  const dispatch = useDispatch();

  // function to prompt the user for deleting an article
  const promtDelete = (id: any) => {
    Swal.fire({
      title: "Do you want to Delete this Article",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteArticle(id).then((res: any) => {
          dispatch(removeArticle(id));
          if (res?.statusCode === 200) {
            router.push("/");
            Swal.fire({
              title: "Success!",
              text: "Article successfully deleted",
              icon: "success",
            });
          } else {
            Swal.fire("Oops an error occured", "", "info");
          }
        });
      }
    });
  };
  return (
    <div className="relative mb-3 h-[350px] rounded-lg md:w-[1/3]">
      <div className="flex h-[150px] flex-col items-center justify-center rounded-lg bg-gray-100 md:w-[100%]">
        <FaRegImage className="text-6xl" />
      </div>
      <div className="flex flex-row items-center justify-between p-3">
        <p className="header-text text-[10px] font-normal leading-[12px] md:text-[14px] md:leading-[18px]">
          {author}
        </p>
        <p className="header-text text-[10px] font-normal leading-[12px] md:text-[14px] md:leading-[16px]">
          {author === user.name ? (
            <span className="flex flex-row items-center justify-between">
              <ButtonLink
                className="mr-6 md:mr-0 cursor-pointer border border-transparent"
                href={`/edit/${id}`}
                variant="light"
              >
                <AiFillEdit className=" cursor-pointer text-2xl text-yellow-500" />
              </ButtonLink>
              <AiFillDelete
                onClick={() => promtDelete(id)}
                className="cursor-pointer text-2xl text-red-500"
              />
            </span>
          ) : null }
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
