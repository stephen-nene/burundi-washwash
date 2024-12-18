import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import ProductImageGallery from "../../components/product/ProductImageGallery";
// import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FcLike, FcLikePlaceholder, FcCancel } from "react-icons/fc";
import { IoGitCompareOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  deleteFromWishlist,
  addToWishlist,
} from "../../redux/actions/wishlistActions";
import {
  addToCompare,
  deleteFromCompare,
} from "../../redux/actions/compareActions";
import { addToCart } from "../../redux/actions/cartActions";
import { Card, Nav, ButtonGroup, Button, Badge } from "react-bootstrap";
import SectionTitle from "../../components/SectionTitle";

const ProductImageDescription = ({
  product,
  currency,
  cartItems,
  wishlistItems,
  compareItems,
  t
}) => {
  const [selectedVariation, setSelectedVariation] = useState(
    product.variations[0]
  );
  const [selectedBulk, setSelectedBulk] = useState(product.bulk_wholesale[0]);
  const [isChecked, setIsChecked] = useState(false);
  const [quantityCount, setQuantityCount] = useState(1);
  const isProductInList = (productId, list) =>
    list.some((item) => item.id === productId);

  // const isProductInCart = isProductInList(product.id, cartItems);
  const isProductInWishlist = isProductInList(product.id, wishlistItems);
  const isProductInCompare = isProductInList(product.id, compareItems);

  const dispatch = useDispatch();

  const handleVariationClick = (variation) => {
    setSelectedVariation(variation);
  };
  // console.log(product);
  const handleBulkClick = (item) => {
    setSelectedBulk(item);
  };
  const convertedPrice = (price) => {
    return currency.selectedCurrency
      ? (price * currency.selectedCurrency.rates).toFixed(2)
      : price;
  };
  return (
    <div className={`shop-area pt-100 pb-100`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}

            <ProductImageGallery product={product} />
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="product-details-content ml-70">
              <h2>{product.name}</h2>
              <div className="product-details-price d-flex align-items-center">
                {!isChecked ? (
                  <span className="me-2">
                    {/* Show original price with strike-through if discount exists */}
                    {selectedVariation?.discount ? (
                      <>
                        <span
                          style={{ textDecoration: "line-through" }}
                          className="fw-bold text-primary mr-4"
                        >
                          {`${
                            currency.selectedCurrency.symbol || ""
                          } ${convertedPrice(selectedVariation?.price)}`}
                        </span>
                        <span className="text-success ms-2">
                          {`${
                            currency.selectedCurrency.symbol || ""
                          } ${convertedPrice(selectedVariation?.discount)}`}
                        </span>
                      </>
                    ) : (
                      <span className="fw-bold text-primary">
                        {`${
                          currency.selectedCurrency.symbol || ""
                        } ${convertedPrice(selectedVariation?.price)}`}
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="fw-bold text-success">
                    {`${
                      currency.selectedCurrency.symbol || ""
                    } ${convertedPrice(selectedBulk?.bulk_price)}`}
                  </span>
                )}
              </div>

              <div className="pro-details-list">
                <p>{product.description}</p>
              </div>
              {/* {console.log(product.description)} */}

              <Card className="mb-3">
                <Card.Header>
                  <Nav variant="tabs" defaultActiveKey="variations">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="variations"
                        active={!isChecked}
                        onClick={() => setIsChecked(false)}
                      >
                        Retail
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Wholesale"
                        active={isChecked}
                        onClick={() => setIsChecked(true)}
                      >
                        Wholesale{" "}
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  {!isChecked ? (
                    <ButtonGroup aria-label="Variations">
                      {product.variations.map((single, key) => (
                        <Button
                          key={key}
                          variant={
                            selectedVariation.size === single.size
                              ? "primary"
                              : "outline-primary"
                          }
                          onClick={() => handleVariationClick(single)}
                        >
                          {single.size}
                        </Button>
                      ))}
                    </ButtonGroup>
                  ) : (
                    <>
                      {product.bulk_wholesale.length > 0 && (
                        <Badge variant="info" className="ms-2">
                          Min: {selectedBulk.min_quantity}
                        </Badge>
                      )}
                      <ButtonGroup aria-label="bulk-options">
                        {product.bulk_wholesale.map((single, key) => (
                          <Button
                            key={key}
                            variant={
                              selectedBulk.size === single.size
                                ? "info"
                                : "outline-info"
                            }
                            onClick={() => handleBulkClick(single)}
                          >
                            {single.size}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </>
                  )}
                </Card.Body>
              </Card>

              {
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount > 1 ? quantityCount - 1 : 1
                        )
                      }
                      className="dec qtybutton"
                    >
                      -
                    </button>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      value={quantityCount}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        setQuantityCount((prevCount) => prevCount + 1)
                      }
                      className="inc qtybutton"
                    >
                      +
                    </button>
                  </div>
                  <div className="pro-details-cart btn-hover">
                    <button
                      onClick={() => {
                        const selectedItem = isChecked
                          ? selectedBulk
                          : selectedVariation;
                        const order_type = isChecked ? "Wholesale" : "Retail";

                        dispatch(
                          addToCart(
                            product,
                            quantityCount,
                            selectedItem.size,
                            order_type
                          )
                        );
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>

                  <div className="pro-details-wishlist">
                    {isProductInWishlist ? (
                      <FcLike
                        onClick={() =>
                          dispatch(deleteFromWishlist(product, toast))
                        }
                        className="heart-icon"
                        title="Add to Wishlist"
                      />
                    ) : (
                      <FcLikePlaceholder
                        onClick={() => {
                          dispatch(addToWishlist(product, toast)); // Dispatch to Redux
                        }}
                        className="heart-icon"
                        title="Already in Wishlist"
                      />
                    )}
                  </div>
                  <div className="pro-details-compare ml-3 ">
                    {!isProductInCompare ? (
                      <IoGitCompareOutline
                        size={25}
                        onClick={() => {
                          dispatch(addToCompare(product)); // No need to pass toast
                        }}
                        title="Add to Compare"
                      />
                    ) : (
                      <FcCancel
                        size={25}
                        title="Remove from Compare"
                        onClick={
                          () => dispatch(deleteFromCompare(product)) // No need to pass toast
                        }
                      />
                    )}
                  </div>
                </div>
              }
              {product.category ? (
                <div className="pro-details-meta">
                  <span>Categories :</span>
                  <ul>
                    {product.category.map((single, key) => {
                      return (
                        <li key={key}>
                          <Link to={process.env.PUBLIC_URL + "/products"}>
                            {single}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
<div className="more-desc container">
  <SectionTitle
    titleText="More Descriptions"
    positionClass="text-center"
    spaceClass="mb-20"
  />
  <div className="row">
    {/* Active Ingredients */}
    {product.active_ingredients && (
      <div className="col-md-6 mb-4">
        <h3>Active Ingredients</h3>
        <p className="text-primary">{product.active_ingredients}</p>
      </div>
    )}
    {/* Storage Instructions */}
    {product.storage_instructions && (
      <div className="col-md-6 mb-4">
        <h3>Storage Instructions</h3>
        <p className="text-info">{product.storage_instructions}</p>
      </div>
    )}
  </div>

  {/* Dilution Instructions */}
  {product.dilution_instructions && (
    <div className="mb-4">
      <h3>Dilution Instructions</h3>
      <p className="text-muted">{product.dilution_instructions}</p>
    </div>
  )}

  {/* Mechanism of Action */}
  {product.mechanism_of_action && (
    <div className="mb-4">
      <h3>Mechanism of Action</h3>
      <p className="text-secondary">{product.mechanism_of_action}</p>
    </div>
  )}

  {/* Product Usage */}
  {product.usage && (
    <div className="mb-4">
      <h3>Product Usage</h3>
      <p className="text-success">{product.usage}</p>
    </div>
  )}

  {/* Presentation */}
  {product.presentation && (
    <div className="mb-4">
      <h3>Presentation</h3>
      <p className="text-warning">{product.presentation}</p>
    </div>
  )}

  {/* Warnings */}
  {product.warnings && (
    <div className="mb-4">
      <h3>Warnings</h3>
      <p className="text-danger fw-bold">{product.warnings}</p>
    </div>
  )}

  {/* Indications */}
  {product.indications && (
    <div>
      <h3>Indications</h3>
      <p className="text-dark">{product.indications}</p>
    </div>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
