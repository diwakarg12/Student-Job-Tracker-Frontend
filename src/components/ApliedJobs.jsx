import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { removeJob } from '../redux/jobSlice'
import InputField from './InputField'
import { Link } from 'react-router-dom'
const ApliedJobs = () => {
    const dispatch = useDispatch();
    // const jobs = useSelector(store => store.job)
    // console.log('Jobs', jobs);
    const jobs = [
        {_id: 1, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Applied"},
        {_id: 2, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Interview"},
        {_id: 3, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Offer"},
        {_id: 4, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Rejected"},
        {_id: 5, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Applied"},
        {_id: 6, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Interview"},
        {_id: 7, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Offer"},
        {_id: 8, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Rejected"},
        {_id: 9, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Applied"},
    ]
    const [search, setSearch] = useState("");
    console.log('Search',search);
    const [filteredJobs, setFilteredJobs] = useState(jobs);

    const handleDeleteJobEntry = async(_id) => {
        try {
            const res = await axios.post(`http://localhost:3000/deleteJobApplication/${_id}`, {}, {withCredentials: true});
            console.log('Res', res);
            dispatch(removeJob(_id));
        } catch (error) {
            console.log('Error: ',error.message)
        }
    }

    useEffect(()=>{
        const handleSearch = () => {
        const lowerSearch = search.toLowerCase();
        const results = jobs.filter((job) =>
            job.company.toLowerCase().includes(lowerSearch) ||
            job.designation.toLowerCase().includes(lowerSearch) ||
            job.location.toLowerCase().includes(lowerSearch) ||
            job.status.toLowerCase().includes(lowerSearch) ||
            job.dateOfApplication.toLowerCase().includes(lowerSearch)
        );

        setFilteredJobs(results);
    }
        handleSearch();
    },[search])
  return (
    <div className='bg-gradient-to-br from-red-500 to-pink-500'>
        <h1 className='font-bold text-5xl text-center py-3 font-serif underline'>ALL APPLIED JOBS</h1>
        <div className='px-20 flex items-center justify-end'>
            <Link to={'/add-job'} className='w-fit px-4 py-2 bg-green-400 rounded-sm font-semibold font-serif'>Add New Job Application Here</Link>
        </div>
        <div className='mx-20'>
            <InputField name={"search"} inputType={"text"} value={search} onChange={(e) => setSearch(e.target.value)} placeholder={"Search Job..."} />
            
        </div>
        <div className='flex flex-wrap items-center justify-start px-20 sm:gap-x-7 xl:gap-x-10 gap-y-4 w-full py-10'>
            {
                filteredJobs?.map((job)=>(
                    <JobCard key={job._id} job={job} handleDeleteJobEntry={handleDeleteJobEntry} />
                ))
            }
        </div>
    </div>
  )
}

export default ApliedJobs