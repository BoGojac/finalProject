import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import axios from 'axios';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const{  token, admin, board_manager, constituency_staff } = useAuthStore();

  const {
    register,
    handleSubmit,
	  setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login',
        data,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      

      const { user, access_token } = response.data;

      // Store token and user in Zustand
      login(user, access_token);
      const role = user.role.toLowerCase().replace(/\s+/g, '');
      // Redirect based on user role
      switch (role) {
        case 'admin':
          navigate('/Admin');
          break;
        case 'constituencystaff':{
          const response = await axios.get('http://127.0.0.1:8000/api/constituencystaff-user',
            {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${access_token}`
              },
            },
          );
          const constituency_staff_res  = response.data;
          login(user, access_token, null, null, constituency_staff_res);
          console.log('before navigation:', user, token, admin, board_manager, constituency_staff_res  );
          navigate('/ConstituencyManagers');
          console.log('after navigation:', user, token, admin, board_manager, constituency_staff_res  );
          break;
        }
          
        case 'pollingstationstaff':
          navigate('/PollingStation');
          break;
        case 'boardmanager':
          navigate('/BoardManagers');
          break;
        case 'voter':
          navigate('/VotersPage');
          break;
        case 'candidate':
          navigate('/Candidates');
          break;
        default:
          alert('Unknown role: ' + user.role);
      }
      console.log("logged is user is ===========",user, access_token);
    } catch (error) {
      setError("root", { message: error.response?.data.message || 'Login failed. Please try again later.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#455883] to-[#00B5A5] px-4 py-6">
      <div className="bg-white p-5 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md relative">
        <Link
          to="/"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="text-sm text-gray-600">Enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4AA0] ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4AA0] ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
		  {errors.root && (
			<p className="text-xs text-red-500 mt-1">{errors.root.message}</p>
		  )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#6B4AA0] hover:bg-[#5a3b91] text-white px-4 py-2.5 rounded-md text-sm font-medium mt-2 transition"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
