import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/contextProvider";
import axiosClient from "../../axiosClient";
import { Navigate, Outlet } from "react-router-dom";

const SidebarDesktop = ({ setShowForm }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { t } = useTranslation();

  const toggleSubmenu = (submenu) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };

  const { user, token, setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  /*
  if (!token) {
    return <Navigate to="/" />
  }
    */

  const onLogout = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axiosClient.post('/logout');
      if (response.status === 200) {
        console.log("enter")
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
        navigate('/');
      }
    } catch (error) {
      console.error("Error during logout:", error.response || error.message);
    }
  };

  return (
    <div className="hidden md:block fixed top-0 left-0 h-screen w-[20rem] text-white overflow-y-auto">
      <div className="flex flex-col h-full items-center px-4 py-6">
        {/* Logo Section */}
        <a href="/" className="mb-10 origin-bottom-right motion-scale-in-0 motion-opacity-in-0' motion-blur-in-[5px] motion-ease-spring-spring">
          <img
            src="img/DishMasterLogo_2_-removebg-preview.png"
            alt="DishMaster Logo"
            className="w-36"
          />
        </a>

        {/* Menu */}
        <ul className="w-full">
          {/* Home Link */}
          <li className="mb-3 origin-to motion-delay-[500ms] motion-scale-in-0 motion-opacity-in-0">
            <a href="#" className="flex items-center p-2 hover:bg-gray-200 rounded no-underline">
              <svg className="w-[25px] h-[25px] fill-black mr-2" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path>
              </svg>
              <span className="text-black">{t('home')}</span>
            </a>
          </li>

          {/* My Feed */}
          <li className="mb-3">
            <button
              onClick={() => toggleSubmenu('myFeed')}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-200 rounded origin-to motion-delay-[1000ms] motion-scale-in-0 motion-opacity-in-0"
            >
              <div className="flex items-center">
                <svg className="w-w-[25px] h-[25px] fill-black mr-2" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"></path>

                </svg>
                <span className='text-black'>{t('my_feed')}</span>
              </div>
              <span className='text-black'>{openSubmenu === 'myFeed' ? '▲' : '▼'}</span>
            </button>
            {openSubmenu === 'myFeed' && (
              <ul className="ml-4 mt-2">
                <li><a href="myFeed.html" target="_blank" className="block p-2 hover:bg-gray-200 rounded no-underline text-black">{t('main_page')}</a></li>
                <li><a href="#" className="block p-2 hover:bg-gray-200 rounded no-underline text-black">{t('dishy_challenge')}</a></li>
                <li><a href="#" className="block p-2 hover:bg-gray-200 rounded no-underline text-black">{t('dishcuss')}</a></li>
              </ul>
            )}
          </li>

          {/* Dishylist */}
          <li className="mb-3">
            <button
              onClick={() => toggleSubmenu('dishylist')}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-200 rounded origin-to motion-delay-[1250ms] motion-scale-in-0 motion-opacity-in-0"
            >
              <div className="flex items-center">
                <svg className="w-[25px] h-[25px] fill-[#000000] mr-2" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"></path>

                </svg>
                <span className='text-black'>{t('dishylist')}</span>
              </div>
              <span className='text-black'>{openSubmenu === 'dishylist' ? '▲' : '▼'}</span>
            </button>
            {openSubmenu === 'dishylist' && (
              <ul className="ml-4 mt-2">
                <li><a href="#" className="block p-2 hover:bg-gray-200 rounded no-underline text-black">{t('taste_trends')}</a></li>
                <li><a href="seasonRecipes.html" className="block p-2 hover:bg-gray-200 rounded no-underline text-black">{t('season_recipes')}</a></li>
                <li><a href="#" className="block p-2 hover:bg-gray-200 rounded no-underline text-black">{t('food_spots')}</a></li>
                <li><a href="#" className="block p-2 hover:bg-gray-200 rounded no-underline text-black">{t('world_dishes')}</a></li>
              </ul>
            )}
          </li>

          {/* About DishMasters */}
          <li className="mb-3">
            <button
              onClick={() => toggleSubmenu('about')}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-200 rounded origin-to motion-delay-[1500ms] motion-scale-in-0 motion-opacity-in-0"
            >
              <div className="flex items-center">
                <svg className="w-[25px] h-[25px] fill-[#000000] mr-2" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                </svg>
                <span className='text-black'>{t('about_dishmasters')}</span>
              </div>
              <span className='text-black'>{openSubmenu === 'about' ? '▲' : '▼'}</span>
            </button>
            {openSubmenu === 'about' && (
              <ul className="ml-4 mt-2">
                <li>
                  <a href="#" className="block p-2 hover:bg-gray-200 rounded no-underline text-black">{t('about_us')}</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setShowForm(true); }} className="block p-2 hover:bg-gray-200 rounded no-underline text-black">{t('contact_us')}</a>
                </li>
                <li>
                  <a href="#" className="block p-2 hover:bg-gray-200 rounded no-underline text-black">{t('faq')}</a>
                </li>
              </ul>
            )}
          </li>

          {/* Sign In */}
          {!token && (
            <li>
              <Link to="/login" className="flex items-center p-2 hover:bg-gray-200 rounded no-underline origin-to motion-delay-[1750ms] motion-scale-in-0 motion-opacity-in-0">
                <svg className="w-[25px] h-[25px] fill-[#000000] mr-2" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z"></path>
                </svg>
                <span className="no-underline text-black">{t('sign_in')}</span>
              </Link>
            </li>
          )}
        </ul>
        <div className="mt-auto">
          {token && (
            <header className="flex justify-between items-center p-4 text-white origin-to motion-delay-[2000ms] motion-scale-in-0 motion-opacity-in-0">
              <div className="flex items-center">
                <Link to={`/profile/${user?.id}`} className="mr-4 text-black">
                  {user?.name}
                </Link>
                <div className="avatar">
                  <div className="size-10 mr-4">
                    <Link to={`/profile/${user?.id}`}>
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                        alt="avatar"
                        className="rounded-full"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="relative inline-flex items-center justify-center px-3 py-2 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-[#222222] hover:border-red-500 rounded-lg shadow-md group"
              >
                <span
                  className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
                  <svg className="w-[20px] h-[20px] fill-[#DC2626]" stroke="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </span>
                <span
                  className="absolute flex items-center text-base font-semibold justify-center w-full h-full text-[#222222] transition-all duration-300 transform group-hover:translate-x-full ease">{t('log_out')}
                </span>
                <span className="relative text-base font-semibold invisible">Log Out</span>
              </button>
            </header>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarDesktop;
