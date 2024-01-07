import React from 'react';
import { Form } from 'antd';

const Login = () => {
    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div className='card w-400 p-4'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl'>Login</h1>
                    <div className="divider"></div>
                    <Form layout='vertical' >
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
                        <button type="submit" className='primary-contained-btn w-100'>Login</button>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default Login