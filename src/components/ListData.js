import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ListData = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const res = await axios.get("http://localhost:4000/users/getData")
        if (res?.status) {
            setData(res?.data?.data)
        }
    }
    useEffect(() => {
        getData();
    }, []);

    console.log(data);
    return (
        < >
            <div className='container-fluid'>
                <div className='row'>
                    {data?.length ? data?.map((obj, index) => (
                        <div className='col-md-2 mt-2'>
                            <div class="card">
                                <img class="card-img-top" src="https://picsum.photos/600/300/?image=25" alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">{obj?._id}</h5>
                                    <span >  Some quick example text to build on the card title and make</span>
                                </div>
                                <div className='d-flex justify-content-end m-2'>
                                    <i class="bi-three-dots-vertical rounded-circle btn btn-outline-danger" ></i>
                                </div>
                            </div>
                        </div>
                    )) : <p>No data found.</p>}

                </div>
            </div>
        </>
    )
}

export default ListData
