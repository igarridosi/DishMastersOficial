import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editedStatuses, setEditedStatuses] = useState({});

    useEffect(() => {
        // Replace axios call with mock data for now
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        
        // Mock data for 5 users
        const usersData = [
            { id: 1, name: 'Ibai', email: 'ibai@dishmasters.com', status: 'dishAdmin' },
            { id: 2, name: 'Ivan', email: 'ivan@dishmasters.com', status: 'dishAdmin' },
            { id: 3, name: 'Xabier', email: 'xabier@dishmasters.com', status: 'dishAdmin' },
            { id: 4, name: 'Julen', email: 'julen@projectmanager.com', status: 'dishUser' },
            { id: 5, name: 'Aitor', email: 'aitor@projectmanager.com', status: 'dishUser' },
        ];

        // Simulate a delay for fetching
        setTimeout(() => {
            setLoading(false);
            setUsers(usersData);
        }, 1000);
    };

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        // Simulate deleting user
        setUsers(users.filter(u => u.id !== user.id));
    };

    const updateStatus = (id, status) => {
        setEditedStatuses((prev) => ({ ...prev, [id]: status }));
        // Simulate updating status
        setUsers(users.map(u => u.id === id ? { ...u, status } : u));
    };

    return (
        <div>
            <div className="flex justify-between items-center p-4">
                <h1 className="text-2xl font-semibold">Users</h1>
                <Link
                    className="bg-[#FFBD59] text-black py-2 px-4 rounded-md hover:bg-[#ff9f3d] text-decoration-line: none"
                    to="/users/new"
                >
                    Add new
                </Link>
            </div>
            <div className="card bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeInDown">
                <table className="w-full table-auto text-left">
                    <thead className="border-b">
                        <tr>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    <button
                                        type="button"
                                        className="py-2.5 px-4 inline-flex justify-center items-center gap-2 bg-[#FFBD59] text-black rounded-lg cursor-pointer font-semibold text-base text-center shadow-xs transition-all duration-500"
                                    >
                                        <span
                                            className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                                            role="status"
                                            aria-label="loading"
                                        ></span>{" "}
                                        Loading
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-b">
                                    <td className="py-2 px-4">{u.name}</td>
                                    <td className="py-2 px-4">{u.email}</td>
                                    <td className="py-2 px-4">
                                        <select
                                            value={editedStatuses[u.id] || u.status}
                                            onChange={(e) => updateStatus(u.id, e.target.value)}
                                            className="bg-white border border-gray-300 rounded-md px-2 py-1"
                                        >
                                            <option value="dishUser">dishUser</option>
                                            <option value="dishAdmin">dishAdmin</option>
                                        </select>
                                    </td>
                                    <td className="py-2 px-4 flex items-center">
                                        <Link
                                            className="text-white py-2 px-4 rounded-md text-decoration-line: none"
                                            to={`/users/${u.id}`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <g
                                                    fill="none"
                                                    stroke="#222222"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                                                    <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                                                </g>
                                            </svg>
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="text-white py-1 px-4 rounded-md"
                                            onClick={() => onDeleteClick(u)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fill="#222222"
                                                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}