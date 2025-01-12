import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = ev => {
        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient.post('/users', user)
                .then(() => {
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {user.id ? (
                <h1 className="text-2xl font-semibold mb-4">Update User: {user.name}</h1>
            ) : (
                <h1 className="text-2xl font-semibold mb-4">New User</h1>
            )}
            <div className="card bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInDown">
                {loading && (
                    <div className="text-center text-gray-500"><button type='button' className='py-2.5 px-4 inline-flex justify-center items-center gap-2 bg-[#FFBD59] text-black rounded-lg cursor-pointer font-semibold text-base text-center shadow-xs transition-all duration-500'>
                        <span className='animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full' role='status' aria-label='loading'>
                            <span className='sr-only'>Loading...</span>
                        </span> Loading </button>
                    </div>
                )}

                {errors && (
                    <div className="alert bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    value={user.name}
                                    onChange={ev => setUser({ ...user, name: ev.target.value })}
                                    placeholder="Name"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    value={user.email}
                                    onChange={ev => setUser({ ...user, email: ev.target.value })}
                                    placeholder="Email"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    onChange={ev => setUser({ ...user, password: ev.target.value })}
                                    placeholder="Password"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FFBD59] hover:bg-[#ff9f3d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#ff9f3d]"
                            >
                                Save
                            </button>
                        </div>
                    </form>

                )}
            </div>
        </>

    );
}