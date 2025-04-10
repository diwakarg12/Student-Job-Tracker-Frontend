import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import InputField from './InputField';
import InputDropdown from './InputDropdown';

const UpdateJobStatus = () => {
    const [status, setStatus] = useState("");
    const {jobId} = useParams();
    const dispatch = useDispatch();
    const jobs = useSelector(store=>store.job);
    console.log('Job', jobs);
    console.log('Id', jobId);
    const handleUpdate = async() => {
        const res = await axios.post(`http://localhost:3000/job/updateStatus/${status}`, {}, {withCredentials: true});
        console.log('Result', res);
    }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-pink-500'>
        <h1 className='font-bold text-4xl text-center my-6 underline'>UPDATE JOB STATUS</h1>
        <div className='w-1/2 bg-white shadow-xl rounded-lg p-8'>
            <div className='flex items-center justify-center gap-x-4'>
                 <InputField label={"Name"} inputType={"text"} value={"Diwakar"} name={""} isDisabled={true} /> 
                 <InputField label={"Email"} inputType={"email"} value={"dev@gmail.com"} name={""} isDisabled={true} />
            </div>
            <InputDropdown label={"Status"} value={""} onChange={""} name={"status"} options={["Applied", "Interview", "Offer", "Rejected"]} />
            <InputField label={"Company"} inputType={"text"} value={"Google"} onChange={""} name={"company"} isDisabled={true} />
            <InputField label={"Designation"} inputType={"text"} value={"SWE"} onChange={""} name={"designation"}isDisabled={true}  />
            <InputField label={"Salary"} inputType={"text"} value={"Salary"} onChange={""} name={"salary"} isDisabled={true} />
            <InputField label={"Location"} inputType={"text"} value={"Location"} onChange={""} name={"location"} isDisabled={true} />
            <InputField label={"DateOfApplication"} inputType={"text"} value={"DateOfApplication"} onChange={""} name={"dateOfApplication"} isDisabled={true} />
            <button className='px-10 py-2 font-semibold font-serif text-white bg-green-500 rounded-sm hover:bg-green-800' onClick={handleUpdate}>Update</button>
        </div>
    </div>
  );
};

export default UpdateJobStatus