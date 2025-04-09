import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from '../redux/authSlice';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async() => {
        try {
            const res = await axios.get('http://localhost:3000/profile/view', {withCredentials: true});
            dispatch(login(res?.data?.user));
        } catch (error) {
            if (error.status == 401 || error.status == 404) {
                navigate('/login');
            }else{
                console.log('Error while Fetching User Data', error);
            }
        };
    };
    useEffect(()=>{
        fetchUser();
    }, [])

  return (
    <div className='min-h-screen flex flex-col absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <Header />
        <div className='flex-grow'>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Body;