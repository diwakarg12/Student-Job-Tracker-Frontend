import React from 'react'
import InputField from './InputField'

const JobApplication = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-pink-500'>
        <h1 className='font-bold text-4xl text-center my-6 underline'>UPDATE JOB STATUS</h1>
        <div className='w-1/2 bg-white shadow-xl rounded-lg p-8'>
            <div className='flex items-center justify-center gap-x-4'>
                 <InputField label={"Name"} inputType={"text"} value={"Diwakar"} name={""} isDisabled={true} /> 
                 <InputField label={"Email"} inputType={"email"} value={"dev@gmail.com"} name={""} isDisabled={true} />
            </div>
            <InputField label={"Company"} inputType={"text"} value={"Google"} onChange={""} name={"company"}  />
            <InputField label={"Designation"} inputType={"text"} value={"SWE"} onChange={""} name={"designation"}  />
            <InputField label={"Salary"} inputType={"text"} value={"Salary"} onChange={""} name={"salary"}  />
            <InputField label={"Location"} inputType={"text"} value={"Location"} onChange={""} name={"location"}  />
            <InputField label={"DateOfApplication"} inputType={"text"} value={"DateOfApplication"} onChange={""} name={"dateOfApplication"}  />
            <button className='px-10 py-2 font-semibold font-serif text-white bg-green-500 rounded-sm hover:bg-green-800'>Update</button>
        </div>
    </div>
  )
}

export default JobApplication