import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import axiosClient from "../axiosClient";
import HomeComponent from "../views/index";
import { useNavigate } from "react-router-dom";

export default function DefaultLayout(){
    const {user, token, setUser, setToken } = useStateContext();
    const navigate = useNavigate();
    /*
    if (!token){
        return <Navigate to="/" />
    }
        */
    const onLogout = async (ev) => {
        ev.preventDefault();
        try {
            // Call the logout endpoint
            await axiosClient.get('/logout');
            
            // Clear user and token state
            setUser(null);
            setToken(null);
            
            // Optionally clear localStorage/sessionStorage if used
            localStorage.removeItem('authToken'); // If using localStorage
            sessionStorage.removeItem('authToken'); // If using sessionStorage
    
            // Redirect to home
            navigate('/');
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })
      }, [])

    return(
        <div id="defaultLayout" className="bg-gray-50 text-gray-900">
        <div className="content">
        {location.pathname === '/' ? <div/> : 
            <header className="flex justify-between items-center p-4 bg-[#222222] text-white">
                <div>Header</div>
                <div className="flex items-center">
                    <span className="mr-4">{user.name}</span>
                    <div className="avatar">
                        <div className="size-10 mr-5">
                            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar" className="rounded-full" />
                        </div>
                    </div>
                    <a href="#" onClick={onLogout} className="text-[#FFBD59] hover:text-yellow-500">
                        <svg className="w-[20px] h-[20px] fill-[#8e8e8e]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                        </svg>
                    </a>
                </div>
            </header>}
            
            <main className="p-2">
            {location.pathname === '/' ? <HomeComponent /> : <Outlet />}
            </main>
        </div>
        </div>
    )
}