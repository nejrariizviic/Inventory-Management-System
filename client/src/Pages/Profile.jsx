import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Context } from '../Helper/Context';
import useToggle from '../Hooks/useToggle';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [isOpen, toggle] = useToggle();
  const [error, setError] = useState('');
  const [changePaswordData, setChangePasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  });

  const changePassword = (e) => {
    e.preventDefault();
    setError('');
    axios
      .patch('http://localhost:5000/change-password', {
        ...changePaswordData,
        _id: user._id,
      })
      .then((response) => {
        setError(response.data?.response?.data?.error);
        if (response.data?.response?.status !== 400) return toggle();
      })
      .catch((err) => err);
  };

  const handleChange = (e) => {
    setChangePasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (!token) {
      navigate('/login');
    } else {
      axios
        .get('http://localhost:5000/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data?.response?.status === 401) {
            navigate('/login');
          }
        })
        .catch((err) => err);
    }
  }, [navigate]);

  return (
    <div className='absolute top-0 left-0 w-full h-screen flex items-center justify-center pl-48'>
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10 pl-48'>
          <div className='w-full max-w-sm m-4 bg-blue-800 rounded-lg shadow-xl'>
            <div className='px-4 py-5 sm:px-6'>
              <div className='flex items-center justify-between mb-8'>
                <h2 className='text-xl leading-7 font-semibold text-white'>
                  Change Password
                </h2>
                <div
                  onClick={toggle}
                  className=' flex items-center justify-center w-8 h-8 p-1 cursor-pointer rounded-full bg-white focus:outline-none focus:bg-gray-300'
                >
                  <ion-icon name='close-outline' size='large'></ion-icon>
                </div>
              </div>
              <form onSubmit={changePassword} className='space-y-6 mt-4'>
                <div className='space-y-4'>
                  <input
                    type='password'
                    required
                    name='oldPassword'
                    placeholder='Old Password'
                    onChange={handleChange}
                    className='w-full p-2 border-[1px] border-gray-400 outline-none rounded'
                  />
                  <input
                    type='password'
                    required
                    name='newPassword'
                    placeholder='New Password'
                    onChange={handleChange}
                    className='w-full p-2 border-[1px] border-gray-400 outline-none rounded'
                  />
                  <input
                    type='password'
                    required
                    name='repeatPassword'
                    placeholder='Repeat Password'
                    onChange={handleChange}
                    className='w-full p-2 border-[1px] border-gray-400 outline-none rounded'
                  />
                </div>
                <div>
                  <p className='text-lg text-red-600'>{error}</p>
                </div>
                <button
                  type='submit'
                  className='bg-white text-black rounded py-2 px-4 font-bold'
                >
                  Change
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {user?.role === 'employee' ? (
        <div className='p-16 shadow-lg rounded-2xl'>
          <div className='p-8 bg-white shadow mt-24'>
            {' '}
            <div className='grid grid-cols-1'>
              {' '}
              <div className='relative'>
                {' '}
                <div className='w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-32 flex items-center justify-center text-indigo-500'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-24 w-24'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    {' '}
                    <path
                      fillRule='evenodd'
                      d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                      clipRule='evenodd'
                    />
                  </svg>{' '}
                </div>{' '}
              </div>{' '}
            </div>{' '}
            <div className='mt-20 text-center border-b pb-12'>
              {' '}
              <h1 className='text-4xl font-medium text-gray-700'>
                {`${user?.employee_id?.firstName} ${user?.employee_id?.lastName}`}{' '}
              </h1>{' '}
              <p className='font-light text-gray-600 mt-3'>{`${user?.employee_id?.email}`}</p>{' '}
              <p className='mt-8 text-gray-500'>
                {`${user?.employee_id?.telephone}`}
              </p>{' '}
              <p className='mt-2 text-gray-500'>{`${user?.employee_id?.address}`}</p>{' '}
              <p className='mt-2 text-gray-500'>
                Date of employment:{' '}
                {user?.employee_id?.dateOfEmployment?.slice(0, 10)}
              </p>
            </div>{' '}
            <div className='flex justify-center items-center mt-8'>
              <button
                onClick={toggle}
                className='text-blue-700 py-2 px-4 font-bold'
              >
                {' '}
                Change Password
              </button>{' '}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
