// see SignupForm.js for comments
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';

const LoginForm = (props) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: ''});
  const [login] = useMutation(LOGIN_USER)
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


const handleInputChange = (event) => {
  const { name, value } = event.target;

  setUserFormData({
    ...userFormData,
    [name]: value,
  });
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  try {
    console.log(userFormData)
    const response = await login(userFormData);

    if (!response.ok) {
      console.log("this is an error")
      throw new Error('something went wrong!');
    }

    const { token, user } = await response.json();
    console.log(user);
    Auth.login(token);
  } catch (err) {
    console.error(err);
    setShowAlert(true);
  }

  setUserFormData({
    email: '',
    password: '',
  });
};



  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
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
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};


export default LoginForm;
