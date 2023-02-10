import Cookies from 'js-cookie';
import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../Helper/Context';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const handleLogOut = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };
  return (
    <>
      <div className='absolute top-0 left-0 w-48 h-full px-2 py-1 shadow-lg z-10 bg-blue-800'>
        <div className='container flex flex-col flex-wrap items-center justify-center mx-auto'>
          <div className='hidden w-full md:block md:w-auto'>
            <ul className='flex justify-center items-center space-y-6 pt-10 text-white flex-col p-4 border rounded-lg md:mt-0 md:text-sm md:font-medium md:border-0'>
              <li>
                <Link to='/' className='block py-2 rounded' aria-current='page'>
                  {user?.role === 'admin' ? 'Home' : 'Profile'}
                </Link>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <Link to='/employee' className='block py-2 rounded'>
                    Employees
                  </Link>
                </li>
              )}
              <li>
                <Link to='/supplier' className='block py-2 rounded'>
                  Suppliers
                </Link>
              </li>
              <button
                className='bg-white rounded text-black px-4 py-2 font-bold'
                onClick={handleLogOut}
              >
                Log out
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
