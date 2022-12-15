import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const Navber = () => {
    const [user] = useAuthState(auth);
    // const navigate = useNavigate();

    // const logout = () => {
       
    //     signOut(auth);
        
    //   };

    return (
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li><Link to="/endpage">End Page</Link></li>
      <li><Link to="/login">Login</Link></li>
      </ul>
    </div>

    {/* desktop version */}
    <Link className="btn btn-ghost normal-case text-xl">Form</Link>
  </div>
  <div className=" hidden lg:flex lg:justify-around">
    <ul className="menu menu-horizontal px-1">
    <li><Link to="/endpage">End Page</Link></li>
      <li><Link to="/login">Login</Link></li>
     <li>
        {
          user ? <p>{user.displayName}</p>  : ''
        }
     </li>
     <li>
        {/* {
            user? <Link onClick={logout} to='/signout'>Sign out</Link> : ''
        } */}
     </li>
    </ul>
  </div>
</div>
    );
};

export default Navber;