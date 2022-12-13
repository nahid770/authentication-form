import React from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";



const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();


    const onSubmit = (data) => {
        console.log(data)
    };

   
    return (
        <div className='h-screen w-full px-32 md:flex justify-center md:space-x-20  items-center'>
            <div className='w-1/2'>
                <h1 className='text-xl md:text-4xl text-center text-white py-3'>Registration Form </h1>
                <p className='p-5 text-left'>This is a mid level funtional login and Registration form which is build with the help of Firebase, react-hook-form, Tailwind css and Daisy-ui. A simple validation form where I've also implemented Google and Facebook sign in method. Please Explore...! </p>

                <p className='text-slate-400 text-left px-5'>Developed by Nahid</p>
                
            </div>
            <div className='w-1/3 border p-5'>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    {/* ---Email--- */}
                <div className="form-control w-full max-w-xs">
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
                      message:'Password must have uppercase and digit',
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
               
                <button className='py-2 px-3 rounded-md bg-indigo-700 text-white w-full mb-2'>Login</button>
                <Link className='text-white underline' to='/register'>Forget password? </Link>
                <p className='py-2'>Don't have an account? <Link to="/register" className='text-white underline'>Register Now</Link></p>
                </form>

                <div className='flex justify-center items-center'>
                <div className='border w-1/2 pe-2'></div>
                <p className='px-2'>Or</p>
                <div className='border  w-1/2'></div>
                </div>
                {/* Social Media Login */}
                <Link className='p-2 rounded-md my-2 bg-slate-400 text-white flex justify-center items-center'><span><FcGoogle className='w-6 h-6 mr-2'></FcGoogle></span> Google Sign In</Link>
                <Link className='p-2 rounded-md bg-blue-600 text-white flex justify-center items-center'><span><FaFacebook className='w-6 h-6 mr-2'></FaFacebook></span > Facebook Sign In</Link>
            </div>
        </div>
    );
};

export default Login;