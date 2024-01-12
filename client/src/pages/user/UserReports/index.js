import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/PageTitle'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { getAllReportsByUser } from '../../../apiCalls/reports';
import { Table, message } from 'antd';

const UserReports = () => {
    const [reportData, setReportData] = useState([]);
    const dispatch = useDispatch();

    const colums = [
        {
            title: "Exam Name",
            dataIndex: "examName",
            render: (text, record) => <>{record.exam.name}</>
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (text, record) => (
                <>{moment(record.createAt).format("DD-MM-YYYY hh:mm:ss")}</>
            )
        },
        {
            title: "Passing Marks",
            dataIndex: "correctAnswers",
            render: (text, record) => <>{record.exam.passingMarks}</>,
        },
        {
            title: "Obtained Marks",
            dataIndex: "correctAnswers",
            render: (text, record) => <>{record.result.correctAnswers.length}</>,
        },
        {
            title: "Verdict",
            dataIndex: "verdict",
            render: (text, record) => <>{record.result.verdict}</>,
        },
    ]

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllReportsByUser();
            if (response.success) {
                setReportData(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <PageTitle title="Reports" />
            <div className='divider'></div>
            <Table columns={colums} dataSource={reportData} />
        </div>
    )
}

export default UserReports