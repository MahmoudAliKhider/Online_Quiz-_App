import React from 'react'
import { Form, Modal, message } from 'antd';

import { addQuestionToExam } from '../../../apiCalls/exams';
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useDispatch } from 'react-redux';

const AddEditQuestion = ({
    showAddEditQuestionModel,
    setShowAddEditQuestionModel,
    refreshData,
    examId
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
            const response = await addQuestionToExam(requirePayload);
            if (response.success) {
                message.success(response.message)
                refreshData();
                setShowAddEditQuestionModel(false);
                dispatch(HideLoading());
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    return (

        <Modal
            title="Add Question"
            visible={showAddEditQuestionModel}
            footer={false}
            onCancel={() => setShowAddEditQuestionModel(false)}>

            <Form onFinish={onFinish} layout='vertical'>
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