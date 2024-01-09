import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Select, message, Tabs } from "antd";

import PageTitle from '../../../components/PageTitle';
import { addExam, getExamById } from '../../../apiCalls/exams';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import TabPane from 'antd/es/tabs/TabPane';

const AddEditExam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [examData, setExamData] = useState(null);

  const onFinish = async (value) => {
    try {
      dispatch(ShowLoading());
      let response = await addExam(value);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate('/admin/exams')
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message)
    }
  }

  const getExamsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById(
        params.id
      );
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getExamsData()
    }
  }, [])
  return (
    <div>
      <PageTitle title={params.id ? 'Exam Edit' : "Exam Add"} />
      <div className='divider'></div>

      {
        (examData || !params.id) && <Form layout='vertical' className='mt-2 p-1 ' onFinish={onFinish} initialValues={examData}>

          <Tabs defaultActiveKey='1'>
            <TabPane tab='Exam Details' key='1'>

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
            </TabPane>

            {params.id && <TabPane tab="Exam Question" key='2'>
              <h1>Questions</h1>
            </TabPane>}

          </Tabs>

          <div className='flex justify-end' >
            <button type="submit" className='primary-contained-btn'>Save</button>
          </div>
        </Form>
      }
    </div>
  )
}

export default AddEditExam