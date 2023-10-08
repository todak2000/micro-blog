/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import Layout from "@/components/layout/Layout";
import CommentCard from "@/components/card/CommentCard";
import Swal from "sweetalert2";
import Seo from "@/components/Seo";
import { getArticles } from "@/store";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineFundView } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteArticle,
  handleViewArticle,
  handleDislikeArticle,
  handleLikeArticle,
} from "../api";
import {
  removeArticle,
  countArticleView,
  reverseCountArticleView,
  likeArticle,
  dislikeArticle,
} from "@/store";
import ButtonLink from "@/components/links/ButtonLink";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useArticles } from "@/utils/hook";
import { ImSpinner2 } from "react-icons/im";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import FeedbackCard from "@/components/card/FeedbackCard";
import { NoCommentText } from "@/constant";

type ArticleProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: string;
  author: string;
  comments?: any[];
  views?: number;
  likes?: string[];
};

function ArticlePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<ArticleProps>();
  const articles = useSelector((state: any) => state.articles);
  const user = useSelector((state: any) => state.user);
  const { data, isLoading, isError, error } = useArticles();

  const { id } = router.query;
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

  const loadData = () => {
    let payload: any;
    if (data && data?.length > 0) {
      payload = { data, isLoading, isError, error };
      setArticle(
        payload.data.filter((article: ArticleProps) => article.id === id)[0]
      );
      setLoading(false);
    }
    dispatch(getArticles(payload));
  };

  const ToggleLike = async (num: number) => {
    const payload: any = {
      articleId: id,
      user: user.uid,
    };
    const apiData: any = {
      id: id,
      user: user.uid,
    };
    if (num === 1) {
      dispatch(likeArticle(payload));
      const res = await handleLikeArticle(apiData);
      if (res.statusCode !== 200) {
        dispatch(dislikeArticle(payload));
      }
    } else if (num === 0) {
      dispatch(dislikeArticle(payload));
      const res = await handleDislikeArticle(apiData);
      if (res.statusCode !== 200) {
        dispatch(likeArticle(payload));
      }
    }
  };

  const CountView = async () => {
    const payload: any = {
      articleId: id,
    };
    dispatch(countArticleView(payload));
    const res = await handleViewArticle(id as string);
    if (res.statusCode !== 200) {
      dispatch(reverseCountArticleView(payload));
    }
  };
  useEffect(() => {
    const pathnames = router.asPath.split("/");
    const check = pathnames.slice(-1);
    if (check[0] !== "[id]") {
      CountView();
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (articles.data.length > 0) {
      setArticle(
        articles.data.filter((article: ArticleProps) => article.id === id)[0]
      );
      setLoading(false);
    } else {
      loadData();
    }
  }, [data, articles]);
  return (
    <Layout>
      <Seo />

      <main>
        <section className="bg-main min-h-screen">
          <Header />
          {loading ? (
            <div className="flex h-12 w-full flex-col items-center justify-center">
              <ImSpinner2 className="animate-spin" />{" "}
            </div>
          ) : (
            <>
              <div className="h-[90vh] overflow-auto bg-white  px-4 py-[20px] md:px-[120px]">
                <div className="flex flex-col items-center justify-between md:flex-row">
                  <div className="flex flex-row items-center">
                    <IoChevronBackCircleSharp
                      className="mr-1 cursor-pointer text-3xl md:mr-5"
                      onClick={() => {
                        router.back();
                      }}
                    />
                    <p className="px-3 text-[14px] font-black  leading-[16px] md:text-[25px] md:leading-[26px]">
                      {article?.title}
                    </p>
                  </div>
                </div>
                <div className=" flex flex-row items-center justify-center md:justify-end">
                  {user.name !== "" && article?.author === user?.name ? (
                    <span className="flex flex-row items-center">
                      <ButtonLink
                        className="mx-3 cursor-pointer border border-transparent"
                        href={`/edit/${id}`}
                        variant="light"
                      >
                        <AiFillEdit className="cursor-pointer text-2xl text-yellow-500" />
                      </ButtonLink>
                      <AiFillDelete
                        onClick={() => promtDelete(id)}
                        className="mx-3 cursor-pointer text-2xl text-red-500"
                      />
                      <BiComment className="ml-4 text-xl text-gray-300" />
                      <span className=" ml-1 text-[10px] font-bold text-gray-400">
                        {article?.comments?.length || 0}
                      </span>
                      <AiOutlineFundView className="ml-4 text-2xl text-gray-300" />
                      <span className=" ml-1 text-[10px] font-bold text-gray-400">
                        {article?.views || 0}
                      </span>
                      {article?.likes?.includes(user.uid) ? (
                        <AiFillLike
                          onClick={() => {
                            ToggleLike(0);
                          }}
                          className="ml-4 cursor-pointer text-2xl text-green-700"
                        />
                      ) : (
                        <BiLike
                          onClick={() => {
                            ToggleLike(1);
                          }}
                          className="ml-4 cursor-pointer text-2xl text-gray-300"
                        />
                      )}

                      <span className=" ml-1 text-[10px] font-bold text-gray-400">
                        {article?.likes?.length || 0}
                      </span>
                    </span>
                  ) : (
                    <div className="mt-3">
                      <p className="text-center text-[10px] font-normal leading-[12px] md:text-right md:text-[14px] md:leading-[16px]">
                        {article?.author}
                      </p>
                      <p className="text-center text-[10px] font-normal leading-[12px] md:text-right md:text-[14px] md:leading-[16px]">
                        {article?.createdAt}
                      </p>
                      <p className="mt-3 flex flex-row items-center justify-center md:justify-end">
                        <BiComment className="ml-4 text-xl text-gray-300" />
                        <span className=" ml-1 text-[10px] font-bold text-gray-400">
                          {article?.comments?.length || 0}
                        </span>
                        <AiOutlineFundView className="ml-4 text-2xl text-gray-300" />
                        <span className=" ml-1 text-[10px] font-bold text-gray-400">
                          {article?.views || 0}
                        </span>
                        {user.name !== "" ? (
                          <>
                            {article?.likes?.includes(user.uid) ? (
                              <AiFillLike
                                onClick={() => {
                                  ToggleLike(0);
                                }}
                                className="ml-4 cursor-pointer text-2xl text-green-700"
                              />
                            ) : (
                              <BiLike
                                onClick={() => {
                                  ToggleLike(1);
                                }}
                                className="ml-4 cursor-pointer text-2xl text-gray-300"
                              />
                            )}
                          </>
                        ) : (
                          <BiLike className="ml-4 text-xl  text-gray-300" />
                        )}
                        <span className=" ml-1 text-[10px] font-bold text-gray-400">
                          {article?.likes?.length || 0}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                <span className="m-3 text-justify font-primary text-[14px] font-normal leading-[16px] text-black md:text-[15px] md:leading-[18px]">
                  {article?.content &&
                    parse(article?.content.toString() as string)}
                </span>
                {user.name !== "" ? (
                  <CommentCard />
                ) : (
                  <p className="my-3 rounded-sm bg-red-100 py-2 text-center">
                    {NoCommentText}
                  </p>
                )}
                {article?.comments && article?.comments?.length > 0 && (
                  <FeedbackCard comments={article?.comments} />
                )}
              </div>
            </>
          )}
        </section>
        <Footer />
      </main>
    </Layout>
  );
}
export default React.memo(ArticlePage);
