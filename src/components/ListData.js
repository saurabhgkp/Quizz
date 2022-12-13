import React from 'react'

const Cards = () => {
    return (
        <>
            <div className='col-md-2 mt-2'>
                <div class="card">
                    <img class="card-img-top" src="https://picsum.photos/600/300/?image=25" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Some quick example text to build</h5>
                        <span >  Some quick example text to build on the card title and make</span>
                    </div>
                    <div className='d-flex justify-content-end m-2'>
                        <i class="bi-three-dots-vertical rounded-circle btn btn-outline-danger" ></i>
                    </div>
                </div>
            </div>
        </>
    )
}

const ListData = () => {
    return (
        < >
            <div className='container-fluid'>
                <div className='row'>
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                </div>
            </div>
        </>
    )
}

export default ListData
