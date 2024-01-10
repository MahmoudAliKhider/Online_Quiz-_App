import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { getExamById } from '../../../apiCalls/exams';
import { message } from 'antd';
import Instructions from './instructions';

const WriteExam = () => {
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selecteOptions, setSelecteOptions] = useState({});

  const [view, setView] = useState('instructions');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById(
        params.id
      );
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
        setQuestions(response.data.questions);
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
  return (
    examData && (
      <div className='mt-2'>
        <div className='divider'></div>
        <div className='text-center text-2xl'>{examData.name}</div>
        <div className='divider'></div>

        {view === 'instructions' && <Instructions examData={examData} setView={setView} />}

        {view === 'questions' && (
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl'>
              {selectedQuestionIndex + 1} : {" "}
              {questions[selectedQuestionIndex].name}
            </h1>

            <div className='flex flex-col gap-1 ml-3'>
              {Object.keys(questions[selectedQuestionIndex].options).map(
                (option, index) => {
                  return (
                    <div className={`flex gap-2 flex-col ${selecteOptions[selectedQuestionIndex] === option
                      ? "selected-option"
                      : "option"
                      }
                    `}
                      key={index}
                      onClick={() => {
                        setSelecteOptions(
                          {
                            ...selecteOptions,
                            [selectedQuestionIndex]: option
                          }
                        )
                      }
                      }
                    >
                      <h3 className='text-xl'>
                        {option}:{" "}
                        {questions[selectedQuestionIndex].options[option]}
                      </h3>
                    </div>)



                })}
            </div >

            <div className='flex justify-between'>
              {
                (selectedQuestionIndex > 0) && <button className='primary-outlined-btn'
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1)
                  }}
                >
                  Previous
                </button>
              }

              {
                (selectedQuestionIndex < (questions.length - 1)) && <button className='primary-contained-btn'
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1)
                  }}
                >
                  Next
                </button>
              }
            </div>
          </div>
        )
        }
      </div>
    )
  )
}

export default WriteExam