import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerImg from '../Assets/register.jpg';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = () => {
    setError('');
    axios
      .post('http://localhost:5000/register-user', userData)
      .then(() => {
        setUserData({
          username: '',
          password: '',
          confirm_password: '',
        });
        navigate('/login');
      })
      .catch((error) => setError(error.response.data.error));
  };

  return (
    <>
      <div className='max-w-5xl mx-auto mt-32'>
        <div className='container mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
            <div>
              <h1 className='mb-8 text-5xl text-center font-bold'>Sign up</h1>
            </div>
            <div className='flex w-full'>
              <div className='w-1/2'>
                <img src={registerImg} alt='' />
              </div>
              <div className='w-1/2'>
                <input
                  type='text'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='username'
                  placeholder='Username'
                  onChange={handleChange}
                />

                <input
                  type='password'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='password'
                  placeholder='Password'
                  onChange={handleChange}
                />
                <input
                  type='password'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='confirm_password'
                  placeholder='Confirm Password'
                  onChange={handleChange}
                />
                <div className='mb-4'>
                  <p className='text-red-500 text-lg'>{error}</p>
                </div>

                <button
                  onClick={handleRegister}
                  type='submit'
                  className='w-full text-center py-3 rounded bg-blue-700 text-white focus:outline-none my-1'
                >
                  Create Account
                </button>
                <div className='text-grey-dark mt-6'>
                  <p className='text-sm font-semibold mt-2 pt-1 mb-0'>
                    Already have an account?{' '}
                    <Link
                      to='/login'
                      className='text-blue-600 hover:text-blue-600 focus:text-blue-600 transition duration-200 ease-in-out'
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
