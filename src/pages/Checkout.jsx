import React from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { motion } from 'framer-motion';

import '../styles/checkout.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const submitHandler = () => {
    toast.success(
      'Info submitted, our customer support will contact you soon!'
    );
  };

  return (
    <Helmet title='Checkout'>
      <CommonSection title='Checkout' />
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 fw-bold'>Billing Information</h6>
              <Form className='billing__form'>
                <FormGroup className='form__group'>
                  <input type='text' placeholder='Enter your name' />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input type='email' placeholder='Enter your email' />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input type='number' placeholder='Phone number' />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input type='text' placeholder='Street address' />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input type='text' placeholder='City' />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input type='text' placeholder='Postal code' />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input type='text' placeholder='Country' />
                </FormGroup>
              </Form>
            </Col>
            <Col lg='4'>
              <div className='checkout__cart'>
                <h6>
                  Total Qty:{' '}
                  <span>
                    {totalQty} {totalQty === 1 ? 'item' : 'items'}
                  </span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping: <br /> free shipping
                  </span>
                  <span>$0</span>
                </h6>

                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
                <motion.button
                  type='submit'
                  whileTap={{ scale: 1.2 }}
                  className='buy__btn auth__btn w-100'
                  onClick={submitHandler}
                >
                  Place an order
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
