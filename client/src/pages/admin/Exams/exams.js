import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Table, message } from 'antd';

import PageTitle from "../../../components/PageTitle";
import { ShowLoading, HideLoading } from '../../../redux/loaderSlice';
import { getAllExams } from '../../../apiCalls/exams'
const Exams = () => {
    const columns = [
        {
            title: "Exam Name",
            dataIndex: "name",
        },
        {
            title: "Duration",
            dataIndex: "duration",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Total Marks",
            dataIndex: "totalMarks",
        },
        {
            title: "Passing Marks",
            dataIndex: "passingMarks",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="flex gap-2">
                    <i
                        className="ri-pencil-line"
                        onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
                    ></i>
                    <i
                        className="ri-delete-bin-line"
                    ></i>
                </div>
            ),
        },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [exams, setExams] = useState([]);

    const getExamsData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllExams();
            dispatch(HideLoading());
            if (response.success) {
                setExams(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    

    useEffect(() => {
        getExamsData();
    }, [])
    return (
        <div>
            <div className='flex justify-between mt-2 '>
                <PageTitle title="EXAMS" />

                <button className='primary-outlined-btn flex items-center'
                    onClick={() => navigate('/admin/exams/add')}
                >
                    <i className='ri-add-line'></i>
                    Add Exams
                </button>


            </div>
            <div className='divider'></div>
            <Table columns={columns} dataSource={exams} />
        </div>
    )
}

export default Exams