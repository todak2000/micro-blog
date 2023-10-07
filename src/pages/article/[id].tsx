/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import Layout from "@/components/layout/Layout";

import Swal from "sweetalert2";
import Seo from "@/components/Seo";
import { getArticles } from "@/store";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteArticle } from "../api";
import { removeArticle } from "@/store";
import ButtonLink from "@/components/links/ButtonLink";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useArticles } from "@/utils/hook";
import { ImSpinner2 } from "react-icons/im";
import { IoChevronBackCircleSharp } from "react-icons/io5";

type ArticleProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: string;
  author: string;
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
  }, [data]);

  return (
    <Layout>
      <Seo />

      <main>
        <section className="bg-main min-h-screen">
          <Header />
          <div className="h-[90vh] overflow-auto bg-white  px-4 py-[20px] md:px-[120px]">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="flex flex-row items-center">
                <IoChevronBackCircleSharp
                  className="md:mr-5 mr-1 cursor-pointer text-3xl"
                  onClick={() => {
                    router.back();
                  }}
                />
                <p className="px-3 text-[14px] font-black leading-[16px] md:text-[25px] md:leading-[26px]">
                  {article?.title}
                </p>
              </div>
            </div>
            <div className=" flex flex-row items-center md:justify-end justify-center">
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
                      className="ml-3 cursor-pointer text-2xl text-red-500"
                    />
                  </span>
                ) : (
                  <div className="">
                    <p className="text-center text-[10px] font-thin leading-[12px] md:text-right md:text-[14px] md:leading-[16px]">{article?.author}</p>
                    <p className="text-center text-[10px] font-thin leading-[12px] md:text-right md:text-[14px] md:leading-[16px]">{article?.createdAt}</p>
                   
                  </div>
                  
                )}
               
              </div>
            {loading ? (
              <div className="flex h-12 w-full flex-col items-center justify-center">
                <ImSpinner2 className="animate-spin" />{" "}
              </div>
            ) : (
              <span className="m-3 text-justify font-primary text-[14px] font-thin leading-[16px] text-black md:text-[15px] md:leading-[18px]">
                {article?.content &&
                  parse(article?.content.toString() as string)}
              </span>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </Layout>
  );
}
export default React.memo(ArticlePage);
