import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/PageTitle'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { getAllReports, getAllReportsByUser } from '../../../apiCalls/reports';
import { Table, message } from 'antd';

const AdminReports = () => {
    const [reportData, setReportData] = useState([]);
    const [filter, setFilter] = useState({
        examName: "",
        userName: "",
    });
    const dispatch = useDispatch();

    const colums = [
        {
            title: "Exam Name",
            dataIndex: "examName",
            render: (text, record) => <>{record.exam.name}</>
        },
        {
            title: "User Name",
            dataIndex: "userName",
            render: (text, record) => <>{record.user.name}</>
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

    const getData = async (templetFilter) => {
        try {
            dispatch(ShowLoading());
            const response = await getAllReports(templetFilter);

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
        getData(filter);
    }, [])
    return (
        <div>
            <PageTitle title="Reports" />
            <div className='divider'></div>
            <div className='flex gap-2'>
                <input type='text' placeholder='Exam'
                    value={filter.examName}
                    onChange={(e) => setFilter({ ...filter, examName: e.target.value })}
                />
                <input type='text' placeholder='User'
                    value={filter.userName}
                    onChange={(e) => setFilter({ ...filter, userName: e.target.value })}
                />
                <button className='primary-outlined-btn'
                    onClick={() => {
                        setFilter({
                            examName: "",
                            userName: "",
                        })
                        getData({
                            examName: "",
                            userName: "",
                        });
                    }}
                >Clear Filters</button>
                <button className='primary-contained-btn'
                    onClick={() => getData(filter)}
                >Search</button>
            </div>
            <Table columns={colums} dataSource={reportData} className='mt-2' />
        </div>
    )
}

export default AdminReports