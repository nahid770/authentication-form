import React, { useRef } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import Loading from './Loading';


const Register = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, fUser, fLoading, fError] = useSignInWithFacebook(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification:true});
      const [updateProfile, updating, updateError] = useUpdateProfile(auth);
      const navigate = useNavigate();
      let signInError;



      if(error || googleError || fError || updateError ){
        signInError = <p className='text-white py-1'>{error?.message || googleError?.message || updateError?.message}</p>
      }
      if(user|| googleUser || fUser){
        console.log(user || googleUser || fUser)
      }
      if(loading || googleLoading || fLoading || updating ){
       return <Loading></Loading>
      }

    const onSubmit = async(data) =>{
       console.log(data)
       await createUserWithEmailAndPassword(data.email, data.password)
       alert('Check your email to varify!')
        await updateProfile({ displayName:data.name });
        navigate('/')
        console.log('profile updated') 
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="card w-96 border">
            <div className="card-body ">
                <form onSubmit={handleSubmit(onSubmit)}>

                {/* Name */}
                <div  className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Name</span>
                    <MdOutlineDriveFileRenameOutline></MdOutlineDriveFileRenameOutline>
                </label>
                <input type="text" placeholder="Your Name" 
                className="input input-bordered w-full max-w-xs" 
                {...register("name", {
                    required: {
                        value: true,
                        message: 'Name is required!',
                    },
                  })}
                />
                <label className="label">
                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                </label>
                </div>

                {/* Email */}
                <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Email</span>
                    <HiOutlineMail></HiOutlineMail>
                </label>
                <input type="email" placeholder="Your Email" 
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
                <label className="label">
                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    
                </label>
                </div>
                {/*------ Password ------*/}
                <div  className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Password</span>
                    <BiLock></BiLock>
                </label>
                <input type="password" placeholder="Your Password" 
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
                <label className="label">
                {errors.password?.type === 'required' && <span className="label-text-alt text-white">{errors.password.message}</span>}
                {errors.password?.type === 'minLength' && <span className="label-text-alt text-white">{errors.password.message}</span>}
                {errors.password?.type === 'pattern' && <span className="label-text-alt text-white">{errors.password.message}</span>}
                </label>
                </div>
                {/* show error */}
                  {signInError}
                <input className=' rounded-md bg-indigo-700 py-2 w-full text-white' type="submit" value="SignUp" />
                </form>
                <p className='text-white'>Already have an account? <Link className='text-slate-100 underline' to='/login'> Please Login</Link></p>
                <div className='divider'>Or</div>

                <Link onClick={()=> signInWithGoogle()} className='p-2 rounded-md my-2 bg-slate-400 text-white flex justify-center items-center'><span><FcGoogle className='w-6 h-6 mr-2'></FcGoogle></span> Google Sign In</Link>
                <Link onClick={()=> signInWithFacebook()}  className='p-2 rounded-md bg-blue-600 text-white flex justify-center items-center'><span><FaFacebook className='w-6 h-6 mr-2'></FaFacebook></span > Facebook Sign In</Link>
            </div>
            </div>
        </div>
    );
};

export default Register;