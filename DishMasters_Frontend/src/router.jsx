import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login';
import Register from './views/register';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Users from './views/users';
//import Users from './components/users.jsx';
import UserForm from './views/UserForm';
import HomeComponent from "./views/index";
import UserProfile from "./views/profile"

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [

            {
                path: '/',
                element: <HomeComponent />, // Empty element as HomeComponent is rendered in DefaultLayout
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/users/new',
                element: <UserForm key="UserCreate" />,
            },
            {
                path: '/users/:id',
                element: <UserForm key="UserUpdate" />,
            },
            {
                path: '/profile/:id',  // New route for the user profile page
                element: <UserProfile />, // Render the UserProfile component
            },

        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },

        ]
    },


]);

export default router;
