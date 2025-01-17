import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login';
import Register from './views/register';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Users from './views/users';
//import Users from './components/users.jsx';
import UserForm from './views/UserForm';
import HomeComponent from "./views/index";
import UserProfile from "./views/profile/profile"
import { Navigate } from "react-router-dom";
import Unauthorized from './views/unauthorized';

// ABOUT US
import HeaderAbout from './views/aboutUs/HeaderAbout';
import ContentAbout from './views/aboutUs/Content';

import FAQ from './views/FAQ/FAQ'
import Footer from './views/home/Footer'

import DishCuss from './views/dishCuss/DishcussMain';

//RESTAURANTS
import HeaderRes from './views/foodSpots/Header';
import Spots from './views/foodSpots/spots';

// CHALLENGES
import Challenge from './views/challenges/Challenge';
import SeasonRecipes from './views/challenges/SeasonRecipes';
import WeeklyRecipes from './views/challenges/WeeklyRecipes';
import MoreSeason from './views/challenges/MoreInfoSeason';
import MoreWeek from './views/challenges/MoreInfoWeek';

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
                errorElement: <Unauthorized />,
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
            {
                path: '/about',
                element:
                    <div>
                        <HeaderAbout />
                        <ContentAbout />
                        <Footer />
                    </div>
            },
            {
                path: '/challenges',
                element:
                    <div>
                        <Challenge />
                        <Footer />
                    </div>
            },
            {
                path: '/dishcuss',
                element:
                    <div>
                        <DishCuss />
                        <Footer />
                    </div>
            },
            {
                path: '/spots',
                element:
                    <div>
                        <HeaderRes />
                        <Spots />
                        <Footer />
                    </div>
            },
            {
                path: '/season',
                element: <SeasonRecipes />
            },
            {
                path: '/weekly',
                element: <WeeklyRecipes />
            },
            {
                path: '/season/:challengeId',
                element: <MoreSeason />
            },
            {
                path: '/weekly/:challengeId',
                element: <MoreWeek />
            },
            {
                path: '/faq',
                element: <FAQ />

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
            {
                path: '/about',
                element:
                    <div>
                        <HeaderAbout />
                        <ContentAbout />
                        <Footer />
                    </div>
            },
            /*
            {
                path: '/spots',
                element:
                    <div>
                        <HeaderRes />
                        <Spots />
                        <Footer />
                    </div>
            },
            {
                path: '/challenges',
                element: <Login />,
            },
            {
                path: '/season',
                element: <Login />,
            },
            {
                path: '/weekly',
                element: <Login />,
            },
            {
                path: '/season/:challengeId',
                element: <MoreSeason />
            },
            {
                path: '/weekly/:challengeId',
                element: <MoreWeek />
            },
            {
                path: '/faq',
                element:
                    <div>
                        <Header2 />
                        <h1 className="space-y-4 px-2 mx-auto max-w-5xl pt-4">1. General information about Dishmasters</h1>
                        <FAQ
                            title="Why Dishmasters?"
                            text="Dishmasters is a recipe website where anyone can explore new dishes, find inspiration, or share their
                            own culinary creations. It features the most up-to-date database of dishes from around the world and
                            aims to be the ultimate destination for cooking enthusiasts."
                        />
                        <FAQ
                            title="Who is behind Dishmasters?"
                            text="Dishmasters is a recipe website where anyone can explore new dishes, find inspiration, or share their
                            own culinary creations. It features the most up-to-date database of dishes from around the world and
                            aims to be the ultimate destination for cooking enthusiasts."
                        />
                        <FAQ
                            title="Why is Dishmasters special?"
                            text="Users can explore their favorite meals, try them at home, and then rate and share their feedback. The
                            platform also allows users to like posts and save their favorites, participate in exciting Dishy Challenges,
                            and enjoy quick, one-minute short videos for bite-sized inspiration."
                        />
                        <FAQ
                            title="Where can we find more about Dishmasters"
                            text={
                                <>
                                    Dishmasters is not a new project; it's an upgrade from an old personal project, which you can find at ‎
                                    <a href="https://dishmaster.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                        https://dishmaster.vercel.app/
                                    </a> or find more about us on our social networks.
                                </>
                            }
                        />
                        <hr className="mx-auto max-w-5xl text-black"></hr>

                        <h1 className="space-y-4 px-2 mx-auto max-w-5xl pt-4">2. Account and Registration</h1>
                        <FAQ
                            title="How can I create an account on Dishmasters?"
                            text="On our website's main page, the sign-in button will redirect you to the login page, where on the top 
                            you can see a link where you can create your account easily."
                        />
                        <FAQ
                            title="Can I change my email address or account information?"
                            text="The users cannot manually change their email account but can contact the support team by filling out 
                            the form that you have on the menu on the main page, and a support team member will contact you soon."
                        />
                        <hr className="mx-auto max-w-5xl text-black"></hr>

                        <h1 className="space-y-4 px-2 mx-auto max-w-5xl pt-4">3. Challenges and Participation</h1>
                        <FAQ
                            title="What DishyChallenge is and how can I participate?"
                            text="Dishychallenge is a dedicated page to have fun with the community where users can take part in
                            themed cooking or recipe daily challenges. It is an engaging way to connect with others, display
                            skills, and enjoy having friendly competition."
                        />
                        <FAQ
                            title="How do I upload a recipe for a challenge?"
                            text="COMMING SOON..."
                        />
                        <hr className="mx-auto max-w-5xl text-black"></hr>

                        <h1 className="space-y-4 px-2 mx-auto max-w-5xl pt-4">4. Privacy and Security</h1>
                        <FAQ
                            title="How do we protect personal information?"
                            text="We take your privacy seriously and implement several security measures to protect your personal data. 
                            This includes using encryption to safeguard your sensitive information, limiting access to authorized personnel,
                            and regularly reviewing our security protocols to ensure compliance with industry standards."
                        />
                        <FAQ
                            title="Can I delete my account and data?"
                            text="Yes, you have the right to delete your account and all the associated data at any time. 
                            Just contact our support team and tell them that you want to delete all your data, and they will provide further instructions."
                        />
                        <Footer />
                    </div>
            },
            */
        ]
    },

]);

export default router;
