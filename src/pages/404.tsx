import * as React from "react";
import { RiAlarmWarningFill } from "react-icons/ri";
import Header from "./components/Header";
import Layout from "@/components/layout/Layout";
import ArrowLink from "@/components/links/ArrowLink";
import {TbError404} from 'react-icons/tb'
import Seo from "@/components/Seo";
import { NotFoundText, BackText } from "@/constant";
import Footer from "./components/Footer";
export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle="Not Found" />
      <main>
        <section className="bg-main min-h-screen">
          <Header />
          <div className="pt-6 flex flex-col items-center justify-center text-center text-black">
          <RiAlarmWarningFill
              size={60}
              className="drop-shadow-glow animate-flicker text-red-500"
            />
            <TbError404 className="text-9xl"/>
            <h1 className="mt-8 text-4xl md:text-6xl">{NotFoundText}</h1>
            <ArrowLink className="mt-4 md:text-lg" href="/">
              {BackText}
            </ArrowLink>
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  );
}
