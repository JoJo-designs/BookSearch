// see SignupForm.js for comments
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';

const SignupForm = (props) => {
  const [userFormData, setFormState] = useState({ 
    username: '',
    email: '',
    password: ''
  });
  const [addUser] = useMutation(ADD_USER);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...userFormData,
      [name]: value,
    });
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);
    try {
      const response = await addUser({ 
              variables: { ...userFormData },
            });
            console.log(response)
            Auth.login(response.data.addUser.token)
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: '',
      email: '',
      password: '',
    });
  };


  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
