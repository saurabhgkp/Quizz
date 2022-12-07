import React, { useEffect, useState } from 'react'

const Question = () => {
    const [question, setQuestion] = useState([])
    const [ques, setQues] = useState()
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=20&category=10&difficulty=easy&type=multiple').then(res => res.json())
            .then(
                (result) => {
                    const questions = result.results.map((el, index) => ({ ...el, count: index + 1, status: "not" }))
                    setQuestion(questions)
                    setQues(questions?.[0])
                    console.log(questions);
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])

    return (
        <>
            <div className='container bg-light '>
                <div className='row'>
                    <div className='col-md-8'>
                        <div class="card p-4"  >
                            <p className='mt-3'>
                                <span className='h5'>Q {ques?.count}: </span>
                                {ques?.question}
                            </p>
                            <div>
                                <div class="form-check">
                                    <input class="form-check-input is-valid" type="radio" name="answer"
                                        // onChange={() => { setQues(question?.[ques?.status]) }} 
                                        id="exampleRadios1" value="option1" />
                                    <label class="form-check-label" >
                                        {ques?.correct_answer}
                                    </label>
                                </div>
                                {
                                    ques?.incorrect_answers?.map((item) => {
                                        return <div class="form-check">
                                            <input class="form-check-input is-valid" type="radio" name="answer" id="exampleRadios1" value="option1" />
                                            <label class="form-check-label" >
                                                {item}
                                            </label>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className='mt-4 d-flex justify-content-between'>
                            <div className='float-left'>
                                <button className='btn btn-outline-primary' disabled={ques?.count === 1} onClick={() => { setQues(question?.[ques?.count - 2]) }}>
                                    Pervious
                                </button>
                            </div>
                            <br />
                            <div className='float-right'>
                                <button className='btn btn-outline-success' disabled={ques?.count === question?.length} onClick={() => { setQues(question?.[ques?.count]) }}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='card col-md-4'>
                        <div className="" >
                            {
                                question?.map((item) => (
                                    <button className='rounded-circle btn btn-outline-danger m-2' onClick={() => setQues(item)} >
                                        {item?.count}
                                    </button>
                                ))
                            }
                            <div className='m-2'>
                                <div class="form-check">
                                    <input class="form-check-input is-valid" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                    <label class="form-check-label" for="exampleRadios1">
                                        Answered
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input is-valid" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                    <label class="form-check-label" for="exampleRadios1">
                                        Not Answered
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input is-valid" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                    <label class="form-check-label" for="exampleRadios1">
                                        Marked for Review
                                    </label>
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
