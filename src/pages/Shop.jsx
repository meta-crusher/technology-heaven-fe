import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { constants } from './../utils/constants'; // Make sure this path is correct

const Shop = () => {
  const [filterList, setFilterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading state
      try {
        const response = await axios.get(constants.GET_ALL_PRODUCTS); // Use the constant for the endpoint
        setFilterList(response.data.products); // Assuming products are in response.data.products
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchProducts();
  }, [] );

  useWindowScrollToTop();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <Fragment>
        <Banner title="Product" />
        <section className="filter-bar">
          <Container className="filter-bar-container">
            <Row className="justify-content-center">
              <Col md={4}>
                <FilterSelect setFilterList={setFilterList} />
              </Col>
              <Col md={8}>
                <SearchBar setFilterList={setFilterList} />
              </Col>
            </Row>
          </Container>
          <Container>
            <ShopList productItems={filterList} />
          </Container>
        </section>
      </Fragment>
  );
};

export default Shop;
