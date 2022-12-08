import React, { useEffect, useState } from 'react'

const Question = () => {
    var [questions, setQuestions] = useState([])
    const [ques, setQues] = useState()
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=20&category=10&difficulty=easy&type=multiple').then(res => res.json())
            .then(
                (result) => {
                    const question = result.results.map((el, index) => ({ ...el, count: index + 1 }))
                    setQuestions(question)
                    setQues(question?.[0])
                    console.log(question?.[0]);
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])

    const setAnswer = (queNo, ansNo) => {
        // console.log(queNo, ansNo, 33333333);
        // let temp = questions
        // // console.log(temp[queNo].status, ansNo);
        // temp[queNo].status = ansNo

        // console.log(questions, '-------------- temp hai ye')
        const newObj = { ...questions[queNo], correctAnswerIndex: ansNo, status: "success" }
        setQuestions([...questions?.slice(0, queNo), newObj, ...questions?.slice(queNo + 1)])
        setQues(newObj)
    }

    const setToReview = () => {
        const index = ques?.count - 1
        const newObj = { ...questions[index], status: "warning" }
        setQuestions([...questions?.slice(0, index), newObj, ...questions?.slice(index + 1)])
        setQues(newObj)
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
                                <div class="form-check">
                                    <input class="form-check-input is-valid" type="radio" name="answer"
                                        id="exampleRadios1" value="option1" />
                                    <label class="form-check-label" >
                                        {ques?.correct_answer}
                                    </label>
                                </div>
                                {
                                    ques?.incorrect_answers?.map((item, index) => {
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
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-warning" onClick={setToReview}>Add to Review</button>
                            </div>
                        </div>
                        <div className='mt-4 d-flex justify-content-between'>
                            <div className='float-left'>
                                <button className='btn btn-outline-primary' disabled={ques?.count === 1} onClick={() => { setQues(questions?.[ques?.count - 2]) }}>
                                    Pervious
                                </button>
                            </div>
                            <br />
                            <div className='float-right'>
                                <button className='btn btn-outline-success' disabled={ques?.count === questions?.length} onClick={() => { setQues(questions?.[ques?.count]) }}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=' col-md-4'>
                        <div className='card text-center mb-3 rounded'>
                            <h4 className='text-danger mt-3 '>00:20:00</h4>
                        </div>
                        <div className='card rounded' >
                            <div className="">
                                {
                                    questions?.map((item) => (
                                        <button
                                            className={`rounded-circle btn btn-outline-${item?.status ? item?.status : "danger"} m-2`} onClick={() => setQues(item)} >
                                            {item?.count}
                                        </button>
                                    ))
                                }
                                <div className='m-2 d-flex justify-content-between'>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Question
