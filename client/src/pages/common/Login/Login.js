import React from 'react';
import { Form, message } from 'antd';
import { Link } from 'react-router-dom';
import { LoginUser } from '../../../apiCalls/users';

const Login = () => {
    const onFinish = async (value) => {
        try {
            const response = await LoginUser(value);
            if (response.success) {
                message.success(response.message)
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div className='card w-400 p-4'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl'>Login</h1>
                    <div className="divider"></div>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item
                            name='email'
                            label='Email'
                        >
                            <input type='text' />
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
                            <button type="submit" className='primary-contained-btn w-100 text-xl'>Login</button>
                            <Link to='/register' className='text-lg'>Not a Member? Register</Link>
                        </div>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default Login