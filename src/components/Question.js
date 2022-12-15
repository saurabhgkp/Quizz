import React, { useEffect, useState } from 'react'
import { secondsToDhms } from '../utils/helper-function'
//import {Link, useNavigate} from 'react-router-dom';
const Question = () => {
    const [questions, setQuestions] = useState([])
    const [ques, setQues] = useState()
    const [time, setTime] = useState()
    const [marks, setMarks] = useState()





    useEffect(() => {
        fetch('http://localhost:4000/exam/getAllData').then(res => res.json())
            .then(
                (result) => {
                    // console.log(result.Data);
                    const questions = result.Data.map((el, index) => ({ ...el, count: index + 1 }))
                    setQuestions(questions)
                    //  console.log("=", { ...questions?.[0], options: [questions?.[0].options1, questions?.[0].options2, questions?.[0].options3, questions?.[0].options4] });
                    setQues({ ...questions?.[0], options: [questions?.[0].options1, questions?.[0].options2, questions?.[0].options3, questions?.[0].options4] })
                    //   console.log("==", ques);
                    //   console.log("==", ques.options.replace(/^\s+|\s+$/gm, ''));
                    if (questions?.length) {
                        setTime(60 * questions?.length) // 60 seconds for each question
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])

    const updateTime = () => {
        if (time && typeof time === "number") {
            if (time > 0) {
                setTimeout(() => setTime(time - 1), 1000)
            } else {
                alert("Times Up")
            }
        }
    }

    useEffect(() => {
        updateTime()
    }, [time])

    const setAnswer = (queNo, ansNo) => {
        //  console.log(queNo, ansNo, 33333333);
        let temp = questions
        // // console.log(temp[queNo].status, ansNo);
        temp[queNo].status = ansNo

        // console.log(questions, '-------------- temp hai ye')
        const newObj = { ...questions[queNo], options: [questions?.[queNo].options1, questions?.[queNo].options2, questions?.[queNo].options3, questions?.[queNo].options4], correctAnswerIndex: ansNo, status: "success" }
        setQuestions([...questions?.slice(0, queNo), newObj, ...questions?.slice(queNo + 1)])
        setQues(newObj)
    }

    const setToReview = () => {
        const index = ques?.count - 1
        const newObj = { ...questions[index], options: [questions?.[index].options1, questions?.[index].options2, questions?.[index].options3, questions?.[index].options4], status: "warning" }
        setQuestions([...questions?.slice(0, index), newObj, ...questions?.slice(index + 1)])
        setQues(newObj)
    }
    // console.log("==", ques);
    const onFinalSubmit = () => {
        var rightAns = []
        var attempted = []
        questions.forEach((el) => {
            attempted.push(el.correctAnswerIndex)
            rightAns.push(Number(el.rightAnswer))
        })
        const marksSheetNew = attempted?.map((el, index) => ({ selectedAns: el, correct: el === rightAns[index] ? true : false }))
        setMarks(marksSheetNew?.filter(el => el?.correct === true)?.length)
        console.log(marksSheetNew, marksSheetNew?.filter(el => el?.correct === true)?.length);
        //   navigate('/componentB',{state:{id:1,name:'sabaoon'}});


    }
    return (
        <>
            <div className='container bg-light'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div class="card p-4 quesCard">
                            <p className='mt-3'>
                                <span className='h5'>Q {ques?.count}: </span>
                                {ques?.question}
                            </p>
                            <div>
                                {
                                    ques?.options?.map((item, index) => {
                                        return <div class="form-check">
                                            <input class="form-check-input is-valid"
                                                onChange={() => setAnswer(ques?.count - 1, index)}
                                                // {console.log(item.status)}
                                                value={ques?.correctAnswerIndex}
                                                checked={ques?.correctAnswerIndex === index}
                                                type="radio" name="answer" />
                                            <label class="form-check-label" >
                                                {item}
                                            </label>
                                        </div>
                                    })
                                }
                            </div>

                            {ques?.status !== 'warning' && <div className="d-flex justify-content-end mt-4 addReview">
                                <button className="btn btn-warning" onClick={setToReview}>Add to Review</button>
                            </div>}
                        </div>
                        <div className='mt-4 d-flex justify-content-between'>
                            <div className='float-left'>
                                <button className='btn btn-outline-primary' disabled={ques?.count === 1} onClick={() => { setQues({ ...questions?.[ques?.count - 2], options: [questions?.[ques?.count - 2].options1, questions?.[ques?.count - 2].options2, questions?.[ques?.count - 2].options3, questions?.[ques?.count - 2].options4] }) }}>
                                    Pervious
                                </button>
                            </div>
                            <br />
                            <div className='float-right mb-4'>
                                <button className='btn btn-outline-success' disabled={ques?.count === questions?.length} onClick={() => { setQues({ ...questions?.[ques?.count], options: [questions?.[ques?.count].options1, questions?.[ques?.count].options2, questions?.[ques?.count].options3, questions?.[ques?.count].options4] }) }}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=' col-md-4 '>
                        <h6 className='p-3 card text-center mb-3 rounded'>
                            {secondsToDhms(time)}
                        </h6>
                        <div className='card rounded' >
                            <div className="">
                                {
                                    questions?.map((item) => (
                                        <button
                                            className={`rounded-circle btn btn-outline-${item?.status ? item?.status : "danger"} m-2`} onClick={() => setQues({ ...item, options: [item.options1, item.options2, item.options3, item.options4] })} >
                                            {item?.count}
                                        </button>
                                    ))
                                }
                                <div className='d-flex justify-content-between'>
                                    <div class="form-check text-success">
                                        <button className='rounded btn btn-success'>
                                            Attended
                                        </button>
                                    </div>
                                    <div class="form-check text-danger">
                                        <button className='rounded btn btn-danger'>
                                            Unattended
                                        </button>
                                    </div>
                                    <div class="form-check text-warning">
                                        <button className='rounded btn btn-warning'>
                                            Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-outline-primary mt-4' onClick={onFinalSubmit}> Submit</button>
                    </div>
                    <h2 className='text-success'> You Get {marks} marks</h2>

                </div>
            </div>
        </>
    )
}

export default Question
