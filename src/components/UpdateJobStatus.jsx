import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import InputDropdown from './InputDropdown';
import { updateJob } from '../redux/jobSlice';

const UpdateJobStatus = () => {
    const [status, setStatus] = useState(""); // State to hold the selected status
    const { jobId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jobs = useSelector(store => store.job);
    const user = useSelector(store=>store.auth.user)

    console.log('Job', jobs);
    console.log('Id', jobId);

    const job = jobs?.find((job) => job._id === jobId);

    useEffect(() => {
      if (job) {
        setStatus(job.status)
      }
    }, [job]);

    const handleDropdownChange = (e) => {
      setStatus(e.target.value);
    }

    const handleUpdate = async () => {
      try {
          const res = await axios.patch(`http://localhost:3000/job/updateStatus/${jobId}`, { status }, { withCredentials: true });
          console.log('Result', res);
          dispatch(updateJob(res?.data?.job));
          navigate('/');
      } catch (error) {
          console.error('Error updating job status:', error);
      }
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-pink-500'>
            <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl text-center my-6 underline'>UPDATE JOB STATUS</h1>
            <div className='w-11/12 md:w-1/2 bg-white shadow-xl rounded-lg p-8'>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-x-4'>
                    <InputField label={"Name"} inputType={"text"} value={user.name} isDisabled={true} />
                    <InputField label={"Email"} inputType={"email"} value={user.email} isDisabled={true} />
                </div>
                <InputDropdown
                    label={"Status"}
                    value={status} // Set selected status value here
                    onChange={handleDropdownChange} // Handle status update
                    options={["Applied", "Interview", "Offer", "Rejected"]}
                />
                <InputField label={"Company"} inputType={"text"} value={job?.company} isDisabled={true} />
                <InputField label={"Designation"} inputType={"text"} value={job?.role} isDisabled={true} />
                <InputField label={"Salary"} inputType={"text"} value={job?.salary} isDisabled={true} />
                <InputField label={"Location"} inputType={"text"} value={job?.location} isDisabled={true} />
                <InputField label={"DateOfApplication"} inputType={"text"} value={job?.dateOfApplication} isDisabled={true} />
                <button className='px-10 py-2 font-semibold font-serif text-white bg-green-500 rounded-sm hover:bg-green-800' onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
};

export default UpdateJobStatus;
