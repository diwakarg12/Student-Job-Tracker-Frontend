/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfileImageUpload from "../components/ProfileImageUpload";
import InputField from "../components/InputField";
import { useSelector, useDispatch } from "react-redux"
import { login } from "../redux/authSlice"
import { useNavigate } from "react-router-dom"
import InputDropdown from "../components/InputDropdown";

const Profile = () => {
  const user = useSelector(store => store.auth.user)
  const [update, setUpdate] = useState(user || [])
  const [error, setError] = useState("")
  const [image, setImage] = useState(user?.profile);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("user", update)

useEffect(() => {
  if (!user) {
    navigate('/login');
  }
}, [user, navigate]);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setUpdate(prevData =>({
      ...prevData,
      [name]: value,
    }))
  };
  console.log(update);

  const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setImage(imageUrl);
      setUpdate(prevData => ({
        ...prevData,
        profile: imageUrl,
      }));
    };
    reader.readAsDataURL(file);
  }
};

const handleUpdate = async () => {
  setLoading(true);
  try {
    // remove fields you don’t want to send
    const { email, password, _id, __v, updatedAt, createdAt, ...updatableData } = update;

    const res = await axios.patch('https://student-job-tracker-backend-production-a06d.up.railway.app/profile/edit', updatableData, {
      withCredentials: true,
    });

    console.log('Updated Data', res?.data?.user);
    dispatch(login(res?.data?.user));
    setLoading(false);
    navigate('/');
  } catch (error) {
    console.error(error);
    console.error("Update Error:", error.response?.data || error.message);
    setError(`Error: ${error?.response?.data?.message || error.message}`);
    setLoading(false);
  }
};

  return (
    <div className="sm:p-10 min-h-screen bg-gradient-to-br from-red-500 to-pink-500 flex flex-col">
      <div className='flex-grow flex flex-col justify-center px-4'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
			    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Your Profile</h2>
		    </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className='relative bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 space-y-4'>
            <p className="absolute top-2 left-4 text-red-600 text-xs">Click on the Image to change the Image</p>
            <ProfileImageUpload handleImageChange={handleImageChange} image={image} />
            <InputField label={'Name'} name={"name"} value={update.name} 
              onChange={handleChange} inputType={'text'} 
            />
            <InputField label={'Age'} name={"age"} value={update.age} onChange={handleChange}     
              inputType={'text'} 
            />
            <InputDropdown label={'Gender'} name={"gender"} value={update.gender} 
              onChange={handleChange} options={['male', 'female', 'others']}
            />
            
            <button onClick={handleUpdate} className="w-full border bg-gradient-to-br
		          from-red-500 to-pink-500 py-1 rounded font-medium text-lg text-white hover:bg-gradient-to-br hover:from-red-700 hover:to-pink-700"
            >
              Update Profile
            </button>
            <Link to="/update-password" className="text-sm font-semibold font-serif">Click here to update Your Password</Link>
            {error && <p className="border font-medium text-lg text-red-700 text-center">{error}</p>}
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Profile;