// import React, { useState } from 'react';
// import '../styles/admin.css';
// import Helmet from '../components/Helmet/Helmet';
// import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
// import { motion } from 'framer-motion';
// import { ref } from '../firebase.config';
// import { v4 as uuidv4 } from 'uuid';

// const Admin = () => {
//   const [name, setName] = useState('');
//   const [imgUrl, setImgUrl] = useState('');

//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState('');
//   const [shortDesc, setShortDesc] = useState('');
//   const [description, setDescription] = useState('');
//   const [reviews, setReviews] = useState('');
//   const [avgRating, setAvgRating] = useState('');

//   const submitData = (e) => {
//     e.preventDefault();

//     ref
//       .doc()
//       .set({
//         id: uuidv4(),
//         productName: name,
//         imgUrl,
//         category,
//         price,
//         shortDesc,
//         description,
//         reviews,
//         avgRating,
//       })
//       .catch((error) => alert(error));

//     // resetting inputs
//     setName('');
//     setImgUrl('');
//     setCategory('');
//     setPrice('');
//     // setShortDesc('');
//     // setDescription('');
//     // setReviews('');
//     // setAvgRating('');
//   };

//   return (
//     <Helmet title='admin'>
//       <section>
//         <Container>
//           <Row>
//             <Col lg='6' className='m-auto text-center'>
//               <h3 className='fw-bold mb-4'>Add New Product</h3>

//               <Form className='addItem__form' onSubmit={submitData}>
//                 <FormGroup className='form__group'>
//                   <input
//                     placeholder='Enter product name'
//                     type='text'
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </FormGroup>

//                 <FormGroup className='form__group'>
//                   <input
//                     placeholder='Enter image Url'
//                     type='text'
//                     value={imgUrl}
//                     onChange={(e) => setImgUrl(e.target.value)}
//                   />
//                 </FormGroup>

//                 <FormGroup className='form__group'>
//                   <input
//                     placeholder='Enter category name'
//                     type='text'
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                   />
//                 </FormGroup>

//                 <FormGroup className='form__group'>
//                   <input
//                     placeholder='Enter price'
//                     type='number'
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                   />
//                 </FormGroup>

//                 <FormGroup className='form__group'>
//                   <input
//                     placeholder='Enter short desc'
//                     type='text'
//                     value={shortDesc}
//                     onChange={(e) => setShortDesc(e.target.value)}
//                   />
//                 </FormGroup>

//                 <FormGroup className='form__group'>
//                   <input
//                     placeholder='Enter description'
//                     type='text'
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                   />
//                 </FormGroup>

//                 <FormGroup className='form__group'>
//                   <input
//                     placeholder='Enter Reviews'
//                     type='text'
//                     value={reviews}
//                     onChange={(e) => setReviews(e.target.value)}
//                   />
//                 </FormGroup>

//                 <FormGroup className='form__group'>
//                   <input
//                     placeholder='Enter rating'
//                     type='number'
//                     value={avgRating}
//                     onChange={(e) => setAvgRating(e.target.value)}
//                   />
//                 </FormGroup>

//                 <motion.button
//                   whileTap={{ scale: 1.2 }}
//                   type='submit'
//                   className='buy__btn addItem__btn'
//                 >
//                   Add Item
//                 </motion.button>
//               </Form>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default Admin;
