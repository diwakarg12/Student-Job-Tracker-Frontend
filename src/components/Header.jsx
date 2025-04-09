import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { Layers } from "lucide-react";
const Header = () => {
  const user = useSelector(store => store.auth.user);
  console.log('User', user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      const res = await axios.post('http://localhost:3200/auth/logout', {}, {withCredentials: true})
      dispatch(logout(res.data.user))
      navigate('/login');
    } catch (error) {
      console.log("Error", error.message);
    }
  }
  return (
    <div className="w-full py-1 bg-black flex justify-between items-center px-1">
        <Link to={'/'} className="pl-2 text-2xl flex items-center">
          <Layers size={30} strokeWidth={'2.5px'} className="text-[#ff4081] transform -rotate-12" />
          <svg width="120" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" fill="none">
            <text x="10" y="36" fontFamily="Arial, sans-serif" fontSize="38" fontWeight="bold" fill="#ff4081">STUDENT</text>
          </svg>
        </Link>
        <div className="flex-none">
          {
            user ? 
            (<div className="flex items-center">
              <div className=" text-white hidden sm:block">Welcome {user.firstName}</div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.profileUrl}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li><Link to={'/profile'}>Profile</Link></li>
                  <li><Link to={'/connections'}>Connections</Link></li>
                  <li><Link to={'/connection-requests'}>Connection Requests</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </div>)
            :
          (<Link className="btn text-lg py-1 px-4 rounded-md font-bold text-white hover:bg-gray-100 hover:text-black" to={'/login'}>Login</Link>)
          
          }
        </div>
    </div>
  )
}

export default Header;