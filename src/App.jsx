import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux"
import Home from './Pages/Home';
import Login from './Pages/Login';
import ContactUs from './Pages/ContactUs';
import Profile from './Pages/Profile';
import appStore from './redux/AppStore';

function App() {

  return (
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/Signup' element={<Login/>} />
            <Route path='/contact' element={<ContactUs/>} />
            <Route path='/profile/:userId' element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
