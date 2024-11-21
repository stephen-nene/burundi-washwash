import React from "react";
import { useParams } from "react-router-dom";
import LayoutOne from "../components/LayoutOne";
import SectionTitle from "../components/SectionTitle";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import Fuse from "fuse.js";
import ShopProducts from "../wrappers/product/ShopProducts";
import "../assets/css/search.css";
import { useTranslation } from "react-i18next";
const Search = ({ products }) => {
  const { t } = useTranslation();
  const { searchParams } = useParams();

  const fuseOptions = {
    includeScore: true, // Include relevance score for sorting
    includeMatches: true, // Include matched indices for highlighting
    minMatchCharLength: 3, // Minimum 3 characters for a match
    shouldSort: true, // Sort results by relevance
    threshold: 0.4, // Tighter threshold for closer matches
    location: 0, // Approximate location of the match
    distance: 100, // How far from the location a match can occur
    ignoreLocation: false, // Respect location for better relevance
    keys: [
      "name",
      "description", 
      "category", 
    ],
  };

  // Create Fuse.js instance
  const fuse = new Fuse(products.products, fuseOptions);

  const filteredProducts = fuse.search(searchParams).map((result) => ({
    ...result.item,
    score: result.score, 
    matches: result.matches,
  }));

  const fallbackProducts = products.products
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);

  // Determine products to display
  const productsToDisplay =
    filteredProducts.length > 0 ? filteredProducts : fallbackProducts;

  return (
    <div className="overflow-hidden mt-100">
      <LayoutOne headerTop="visible">
        <SectionTitle
          titleText={`${t("Search results for")} "${searchParams}"`}
          positionClass="text-center"
          spaceClass="mt-20"
        />
        <Row className="p-5 justify-content-center">
          {filteredProducts.length > 0 ? (
            <>
              {/* Render matched products */}
              <ShopProducts currentData={productsToDisplay} />
              <div className="d-grid m-10">
                <SectionTitle
                  titleText={t("Related products")}
                  positionClass="text-center"
                  spaceClass="mx-40"
                  subtitleText={t("Here are some more goodies for you:")}
                />
                <Row className="p-5 justify-content-center">
                  <ShopProducts currentData={fallbackProducts} />
                </Row>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p>
                {t("No products matched your search query")} <b>{searchParams}</b>.
              </p>
              <p>{t("Here are some recommendations:")}</p>
              <ShopProducts currentData={fallbackProducts} />
            </div>
          )}
        </Row>
      </LayoutOne>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.productData, // Ensure productData includes all required fields
});

export default connect(mapStateToProps)(Search);
