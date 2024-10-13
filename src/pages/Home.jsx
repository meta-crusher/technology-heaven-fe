import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { constants } from "../utils/constants";
import axios from "axios";
const Home = () => {
  const [bigDiscountProducts, setbigDiscountProduct] = useState(null); // Initialize as null to indicate no product is loaded yet
  const [newArrivalProduct, setnewArrivalProduct] = useState(null); // Initialize as null to indicate no product is loaded yet
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component loads
    // Fetch product details by product ID
    axios
      .get(constants.GET_BIG_DISCOUNT_PRODUCTS)
      .then((response) => {
        
        console.log(response.data);
        setbigDiscountProduct(response.data.product); // Set the product data in state
      })
      .catch((error) => {
        console.error("Error fetching product:", error); // Handle the error appropriately
      });

      axios
      .get(constants.GET_NEW_ARRIVAL_PRODUCTS)
      .then((response) => {
        console.log(response.data);
        setnewArrivalProduct(response.data.product); // Set the product data in state
      })
      .catch((error) => {
        console.error("Error fetching product:", error); // Handle the error appropriately
      });
      
  }, []); // Run this effect when the `id` changes

  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      {/* <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={bigDiscountProducts}
      />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalProduct}
      /> */}
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
