import { Route, Routes } from 'react-router-dom';
import './App.css';
import EndPage from './EndPage/EndPage';
import Login from './Login/Login';
import Register from './Login/Register';
import Navber from './Navber/Navber';
import RequireAuth from './RequireAuth/RequireAuth';

function App() {
  return (
    <div className="App">
      <Navber></Navber>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/endpage' element={
          <RequireAuth>
            <EndPage></EndPage>
          </RequireAuth>
        }></Route>
        
      </Routes>
    </div>
  );
}

export default App;
