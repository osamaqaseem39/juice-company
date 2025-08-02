import { useState } from "react";
import { motion } from "framer-motion";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import Brands from "~/components/Brands";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sun-yellow via-leaf-light to-sun-orange">
      <Header />
      <Hero />
      <Brands />
    </div>
  );
}
