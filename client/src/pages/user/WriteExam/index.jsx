import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { getExamById } from '../../../apiCalls/exams';
import { message } from 'antd';
import Instructions from './instructions';
import { addReport } from '../../../apiCalls/reports';

const WriteExam = () => {
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selecteOptions, setSelecteOptions] = useState({});
  const [result = {}, setResult] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const [view, setView] = useState('instructions');

  const { user } = useSelector((state) => state.users)
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
        setSecondsLeft(response.data.duration);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const calculatResult = async () => {
    try {
      let correctAnswers = [];
      let wrongAnswers = [];

      questions.forEach((question, index) => {
        if (question.correctanswer === selecteOptions[index]) {
          correctAnswers.push(question)
        } else {
          wrongAnswers.push(question)
        }
      })

      let verdict = "Pass";
      if (correctAnswers.length < examData.passingMarks) {
        verdict = "Fail";
      }

      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict
      }

      setResult(tempResult)
      dispatch(ShowLoading())
      const response = await addReport({
        exam: params.id,
        result: tempResult,
        user: user._id
      })
      dispatch(HideLoading());
      if (response.success) {
        setView("result")
      } else {
        message.error(response.error)
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  const startTimer = () => {
    let totalSeconds = examData.duration;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setSecondsLeft(totalSeconds);
      } else {
        setTimeUp(true);
      }
    }, 1000);
    setIntervalId(intervalId);
  }

  useEffect(() => {
    if (timeUp && view === "questions") {
      clearInterval(intervalId);
      calculatResult();
    }
  }, [timeUp]);

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

        {view === 'instructions' && <Instructions examData={examData} setView={setView} startTimer={startTimer} />}

        {view === 'questions' && (
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <h1 className='text-2xl'>
                {selectedQuestionIndex + 1} : {" "}
                {questions[selectedQuestionIndex].name}
              </h1>

              <div className='timer'>
                <div className='text-xl'>{secondsLeft}</div>
              </div>
            </div>

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

              {
                (selectedQuestionIndex === (questions.length - 1)) &&
                <button className='primary-contained-btn'
                  onClick={() => {
                    setTimeUp(true)
                    clearInterval(intervalId)
                    calculatResult()
                  }
                  }
                >
                  Submit
                </button>
              }
            </div>

          </div>
        )
        }

        {view === "result" && (
          <div className="flex  items-center mt-2 justify-center result">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">RESULT</h1>
              <div className='marks'>
                <h1 className="text-xl">Total Marks : {examData.totalMarks}</h1>
                <h1 className="text-xl">
                  Obtained Marks :{result.correctAnswers.length || 0}
                </h1>
                <h1 className="text-xl">
                  Wrong Answers : {result?.wrongAnswers?.length || 0}
                </h1>
                <h1 className="text-xl">
                  Passing Marks : {examData.passingMarks}
                </h1>
                <h1 className="text-xl">VERDICT :{result.verdict}</h1>

              </div>

            </div>

            <div className="lottie-animation">
              {result.verdict === "Pass" && (
                <lottie-player
                  src="https://assets2.lottiefiles.com/packages/lf20_ya4ycrti.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}

              {result.verdict === "Fail" && (
                <lottie-player
                  src="https://assets4.lottiefiles.com/packages/lf20_qp1spzqv.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}
            </div>
          </div>
        )}

      </div>
    )
  )
}

export default WriteExam