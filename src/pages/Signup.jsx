// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { setDoc, doc } from 'firebase/firestore';

// import { storage } from '../firebase.config';
// import { db } from '../firebase.config';

import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import '../styles/login.css';
import { auth } from '../firebase.config';

import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import Spinner from 'react-bootstrap/Spinner';

import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // registering functionality
  const register = (e) => {
    setLoading(true);
    e.preventDefault();

    if (!name) {
      setLoading(false);
      return alert('Please enter a full name!');
    }

    //firebase function
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            );
            setLoading(false);
            toast.success('Account created');
            navigate('/checkout');
          });
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    <Helmet title='Signup'>
      <section>
        <Container>
          <Row>
            <Col lg='6' className='m-auto text-center'>
              <h3 className='fw-bold mb-4'>Sign up</h3>

              <Form className='auth__form' onSubmit={register}>
                <FormGroup className='form__group'>
                  <input
                    placeholder='Full name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>

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

                <FormGroup className='form__group'>
                  <input
                    placeholder='Profile pic URL (optional)'
                    type='text'
                    value={profilePic}
                    onChange={(e) => setProfilePic(e.target.value)}
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
                  Create an Account
                </motion.button>
                <p>
                  Already have an account? <Link to='/login'>Login</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Signup;
