import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";
import {constants} from "../utils/constants";
const Product = () => {
  const { id } = useParams(); // Get product ID from URL
  const [selectedProduct, setSelectedProduct] = useState(null); // Initialize as null to indicate no product is loaded yet
  // const [relatedProducts, setRelatedProducts] = useState([]); // Uncomment when needed

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component loads
    // Fetch product details by product ID
    axios
      .get(constants.GET_PRODUCT+`${id}`)
      .then((response) => {
        setSelectedProduct(response.data.product); // Set the product data in state
      })
      .catch((error) => {
        console.error("Error fetching product:", error); // Handle the error appropriately
      });
  }, [id]); // Run this effect when the `id` changes

  useWindowScrollToTop(); // Ensure the window scrolls to the top

  // If the product is not yet loaded, show a loading message
  if (!selectedProduct) {
    return <div>Loading...</div>;
  }   
  return (
    <Fragment>
      <Banner title={selectedProduct.title} /> {/* Display product name in banner */}
      <ProductDetails selectedProduct={selectedProduct} /> {/* Pass the product details */}
      {/* <ProductReviews selectedProduct={selectedProduct} /> Pass the product for reviews */}
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        {/* Related products logic can be added here */}
        {/* <ShopList productItems={relatedProducts} /> */}
      </section>
    </Fragment>
  );
};

export default Product;
