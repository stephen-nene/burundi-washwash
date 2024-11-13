import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import LayoutOne from "../layouts/LayoutOne";
import SectionTitleTwo from "../components/section-title/SectionTitleTwo";
import ProductCard from "../components/product/ProductCard";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { addToWishlist } from "../redux/actions/wishlistActions";
import { addToCompare } from "../redux/actions/compareActions";
import '../assets/css/search.css'

const Search = ({ cartItems, wishlistItems, compareItems, addToCart, addToWishlist, addToCompare }) => {
  const { searchParams } = useParams();
const dummyProducts = Array(15).fill({
  id: "36",
  sku: "asdf158",
  name: "Disinfectants 3",
  price: 12.5,
  discount: 20,
  new: true,
  rating: 3,
  saleCount: 90,
  category: ["disinfectants"],
  stock: 2100,
  image:
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=987&auto=format&fit=crop",
  shortDescription:
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
});

const relatedProducts = Array(10).fill({
  id: "37",
  sku: "asdf159",
  name: "Rice 5kg",
  price: 20.5,
  discount: 10,
  new: false,
  rating: 4,
  saleCount: 50,
  category: ["grains"],
  stock: 1500,
  image:
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=987&auto=format&fit=crop",
  shortDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
});




  return (
    <Fragment>
      <LayoutOne headerTop="visible">
        <SectionTitleTwo titleText={`Search results for ${searchParams}`} positionClass="text-center" spaceClass="mb-10" />
        <Row className="p-5 justify-content-center">
          {dummyProducts.map((product, index) => (
            <Col xs={12} sm={6} md={5} lg={3} key={index} className="mb-4">
              <ProductCard
                product={product}
                cartItems={cartItems}
                wishlistItems={wishlistItems}
                compareItems={compareItems}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                addToCompare={addToCompare}
              />
            </Col>
          ))}
        </Row>

        <SectionTitleTwo titleText="Related products" positionClass="text-center" spaceClass="mb-10" />
        <Row className="p-5 justify-content-center">
          {relatedProducts.map((product, index) => (
            <Col xs={12} sm={6} md={5} lg={3} key={index} className="mb-4">
              <ProductCard
                product={product}
                cartItems={cartItems}
                wishlistItems={wishlistItems}
                compareItems={compareItems}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                addToCompare={addToCompare}
              />
            </Col>
          ))}
        </Row>
      </LayoutOne>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cartData,
  wishlistItems: state.wishlistData,
  compareItems: state.compareData,
});

const mapDispatchToProps = {
  addToCart,
  addToWishlist,
  addToCompare,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
