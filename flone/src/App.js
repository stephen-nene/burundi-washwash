import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

// home pages
const HomeMedicalEquipment = lazy(() =>
  import("./pages/home/HomeMedicalEquipment")
);

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// blog pages
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const NotFound = lazy(() => import("./pages/other/NotFound"));

// auth
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
        },
      })
    );
  }, [props]);

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Routes>
                <Route
                  path={process.env.PUBLIC_URL + "/"}
                  element={<HomeMedicalEquipment />}
                />
                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                  element={<ShopGridStandard />}
                />
                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  element={<Product />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                  element={<ProductTabLeft />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
                  element={<ProductTabRight />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-sticky/:id"}
                  element={<ProductSticky />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-slider/:id"}
                  element={<ProductSlider />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-fixed-image/:id"}
                  element={<ProductFixedImage />}
                />

                {/* Blog pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/blogs"}
                  element={<BlogNoSidebar />}
                />

                {/* auth */}
                <Route
                  path={process.env.PUBLIC_URL + "/register"}
                  element={<Register />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login"}
                  element={<Login />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/reset"}
                  element={<ResetPassword />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/forgot"}
                  element={<ForgotPassword />}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  element={<About />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  element={<Contact />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  element={<MyAccount />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  element={<Cart />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  element={<Wishlist />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  element={<Compare />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  element={<Checkout />}
                />
                <Route
                  path={process.env.PUBLIC_URL + "*"}
                  element={<NotFound />}
                />
              </Routes>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
