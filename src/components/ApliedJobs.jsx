import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addJobs, removeJob } from '../redux/jobSlice'
import InputField from './InputField'
import { Link } from 'react-router-dom'

const ApliedJobs = () => {
    const dispatch = useDispatch();
    const jobs = useSelector(store => store.job);

    const [search, setSearch] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);

    const fetchAllJobs = async () => {
        try {
            const res = await axios.get('https://student-job-tracker-backend-production-a06d.up.railway.app/job/getAllJobs', { withCredentials: true });
            const data = res?.data?.appliedJobs || res?.data?.jobs || [];
            dispatch(addJobs(data));
        } catch (error) {
            console.log('Error: ', error.message);
        }
    }

    const handleDeleteJobEntry = async (_id) => {
        try {
            await axios.delete(`https://student-job-tracker-backend-production-a06d.up.railway.app/job/deleteJobApplication/${_id}`, { withCredentials: true });
            dispatch(removeJob(_id));
            fetchAllJobs();
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    useEffect(() => {
        fetchAllJobs();
    }, []);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const results = jobs?.filter((job) =>
            job.company.toLowerCase().includes(lowerSearch) ||
            job.role.toLowerCase().includes(lowerSearch) ||
            job.location.toLowerCase().includes(lowerSearch) ||
            job.status.toLowerCase().includes(lowerSearch) ||
            job.dateOfApplication.toLowerCase().includes(lowerSearch)
        );
        setFilteredJobs(results);
    }, [search, jobs]);

    return (
        <div className='min-h-screen bg-gradient-to-br from-red-500 to-pink-500'>
            <h1 className='font-bold text-2xl md:text-4xl lg:text5xl text-center py-3 font-serif underline'>ALL APPLIED JOBS</h1>

            <div className='sm:px-8 md:px-20 flex items-center justify-center sm:justify-end'>
                <Link to={'/add-job'} className='w-fit p-2 md:px-4 md:py-2 bg-green-400 rounded-sm font-medium md:font-semibold font-serif'>
                    Add New Job Application Here
                </Link>
            </div>

            <div className='mx-7 md:ml-10 md:mr-20'>
                <InputField
                    name={"search"}
                    inputType={"text"}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={"Search Job..."}
                    style={"py-3"}
                />
            </div>

            <div className='flex flex-wrap items-center justify-start px-4 md:px-10 gap-x-5 gap-y-4 w-full py-4 md:py-10'>
                {
                    filteredJobs && filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <JobCard key={job._id} job={job} handleDeleteJobEntry={handleDeleteJobEntry} />
                        ))
                    ) : (
                        <p className='w-full text-3xl font-semibold font-serif text-white text-center'>
                            You have Not Applied to Any Job yet
                        </p>
                    )
                }
            </div>
        </div>
    );
}

export default ApliedJobs;
