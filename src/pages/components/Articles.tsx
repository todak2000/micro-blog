/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { BiErrorAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { useArticles } from "@/utils/hook";
import { getArticles, nextPage, prevPage } from "@/store";
import ArticleCard from "@/components/card/ArticleCard";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

const Articles: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: any) => state.searchQuery);
  const page = useSelector((state: any) => state.page);
  const articles = useSelector((state: any) => state.articles);
  const articlesPerPage = 3;
  const totalPages = Math.ceil(articles?.data?.length / articlesPerPage);

  const paginatedArticles = articles?.data?.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage
  );

  const { data, isLoading, isError, error } = useArticles();

  useEffect(() => {
    let payload: any;
    if (data && data?.length > 0 && searchQuery === "") {
      payload = { data, isLoading, isError, error };
    } else if (data && data?.length > 0 && searchQuery !== "") {
      let queryData = data?.filter((d: any) =>
        d?.title
          ?.trim()
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase() as string)
      );

      payload = { data: queryData, isLoading, isError, error };
    } else {
      payload = { data: [], isLoading, isError, error };
    }
    dispatch(getArticles(payload));
  }, [dispatch, data, searchQuery]);

  return (
    <div className="h-[70vh] bg-white px-4  py-[20px] md:px-[120px]">
      {paginatedArticles?.length > 0 && (
        <div className="mb-3 flex flex-row items-center justify-center">
          <span
            className={`mr-2 rounded-full ${
              page !== 1 ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={
              page !== 1
                ? () => {
                    dispatch(prevPage());
                  }
                : () => null
            }
          >
            <MdOutlineNavigateBefore className="text-xl text-white" />
          </span>
          <span
            className={`mr-2 rounded-full ${
              page !== totalPages ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={
              page !== totalPages
                ? () => {
                    dispatch(nextPage());
                  }
                : () => null
            }
          >
            <MdOutlineNavigateNext className="text-xl text-white" />
          </span>
        </div>
      )}
      <div className="h-[60vh] grid-cols-1 overflow-auto md:grid md:grid-cols-3 md:gap-4">
        {articles?.isLoading ? (
          //   <div className="flex flex-col items-center justify-center h-[40vh] w-full">
          //   <ImSpinner2 className="animate-spin" />
          // </div>
          <div className="absolute top-1/2 left-1/2 mt-[40vh] -translate-x-1/2 -translate-y-1/2 ">
            <ImSpinner2 className="animate-spin" />
          </div>
        ) : (
          <>
            {paginatedArticles?.length > 0 ? (
              <>
                {paginatedArticles?.map(
                  ({
                    id,
                    title,
                    content,
                    category,
                    author,
                    createdAt,
                    authorId,
                  }: {
                    id: string;
                    title: string;
                    content: string;
                    category: string;
                    author: string;
                    createdAt: string;
                    authorId: string;
                  }) => {
                    return (
                      <ArticleCard
                        key={id}
                        id={id}
                        title={title}
                        content={content}
                        category={category}
                        author={author}
                        createdAt={createdAt}
                      />
                    );
                  }
                )}
              </>
            ) : (
              <div className=" flex flex-col items-center justify-center md:ml-[20vw] md:w-[40vw]">
                <BiErrorAlt className="mb-6 text-6xl text-gray-500" />
                <p className="text-center text-gray-500">
                  There are no articles for{" "}
                  {searchQuery !== "" ? "the search term" : "now"}. Please try
                  again later!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Articles);
