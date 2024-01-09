import React from 'react'
import { Form, Modal, message } from 'antd';

import { addQuestionToExam, editQuestionById } from '../../../apiCalls/exams';
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useDispatch } from 'react-redux';

const AddEditQuestion = ({
    showAddEditQuestionModel,
    setShowAddEditQuestionModel,
    refreshData,
    examId,
    selectedQuestion,
    setSelectedQuestion
}) => {
    const dispatch = useDispatch();

    const onFinish = async (value) => {
        try {
            dispatch(ShowLoading());
            const requirePayload = {
                name: value.name,
                correctanswer: value.correctanswer,
                options: {
                    A: value.A,
                    B: value.B,
                    C: value.C,
                    D: value.D,
                },
                exam: examId
            }
            let response ;
            if(selectedQuestion){
               response = await editQuestionById(requirePayload,selectedQuestion._id)
            }else{
               response = await addQuestionToExam(requirePayload)
            }
            if (response.success) {
                message.success(response.message)
                refreshData();
                setShowAddEditQuestionModel(false);
            } else {
                message.error(response.message);
            }
            setSelectedQuestion(null);
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    return (

        <Modal
            title={selectedQuestion ? `Edit Question` : `Add Question`}
            visible={showAddEditQuestionModel}
            footer={false}
            onCancel={() => {
                setShowAddEditQuestionModel(false)
                setSelectedQuestion(null)
            }}>

            <Form onFinish={onFinish} layout='vertical'
                initialValues={
                    {
                        name: selectedQuestion?.name,
                        A: selectedQuestion?.options?.A,
                        B: selectedQuestion?.options?.B,
                        C: selectedQuestion?.options?.C,
                        D: selectedQuestion?.options?.D,

                        correctanswer: selectedQuestion?.correctanswer

                    }
                }
            >
                <Form.Item name='name' label='Question'>
                    <input type='text' />
                </Form.Item>

                <Form.Item name='correctanswer' label='Correct Option'>
                    <input type='text' />
                </Form.Item>
                <div className='flex gap-5'>
                    <Form.Item name='A' label='Option A'>
                        <input type='text' />
                    </Form.Item>

                    <Form.Item name='B' label='Option B'>
                        <input type='text' />
                    </Form.Item>

                </div>
                <div className='flex gap-5'>
                    <Form.Item name='C' label='Option C'>
                        <input type='text' />
                    </Form.Item>

                    <Form.Item name='D' label='Option D'>
                        <input type='text' />
                    </Form.Item>

                </div>

                <div className="flex justify-end mt-2 gap-3">
                    <button
                        className="primary-outlined-btn"
                        type="button"
                        onClick={() => setShowAddEditQuestionModel(false)}
                    >
                        Cancel
                    </button>
                    <button className="primary-contained-btn">Save</button>
                </div>
            </Form>
        </Modal>
    )
}

export default AddEditQuestion