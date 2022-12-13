import axios from 'axios'
import React, { useState } from 'react'

const AddQuestion = () => {
    const [data, setData] = useState({
    })
    const [option, setoption] = useState([])
    const handelOption = (e) => {
        setoption([...option, e.target.value])
    }
    const handelOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value }, ...option)
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/exam/addData", data).then((result) => {
            if (result) {
                window.location.reload();
            }
        })
            .catch((error) => {
                console.log(error);
            })
    }
    console.log(option);

    return (
        <>
            <div className='container'>
                <from >
                    <div class="form-group">
                        <label >Add Question</label>
                        <input type="text" class="form-control" name='B' onChange={handelOnChange} />
                    </div>
                    <div class="form-group">
                        <label >Add Right Answer Number</label>
                        <input type="number" class="form-control" name='G' onChange={handelOnChange} />
                    </div>
                    <div class="row m-2">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="First Option" name='C' onChange={handelOption} />
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Second Option" name='D' onChange={handelOption} />
                        </div>
                    </div>
                    <div class="row m-2">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Third Option" name='E' onChange={handelOption} />
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Fourth Option" name='F' onChange={handelOption} />
                        </div>
                    </div>
                    <button type="button" class="btn btn-outline-success m-2" onClick={handelSubmit}>Success</button>
                </from>
            </div>
        </>
    )
}

export default AddQuestion
