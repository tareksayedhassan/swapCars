"use client";
import Loading from "@/components/Custom/Loading";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
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
    </div>
  );
};

export default Page;
