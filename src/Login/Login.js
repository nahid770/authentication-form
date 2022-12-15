import React, { useState } from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from './Loading';
import auth from '../firebase.init';
import { sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
      const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
      const [signInWithFacebook, fUser, fLoading, fError] = useSignInWithFacebook(auth);
      const navigate = useNavigate()
      const location = useLocation()
      const [email, setEmail]= useState('');
      let from = location.state?.form?.pathname || "/"
      let signInError;

      if(user || gUser || fUser){
        console.log(user || gUser || fUser)
      }
      if( loading || gLoading || fLoading){
        return <Loading></Loading>
      }
      if(error || gError || fError){
        signInError = <p className='text-white py-1'>{error?.message || gError?.message || fError?.message} </p>
      }
      
     const toastMessage = () => {
       toast('Give email & password to Login');      
     }

    const forgetPassword = () =>{
        sendPasswordResetEmail(auth, email)
      .then(() => {
      if(email){
        toast('Password reset email sent!')
      }
     else{
        toast('Please enter your email')
      }
      })
    }
     

    const onSubmit = (data) => {
       signInWithEmailAndPassword(data.email, data.password)
       navigate(from, {replace:true});
        console.log(data)
    };

   
    return (
        <div className='h-screen w-full px-32 md:flex justify-center md:space-x-20  items-center'>
            <div className='w-1/2'>
                <h1 className='text-xl md:text-4xl text-center text-white py-3'>Registration Form </h1>
                <p className='p-5 text-left'>This is a mid level funtional login and Registration form which is build with the help of Firebase, react-hook-form, Tailwind css and Daisy-ui. A simple validation form where I've also implemented Google and Facebook sign in method. Please Explore...! </p>

                <p className='text-slate-400 text-left px-5'>Developed by Nahid</p>
                
            </div>
            <div className='w-1/3 border rounded-xl p-5'>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    {/* ---Email--- */}
                <div onBlur={e=>setEmail(e.target.value)} className="form-control  w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Email</span>
                    <HiOutlineMail></HiOutlineMail>
                </label>
                   
                <input type="email" placeholder="Email address" 
                className="input input-bordered w-full max-w-xs" 
                {...register("email", {
                    required: {
                        value: true,
                        message: 'Email is required!',
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: 'Provide a valid email'
                    }
                  })}
                />
                </div>

                <label className="label">
                {errors.email?.type === 'required' && <span className="label-text-alt text-white">{errors.email.message}</span>}
                {errors.email?.type === 'pattern' && <span className="label-text-alt text-white">{errors.email.message}</span>}       
                </label>

                {/* Password */}
                <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Password</span>
                    <BiLock></BiLock>
                </label>
                   
                <input type="password" placeholder="password" 
                className="input input-bordered w-full max-w-xs" 
                {...register("password", {
                    required: {
                        value: true,
                        message: 'Password is required!',
                    },
                    minLength: {
                        value: 6,
                        message: 'password must be at least 6 characters '
                      },
                    pattern: {
                      value: /(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])/,
                      message:'Password must have uppercase and special character',
                    },
                  })}
                />
                </div>

                <label className="label">
                {errors.password?.type === 'required' && <span className="label-text-alt text-white">{errors.password.message}</span>}
                {errors.password?.type === 'minLength' && <span className="label-text-alt text-white">{errors.password.message}</span>}
                {errors.password?.type === 'pattern' && <span className="label-text-alt text-white">{errors.password.message}</span>}       
                </label>
                

                {/*Login button  */}
                {signInError}
                <input onClick={toastMessage} className=' py-2 px-3 rounded-md bg-indigo-700 text-white w-full mb-2' type="submit" value="Login" />
                </form>

                <p onClick={forgetPassword} className='text-slate-300 btn btn-link text-xs' >Forget password? </p>
                <p className='py-2'>Don't have an account? <Link to="/register" className='text-white underline'>Register Now</Link></p>

                <p className='divider'>Or</p>
                {/* Social Media Login */}
                <Link onClick={()=> signInWithGoogle()} className='p-2 rounded-md my-2 bg-slate-400 text-white flex justify-center items-center'><span><FcGoogle className='w-6 h-6 mr-2'></FcGoogle></span> Google Sign In</Link>
                <Link onClick={()=> signInWithFacebook()}  className='p-2 rounded-md bg-blue-600 text-white flex justify-center items-center'><span><FaFacebook className='w-6 h-6 mr-2'></FaFacebook></span > Facebook Sign In</Link>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;