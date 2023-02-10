import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import img from '../Assets/login.webp';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/authenticate', loginData)
      .then((response) => {
        Cookies.set('jwt_token', response.data.token);
        navigate('/');
      })
      .catch((err) => setError(err.response.data.error));
  };

  return (
    <>
      <div className='px-6 h-screen text-gray-800'>
        <div className='flex flex-col justify-start items-center flex-wrap h-full g-6'>
          <div className='flex justify-center items-start mt-10'>
            <p className='text-5xl font-bold'>LOGIN</p>
          </div>
          <div className='flex items-center space-x-12 my-12 py-20 px-10 rounded-xl shadow-lg'>
            <div className='w-1/2'>
              <img src={img} alt='' />
            </div>
            <form className='w-1/2'>
              <div className='mb-6'>
                <input
                  type='text'
                  name='username'
                  className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  placeholder='username'
                  onChange={handleChange}
                />
              </div>
              <div className='mb-2'>
                <input
                  type='password'
                  name='password'
                  className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  placeholder='Password'
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4'>
                <p className='text-red-500 text-xl'>{error}</p>
              </div>
              <div className='text-center lg:text-left'>
                <button
                  type='button'
                  onClick={handleLogin}
                  className='inline-block px-7 py-3 text-white bg-blue-700 font-medium text-sm leading-snug uppercase rounded shadow-mdfocus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
                >
                  Login
                </button>
                <p className='text-sm font-semibold mt-2 pt-1 mb-0'>
                  Don't have an account?
                  <Link
                    to='/register'
                    className='text-blue-600 hover:text-blue-600 focus:text-blue-600 transition duration-200 ease-in-out'
                  >
                    {' '}
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
