import axios from "axios";
import { useState } from "react";
// import { BASE_URL } from "./Constants";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
	const navigate = useNavigate();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
			console.log(email, password)
            const res = await axios.post('http://localhost:3000/auth/login', {email, password}, {withCredentials: true});
            console.log('login', res.data.user);
            dispatch(login(res?.data?.user));
            setLoading(false);
			navigate('/')
        } catch (error) {
            console.log('Error: ',error);
			setLoading(false);
        }
    }

	return (
		<form
			className='space-y-6'
			onSubmit={handleLogin}
		>
			<h2 className='text-center text-3xl font-extrabold text-pink-500'>
				Sign in Here
			</h2>
			<div>
				<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
					Email address
				</label>
				<div className='mt-1'>
					<input
						id='email'
						name='email'
						type='email'
						autoComplete='email'
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='appearance-none bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			<div>
				<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
					Password
				</label>
				<div className='mt-1'>
					<input
						id='password'
						name='password'
						type='password'
						autoComplete='current-password'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
				{loading ? "Signing in..." : "Sign in"}
			</button>
		</form>
	);
};
export default LoginForm;
