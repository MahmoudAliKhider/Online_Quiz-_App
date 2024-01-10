import React, { useEffect, useState } from 'react'
import { getAllExams } from '../../../apiCalls/exams';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { message, Row } from 'antd';
import PageTitle from '../../../components/PageTitle';

const Home = () => {
  const [exam, setExam] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.users)
  const getAllExam = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        // message.success(response.success)
        setExam(response.data)
      } else {
        message.error(response.error)
      }
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message)
    }
  }

  useEffect(() => {
    getAllExam();
  }, []);

  return (
    <div>
      <PageTitle title={
        `hi ${user?.name}, welcome to Exam Protal`
      } />
      <div className='divider'></div>
      <Row gutter={[16, 16]}>
        {
          exam.map((exam, index) => (
            <div className='card-lg flex flex-col p-3 mt-5 ml-3 ' key={index}>
              <h2 className='text-2xl'> {exam.name}</h2>
              <h3 className='text-md'>Category :- {exam.category}</h3>
              <h3 className='text-md'>Total Marks:- {exam.totalMarks}</h3>
              <h3 className='text-md'>Passin Marks:- {exam.passingMarks}</h3>
              <h3 className='text-md'>Duration:- {exam.duration}</h3>

              <button className='primary-outlined-btn'
                onClick={() => navigate(`/user/write-exam/${exam._id}`)}
              >

                Start Exam
              </button>
            </div>
          ))
        }
      </Row>
    </div>
  )
}

export default Home