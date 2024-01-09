import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Select, message, Tabs, Table } from "antd";

import PageTitle from '../../../components/PageTitle';
import { addExam, getExamById, updateExamById } from '../../../apiCalls/exams';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import TabPane from 'antd/es/tabs/TabPane';
import AddEditQuestion from './AddEditQuestion';

const AddEditExam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [examData, setExamData] = useState(null);
  const [showAddEditQuestionModel, setShowAddEditQuestionModel] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);

  const onFinish = async (value) => {

    try {
      dispatch(ShowLoading());
      let response;

      if (params.id) {

        response = await updateExamById(params.id, value)
      } else {
        response = await addExam(value);
      }

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

  const getExamData = async () => {
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
      getExamData()
    }
  }, []);

  const QuestionOptions = [
    {
      title: "Question",
      dataIndex: "name"
    },
    {
      title:"Options",
      dataIndex:"options",
      render: (text,record)=>{
        return Object.keys(record.options).map((key)=>{
          return <div>{key} : {record.options[key]}</div>
        })
      }
    },
    {
      title: "Correct Answer",
      dataIndex: "correctanswer",
      render: (text, record) => {
        return `${record.correctanswer} : ${record.options[record.correctanswer]}`;
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i className="ri-pencil-line" onClick={() => { }}></i>
          <i className="ri-delete-bin-line" onClick={() => { }}></i>
        </div>
      )
    }
  ]
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
              <div className='flex justify-end gap-2' >
                <button type="submit" className='primary-outlined-btn'
                  onClick={() => navigate('/admin/exams')}
                >Cancel</button>
                <button type="submit" className='primary-contained-btn'>Save</button>
              </div>

            </TabPane>

            {/* //////////////////////////////// */}

            {params.id &&
              (<TabPane tab="Questions" key='2'>
                <div className='flex justify-end'>
                  <button className='primary-outlined-btn '
                    type="button"
                    onClick={() => setShowAddEditQuestionModel(true)}
                  >Add Questios</button>
                </div>

                <Table
                  columns={QuestionOptions}
                  dataSource={examData?.questions}
                />
              </TabPane>
              )}

          </Tabs>
          <br />

        </Form>
      }

      {showAddEditQuestionModel && (
        <AddEditQuestion
          setShowAddEditQuestionModel={setShowAddEditQuestionModel}
          showAddEditQuestionModel={showAddEditQuestionModel}
          examId={params.id}
          refreshData={getExamData}
        />
      )}
    </div>
  )
}

export default AddEditExam