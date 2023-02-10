import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import background from '../Assets/banner_image.svg';

const Home = () => {
  const navigate = useNavigate();

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
    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center pl-48'>
      <div className='font-bold text-2xl'>
        <img src={background} alt='' className='w-96 h-96' />
      </div>
    </div>
  );
};

export default Home;
