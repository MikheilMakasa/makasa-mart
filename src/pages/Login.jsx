import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import '../styles/login.css';
import { auth } from '../firebase.config';

import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import { motion } from 'framer-motion';

import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Login functionality
  const loginToApp = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
          })
        );
        setLoading(false);
        toast.success('Successfully logged in');
        navigate('/checkout', { replace: true });
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
            <Col lg='6' className='m-auto text-center'>
              <h3 className='fw-bold mb-4'>Login</h3>

              <Form className='auth__form' onSubmit={loginToApp}>
                <FormGroup className='form__group'>
                  <input
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                {loading && (
                  <Spinner
                    animation='border'
                    variant='light'
                    className='spinner'
                  />
                )}

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  type='submit'
                  className='buy__btn auth__btn'
                  disabled={loading}
                >
                  Login
                </motion.button>
                <p>
                  Don't have an account?{' '}
                  <Link to='/signup'>Create an account</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Login;
