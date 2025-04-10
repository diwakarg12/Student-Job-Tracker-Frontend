import axios from 'axios';
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');

    // const navigate = useNavigate();

    const handleUpdatePassword = async (e) => {
    try {
        e.preventDefault();
        setLoading(true);
        console.log(currentPass, newPass);
        // Ensure the correct property name is used
        const res = await axios.patch('http://localhost:3000/profile/change-password', {
            currentPass, // Correct property name
            newPass       // Correct property name
        }, { withCredentials: true });

        console.log('update-password', res?.data?.user);
        setLoading(false);
        // navigate('/login'); // Optional: navigate if needed
    } catch (error) {
        console.log('Error: ', error);
        setLoading(false);
    }
};

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-pink-500'>
        <form
			className='space-y-6 bg-white p-10 rounded-sm'
			onSubmit={handleUpdatePassword}
		>
			<h2 className='text-center text-3xl font-extrabold text-pink-500'>
				Update Password Here
			</h2>
			<div>
				<label htmlFor='currentPass' className='block text-sm font-medium text-gray-700'>
					Current Password
				</label>
				<div className='mt-1'>
					<input
						id='currentPass'
						name='currentPass'
						type='password'
						autoComplete='current-password'
						required
						value={currentPass}
						onChange={(e) => setCurrentPass(e.target.value)}
						className='appearance-none bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			<div>
				<label htmlFor='newPass' className='block text-sm font-medium text-gray-700'>
					New Password
				</label>
				<div className='mt-1'>
					<input
						id='newPass'
						name='newPass'
						type='password'
						autoComplete='new-password'
						required
						value={newPass}
						onChange={(e) => setNewPass(e.target.value)}
						className='appearance-none bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			<button
				type='submit'
				className={`w-full flex justify-center py-2 px-4 border border-transparent 
					rounded-md shadow-sm text-sm font-medium text-white ${
						loading
							? "bg-pink-400 cursor-not-allowed"
							: "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
					}`}
				disabled={loading}
			>
				{loading ? "Updating Password..." : "Update Password"}
			</button>
		</form>
    </div>
  )
}

export default UpdatePassword