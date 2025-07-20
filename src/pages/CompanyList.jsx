import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import FavoriteCompany from "../components/company/FavouriteCompany";
import HotCompany from "../components/company/HotCompany";
import OtherCompany from "../components/company/OthersCompany";

function CompanyList() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header />

      {searchQuery ? (
        <div className="SearchResults px-10 mt-10">
          <h2 className="text-xl font-semibold mb-6">
            Kết quả tìm kiếm:{" "}
            <span className="text-blue-500">{searchQuery}</span>
          </h2>
        </div>
      ) : (
        <>
          <HotCompany />
          <FavoriteCompany />
          <OtherCompany />
        </>
      )}

      <Footer />
    </>
  );
}

export default CompanyList;
