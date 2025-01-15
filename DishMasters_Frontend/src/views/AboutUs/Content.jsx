import React from 'react';

function Content() {
    return (
        <div className="container mx-auto px-4 my-10">
            {/* Section: Who we are */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Who We Are</h2>
                <p className="mt-4 text-gray-600">
                    <strong>Dishmasters</strong> is a recipe website where anyone can explore new dishes, find inspiration, or share their own culinary creations. 
                    It features the most up-to-date database of dishes from around the world and aims to be the ultimate destination for cooking enthusiasts.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center mb-16">
                <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-10">
                    <h2 className="text-2xl font-bold mb-4">Our Goals</h2>
                    <p className="text-gray-600">
                        Our objective with this project is to expand the culinary knowledge of people, giving them access to various recipes around the globe. 
                        With the huge variety of meals available, users will discover their passion for cooking different types of dishes.
                    </p>
                </div>
                <img
                    src="/img/HWA.webp"
                    alt="Who We Are"
                    className="lg:w-1/2 rounded-lg shadow-md"
                />
            </div>

            {/* Section: Our Story */}
            <div className="text-center my-16">
                <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
                <p className="mt-4 text-gray-600">
                    Dishmasters was born last year as a POS (point of sale) software for small restaurants and hotels. <br />
                    This year, we reinvented the project with a fresh look. This is how <strong>Dishmasters</strong> became the ultimate home cooks' recipe website.
                </p>
            </div>

            {/* Section: Where we are */}
            <div className="my-16 text-center">
                <h2 className="text-3xl font-bold pb-6 text-gray-800">Where We Are</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3473.0225818479526!2d-1.9707470999999999!3d43.327370599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51a54183b87fed%3A0x6b3f34b4f0c14472!2sIES%20Xabier%20Zubiri%20Manteo%20BHI!5e1!3m2!1ses!2ses!4v1734425457627!5m2!1ses!2ses"
                    width="100%"
                    height="400"
                    className="rounded-lg border"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Section: Testimonials */}
            <div className="text-center my-16">
                <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
                <div className="mt-10">
                    <blockquote className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                        <p className="italic text-gray-700">
                            "Dishmasters has inspired me to try so many new recipes! The platform is easy to use and the community is so supportive."
                        </p>
                        <footer className="text-gray-500 mt-4">— Manel Lloranzadi, Home Cook</footer>
                    </blockquote>
                    <blockquote className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <p className="italic text-gray-700">
                            "I love how I can share my own recipes with others and get feedback. Dishmasters has truly become my go-to place for culinary inspiration!"
                        </p>
                        <footer className="text-gray-500 mt-4">— Xaguier Aguinagua, Food Blogger</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

export default Content;