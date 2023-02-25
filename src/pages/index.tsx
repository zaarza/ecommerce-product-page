import React from "react";
import { Navbar, DetailProduct } from "@/components";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Fall Limited Edition Sneakers | Sneakers</title>
      </Head>
      <Navbar />
      <DetailProduct />
    </>
  );
};

export default Home;
