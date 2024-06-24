import './App.css';
import { Route,Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
// import Dashboard from './components/dashboard/Dashboard';
import Topbar from './components/topbar/Topbar';
import ResetPassword from './components/resetpassword/ResetPassword';
function App() {
  return (
    <>
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/reset-password' element={<ResetPassword/>}/>
    <Route path='/register' element={<Signup/>}/>
    <Route path='/' element={<Topbar/>}/>
  </Routes>
    </>
  );
}

export default App;
