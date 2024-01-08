import React from 'react'
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from 'react-router-dom';

const Exams = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='flex justify-between mt-2 '>
                <PageTitle title="EXAMS" />

                <button className='primary-outlined-btn flex items-center'
                    onClick={() => navigate('/admin/exams/add')}
                >
                    <i className='ri-add-line'></i>
                    Add Exams
                </button>
            </div>
        </div>
    )
}

export default Exams