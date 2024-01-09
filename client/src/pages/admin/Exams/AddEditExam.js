import React from 'react';
import { Form, Row, Col, Select, message } from "antd";

import PageTitle from '../../../components/PageTitle';
import { addExam } from '../../../apiCalls/exams';
import { useNavigate } from 'react-router-dom';

const AddEditExam = () => {
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      let response = await addExam(value);
      if (response.success) {
        message.success(response.message);
        navigate('/admin/exams')
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <div>
      <PageTitle title="Add Exams" />
      <div className='divider'></div>

      <Form layout='vertical' className='mt-2 p-1 ' onFinish={onFinish}>

        <Row gutter={[20, 20]}>
          <Col span={8} >
            <Form.Item label="Exam Name" name="name">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={8} >
            <Form.Item label="Exam Duration" name="duration">
              <input type="number" />
            </Form.Item>
          </Col>

          <Col span={8} >
            <Form.Item label="Category" name="category">
              <Select>

                <Select.Option value="javascript">JavaScript</Select.Option>
                <Select.Option value="nodejs">nodeJs</Select.Option>
                <Select.Option value="react">React</Select.Option>
                <Select.Option value="mongodb">MongoDB</Select.Option>

              </Select>
            </Form.Item>
          </Col>

          <Col span={8} >
            <Form.Item label="Total Mark" name="totalMarks">
              <input type="number" />
            </Form.Item>
          </Col>

          <Col span={8} >
            <Form.Item label="Passing Marks" name="passingMarks">
              <input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <div className='flex justify-end' >
          <button type="submit" className='primary-contained-btn'>Save</button>
        </div>
      </Form>
    </div>
  )
}

export default AddEditExam