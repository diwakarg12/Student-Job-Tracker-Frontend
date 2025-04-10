import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addJobs, removeJob } from '../redux/jobSlice'
import InputField from './InputField'
import { Link } from 'react-router-dom'
const ApliedJobs = () => {
    const dispatch = useDispatch();
    const jobs = useSelector(store => store.job)
    console.log('Jobs', jobs);

    const [search, setSearch] = useState("");
    const [filteredJobs, setFilteredJobs] = useState(jobs);

    const fetchAllJobs = async() => {
        try {
            const res = await axios.get('http://localhost:3000/job/getAllJobs', {withCredentials: true});
            console.log('Jobsss',res?.data?.appliedJobs || res?.data?.jobs );
            dispatch(addJobs(res?.data?.appliedJobs || res?.data?.jobs));
        } catch (error) {
            console.log('Error: ', error.message);
        }
    }
    // const jobs = [
    //     {_id: 1, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Applied"},
    //     {_id: 2, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Interview"},
    //     {_id: 3, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Offer"},
    //     {_id: 4, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Rejected"},
    //     {_id: 5, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Applied"},
    //     {_id: 6, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Interview"},
    //     {_id: 7, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Offer"},
    //     {_id: 8, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Rejected"},
    //     {_id: 9, company: "Google", designation: "Software Engineer", salary: 600000, location: "India", dateOfApplication: "25/03/2025", status: "Applied"},
    // ]

    const handleDeleteJobEntry = async(_id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/job/deleteJobApplication/${_id}`, {withCredentials: true});
            console.log('Res', res);
            dispatch(removeJob(_id));
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    useEffect(()=>{
        const handleSearch = () => {
        const lowerSearch = search.toLowerCase();
        const results = jobs?.filter((job) =>
            job.company.toLowerCase().includes(lowerSearch) ||
            job.role.toLowerCase().includes(lowerSearch) ||
            job.location.toLowerCase().includes(lowerSearch) ||
            job.status.toLowerCase().includes(lowerSearch) ||
            job.dateOfApplication.toLowerCase().includes(lowerSearch)
        );

        setFilteredJobs(results);
        fetchAllJobs();
    }
        handleSearch();
    },[search, removeJob])
  return (
    <div className='min-h-screen bg-gradient-to-br from-red-500 to-pink-500'>
        <h1 className='font-bold text-5xl text-center py-3 font-serif underline'>ALL APPLIED JOBS</h1>
        <div className='px-20 flex items-center justify-end'>
            <Link to={'/add-job'} className='w-fit px-4 py-2 bg-green-400 rounded-sm font-semibold font-serif'>Add New Job Application Here</Link>
        </div>
        <div className='ml-10 mr-20'>
            <InputField name={"search"} inputType={"text"} value={search} onChange={(e) => setSearch(e.target.value)} placeholder={"Search Job..."} style={"py-3"} />
            
        </div>
        <div className='flex flex-wrap items-center justify-start px-10 gap-x-5 gap-y-4 w-full py-10'>
            {
                filteredJobs ? (
                    filteredJobs?.map((job)=>(
                    <JobCard key={job._id} job={job} handleDeleteJobEntry={handleDeleteJobEntry} />
                ))
                ) : (
                    <p className='w-full text-3xl font-semibold font-serif text-white text-center'>You have Not Applied to Any Job yet</p>
                )
            
            }
        </div>
    </div>
  )
}

export default ApliedJobs