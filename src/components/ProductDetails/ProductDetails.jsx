import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";
import ProductRating from "../ProductReviews/ProductRating";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch(); 
  const [quantity, setQuantity] = useState(1);
  const [discountedPrice,setDiscountedPrice]=useState(0);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component loads
    let calcDiscountedPrice = selectedProduct.price - (selectedProduct.price * (selectedProduct.discount / 100));
    setDiscountedPrice(calcDiscountedPrice);
  },[discountedPrice]); // Run this effect when the `id` changes
  
  const handelAdd = (selectedProduct, quantity) => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img loading="lazy" src={selectedProduct?.image[0]} alt="" />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.title}</h2>
            <div className="rate">
            <ProductRating rating={selectedProduct?.rating} />
              <span>{selectedProduct?.rating} ratings</span>
            </div>
            <div className="info">
            <div className="price-section">
              {/* Original Price (slashed price above) */}
              <span className=" original-price">${selectedProduct.price.toFixed(2)}</span>

              {/* Discounted Price (displayed below original price) */}
              <span className="  discounted-price">${discountedPrice.toFixed(2)}</span>
            </div>
            <span className="discount-info">Save {selectedProduct.discount}%!</span>
            <span>Category:{selectedProduct?.category}</span>
            </div>
            <p>{selectedProduct?.description}</p>
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={() => handelAdd(selectedProduct, quantity)}
            >
              Add To Cart
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
