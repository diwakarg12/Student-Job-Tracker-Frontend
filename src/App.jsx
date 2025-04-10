import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux"
import Home from './Pages/Home';
import Login from './Pages/Login';
import ContactUs from './Pages/ContactUs';
import Profile from './Pages/Profile';
import appStore from './redux/AppStore';
import NotFound from './Pages/NotFound';
import Body from './Pages/Body';
import UpdatePassword from './components/UpdatePassword';
import ApliedJobs from './components/ApliedJobs';
import JobApplication from './components/JobApplication';
import UpdateJobStatus from './components/UpdateJobStatus';

function App() {

  return (
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/' element={<ApliedJobs />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/add-job' element={<JobApplication />}/>
            <Route path='/job-edit/:jobId' element={<UpdateJobStatus />} />
            <Route path='/Signup' element={<Login/>} />
            <Route path='/contact' element={<ContactUs/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/update-password' element={<UpdatePassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
