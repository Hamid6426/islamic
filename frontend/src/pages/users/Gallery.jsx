import React from "react";
import Navbar from "../../components/Navbar";
import SearchImages from "../../components/searchImages";
import ImageGrid from "../../components/ImageGrid";
import Footer from "../../components/Footer";

export default function Gallery() {
  return (
    <div>
      <Navbar />
      <SearchImages />
      <ImageGrid />
      <Footer />
    </div>
  );
}
