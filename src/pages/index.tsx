import React from "react";

import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Articles from "./components/Articles";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle="Home" />
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
