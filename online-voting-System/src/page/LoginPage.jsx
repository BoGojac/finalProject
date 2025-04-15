import { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the close icon
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const LoginPage = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		username: '',
		password: '',
	});

	const navigate = useNavigate(); // Hook for navigation

	// Handle input changes
	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
		setErrors((prev) => ({ ...prev, [id]: '' }));
	};

	// Validate form inputs
	const validateForm = () => {
		let isValid = true;
		const newErrors = { username: '', password: '' };

		if (!formData.username || formData.username.trim() === '') {
			newErrors.username = 'Username is required.';
			isValid = false;
		}

		if (!formData.password || formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters long.';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			const UNM = [
				'Admin',
				'Constituency',
				'PollingStation',
				'BoardManager',
				'Voter',
				'Candidate',
			];
			const pass = '123456789'; // Updated static password

			console.log('Entered Password:', formData.password); // Debug log
			console.log('Expected Password:', pass); // Debug log

			if (formData.password === pass) {
				switch (formData.username) {
					case UNM[0]:
						navigate('/Admin Dashboard');
						break;
					case UNM[1]:
						navigate('/ConstituencyManagers Dashboard');
						break;
					case UNM[2]:
						navigate('/PollingStation');
						break;
					case UNM[3]:
						navigate('/BoardManagers');
						break;
					case UNM[4]:
						navigate('/VotersPage');
						break;
					case UNM[5]:
						navigate('/Candidates');
						break;
					default:
						alert('Invalid username');
				}
			} else {
				alert('Invalid password');
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#455883] to-[#00B5A5] px-4 py-6 login-container">
			{/* Login Form Container */}
			<div className="bg-white p-5 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md relative">
				{/* Close Icon */}
				<Link
					to="/" // Navigate back to the homepage
					className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
				>
					<FaTimes size={20} className="sm:w-6 sm:h-6" /> {/* Close icon */}
				</Link>

				{/* Header */}
				<div className="text-center mb-4 sm:mb-6">
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
						Login
					</h1>
					<p className="text-sm sm:text-base text-gray-600">
						Enter your credentials to access your account
					</p>
				</div>

				{/* Login Form */}
				<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
					{/* Username Field */}
					<div className="space-y-1 sm:space-y-2">
						<label
							htmlFor="username"
							className="text-sm font-medium text-gray-700 block"
						>
							Username
						</label>
						<input
							id="username"
							type="text"
							placeholder="Enter your username"
							value={formData.username}
							onChange={handleInputChange}
							className={`w-full px-3 py-2 sm:px-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#6B4AA0] text-sm ${
								errors.username ? 'border-red-500' : 'border-gray-300'
							}`}
							autoComplete="username"
						/>
						{errors.username && (
							<p className="text-xs sm:text-sm text-red-500 mt-1">
								{errors.username}
							</p>
						)}
					</div>

					{/* Password Field */}
					<div className="space-y-1 sm:space-y-2">
						<label
							htmlFor="password"
							className="text-sm font-medium text-gray-700 block"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							placeholder="Enter your password"
							value={formData.password}
							onChange={handleInputChange}
							className={`w-full px-3 py-2 sm:px-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#6B4AA0] text-sm ${
								errors.password ? 'border-red-500' : 'border-gray-300'
							}`}
							autoComplete="current-password"
						/>
						{errors.password && (
							<p className="text-xs sm:text-sm text-red-500 mt-1">
								{errors.password}
							</p>
						)}
					</div>

					{/* Login Button */}
					<button
						type="submit"
						className="w-full bg-[#6B4AA0] hover:bg-[#5a3b91] text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-300 mt-2 sm:mt-4"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
