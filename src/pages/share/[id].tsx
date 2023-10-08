/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  query,
  collection,
  getDocs,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";
import { FaShareAlt } from "react-icons/fa";
import { AiOutlineFundView } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Share from "@/components/socialMedia/Share";
import { handleViewArticle } from "../api";
import { countArticleView, reverseCountArticleView } from "@/store";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ImSpinner2 } from "react-icons/im";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import FeedbackCard from "@/components/card/FeedbackCard";

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
  const { id } = router.query;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [isShare, setIsShare] = useState<boolean>(false);
  const [article, setArticle] = useState<ArticleProps>();

  const ToggleShare = () => {
    setIsShare(!isShare);
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
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    const pathnames = router.asPath.split("/");
    const check = pathnames.slice(-1);
    if (check[0] !== "[id]") {
      CountView();
    }
    setLoading(false);
  }, []);

  const loadFromFirebase = async () => {
    setLoading(true);
    try {
      const articleQuery = query(
        collection(db, "Articles"),
        where("id", "==", id)
      );
      const snapshot = await getDocs(articleQuery);
      if (snapshot.docs.length > 0) {
        setLoading(false);
        const res = snapshot.docs.map((doc: DocumentData) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setArticle(res[0]);
        return res;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  useEffect(() => {
    loadFromFirebase();
  }, [id]);

  return (
    <Layout>
      <Seo />

      <main>
        <section className="bg-main min-h-screen">
          <Header />
          {typeof id === "undefined" || !article || article?.title === "" ? (
            <div className="flex h-[40vh] w-full flex-col items-center justify-center">
              <ImSpinner2 className="animate-spin" />
            </div>
          ) : (
            <>
              <div className="h-[90vh] overflow-auto bg-white  px-4 py-[20px] md:px-[120px]">
                <div className="flex flex-col items-center justify-between md:flex-row">
                  <div className="flex flex-row items-center">
                    <IoChevronBackCircleSharp
                      className="mr-1 cursor-pointer text-3xl md:mr-5"
                      onClick={() => {
                        router.push("/");
                      }}
                    />
                    <p className="px-3 text-[14px] font-black  leading-[16px] md:text-[25px] md:leading-[26px]">
                      {article?.title}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-center text-[10px] font-normal leading-[12px] md:text-right md:text-[14px] md:leading-[16px]">
                    {article?.author}
                  </p>
                  <p className="text-center text-[10px] font-normal leading-[12px] md:text-right md:text-[14px] md:leading-[16px]">
                    {article?.createdAt}
                  </p>
                </div>
                <p className="mt-3 flex flex-row items-center justify-center md:justify-end">
                  <BiComment className="ml-4 text-xl text-gray-300" />
                  <span className=" ml-1 text-[10px] font-bold text-gray-400">
                    {article?.comments?.length || 0}
                  </span>
                  <AiOutlineFundView className="ml-4 text-2xl text-gray-300" />
                  <span className=" ml-1 text-[10px] font-bold text-gray-400">
                    {article?.views || 0}
                  </span>
                  <FaShareAlt
                    onClick={ToggleShare}
                    className="ml-4 cursor-pointer text-xl text-gray-300"
                  />
                </p>
                <span className="m-3 text-justify font-primary text-[14px] font-normal leading-[16px] text-black md:text-[15px] md:leading-[18px]">
                  {article?.content &&
                    parse(article?.content.toString() as string)}
                </span>

                {article?.comments && article?.comments?.length > 0 && (
                  <FeedbackCard comments={article?.comments} />
                )}
              </div>
            </>
          )}
          {isShare && (
            <div className="absolute top-[45%] right-0 grid grid-rows-3 gap-4 rounded-l-lg bg-green-100 p-6">
              <Share
                title={article?.title as string}
                articleId={id as string}
              />
            </div>
          )}
        </section>
        <Footer />
      </main>
    </Layout>
  );
}
export default React.memo(ArticlePage);
