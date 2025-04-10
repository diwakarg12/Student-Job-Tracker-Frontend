import React, { useState } from 'react'
import InputField from './InputField'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const JobApplication = () => {
  const user = useSelector(store=>store.auth.user)
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJobApply = async() => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/job/apply', {company, role, location, salary}, {withCredentials: true});
      console.log('jobData', res?.data?.job);
      setLoading(false);
      navigate('/')
    } catch (error) {
      console.log("Error: ",error.message)
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-pink-500'>
        <h1 className='font-bold text-4xl text-center my-6 underline'>UPDATE JOB STATUS</h1>
        <div className='w-1/2 bg-white shadow-xl rounded-lg p-8'>
            <div className='flex items-center justify-center gap-x-4'>
                 <InputField label={"Name"} inputType={"text"} value={user?.name} name={"name"} isDisabled={true} /> 
                 <InputField label={"Email"} inputType={"email"} value={user?.email} name={"email"} isDisabled={true} />
            </div>
            <InputField label={"Company"} inputType={"text"} value={company} onChange={(e)=>setCompany(e.target.value)} name={"company"}  />
            <InputField label={"Designation"} inputType={"text"} value={role} onChange={(e)=>setRole(e.target.value)} name={"role"}  />
            <InputField label={"Salary"} inputType={"text"} value={salary} onChange={(e)=>setSalary(e.target.value)} name={"salary"}  />
            <InputField label={"Location"} inputType={"text"} value={location} onChange={(e)=>setLocation(e.target.value)} name={"location"}  />
            <button className={`px-10 py-2 font-semibold font-serif text-white bg-green-500 rounded-sm hover:bg-green-800 ${loading && "cursor-not-allowed"}`} onClick={handleJobApply}>{`${loading ? "Applying..." : "Apply"}`}</button>
        </div>
    </div>
  )
}

export default JobApplication