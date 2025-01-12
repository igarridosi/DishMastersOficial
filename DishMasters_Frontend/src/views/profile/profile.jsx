// resources/js/views/ProfileSettings.jsx
import { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import ProfileImageUpload from './profileImage';
import { useNavigate } from 'react-router-dom';


export default function ProfileSettings() {
  const [user, setUser] = useState({ name: '', email: '', password: '', password_confirmation: '', profile_image: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // State for alert message

  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('/profile').then(({ data }) => {
      setUser({ ...data.user, password: '', password_confirmation: '' });
    });
  }, []);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosClient.put(`/profile/${user.id}`, user)
      .then(() => {
        setAlert({ type: 'success', message: 'Profile updated successfully!' });
        console.log('Redirecting to main page...');
        setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds // Redirect to the main page
      })
      .catch((err) => {
        console.error(err);
        setAlert({ type: 'error', message: 'Failed to update profile. Please try again.' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-9/12 mx-auto p-6 bg-white rounded shadow mt-10 mb-10 ">
      <h2 className="text-xl font-semibold mb-4 text-center">Profile Settings</h2>
      <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
        <form onSubmit={handleSubmit} className="flex-1">
          {/* Alert Message */}
          {alert && (
            <div
              className={`p-3 mb-4 rounded ${
                alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {alert.message}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={user.password_confirmation}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white rounded shadow-xs transition-all ${loading ? 'bg-gray-400' : 'bg-[#222222] hover:bg-DishColor'}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
        <div className="md:col-span-1 flex-1 items-center">
        <ProfileImageUpload userId={user.id} />
        </div>
      </div>
      
    </div>
  );
}
