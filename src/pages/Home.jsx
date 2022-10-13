import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';

import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img.png';

import '../styles/home.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Services from '../services/Services';
import ProductsList from '../components/UI/ProductsList';

import Clock from '../components/UI/Clock';

import counterImg from '../assets/images/counter-timer-img.png';

import { ref } from '../firebase.config';
import { getDocs } from 'firebase/firestore';

import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
  // state for each product category
  const [productsData, setProductsData] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const year = new Date().getFullYear();

  // test code for getting data from firebase

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
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, []);

  //test code

  // for filtering the categories to display on home
  useEffect(() => {
    const filteredTrendingProducts = productsData.filter(
      (item) => item.category === 'chair'
    );

    const filteredBestSalesProducts = productsData.filter(
      (item) => item.category === 'sofa'
    );

    const filteredMobileProducts = productsData.filter(
      (item) => item.category === 'mobile'
    );

    const filteredWirelessProducts = productsData.filter(
      (item) => item.category === 'wireless'
    );
    const filteredPopularProducts = productsData.filter(
      (item) => item.category === 'watch'
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [productsData]);

  return (
    <Helmet title={'Home'}>
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero__content'>
                <p className='hero__subtitle'>Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic And Modern</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Magnam veritatis non natus autem inventore itaque aut modi
                  quia alias corrupti.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className='buy__btn'>
                  <Link to='/shop'>SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className='hero__img'>
                <img src={heroImg} alt='hero' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />

      {isLoading && (
        <Spinner animation='border' variant='dark' className='spinner' />
      )}

      {!isLoading && (
        <div>
          <section className='trending__products'>
            <Container>
              <Row>
                <Col lg='12' className='text-center'>
                  <h2 className='section__title'>Trending Products</h2>
                </Col>
                <ProductsList data={trendingProducts} />
              </Row>
            </Container>
          </section>

          <section className='best__sales'>
            <Container>
              <Row>
                <Col lg='12' className='text-center'>
                  <h2 className='section__title'>Best Sales</h2>
                </Col>
                <ProductsList data={bestSalesProducts} />
              </Row>
            </Container>
          </section>
          <section className='timer__count'>
            <Container>
              <Row>
                <Col lg='6' md='12' className='count__down-col'>
                  <div className='clock__top-content'>
                    <h3 className='text-white fs-6 mb-2'>Limited Offers</h3>
                    <h3 className='text-white fs-5 mb-2'>Quality ArmChair</h3>
                  </div>
                  <Clock />
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className='buy__btn store__btn'
                  >
                    <Link to='/shop'>Visit Store</Link>
                  </motion.button>
                </Col>
                <Col lg='6' md='12' className='text-end counter__img'>
                  <img src={counterImg} alt='' />
                </Col>
              </Row>
            </Container>
          </section>

          <section className='new__arrivals'>
            <Container>
              <Row>
                <Col lg='12' className='text-center mb-5'>
                  <h2 className='section__title'>New Arrivals</h2>
                </Col>
                <ProductsList data={mobileProducts} />
                <ProductsList data={wirelessProducts} />
              </Row>
            </Container>
          </section>

          <section className='popular__category'>
            <Container>
              <Row>
                <Col lg='12' className='text-center mb-5'>
                  <h2 className='section__title'>Popular in Category</h2>
                </Col>
                <ProductsList data={popularProducts} />
              </Row>
            </Container>
          </section>
        </div>
      )}
    </Helmet>
  );
};

export default Home;
