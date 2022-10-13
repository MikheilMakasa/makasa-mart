import React, { useState, useEffect } from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';

import '../styles/shop.css';

import ProductsList from '../components/UI/ProductsList';

import { ref } from '../firebase.config';
import { getDocs } from 'firebase/firestore';

import Spinner from 'react-bootstrap/Spinner';

const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cloneData, setCloneData] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getDocs(ref)
      .then((snapshot) => {
        let products = [];
        snapshot.docs.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id });
        });

        setIsLoading(false);
        setProductsData(products);

        // for resetting
        setCloneData(products);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, []);

  // filtering logic
  const handleFilter = (e) => {
    const all = cloneData;
    const sofas = cloneData.filter((item) => item.category === 'sofa');
    const mobiles = cloneData.filter((item) => item.category === 'mobile');
    const chairs = cloneData.filter((item) => item.category === 'chair');

    const watches = cloneData.filter((item) => item.category === 'watch');
    const wireless = cloneData.filter((item) => item.category === 'wireless');

    const filterValue = e.target.value;

    if (filterValue === 'all') {
      const filteredProducts = all;
      setProductsData(filteredProducts);
    }

    if (filterValue === 'sofa') {
      const filteredProducts = sofas;
      setProductsData(filteredProducts);
    }

    if (filterValue === 'mobile') {
      const filteredProducts = mobiles;

      setProductsData(filteredProducts);
    }

    if (filterValue === 'chair') {
      const filteredProducts = chairs;
      setProductsData(filteredProducts);
    }

    if (filterValue === 'watch') {
      const filteredProducts = watches;
      setProductsData(filteredProducts);
    }

    if (filterValue === 'wireless') {
      const filteredProducts = wireless;
      setProductsData(filteredProducts);
    }
  };

  // search logic
  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    if (searchTerm === '') {
      setProductsData(cloneData);
    } else {
      const searchedProducts = productsData.filter((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setProductsData(searchedProducts);
    }
  };

  // sort logic

  const handleSort = (e) => {
    const filterValue = e.target.value;

    if (filterValue === 'ascending') {
      setProductsData((data) => {
        const dataToSort = [...data];
        dataToSort.sort((a, b) => Number(a.price) - Number(b.price));
        return dataToSort;
      });
    }

    if (filterValue === 'descending') {
      setProductsData((data) => {
        const dataToSort = [...data];
        dataToSort.sort((a, b) => Number(b.price) - Number(a.price));
        return dataToSort;
      });
    }
  };

  return (
    <Helmet title='Shop'>
      <CommonSection title='Products' />
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className='filter__widget'>
                <select onChange={handleFilter}>
                  <option value='all'>Filter By Category</option>
                  <option value='sofa'>Sofa</option>
                  <option value='mobile'>Mobile</option>
                  <option value='chair'>Chair</option>
                  <option value='watch'>Watch</option>
                  <option value='wireless'>Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
              <div className='filter__widget'>
                <select onChange={handleSort}>
                  <option>Sort By</option>
                  <option value='ascending'>Price: Ascending</option>
                  <option value='descending'>Price: Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className='search__box'>
                <input
                  type='text'
                  placeholder='Search...'
                  onChange={handleSearch}
                />
                <span>
                  <i className='ri-search-line'></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {isLoading && (
          <Spinner animation='border' variant='dark' className='spinner' />
        )}

        {!isLoading && (
          <section className='pt-0'>
            <Container>
              <Row>
                {productsData.length === 0 ? (
                  <h1 className='text-center fs-4 pt-5'>
                    No products are found!
                  </h1>
                ) : (
                  <ProductsList data={productsData} />
                )}
              </Row>
            </Container>
          </section>
        )}
      </section>
    </Helmet>
  );
};

export default Shop;
