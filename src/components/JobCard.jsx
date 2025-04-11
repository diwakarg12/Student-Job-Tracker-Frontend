import React from 'react'
import { Link } from 'react-router-dom'
import { FaEdit  } from "react-icons/fa";
import { MdDeleteSweep, MdCalendarMonth } from "react-icons/md";
import { BsCurrencyRupee } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { ImProfile } from "react-icons/im";

const JobCard = ({job, handleDeleteJobEntry}) => {
    const {_id, company, designation, salary, location, dateOfApplication, status} = job;
  return (
    <div className='shadow-xl bg-teal-100 w-full sm:w-[47%] md:w-1/3 lg:w-[23%]'>
        <div className='flex items-center justify-between mx-2.5 my-2'>
            <p className={`w-fit px-2 rounded-xs ${status=="Applied"?"bg-blue-500":status=="Interview"?"bg-orange-400":status=="Offer"?"bg-green-600":status=="Rejected"?"bg-red-500":"bg-transparent"}`}>{status}</p>
            <div className='flex items-center gap-x-2'>
                <Link to={`/job-edit/${_id}`}><FaEdit size={22} className='cursor-pointer text-green-600' /></Link>
                <MdDeleteSweep onClick={()=>handleDeleteJobEntry(_id)} size={26} className='cursor-pointer text-red-700' />
            </div>
        </div>
        <div className='bg-white shadow-2xl rounded-sm m-2 p-2'>
            <h1 className='text-3xl font-semibold'>{company}</h1>
            <p className='my-3 flex items-center gap-x-1'><ImProfile size={18}/><span className='text-xl font-medium'>{designation}</span></p>
            <p className='my-3 flex items-center gap-x-1'><BsCurrencyRupee className='' size={20} /><span className='text-lg font-medium'>{salary} Per Annum</span></p>
            <p className='my-3 flex items-center gap-x-1'><IoLocation size={20} /> {location}</p>
            <p className='my-3 flex items-center gap-x-1'><MdCalendarMonth size={20} /><span className='text-sm font-semibold'>{dateOfApplication}</span></p>
        </div>
    </div>
  )
}

export default JobCard