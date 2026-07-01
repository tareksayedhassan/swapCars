"use client";
import Loading from "@/components/Custom/Loading";
import Header from "@/components/Header/Header";
import Brands from "@/components/Home/Brands";
import CarsMostSearched from "@/components/Home/cars/CarsMostSearched";
import Hero from "@/components/Home/Hero/Hero";
import FinanceFlow from "@/components/Home/FinanceFlow";
import React from "react";

const Page = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="min-h-screen ">
      <Header />
      <Hero />
      <Brands />
      <FinanceFlow />
      <CarsMostSearched />
    </div>
  );
};

export default Page;
