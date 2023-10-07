import React, { useState, useEffect } from "react";

import Layout from "@/components/layout/Layout";
import ArrowLink from "@/components/links/ArrowLink";
import ButtonLink from "@/components/links/ButtonLink";
import UnderlineLink from "@/components/links/UnderlineLink";
import UnstyledLink from "@/components/links/UnstyledLink";
import Seo from "@/components/Seo";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import { useQuery } from "react-query";
import { ImSpinner2 } from "react-icons/im";
import { db } from "@/firebase";
import { DocumentData, collection, getDocs, query } from "@firebase/firestore";
import {
  LandingPageHeader,
  Name,
  LandingPageText,
  initialArticlesObject,
  initialArticles,
  GoogleButtonText,
  GoogleLogo,
  AppGithubLink,
  PersonalGithubLink,
} from "@/constant";
import { useDispatch, useSelector } from "react-redux";
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from "~/svg/Vercel.svg";
import store, { getArticles } from "@/store";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Articles from "./components/Articles";
import Footer from "./components/Footer";

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export default function HomePage() {
  // Define a custom hook for fetching posts
  // const useArticles = () => {
  //   return useQuery<Article[], Error>('articles', async () => {
  //     try {
  //       const articleQuery = query(collection(db, 'Articles'))
  //       const snapshot = await getDocs(articleQuery)
  //       if (snapshot.docs.length > 0) {
  //         return snapshot.docs.map((doc: DocumentData) => doc.data())
  //       }
  //       else{
  //         return initialArticles;
  //         // return [];
  //       }
  //     } catch (error) {
  //       // Handle the error here
  //       return []; // Return a default value
  //     }
  //   })
  // };
  // const dispatch = useDispatch()
  // const {data, isLoading, isError, error} = useArticles()
  // // console.log(useArticles(), 'useArticles()')
  // useEffect(() => {
  //   let payload: any
  //   if (data && data.length > 0) {
  //     payload = { data,isLoading, isError, error}

  //   }
  //   else{
  //     payload = { data: initialArticles ,isLoading, isError, error}
  //   }
  //   dispatch(getArticles(payload))
  // }, [dispatch, data])

  // const articles = useSelector((state: any) => state.articles)

  // useEffect(() => {
  //   console.log(articles, 'store data')
  // }, [store])

  // console.log(data, isLoading, isError, error, 'get articles api')
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className="bg-main min-h-screen">
          <Header />
          <Hero />
          <Articles />
        </section>
      </main>
      <Footer />
    </Layout>
  );
}
