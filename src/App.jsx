import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux"
import Home from './Pages/Home';
import Login from './Pages/Login';
import ContactUs from './Pages/ContactUs';
import Profile from './Pages/Profile';
import appStore from './redux/AppStore';
import NotFound from './Pages/NotFound';
import Body from './Pages/Body';

function App() {

  return (
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/Signup' element={<Login/>} />
            <Route path='/contact' element={<ContactUs/>} />
            <Route path='/profile/:userId' element={<Profile/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
