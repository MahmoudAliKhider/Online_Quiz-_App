import React from 'react';
import { Form, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../apiCalls/users';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await registerUser(values);
      dispatch(HideLoading())
      if (response.success) {
        message.success(response.message)
        navigate('/login')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-primary'>
      <div className='card w-400 p-4 bg-white'>
        <div className='flex flex-col'>
          <h1 className='text-3xl'>Register</h1>
          <div className="divider"></div>
          <Form layout='vertical' onFinish={onFinish}>

            <Form.Item
              name='name'
              label='Name'
            >
              <input type='text' />
            </Form.Item>
            <br />

            <Form.Item
              name='email'
              label='Email'
            >
              <input type='email' />
            </Form.Item>
            <br />

            <Form.Item
              name='password'
              label='Password'
            >
              <input type='password' />
            </Form.Item>
            <br />

            <div className='flex flex-col gap-2'>
              <button type="submit" className='primary-contained-btn w-100 text-xl'>Register</button>
              <Link to='/login' className='text-lg'>Already a Member? Login</Link>
            </div>
          </Form>
        </div>
      </div>

    </div>
  )
}

export default Register